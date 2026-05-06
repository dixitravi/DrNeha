export async function onRequest({ request, env }) {
  try {
    if (!env.ACADEMIC_KV) {
      return new Response(
        JSON.stringify({ error: "KV binding missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ GET → return content
    if (request.method === "GET") {
      const data = await env.ACADEMIC_KV.get("content");
      return new Response(data || "{}", {
        headers: { "Content-Type": "application/json" }
      });
    }

    // ✅ POST → update content
    if (request.method === "POST") {
      const body = await request.json();

      await env.ACADEMIC_KV.put(
        "content",
        JSON.stringify(body, null, 2)
      );

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // ❌ anything else
    return new Response("Method not allowed", { status: 405 });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
