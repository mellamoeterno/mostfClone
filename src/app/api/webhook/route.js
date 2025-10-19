// ✅ InfinitePay Webhook → Firestore
import { NextResponse } from "next/server";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
//this webhook is for listening to sells  data from infinitepay
// --- ✅ Firebase initialization (only once) ---
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!getApps().length) initializeApp(firebaseConfig);
const db = getFirestore();

// --- ✅ Webhook endpoint ---
export async function POST(req) {
  try {
    // 🧠 InfinitePay sends JSON (no signature)
    const body = await req.json();

    // 🔍 Basic validation
    if (!body || !body.order_nsu) {
      return NextResponse.json(
        { success: false, message: "Missing order_nsu in payload" },
        { status: 400 }
      );
    }

    // 🕒 Firestore document reference
    const orderRef = doc(db, "orders", body.order_nsu);

    // 🧾 Store/update payment record
    await setDoc(orderRef, {
      invoice_slug: body.invoice_slug || null,
      amount: body.amount || 0,
      paid_amount: body.paid_amount || 0,
      installments: body.installments || 1,
      capture_method: body.capture_method || null,
      transaction_nsu: body.transaction_nsu || null,
      receipt_url: body.receipt_url || null,
      items: body.items || [],
      status: body.status || "unknown", // InfinitePay may send "paid", "refused", etc.
      updatedAt: new Date().toISOString(),
    });

    // ⚡ Respond quickly (InfinitePay expects 200 OK)
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("InfinitePay Webhook error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal error" },
      { status: 500 }
    );
  }
}
