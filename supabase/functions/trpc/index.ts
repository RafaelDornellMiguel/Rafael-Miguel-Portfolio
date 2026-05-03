import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createExpressMiddleware } from 'npm:@trpc/server@10.45.2/adapters/express'
import { appRouter } from '../../../server/routers.ts'
import { createContext } from '../../../server/_core/context.ts'
import { corsHeaders, handleCORS } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCORS(req)
  if (corsResponse) return corsResponse

  try {
    // Create tRPC context with Supabase client
    const context = await createContext({ req })

    // Create Express-like middleware
    const middleware = createExpressMiddleware({
      router: appRouter,
      createContext: () => context,
    })

    // Convert Deno request to Express-like request
    const url = new URL(req.url)
    const method = req.method
    const headers = Object.fromEntries(req.headers)
    const body = method !== 'GET' && method !== 'HEAD' ? await req.text() : undefined

    // Create mock Express request/response
    const mockReq = {
      method,
      url: url.pathname + url.search,
      headers,
      body,
      query: Object.fromEntries(url.searchParams),
    }

    let responseData: any = null
    let statusCode = 200

    // Mock Express response
    const mockRes = {
      status: (code: number) => {
        statusCode = code
        return mockRes
      },
      json: (data: any) => {
        responseData = data
        return mockRes
      },
      set: () => mockRes,
    }

    // Execute middleware
    await middleware(mockReq as any, mockRes as any, () => {})

    return new Response(JSON.stringify(responseData), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: statusCode,
    })
  } catch (error) {
    console.error('Error in tRPC function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
