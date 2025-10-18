'use client';

import Link from "next/link";
import { useState } from 'react';
import { useCart } from "@/app/contexts/CartContext";
import MiniCart from "@/app/components/miniCart";

// 🛍️ Produtos relacionados (links internos, não InfinitePay)
const conjuntos = [
  {
    id: "emily-0002",
    href: "/conjuntos/emilyEmParis",
    src: "/images/roupas/emilyEmParis(emBreve).png",
    title: "Emily Em Paris",
    desc: "(Em Breve)",
    price: 199,
  },
];

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart } = useCart();

  const images = [
    "https://res.cloudinary.com/dyiyheyzq/image/upload/v1759135599/leseV_1_syumax.png",
  ];

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecione um tamanho antes de continuar.");
      return;
    }

    addToCart({
      id: `lese-vermelho-${selectedSize}`,
      name: `Vestido Lese Vermelho - Tamanho ${selectedSize}`,
      price: 18900, // preço em centavos (R$189,00)
      size: selectedSize,
      quantity: 1,
      image: images[0],
    });
  };

  const renderProductCard = (item, index) => (
    <div
      key={index}
      className="flex flex-col items-center bg-white p-4 shadow hover:shadow-md transition rounded"
    >
      <Link href={item.href} className="w-full">
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-72 object-cover mb-4 rounded"
        />
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-sm text-gray-600">{item.desc}</p>
        <p className="text-base font-bold mt-2">R$ {item.price}</p>
      </Link>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#f1f8fff6] via-[#deeefff6] to-[#d7ebfff8] font-sans p-8 gap-10">
      <>
        <MiniCart />

        <main className="flex flex-col md:flex-row gap-8 p-6 max-w-5xl mx-auto">
          {/* Imagem */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={images[currentIndex]}
              alt={`Product ${currentIndex + 1}`}
              className="w-full h-auto object-cover rounded shadow"
            />
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-90 text-gray-800 px-3 py-1 rounded-r"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-90 text-gray-800 px-3 py-1 rounded-l"
            >
              ›
            </button>
          </div>

          {/* Infos */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-[#133010]">Vestido Lese Vermelho</h1>
              <p className="text-gray-700 mb-6">R$ 189,00</p>

              <div className="mb-6">
                <h2 className="text-[#133010] text-lg font-semibold mb-2">Tamanho</h2>
                <div className="flex gap-3">
                  {['P', 'M', 'G'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded ${
                        selectedSize === size
                          ? 'bg-black text-white'
                          : 'bg-white text-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium mt-6"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </main>

        {/* Produtos Relacionados */}
        <section className="max-w-6xl mx-auto mt-12 w-full">
          <h2 className="text-2xl font-bold mb-6 text-[#133010]">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {conjuntos.map(renderProductCard)}
          </div>
        </section>
      </>
    </div>
  );
}
//one problem im gettin now tho, when adding the product to cart it shows the wrong price ($18900.00) now
//probably for having it as cents in the data and showing the actual price 189, you gotta change something in the code.
//or it could be inside my cart as well, which should be better for you to do?
