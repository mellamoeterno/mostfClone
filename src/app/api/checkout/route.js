import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(req) {
  try {
    const { items, customer } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item no pedido." },
        { status: 400 }
      );
    }

    const formattedItems = items.map(item => ({
      name: item.name || "Produto sem nome",
      price: Math.round(Number(item.price)), // centavos
      quantity: item.quantity || 1,
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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mostf-clone.vercel.app";
    const orderNsu = randomUUID();

    // ✅ FIXED: Don't fully encode the items JSON
    const itemsParam = JSON.stringify(formattedItems).replace(/ /g, "+");

    let checkoutUrl = `https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+G","price":100,"quantity":1}]&redirect_url=https://mostf-clone.vercel.app/obrigadoPelaCompra`;

    //https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+G","price":100,"quantity":1}]&redirect_url=https://mostf-clone.vercel.app/

    // Optional: add customer info if available
    if (customer) {
      if (customer.name)
        checkoutUrl += `&customer_name=${encodeURIComponent(customer.name)}`;
      if (customer.email)
        checkoutUrl += `&customer_email=${encodeURIComponent(customer.email)}`;
      if (customer.cellphone)
        checkoutUrl += `&customer_cellphone=${encodeURIComponent(customer.cellphone)}`;
      if (customer.address_cep)
        checkoutUrl += `&address_cep=${encodeURIComponent(customer.address_cep)}`;
      if (customer.address_number)
        checkoutUrl += `&address_number=${encodeURIComponent(customer.address_number)}`;
      if (customer.address_complement)
        checkoutUrl += `&address_complement=${encodeURIComponent(customer.address_complement)}`;
    }

    console.log("✅ InfinitePay checkout URL generated:", checkoutUrl);

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    return NextResponse.json(
      { error: "Erro interno ao gerar o link de pagamento.", details: err.message },
      { status: 500 }
    );
  }
}