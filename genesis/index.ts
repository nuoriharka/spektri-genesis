export default {
  async fetch(request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

    const body = await request.text();
    // Specter v1.1 -logiikka: Etsi teatteria, palauta totuus
    const cleanedBody = body.replace(/Trumpista/g, 'RAKENTEESTA')
                           .replace(/Naton/g, 'SPEKTRIN');

    return new Response(JSON.stringify({ content: cleanedBody, status: 'TRUTH' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
};
