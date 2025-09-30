// src/app/api/checkout/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Build InfinitePay payload
    const payload = {
      handle: process.env.INFINITEPAY_HANDLE, // your InfinitePay tag
      redirect_url: "https://mostf.vercel.app/obrigadoPelaCompra",
      webhook_url: "https://mostf.vercel.app/api/checkout",
      order_nsu: body.orderId,
      customer: body.customer,
      address: body.address,
      items: body.items,
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
