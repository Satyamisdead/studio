
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
    priceId: "price_1PMb1b...", // Replace with your actual Stripe Price ID
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
      // This is where you would call your backend to create a checkout session.
      // We will simulate this by calling a placeholder API route.
      const res = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, userId: user.uid, userEmail: user.email }),
      });

      if (!res.ok) {
        throw new Error('Failed to create checkout session.');
      }
      
      const { sessionId } = await res.json();
      
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe.js has not loaded yet.");
      }
      
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error(error);
        toast({ title: 'Checkout Error', description: error.message, variant: 'destructive' });
      }

    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Something went wrong.', variant: 'destructive' });
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
