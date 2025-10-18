// ✅ InfinitePay - Link Integrado Checkout API (fixed)
import { NextResponse } from "next/server";
import crypto from "crypto"; // needed for order_nsu (UUID)

export async function POST(req) {
  try {
    const body = await req.json();

    // 🔒 Required environment variables
    const handle = process.env.INFINITEPAY_HANDLE;
    const redirect_url =
      process.env.NEXT_PUBLIC_SUCCESS_URL ||
      "https://mostf-clone.vercel.app/obrigadoPelaCompra";

    if (!handle) {
      throw new Error("Missing INFINITEPAY_HANDLE in environment variables");
    }

    // 🧾 Generate unique order ID
    const order_nsu = crypto.randomUUID();

    // 🛒 Build items (price in cents, plain integers)
    const itemsArray = body.items.map((item) => ({
      name: item.description || item.name || "Produto",
      price: Math.round(Number(item.price)), // e.g. 18900 = R$189,00
      quantity: item.quantity || 1,
    }));

    // ⚠️ DO NOT ENCODE HERE — URLSearchParams will do it automatically
    const itemsString = JSON.stringify(itemsArray);

    // 👤 Optional customer data
    const customer = body.customer || {};

    // ✅ Build query params — URLSearchParams handles encoding once
    const queryParams = new URLSearchParams({
      items: itemsString,
      order_nsu,
      redirect_url,
    });

    if (customer.name) queryParams.append("customer_name", customer.name);
    if (customer.email) queryParams.append("customer_email", customer.email);
    if (customer.phone) queryParams.append("customer_cellphone", customer.phone);
    if (customer.cep) queryParams.append("address_cep", customer.cep);
    if (customer.number) queryParams.append("address_number", customer.number);
    if (customer.complement)
      queryParams.append("address_complement", customer.complement);

    // 🧠 Construct final InfinitePay link
    const checkoutUrl = `https://checkout.infinitepay.io/${handle}?${queryParams.toString()}`;

    console.log("✅ InfinitePay checkout URL:", checkoutUrl);

    // ✅ Return link to frontend
    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error("InfinitePay checkout error:", err);
    return NextResponse.json(
      { error: err.message || "Erro ao gerar o link de checkout" },
      { status: 500 }
    );
  }
}
