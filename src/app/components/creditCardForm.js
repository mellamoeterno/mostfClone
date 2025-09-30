// src/app/components/creditCardForm.jsx
'use client';

import { useRouter } from 'next/navigation';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function CreditCardForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, token } = await stripe.createToken(card);

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      sessionStorage.setItem('creditCardAdded', 'true');
      sessionStorage.setItem('ccToken', token.id);
      router.push('/checkout');
    }
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-6">Cartão de Crédito </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded p-2">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Salvar Cartão de Crédito
        </button>
      </form>
    </main>
  );
}
