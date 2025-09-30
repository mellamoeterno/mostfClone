// src/app/components/PixPayment.jsx
/* 'use client';

import { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js'; */

/**
 * Props:
 * - amount (number): amount in BRL (e.g., 199.00)
 * - billingDetails: object with { name, email } (optional)
 */

/* export default function PixPayment({ amount, billingDetails = {} }) {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [error, setError] = useState(null);

  const createPayment = async () => {
    setError(null);
    if (!amount || amount <= 0) {
      setError('Invalid amount');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/create-pix-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          metadata: { integration: 'pix', source: 'web' },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to create PaymentIntent');

      const clientSecret = data.clientSecret;
 */
      // Confirm the PaymentIntent for PIX - this returns pix info (QR payload)

      /* const result = await stripe.confirmPixPayment(clientSecret, {
        payment_method: {
          billing_details: billingDetails,
        }, */

        // Optionally: return_url can be provided; here we'll handle client-side UI

      /* });

      if (result.error) {
        console.error('confirmPixPayment error', result.error);
        setError(result.error.message || 'Payment failed');
        setLoading(false);
        return;
      } */

      // result.paymentIntent will contain pix next_action with QR code info

      /* const pi = result.paymentIntent;
      setPixData(pi); // store paymentIntent to render QR or string
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unexpected error');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-4">
        <div className="text-sm text-gray-600">Total</div>
        <div className="text-2xl font-semibold">R$ {Number(amount).toFixed(2)}</div>
      </div>

      {!pixData && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Ao clicar em pagar via Pix, um QR code será gerado. Abra o app do seu banco e escaneie o QR ou copie o código Pix para finalizar o pagamento.
          </p>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            onClick={createPayment}
            disabled={!stripe || loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Gerando QR...' : 'Pagar com Pix'}
          </button>
        </div>
      )}

      {pixData && (
        <div className="mt-4 bg-white border rounded p-4">
          <h3 className="font-semibold mb-2">Pagamento Pix gerado</h3> */

          {/* The PaymentIntent pix data lives in pixData.next_action.pix_display_qr or pix string fields.
              Structure per Stripe: paymentIntent.next_action.pix_display_qr.qr_code and pix_string.
              We'll show both if available. */}

         {/*  <div className="flex flex-col items-center gap-3">
            {pixData.next_action?.pix_display_qr?.qr_code ? ( */}

              // QR image (data URL) or URL provided by Stripe

              {/* <img
                alt="Pix QR"
                src={pixData.next_action.pix_display_qr.qr_code}
                className="w-40 h-40 object-contain"
              />
            ) : null}

            {pixData.next_action?.pix_display_qr?.copy_and_paste_qr_code ? (
              <textarea
                readOnly
                value={pixData.next_action.pix_display_qr.copy_and_paste_qr_code}
                className="w-full p-2 border rounded text-xs"
                rows={3}
              />
            ) : null}

            <div className="text-sm text-gray-600">
              Depois de pagar no app do banco, o pagamento será confirmado — confirme seu pedido quando receber a notificação.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 */}