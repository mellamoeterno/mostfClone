 // app/api/send-to-zapier/route.js
export async function POST(req) {
  try {
    const data = await req.json();

    // 🔗 Replace with your Zapier Webhook URL
    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/22908097/2nj0gd5/";

    const zapRes = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!zapRes.ok) {
      throw new Error(`Zapier returned ${zapRes.status} ${zapRes.statusText}`);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
 