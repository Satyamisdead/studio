
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publicKey) {
        console.error("Stripe public key is not set in environment variables.");
        return Promise.resolve(null);
    }
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
};
