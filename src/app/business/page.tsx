import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BusinessPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Business Solutions</h1>
        <p className="text-muted-foreground">
          Tools and services to grow your business.
        </p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We are developing innovative solutions for businesses. Stay tuned for updates!</p>
        </CardContent>
      </Card>
    </div>
  );
}
