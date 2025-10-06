// app/api/webhook/route.js
import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// ✅ Init Firebase only once
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

export async function POST(req) {
  try {
    const body = await req.json();

    // Example payload InfinitePay sends:
    // {
    //   "invoice_slug": "abc123",
    //   "amount": 1000,
    //   "paid_amount": 1010,
    //   "installments": 1,
    //   "capture_method": "credit_card",
    //   "transaction_nsu": "UUID",
    //   "order_nsu": "UUID-do-pedido",
    //   "receipt_url": "https://comprovante.com/123",
    //   "items": [...]
    // }

    if (!body.order_nsu) {
      return NextResponse.json(
        { success: false, message: "Missing order_nsu" },
        { status: 400 }
      );
    }

    // ✅ Save/update order in Firestore
    const orderRef = doc(db, "orders", body.order_nsu);

    await setDoc(orderRef, {
      invoice_slug: body.invoice_slug || null,
      amount: body.amount || 0,
      paid_amount: body.paid_amount || 0,
      installments: body.installments || 1,
      capture_method: body.capture_method || null,
      transaction_nsu: body.transaction_nsu || null,
      receipt_url: body.receipt_url || null,
      items: body.items || [],
      updatedAt: new Date().toISOString(),
    });

    // Respond fast so InfinitePay knows it worked
    return NextResponse.json({ success: true, message: null }, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 400 }
    );
  }
}