'use client';

import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { cart, cartTotal, removeFromCart, clearCart } = useCart();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatBRL = (valueInCents) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      Number(valueInCents) / 100
    );

  const handleCheckout = async () => {
    if (cart.length === 0) {
      setError("Seu carrinho está vazio.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🧾 Format items for InfinitePay checkout
      const items = cart.map(item => ({
        description: item.name || item.title || "Produto sem nome",
        price: item.price, // ✅ already in centavos, no conversion needed
        quantity: item.quantity || 1,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // ✅ Redirect to InfinitePay
      } else {
        console.error("InfinitePay response:", data);
        setError("Erro ao criar o link de pagamento.");
      }
    } catch (err) {
      console.error("Erro no checkout:", err);
      setError("Algo deu errado. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cart-page min-h-screen bg-white text-black">
      <main className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Seu Carrinho Está Vazio</p>
            <Link
              href="/"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200 mb-8">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="py-4 flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-600">{formatBRL(item.price)}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remover item"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-xl">
                  {formatBRL(cartTotal)}
                </span>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    if (confirm("Tem certeza que deseja limpar o carrinho?")) clearCart();
                  }}
                  className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Limpar Carrinho
                </button>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg text-white transition-colors ${
                    loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {loading ? "Gerando link..." : "Continuar para pagamento"}
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
