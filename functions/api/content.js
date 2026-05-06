export async function onRequest({ request, env }) {
  try {
    const data = await env.ACADEMIC_KV.get("content");

    if (!data) {
      return new Response(
        JSON.stringify({ error: "KV key 'content' not found" }),
        { headers: { "Content-Type": "application/json" }, status: 404 }
      );
    }

    return new Response(data, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
}
