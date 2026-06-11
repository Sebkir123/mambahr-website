import { createClient } from 'jsr:@supabase/supabase-js@2';
import { renderEmail } from '../_shared/email.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};
const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
// Try edge function env first, fall back to Supabase Vault
async function getSecret(name) {
  const envVal = Deno.env.get(name);
  if (envVal) return envVal;
  const { data, error } = await supabase.rpc('get_secret', {
    p_name: name
  });
  if (error || !data) return null;
  return data;
}
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escapeSlack(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
Deno.serve(async (req)=>{
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders
    });
  }
  let email, company, turnstileToken;
  try {
    const raw = await req.text();
    if (raw.length > 4096) {
      return new Response(JSON.stringify({
        error: 'Payload too large.'
      }), {
        status: 413,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      });
    }
    const body = JSON.parse(raw);
    email = String(body.email ?? '').trim();
    company = String(body.company ?? '').trim();
    turnstileToken = String(body.turnstileToken ?? '').trim();
  } catch  {
    return new Response(JSON.stringify({
      error: 'Invalid request.'
    }), {
      status: 400,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({
      error: 'Valid work email required.'
    }), {
      status: 400,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
  // Turnstile verification — reads CLOUDFARE_SECRET_KEY from vault
  const cfSecret = await getSecret('CLOUDFARE_SECRET_KEY');
  const cfSiteKey = await getSecret('CLOUDFARE_SITE_KEY');
  if (cfSecret && cfSiteKey && turnstileToken && turnstileToken !== 'dev-mode-bypass') {
    const form = new URLSearchParams();
    form.append('secret', cfSecret);
    form.append('response', turnstileToken);
    const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: form.toString()
    });
    if (cfRes.ok) {
      const { success } = await cfRes.json();
      if (!success) {
        return new Response(JSON.stringify({
          error: 'Verification failed. Refresh and try again.'
        }), {
          status: 403,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        });
      }
    }
  }
  // Insert into waitlist
  const { error: dbError } = await supabase.from('waitlist').insert({
    email,
    company
  });
  if (dbError && dbError.code !== '23505') {
    console.error('[handle-waitlist] db error:', dbError.message);
    return new Response(JSON.stringify({
      error: 'Something went wrong.'
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
  if (!dbError) {
    // Slack — reads SLACK_WEBHOOK_URL from edge function env
    // Resend — reads RESEND_API_KEY from vault
    const [slackUrl, resendKey] = await Promise.all([
      getSecret('SLACK_WEBHOOK_URL'),
      getSecret('RESEND_API_KEY')
    ]);
    if (slackUrl) {
      fetch(slackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: `New waitlist signup:\n• *Email:* ${escapeSlack(email)}\n• *Company:* ${escapeSlack(company) || '(not provided)'}`
        })
      }).catch((e)=>console.error('[handle-waitlist] slack error:', e));
    }
    if (resendKey) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'MambaHR <team@mambahr.com>',
          to: email,
          subject: 'Welcome to MambaHR — we got your application',
          html: renderEmail({
            preheader: 'We received your inquiry — a founder will be in touch soon.',
            eyebrow: "You're on the list",
            heading: 'You’re on the list.',
            bodyHtml:
              `<p style="margin:0 0 16px;">Thanks for your interest in MambaHR. We received your inquiry for <strong style="color:#1A1A19;">${escapeHtml(company || 'your company')}</strong> and we&rsquo;ll be in touch soon.</p>` +
              `<p style="margin:0;">MambaHR is the AI HR department &mdash; hiring, onboarding, payroll-ready exports, time off, performance, and compliance, run end to end with one human approving the calls that matter.</p>`,
            button: { label: 'Explore MambaHR', url: 'https://mambahr.com' },
          })
        })
      }).catch((e)=>console.error('[handle-waitlist] email error:', e));
    }
  }
  return new Response(JSON.stringify({
    success: true
  }), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
});
