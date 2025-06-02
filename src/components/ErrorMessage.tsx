import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export default function ErrorMessage({ title = "An Error Occurred", message }: ErrorMessageProps) {
  return (
    <Alert variant="destructive" className="shadow-md">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="font-headline">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
