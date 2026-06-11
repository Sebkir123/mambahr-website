import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const { refCode } = await req.json();
    if (!refCode) {
      return new Response(JSON.stringify({
        error: "No referral code provided"
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 400
      });
    }
    // Since we need to increment a click counter, we should ideally have a clicks column.
    // However, since we don't know if the column exists yet, we will just return the referral count
    // for this code to act as the "API" for the front end to show referral analytics.
    // 1. Get the user who owns this referral code
    const { data: owner, error: userError } = await supabaseAdmin.from("waitlist").select("referral_code, email").eq("referral_code", refCode).single();
    if (userError || !owner) {
      return new Response(JSON.stringify({
        error: "Referral code not found"
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        },
        status: 404
      });
    }
    // 2. Count how many people have used this referral code to sign up
    const { count, error: countError } = await supabaseAdmin.from("waitlist").select("*", {
      count: "exact",
      head: true
    }).eq("referred_by", refCode);
    if (countError) throw countError;
    // Return the stats
    return new Response(JSON.stringify({
      referralCount: count || 0
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      status: 200
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      error: error.message
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      },
      status: 500
    });
  }
});
