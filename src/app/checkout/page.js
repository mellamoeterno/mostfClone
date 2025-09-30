'use client';

import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import PaymentMethodSelector from '@/app/components/paymentMethodSelector';
import ParcelOptions from '@/app/components/parcelOptions';


export default function CheckoutPage() {
  const { cart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [creditCardAdded, setCreditCardAdded] = useState(false);

  const total = (cart ?? []).reduce((acc, item) => acc + (item.price || 0), 0);

  // Placeholder for when credit card is successfully added
  useEffect(() => {
    const saved = sessionStorage.getItem('creditCardAdded');
    if (saved === 'true') setCreditCardAdded(true);
  }, []);

  return (
    <div className="cart-page h-300">
    <main className="w-full max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-black">Finalizar Compra</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-black">Resumo do Carrinho</h2>
        <ul className="space-y-2 text-black">
          {(cart ?? []).map((item, i) => (
            <li key={i} className="flex justify-between items-center border p-2 rounded">
              <span>{item.name}</span>
              <span>R$ {Number(item.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="text-right font-semibold mt-4 text-black">
          Total: R$ {Number(total).toFixed(2)}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-black">Endereço e Contato</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
          <input placeholder="Nome completo" className="border p-2 rounded" required />
          <input placeholder="Email" type="email" className="border p-2 rounded" required />
          <input placeholder="CEP" className="border p-2 rounded" required />
          <input placeholder="Cidade" className="border p-2 rounded" required />
          <input placeholder="Estado" className="border p-2 rounded" required />
          <input placeholder="Rua e número" className="border p-2 rounded" required />
        </form>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4 text-black">Forma de Pagamento</h2>

        {creditCardAdded ? (
          <ParcelOptions total={total} />
        ) : (
          <PaymentMethodSelector onSelect={setPaymentMethod} />
        )}
      </section>
    </main>
    </div>
  );
}
