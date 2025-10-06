import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Build InfinitePay payload
    const payload = {
      handle: process.env.INFINITEPAY_HANDLE,
      redirect_url: "https://mostf.vercel.app/obrigado",
      webhook_url: "https://mostf.vercel.app/api/webhook", 
      order_nsu: Date.now().toString(), // unique order ID
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
      items: body.cart.map((item) => ({
        quantity: item.quantity,
        price: Math.round(Number(item.price) * 100), // R$ → centavos
        description: item.name,
      })),
    };

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
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}