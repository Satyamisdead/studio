
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from '@/hooks/use-auth';
import { getStripe } from '@/lib/stripe';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    name: "Free",
    price: "€0",
    features: [
      "Basic Access to Courses",
      "Limited AI Studio Usage",
      "Standard Job Board Access",
      "Community Support",
    ],
    isCurrent: true,
  },
  {
    name: "Pro",
    price: "€1",
    priceId: "price_1PMb1b...", // This should be a real Stripe Price ID from your dashboard
    features: [
      "Full Access to All Courses",
      "Unlimited AI Studio Usage",
      "Priority Job Applications",
      "Expert Rank & Platform Visibility",
      "Dedicated Support",
    ],
    isCurrent: false,
  },
];

export default function UpgradePage() {
  const { user, loading: userLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    setLoading(true);

    try {
      // This calls your placeholder backend to simulate creating a checkout session.
      const res = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, userId: user.uid, userEmail: user.email }),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to create checkout session: ${errorBody}`);
      }
      
      const { sessionId } = await res.json();

      // **CRUCIAL CHECK**: Ensure a valid session ID was returned.
      // This is a common point of failure. If your backend has an error,
      // it might return a null or empty session ID.
      if (!sessionId) {
          throw new Error("Received an empty or invalid session ID from the server.");
      }
      
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe.js has not loaded yet. Check your network connection or Stripe key.");
      }
      
      // Redirect to Stripe's hosted checkout page.
      const { error } = await stripe.redirectToCheckout({ sessionId });

      // This part is only reached if `redirectToCheckout` fails (e.g., network error).
      if (error) {
        console.error("Stripe redirectToCheckout error:", error);
        throw new Error(error.message);
      }

    } catch (error: any) {
      toast({ 
        title: 'Checkout Error', 
        description: error.message || 'Something went wrong. Please try again.', 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Unlock your full potential with the Pro plan and get unlimited access to all our features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={cn(
            "flex flex-col",
            plan.name === 'Pro' && "border-primary shadow-primary/20 shadow-lg"
          )}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-headline">{plan.name}</CardTitle>
              <CardDescription className="text-4xl font-bold text-foreground">{plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span></CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.name === 'Pro' ? (
                <Button 
                  className="w-full" 
                  onClick={() => handleCheckout(plan.priceId!)}
                  disabled={loading || userLoading}
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Zap />}
                  Upgrade to Pro
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>Your Current Plan</Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
