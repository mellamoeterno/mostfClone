'use client';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { useEffect } from 'react';

export default function CartPage() {

  const {
    cart,
    cartTotal,
    removeFromCart,
    clearCart
  } = useCart();

  /* HANDLE SUBMIT  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        orderId: Date.now().toString(), // unique order ID
        items: cart.map(item => ({
          description: item.name || item.title || "Produto sem nome",
          price: Math.round(Number(item.price) * 100), // convert R$ → centavos
          quantity: item.quantity || 1,
        })),
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.url) {
        // ✅ Redirect user to InfinitePay checkout page
        window.location.href = data.url;
      } else {
        console.error("InfinitePay response:", data);
        setError("Erro ao criar o link de pagamento.");
      }
    } catch (err) {
      console.error("Erro no checkout:", err);
      setError("Algo deu errado. Por favor, tente novamente mais tarde.");
    }
  };

  // Optional: Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="cart-page h-300">
      <main className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-black">Meu Carrinho</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Seu Carrinho Está Vazio</p>
            <Link 
              href="/" 
              className="inline-block bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200 mb-8">
              {cart.map(item => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg text-black">{item.name}</h3>
                    <p className="text-gray-600">R$ {Number(item.price).toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Remove item"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg text-black">Total:</span>
                <span className="font-bold text-xl text-black ">R$ {cartTotal}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition-colors text-black "
                >
                  Limpar Carrinho
                </button>
              </div>

              <button
                onClick={async () => {
                  const res = await fetch("/api/checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items: cart }),
                  });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Continuar para pagamento
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}