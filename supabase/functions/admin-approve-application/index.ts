// Admin-only endpoint: approves an application, invites user via email, creates profile row.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Verify caller identity + admin role using their JWT.
    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
    const { data: profile } = await admin
      .from("profiles")
      .select("role")
      .eq("id", userData.user.id)
      .maybeSingle();
    if (profile?.role !== "admin") {
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { application_id, founding_artist } = await req.json();
    if (!application_id) {
      return new Response(JSON.stringify({ error: "missing application_id" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { data: app, error: appErr } = await admin
      .from("applications")
      .select("id, email, name, language, locale")
      .eq("id", application_id)
      .maybeSingle();
    if (appErr || !app) {
      return new Response(JSON.stringify({ error: "application not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Create the user silently — no Supabase Auth "invite" email. The only
    // email this artist gets is our own branded founding-artist-welcome,
    // sent below once their profile is actually set up.
    let userId: string | null = null;
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: app.email,
      email_confirm: true,
      user_metadata: { name: app.name },
    });
    if (createErr) {
      // If already exists, look up by listing users.
      const { data: list } = await admin.auth.admin.listUsers();
      const existing = list?.users.find((u) => u.email?.toLowerCase() === app.email.toLowerCase());
      if (!existing) {
        return new Response(JSON.stringify({ error: createErr.message }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      userId = existing.id;
    } else {
      userId = created.user?.id ?? null;
    }

    if (!userId) {
      return new Response(JSON.stringify({ error: "could not resolve user id" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Upsert profile with artist role.
    const { error: profErr } = await admin
      .from("profiles")
      .upsert(
        { id: userId, email: app.email, role: "artist", founding_artist: !!founding_artist },
        { onConflict: "id" },
      );
    if (profErr) {
      return new Response(JSON.stringify({ error: profErr.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const lang = (app.locale ?? app.language) === "es" ? "es" : "en";
    const { error: emailErr } = await admin.functions.invoke("send-transactional-email", {
      body: {
        templateName: "founding-artist-welcome",
        recipientEmail: app.email,
        templateData: { name: app.name || "", lang },
      },
    });
    if (emailErr) {
      console.error("Failed to send founding-artist-welcome", { error: emailErr, application_id });
    }

    return new Response(JSON.stringify({ ok: true, user_id: userId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
