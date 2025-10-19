import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Nenhum item no pedido." }, { status: 400 });
    }

    const formattedItems = items.map(item => ({
      name: item.name || "Produto sem nome",
      quantity: item.quantity || 1,
      price: Math.round(Number(item.price)), // in centavos
    }));

    const totalAmount = formattedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (isNaN(totalAmount) || totalAmount < 100) {
      return NextResponse.json(
        { error: "O valor total deve ser de pelo menos R$1,00." },
        { status: 400 }
      );
    }

    const handle = process.env.INFINITEPAY_HANDLE;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mostf.vercel.app";

    const checkoutResponse = await fetch("https://api.infinitepay.io/v2/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Handle": handle,
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: "BRL",
        items: formattedItems,
        redirect_url: `${siteUrl}/success`,
      }),
    });

    const text = await checkoutResponse.text();
    console.log("🔍 InfinitePay raw response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("❌ InfinitePay returned non-JSON response:", text);
      return NextResponse.json(
        { error: "Resposta inválida da API InfinitePay." },
        { status: 502 }
      );
    }

    if (!checkoutResponse.ok) {
      console.error("❌ InfinitePay API error:", data);
      return NextResponse.json(
        { error: data.message || "Erro ao criar checkout." },
        { status: checkoutResponse.status }
      );
    }

    console.log("✅ InfinitePay checkout URL:", data.url);
    return NextResponse.json({ url: data.url });
  } catch (err) {
    console.error("❌ Erro interno:", err);
    return NextResponse.json(
      { error: "Erro interno ao gerar checkout.", details: err.message },
      { status: 500 }
    );
  }
}
