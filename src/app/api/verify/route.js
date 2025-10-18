import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const handle = process.env.INFINITEPAY_HANDLE;
  const transaction_nsu = searchParams.get("transaction_nsu");
  const order_nsu = searchParams.get("order_nsu");
  const slug = searchParams.get("slug");

  if (!handle || !transaction_nsu || !order_nsu || !slug) {
    return NextResponse.json({ success: false, paid: false, message: "Missing params" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.infinitepay.io/invoices/public/checkout/payment_check/${handle}?transaction_nsu=${transaction_nsu}&external_order_nsu=${order_nsu}&slug=${slug}`
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ success: false, paid: false, message: err.message }, { status: 500 });
  }
}
