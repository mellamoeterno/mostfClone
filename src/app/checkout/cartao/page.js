// src/app/checkout/cartao/page.jsx
'use client';

import StripeProvider from '@/app/providers/stripeProvider';
import CreditCardForm from '@/app/components/creditCardForm';

export default function CreditCardPage() {
  return (
    <StripeProvider>
      <CreditCardForm />
    </StripeProvider>
  );
}
