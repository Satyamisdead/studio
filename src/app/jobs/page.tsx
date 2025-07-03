import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Job Board</h1>
        <p className="text-muted-foreground">
          Find your next opportunity in the tech industry.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Our job board is under construction. Please check back later for exciting opportunities!</p>
        </CardContent>
      </Card>
    </div>
  );
}
