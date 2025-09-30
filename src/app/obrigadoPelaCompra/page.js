'use client'
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function ObrigadoPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>Obrigado pela Compra!</title>
        <meta name="description" content="Agradecemos pela sua compra" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          {/* Animated Checkmark */}
          <div className="flex justify-center mb-8">
            <div className={`relative transition-all duration-1000 transform ${
              isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}>
              {/* Checkmark Circle */}
              <div className={`w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg ${
                isVisible ? 'animate-pulse' : ''
              }`}>
                <svg 
                  className={`w-12 h-12 text-white transition-all duration-500 ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              
              {/* Pulsing Ring Effect */}
              <div className={`absolute inset-0 border-4 border-green-300 rounded-full animate-ping ${
                isVisible ? 'opacity-75' : 'opacity-0'
              }`}></div>
            </div>
          </div>

          {/* Main Message */}
          <div className={`text-center transition-all duration-700 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Obrigado Pela Compra!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Agradecemos por escolher nossos produtos. Seu pedido foi processado com sucesso e você receberá uma confirmação em breve.
            </p>

            {/* Additional Info Cards */}
            <div className={`grid gap-4 mb-8 transition-all duration-700 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-2">Próximos Passos</h3>
                <p className="text-sm text-gray-600">
                  Você receberá um e-mail com os detalhes da compra e informações de rastreamento.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-2">Dúvidas?</h3>
                <p className="text-sm text-gray-600">
                  Entre em contato conosco através do suporte@exemplo.com
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Voltar à Loja
              </button>
              
              <button 
                onClick={() => window.location.href = '/pedidos'}
                className="border-2 border-gray-300 hover:border-indigo-500 text-gray-700 hover:text-indigo-600 font-medium py-3 px-6 rounded-lg transition-all duration-300"
              >
                Meus Pedidos
              </button>
            </div>
          </div>

          {/* Floating Elements for Visual Interest */}
          <div className={`absolute bottom-10 left-10 w-8 h-8 bg-yellow-400 rounded-full opacity-20 ${
            isVisible ? 'animate-bounce' : ''
          }`}></div>
          <div className={`absolute top-10 right-10 w-6 h-6 bg-blue-400 rounded-full opacity-20 ${
            isVisible ? 'animate-bounce delay-300' : ''
          }`}></div>
          <div className={`absolute top-20 left-20 w-4 h-4 bg-green-400 rounded-full opacity-20 ${
            isVisible ? 'animate-bounce delay-500' : ''
          }`}></div>
        </div>
      </div>
    </>
  );
}