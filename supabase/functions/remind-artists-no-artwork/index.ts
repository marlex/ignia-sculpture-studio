import { createClient } from 'npm:@supabase/supabase-js@2'

// Runs once a day via pg_cron. Finds artists approved ~24h ago who still
// have zero artworks, and nudges them by email.
const WINDOW_START_HOURS = 25
const WINDOW_END_HOURS = 23

function parseJwtClaims(token: string): Record<string, unknown> | null {
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    const payload = parts[1]
      .replaceAll('-', '+')
      .replaceAll('_', '/')
      .padEnd(Math.ceil(parts[1].length / 4) * 4, '=')
    return JSON.parse(atob(payload)) as Record<string, unknown>
  } catch {
    return null
  }
}

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const claims = parseJwtClaims(authHeader.slice('Bearer '.length).trim())
  if (claims?.role !== 'service_role') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const windowStart = new Date(Date.now() - WINDOW_START_HOURS * 60 * 60 * 1000).toISOString()
  const windowEnd = new Date(Date.now() - WINDOW_END_HOURS * 60 * 60 * 1000).toISOString()

  const { data: candidates, error: candidatesError } = await supabase
    .from('profiles')
    .select('id, email, name')
    .eq('role', 'artist')
    .gte('approved_at', windowStart)
    .lte('approved_at', windowEnd)

  if (candidatesError) {
    console.error('Failed to load candidates', { error: candidatesError })
    return new Response(JSON.stringify({ error: 'Failed to load candidates' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let sent = 0
  for (const profile of candidates ?? []) {
    const { count, error: countError } = await supabase
      .from('artworks')
      .select('id', { count: 'exact', head: true })
      .eq('artist_id', profile.id)

    if (countError) {
      console.error('Failed to count artworks', { error: countError, profileId: profile.id })
      continue
    }
    if ((count ?? 0) > 0) continue

    const { error: sendError } = await supabase.functions.invoke('send-transactional-email', {
      body: {
        templateName: 'artist-upload-reminder',
        recipientEmail: profile.email,
        templateData: { name: profile.name || '', lang: 'es' },
      },
    })
    if (sendError) {
      console.error('Failed to send reminder', { error: sendError, profileId: profile.id })
      continue
    }
    sent++
  }

  return new Response(JSON.stringify({ candidates: candidates?.length ?? 0, sent }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
