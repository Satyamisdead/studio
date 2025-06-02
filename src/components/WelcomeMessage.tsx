import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function WelcomeMessage() {
  return (
    <Card className="shadow-lg border-2 border-dashed border-primary/30">
      <CardHeader className="items-center text-center">
        <Rocket className="h-12 w-12 text-primary mb-3" />
        <CardTitle className="font-headline text-2xl">Welcome to Azoums AI WebApp Studio!</CardTitle>
        <CardDescription className="text-lg">
          Ready to build your next web application?
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          Simply describe the application you want to create in the panel on the left,
          and our AI will generate the initial scaffold for you.
        </p>
        <p className="mt-4 text-sm">
          You can then preview the code, download the project, or provide feedback for improvements.
        </p>
      </CardContent>
    </Card>
  );
}
