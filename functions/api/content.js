export async function onRequest({ request, env }) {
  if (request.method === "GET") {
    const data = await env.ACADEMIC_KV.get("content");
    return new Response(data || "", {
      headers: { "Content-Type": "application/json" }
    });
  }

  if (request.method === "POST") {
    const body = await request.json();
    await env.ACADEMIC_KV.put("content", JSON.stringify(body));
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response("Method not allowed", { status: 405 });
}
