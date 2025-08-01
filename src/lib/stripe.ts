
import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!publicKey) {
        console.error("Stripe public key is not set in environment variables.");
        // In a real app, you might want to return or throw an error here.
        // For this placeholder, we will proceed, but Stripe.js will fail to load.
        return Promise.resolve(null);
    }
    stripePromise = loadStripe(publicKey);
  }
  return stripePromise;
};
