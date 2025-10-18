import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { items } = await req.json();
    const handle = process.env.INFINITEPAY_HANDLE;

    if (!handle) {
      throw new Error("Missing INFINITEPAY_HANDLE in environment variables");
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio ou inválido." }, { status: 400 });
    }

    // 🧾 Format items for InfinitePay
    const products = items.map((item) => ({
      description: item.description || item.name || "Produto sem nome",
      quantity: item.quantity || 1,
      // Convert R$ to centavos only once
      price: Math.round(Number(item.price)),
    }));

    // ✅ Calculate total
    const totalAmount = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // 🪙 InfinitePay requires price in centavos (integer)
    if (isNaN(totalAmount) || totalAmount <= 0) {
      return NextResponse.json(
        { error: "Valor total inválido para checkout." },
        { status: 400 }
      );
    }

    // ✅ Build checkout URL
    const checkoutResponse = await fetch(`https://api.infinitepay.io/api/v2/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Handle": handle,
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: "BRL",
        items: products,
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      }),
    });

    // 🧾 Log and safely parse InfinitePay response
    const rawText = await checkoutResponse.text();
    console.log("🔍 InfinitePay raw response:", rawText.slice(0, 500)); // limit log length

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error("❌ InfinitePay returned non-JSON response:", rawText.slice(0, 300));
      return NextResponse.json(
        {
          error: "InfinitePay response was not valid JSON",
          details: rawText.slice(0, 200),
        },
        { status: 502 }
      );
    }

    // ✅ Handle API errors cleanly
    if (!checkoutResponse.ok) {
      console.error("InfinitePay API error:", data);
      return NextResponse.json(
        { error: data.message || "Erro ao criar checkout no InfinitePay." },
        { status: 400 }
      );
    }



    // ✅ Return payment link to frontend
    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error("InfinitePay checkout error:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor durante o checkout." },
      { status: 500 }
    );
  }
}
