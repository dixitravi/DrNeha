export async function onRequest({ env }) {
  try {
    if (!env.ACADEMIC_KV) {
      return new Response(
        JSON.stringify({ error: "ACADEMIC_KV binding missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await env.ACADEMIC_KV.get("content");

    if (!data) {
      return new Response(
        JSON.stringify({ error: "KV key 'content' not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(data, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message, stack: err.stack }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
