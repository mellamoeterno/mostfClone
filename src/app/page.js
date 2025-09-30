'use client'
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/contexts/CartContext";
import MiniCart from "@/app/components/miniCart";

export default function DesktopComponent() {
  const { addToCart } = useCart();

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
      </Link>

      {item.id && (
        <button
          onClick={() =>
            addToCart({
              id: item.id,
              name: item.title,
              description: item.desc,
              price: item.price || 0, // fallback if price not set
              image: item.src,
            })
          }
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Adicionar ao Carrinho
        </button>
      )}
    </div>
  );



  const conjuntos = [
    {
      id: "emily-0002",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: 'images/roupas/emilyEmParis(emBreve).png',
      title: "Emily Em Paris",
      desc: "(Em Breve)",
      price: 199,
    },
    {
      id: "livia-0003",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "images/roupas/blusaSocialHomeOffice.png",
      title: "Blusa Social Home Office",
      desc: "além do céu",
      price: 199,
    },
    {
      id: "oceano-0004",
      href: '/vestidos/vestidoLeseVermelho',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1759135599/leseV_1_syumax.png",
      title: "vestido lese vermelho",
      desc: "estilo impecável",
      price: 199,
    },
    {
      id: "buque-0005",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672831/conjunto_7_csvmte.jpg",
      title: "Rosa buquê",
      desc: "rosa buquê",
      price: 199,
    },
    {
      id: "nome1",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672831/conjunto_6_ojwfyg.jpg",
      title: "Conjunto Miranda",
      desc: "conjunto miranda",
      price: 199,
    },
    {
      id: "nome2",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672830/barbara_3_pgquqv.jpg",
      title: "Conjunto Bárbara",
      desc: "conjunto bárbara",
      price: 199,
    },
    {
      id: "nome3",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672830/auroraVinho_4_dl4lnv.jpg",
      title: "Aurora vinho",
      desc: "aurora vinho",
      price: 199,
    },
    {
      id: "nome4",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672829/barbara_2_2r_zr39iw.jpg",
      title: "Barbara Cáqui",
      desc: "barbara cáqui",
      price: 199,
    },
    {
      id: "nome5",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672829/barbara_1_mh6ngs.jpg",
      title: "Barbara Branco",
      desc: "barbara branco",
      price: 199,
    }
  ];

  const blusas = [
    {
      id: "nome6",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672897/trico_4_plg40d.jpg",
      title: "Blusa tricô",
      desc: "blusa em tricô",
      price: 199,
    },
    {
      id: "nome7",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672893/pu_3_iibpi1.jpg",
      title: "Jaqueta Pu",
      desc: "jaqueta ultra leve macia",
      price: 199,
    },
    {
      id: "nome8",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749672891/jaquetaOutonoV_1_fktdvc.jpg",
      title: "Jaqueta Outono",
      desc: "jaqueta Outono",
      price: 199,
    }
  ];

  const calcas = [
    {
      id: "nome9",
      href: 'https://checkout.infinitepay.io/sotfstudio?items=[{"name":"lese+vermelho+P","price":18900,"quantity":1}]&redirect_url=https://mostf.vercel.app/',
      src: "https://res.cloudinary.com/dyiyheyzq/image/upload/v1749679231/trouserBranca_1_xpl4rr.jpg",
      title: "Calça Comfy",
      desc: "calça comfy +",
      price: 199,
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#ffffff] via-[#ffffff] to-[#ffffff] font-sans px-4 sm:px-6 md:px-8 gap-10">
   <>
          <MiniCart />

          <div className="flex flex-col items-center justify-center ...">
            {/* ...rest of your layout */}
          </div>
       
      {/* Your header, hero and other sections here… */}
      <img src="https://res.cloudinary.com/dyiyheyzq/image/upload/v1758517835/mostflogoLarge_mzy4ex.jpg" className="w-full h-full object-cover" />
      <section className="py-12 sm:py-16 px-4 md:px-12 bg-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-10">Nossos Conjuntos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-black gap-6">
          {conjuntos.map(renderProductCard)}
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 md:px-12 bg-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center text-black mb-10">Nossas Jaquetas, Blusas & tal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-black gap-6">
          {blusas.map(renderProductCard)}
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 md:px-12 bg-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center text-black mb-10">Nossas Calças</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-black gap-6">
          {calcas.map(renderProductCard)}
        </div>
      </section>
  </>
      {/* ...Footer remains the same */}
    </div>
  );
}
