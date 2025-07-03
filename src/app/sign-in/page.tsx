import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn } from 'lucide-react';

export default function SignInPage() {
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
              Access your account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full">Sign In</Button>
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
