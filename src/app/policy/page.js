export default function Policies() {
  return (
    <div className="bg-amber-50 max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Políticas da Loja MOSTF</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Política de Trocas e Devoluções</h2>
        <p className="text-lg text-gray-600 mb-4">
          De acordo com o Código de Defesa do Consumidor (Lei nº 8.078/90), o cliente da loja MOSTF tem o direito de desistir da compra no prazo de até 7 (sete) dias 
          corridos após o recebimento do produto. A peça deve estar em perfeito estado, sem indícios de uso, com etiqueta afixada e na embalagem original.
          
          
        </p>
        <p className='text-lg text-gray-600 mb-4'>Não aceitamos trocas ou devoluções de:</p>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          
          <li>Peças em promoção ou liquidação;</li>
          <li>Produtos com sinais de uso, lavagem ou sem etiqueta.</li>
        </ul>
        <p className="text-lg text-gray-600">
          Para solicitar a troca ou devolução, envie um e-mail para: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ecommercmkssouza@gmail.com&su=Olá&Gostaria=I%20de%20suporte%20nesse%20look%20porfavor" 
          className="text-blue-600">
            ecommercmkssouza@gmail.com</a> com o número do pedido, motivo da solicitação e fotos do produto.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Política de Envio/Entrega</h2>
        <p className="text-lg text-gray-600 mb-4">
          O prazo de envio na loja MOSTF começa a contar após a confirmação do pagamento. O prazo de entrega varia conforme a localidade e o tipo de frete escolhido:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          <li>PAC: 7 a 15 dias úteis;</li>
          <li>SEDEX: 3 a 7 dias úteis.</li>
        </ul>
        <p className="text-lg text-gray-600">
          Após a postagem, o cliente receberá o código de rastreamento por e-mail para acompanhar a entrega. Sempre gravamos o pacote sendo embalado antes do envio, para segurança de
          ambos cliente, e empresa.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Política de Pagamento</h2>
        <p className="text-lg text-gray-600 mb-4">
          Na loja MOSTF, aceitamos os seguintes métodos de pagamento:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-600 mb-4">
          <li>Cartões de crédito (parcelamento em até 3x sem juros);</li>
          <li>PIX (com 5% de desconto);</li>
          <li>Boleto bancário (compensação em até 2 dias úteis).</li>
        </ul>
        <p className="text-lg text-gray-600">
          Todos os pagamentos são processados por meio de plataformas seguras e criptografadas.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Política de Privacidade</h2>
        <p className="text-lg text-gray-600 mb-4">
          A loja MOSTF garante o sigilo dos dados informados no momento da compra. As informações pessoais como nome, endereço e e-mail são utilizadas exclusivamente para processar e entregar o pedido.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          Nosso site possui certificado de segurança SSL, que garante proteção dos dados durante toda a navegação.
        </p>
        <p className="text-lg text-gray-600">
          Não compartilhamos ou vendemos seus dados a terceiros.
        </p>
      </section>
    </div>
  );
}