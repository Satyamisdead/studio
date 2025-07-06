
"use client";

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M21.35 11.1H12.18V13.83H18.02C17.58 15.64 16.32 16.95 14.65 16.95C12.45 16.95 10.65 15.15 10.65 12.95C10.65 10.75 12.45 8.95 14.65 8.95C15.76 8.95 16.67 9.38 17.38 10.02L19.34 8.06C17.95 6.83 16.38 6.15 14.65 6.15C11.45 6.15 8.85 8.65 8.85 11.85C8.85 15.05 11.45 17.55 14.65 17.55C17.85 17.55 20.25 15.25 20.25 12.05C20.25 11.45 20.18 10.85 20.08 10.25L21.35 11.1Z" />
    </svg>
);


export default function SignInPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);
  
  if (loading || user) {
    return <LoadingSpinner text="Redirecting..." />;
  }

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <LogIn className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl">Sign In</CardTitle>
            <CardDescription>
              Sign in with Google to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={signInWithGoogle}>
              <GoogleIcon />
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/sign-up" className="font-medium text-primary hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
