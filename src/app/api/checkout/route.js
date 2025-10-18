import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item no pedido." },
        { status: 400 }
      );
    }

    // 🔹 Format items correctly for InfinitePay checkout
    const formattedItems = body.items.map(item => ({
      name: item.description || item.name || "Produto sem nome",
      price: Math.round(Number(item.price)), // Ensure in centavos (e.g. 18900)
      quantity: item.quantity || 1,
    }));

    // 🔹 Basic total validation (optional)
    const totalAmount = formattedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (isNaN(totalAmount) || totalAmount < 100) {
      // InfinitePay minimum is R$1.00 (100 centavos)
      return NextResponse.json(
        { error: "O valor total deve ser de pelo menos R$1,00." },
        { status: 400 }
      );
    }

    // 🔹 Build InfinitePay web checkout link
    const baseUrl = "https://checkout.infinitepay.io";
    const handle = process.env.INFINITEPAY_HANDLE; // your store handle
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mostf.vercel.app";

    const itemsParam = encodeURIComponent(JSON.stringify(formattedItems));
    const redirectUrl = `${baseUrl}/${handle}?items=${itemsParam}&redirect_url=${encodeURIComponent(`${siteUrl}/success`)}`;

    console.log("✅ InfinitePay checkout URL generated:", redirectUrl);

    // ✅ Return URL to frontend
    return NextResponse.json({ url: redirectUrl });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    return NextResponse.json(
      { error: "Erro interno ao gerar o link de pagamento.", details: err.message },
      { status: 500 }
    );
  }
}
