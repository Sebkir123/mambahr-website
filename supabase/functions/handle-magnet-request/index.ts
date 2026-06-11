import { createClient } from 'jsr:@supabase/supabase-js@2';
import { renderEmail as renderBrandedEmail, escapeHtml as esc } from '../_shared/email.ts';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};
const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
async function getSecret(name) {
  const envVal = Deno.env.get(name);
  if (envVal) return envVal;
  const { data, error } = await supabase.rpc('get_secret', {
    p_name: name
  });
  if (error || !data) return null;
  return data;
}
function escapeSlack(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
const MAGNETS = {
  'rif-playbook': {
    id: 'rif-playbook',
    title: 'The Defensible Layoff Playbook',
    storageKey: 'rif-playbook.pdf',
    whatsInside: [
      'State-by-state notice & severance rules',
      'WARN Act thresholds and timing',
      'Defensible selection criteria',
      'Manager, employee, and team scripts',
      'Day-of execution checklist',
      'Post-RIF: COBRA, unemployment, references'
    ]
  }
};
async function maybeSignedUrl(storageKey) {
  const { data: files, error: listErr } = await supabase.storage.from('magnets').list('', {
    search: storageKey,
    limit: 1
  });
  if (listErr) {
    console.error('[handle-magnet-request] storage list error:', listErr.message);
    return null;
  }
  const found = files?.find((f)=>f.name === storageKey);
  if (!found) return null;
  const { data: signed, error: signErr } = await supabase.storage.from('magnets').createSignedUrl(storageKey, 60 * 60 * 24 * 7) // 7 days
  ;
  if (signErr || !signed?.signedUrl) {
    console.error('[handle-magnet-request] sign url error:', signErr?.message);
    return null;
  }
  return signed.signedUrl;
}
function renderEmail(opts) {
  const { magnet, firstName, downloadUrl } = opts;
  const isLive = !!downloadUrl;
  const greeting = firstName ? `Hi ${esc(firstName)},` : 'Hi,';
  const subject = isLive ? `Your copy of “${magnet.title}”` : `“${magnet.title}” — we’ll send it the moment it ships`;
  const intro = isLive
    ? `Your copy of <strong style="color:#1A1A19;">&ldquo;${esc(magnet.title)}&rdquo;</strong> is ready. The button below is valid for 7 days.`
    : `We&rsquo;re still finishing <strong style="color:#1A1A19;">&ldquo;${esc(magnet.title)}&rdquo;</strong>. You&rsquo;ll get the PDF from team@mambahr.com the moment it ships.`;
  const insideRows = (magnet.whatsInside || [])
    .map((item) => `<tr><td valign="top" style="padding:4px 9px 4px 0;width:16px;color:#8A6535;font-weight:700;">&#10003;</td><td style="padding:4px 0;font-size:14px;line-height:1.55;color:#57534E;">${esc(item)}</td></tr>`)
    .join('');
  const html = renderBrandedEmail({
    preheader: isLive ? 'Your field guide is ready to download.' : 'Your field guide is on the way.',
    eyebrow: 'Field guide',
    heading: magnet.title,
    bodyHtml:
      `<p style="margin:0 0 14px;color:#1A1A19;font-weight:600;">${greeting}</p>` +
      `<p style="margin:0 0 22px;">${intro}</p>` +
      `<p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.08em;color:#A8A29E;text-transform:uppercase;">What&rsquo;s inside</p>` +
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">${insideRows}</table>` +
      `<p style="margin:24px 0 0;font-size:13.5px;color:#57534E;">Reply to this email if you&rsquo;d like to talk &mdash; a founder will get back to you.</p>`,
    button: isLive ? { label: 'Download the PDF', url: downloadUrl } : undefined,
  });
  return {
    subject,
    html
  };
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
  let name, email, company, magnetId, sourceUrl, turnstileToken;
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
    name = String(body.name ?? '').trim().slice(0, 200);
    email = String(body.email ?? '').trim();
    company = String(body.company ?? '').trim();
    magnetId = String(body.magnetId ?? '').trim();
    sourceUrl = String(body.sourceUrl ?? '').trim().slice(0, 512);
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
  const magnet = MAGNETS[magnetId];
  if (!magnet) {
    return new Response(JSON.stringify({
      error: 'Unknown resource.'
    }), {
      status: 400,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
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
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? null;
  const { error: dbError } = await supabase.from('magnet_requests').insert({
    name: name || null,
    email,
    company: company || null,
    magnet_id: magnetId,
    source_url: sourceUrl || null,
    ip
  });
  if (dbError && dbError.code !== '23505') {
    console.error('[handle-magnet-request] db error:', dbError.message);
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
  const downloadUrl = await maybeSignedUrl(magnet.storageKey);
  const [slackUrl, resendKey] = await Promise.all([
    getSecret('SLACK_WEBHOOK_URL'),
    getSecret('RESEND_API_KEY')
  ]);
  if (slackUrl) {
    const statusTag = downloadUrl ? 'live download' : 'upcoming — PDF not uploaded';
    fetch(slackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: `📥 *Resource download:* ${escapeSlack(magnet.title)} (${statusTag})\n• *Name:* ${escapeSlack(name) || '(not provided)'}\n• *Email:* ${escapeSlack(email)}\n• *Company:* ${escapeSlack(company) || '(not provided)'}\n• *Source:* ${escapeSlack(sourceUrl) || '(unknown)'}`
      })
    }).catch((e)=>console.error('[handle-magnet-request] slack error:', e));
  }
  if (resendKey) {
    const firstName = name.split(/\s+/)[0] ?? '';
    const { subject, html } = renderEmail({
      magnet,
      firstName,
      downloadUrl
    });
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'MambaHR <team@mambahr.com>',
        to: email,
        subject,
        html
      })
    }).catch((e)=>console.error('[handle-magnet-request] email error:', e));
  }
  return new Response(JSON.stringify({
    success: true,
    status: downloadUrl ? 'live' : 'upcoming'
  }), {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
});
