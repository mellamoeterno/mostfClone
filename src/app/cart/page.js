'use client';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [ruaAvenida, setRuaAvenida] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [infoAdicional, setInfoAdicional] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeSobrenome, setNomeSobrenome] = useState('');
  const [error, setError] = useState('');

  const {
    cart,
    cartTotal,
    removeFromCart,
    clearCart
  } = useCart();

  /* HANDLE SUBMIT  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (!cep.trim() || !ruaAvenida.trim() || !numero.trim() || !telefone.trim() || !nomeSobrenome.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const body = {
        orderId: Date.now().toString(), // unique order id
        customer: {
          name: nomeSobrenome,
          email: email,
          phone_number: telefone,
        },
        address: {
          cep: cep,
          number: numero,
          complement: complemento,
        },
        items: cart.map(item => ({
          description: item.name || item.title,
          price: Math.round(Number(item.price) * 100), // convert to centavos
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
        setError("Erro ao criar o link de pagamento.");
      }
    } catch (err) {
      console.error(err);
      setError('Algo deu errado. Por favor, tente novamente mais tarde.');
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

              {/* FORM: Agora o único botão "Continuar" faz todo o fluxo */}
              <form 
                onSubmit={handleSubmit} 
                className="bg-white shadow-md rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md space-y-4 mt-6"
              >
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                  Adicione seus dados e continue para pagamento
                </h1>

                <input type="email" placeholder="seuemail@porexemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
                <input type="text" placeholder="Cep" value={cep} onChange={(e) => setCep(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
                <input type="text" placeholder="Rua / Avenida" value={ruaAvenida} onChange={(e) => setRuaAvenida(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
                <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
                <input type="text" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
                <input type="text" placeholder="Informações adicionais" value={infoAdicional} onChange={(e) => setInfoAdicional(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
                <input type="tel" placeholder="Telefone (+99)123456789" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
                <input type="text" placeholder="Nome e sobrenome" value={nomeSobrenome} onChange={(e) => setNomeSobrenome(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />

                {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}

                <button type="submit" className="w-full bg-[#082402ea] text-white font-semibold py-2 rounded-lg hover:bg-indigo-500 transition">
                  Continuar
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
}