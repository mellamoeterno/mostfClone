import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Build InfinitePay payload with price conversion to centavos
    const payload = {
      handle: process.env.INFINITEPAY_HANDLE,
      redirect_url: "https://mostf.vercel.app/obrigado",
      webhook_url: "https://mostf.vercel.app/api/webhook",
      order_nsu: Date.now().toString(), // Unique order ID
      customer: {
        name: body.nomeSobrenome,
        email: body.email,
        phone_number: body.telefone,
      },
      address: {
        cep: body.cep,
        number: body.numero,
        complement: body.complemento,
      },
      items: body.items.map((item) => ({
        quantity: Number(item.quantity) || 1,
        // ✅ Convert R$ → centavos safely
        price: Math.round(parseFloat(item.price) * 100),
        description: item.name || "Produto sem nome",
      })),
    };

    // ✅ Send payload to InfinitePay API
    const response = await fetch(
      "https://api.infinitepay.io/invoices/public/checkout/links",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    // ✅ Optional: handle errors from InfinitePay
    if (!response.ok) {
      console.error("InfinitePay error:", data);
      return NextResponse.json(
        { error: "Erro ao criar link de pagamento", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}