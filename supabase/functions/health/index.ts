import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders, handleCORS } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(req)
  if (corsResponse) return corsResponse

  return new Response(
    JSON.stringify({ 
      status: 'ok', 
      message: 'Supabase Edge Functions backend running!',
      timestamp: new Date().toISOString()
    }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    }
  )
})
