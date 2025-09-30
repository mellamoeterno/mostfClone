// components/MiniCart.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function MiniCart() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  }, [cart]);

  const lastItems = cart.slice(-3).reverse();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-[#b6b6b6ab] text-white px-4 py-2 rounded shadow hover:bg-[#83838386] transition"
      >
        🛒 Carrinho ({cart.length})
        <AnimatePresence>
          {justAdded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -top-6 -right-2 text-xs bg-green-600 px-2 py-1 rounded shadow text-white"
            >
              Adicionado!
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-2 w-72 bg-white border rounded-lg shadow-lg p-4 space-y-3"
          >
            <h4 className="font-semibold text-lg">Últimos Adicionados</h4>
            {lastItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    R$ {parseFloat(item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <Link
              href="/cart"
              className="block w-full text-center mt-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Ir para o Carrinho
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
