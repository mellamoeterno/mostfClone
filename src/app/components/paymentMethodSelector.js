// File: src/app/components/PaymentMethodSelector.jsx
'use client';

import { useRouter } from 'next/navigation';

export default function PaymentMethodSelector({ onSelect }) {
  const router = useRouter();

  const handleSelect = (method) => {
    onSelect(method);
    router.push(`/checkout/${method}`); // Example: /checkout/cartao or /checkout/pix
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={() => handleSelect('cartao')}
        className="w-full sm:w-auto px-4 py-2 border rounded hover:bg-gray-100 text-black"
      >
        Cartão de Crédito
      </button>
      {/* <button
        onClick={() => handleSelect('pix')}
        className="w-full sm:w-auto px-4 py-2 border rounded hover:bg-gray-100 text-black"
      >
        Pix
      </button> */}
    </div>
  );
}
