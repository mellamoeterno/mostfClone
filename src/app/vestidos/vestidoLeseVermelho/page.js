'use client';

import { useState } from 'react';

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [ruaAvenida, setRuaAvenida] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [infoAdicional, setInfoAdicional] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nomeSobrenome, setNomeSobrenome] = useState('');
  const [error, setError] = useState('');

  const sizeLinks = {
    P: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
    M: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+M","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
    G: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+G","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
  };

  // ✅ Replace with your actual Zapier Catch Hook URL
  const ZAPIER_URL = "/api/send-to-zapier";

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
    if (!selectedSize || !sizeLinks[selectedSize]) {
      setError('Por favor, selecione um tamanho válido.');
      return;
    }

    try {
      const res = await fetch(ZAPIER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          cep,
          ruaAvenida,
          numero,
          complemento,
          infoAdicional,
          telefone,
          nomeSobrenome,
          selectedSize,
        }),
      });

      if (!res.ok) throw new Error('Falha ao enviar os dados para Zapier.');

      setError('');
      window.location.href = sizeLinks[selectedSize];
    } catch (err) {
      console.error(err);
      setError('Algo deu errado. Por favor, tente novamente mais tarde.');
    }
  };

  const images = [
    "https://res.cloudinary.com/dyiyheyzq/image/upload/v1759135599/leseV_1_syumax.png",
    "https://res.cloudinary.com/dyiyheyzq/image/upload/v1759135599/leseV_1_syumax.png",
    "https://res.cloudinary.com/dyiyheyzq/image/upload/v1759135599/leseV_1_syumax.png",
    "https://res.cloudinary.com/dyiyheyzq/image/upload/v1759135599/leseV_1_syumax.png",
  ];

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#f1f8fff6] via-[#deeefff6] to-[#d7ebfff8] font-sans p-8 gap-10">
      <main className="flex flex-col md:flex-row gap-8 p-6 max-w-5xl mx-auto">
        <div className="w-full md:w-1/2 relative">
          <img
            src={images[currentIndex]}
            alt={`Product ${currentIndex + 1}`}
            className="w-full h-auto object-cover rounded shadow"
          />
          <button onClick={handlePrev} className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-90 text-gray-800 px-3 py-1 rounded-r">‹</button>
          <button onClick={handleNext} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-90 text-gray-800 px-3 py-1 rounded-l">›</button>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-[#133010]">Jaqueta couro pu</h1>
            <p className="text-gray-700 mb-6">$189</p> {/* price <<<<<<< preço <<<<<<<< preço */}

            <div className="mb-6">
              <h2 className="text-[#133010] text-lg font-semibold mb-2">Tamanho</h2>
              <div className="flex gap-3">
                {['P', 'M', 'G'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md space-y-4">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Adicione seus dados e continue para pagamento</h1>

            <input type="email" placeholder="seuemail@porexemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
            <input type="text" placeholder="Cep" value={cep} onChange={(e) => setCep(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
            <input type="text" placeholder="Rua / Avenida" value={ruaAvenida} onChange={(e) => setRuaAvenida(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
            <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
            <input type="text" placeholder="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
            <input type="text" placeholder="Informações adicionais" value={infoAdicional} onChange={(e) => setInfoAdicional(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
            <input type="tel" placeholder="Telefone (+99)123456789" value={telefone} onChange={(e) => setTelefone(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />
            <input type="text" placeholder="Nome e sobrenome" value={nomeSobrenome} onChange={(e) => setNomeSobrenome(e.target.value)} className="w-full px-3 sm:px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 text-black focus:ring-blue-500" />

            {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}

            <button type="submit" className="w-full bg-[#082402ea] text-white font-semibold py-2 rounded-lg hover:bg-indigo-500 transition">Continuar</button>
          </form>
        </div>
      </main>
    </div>
  );
}
