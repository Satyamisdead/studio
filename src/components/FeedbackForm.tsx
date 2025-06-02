"use client";

import * as React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface FeedbackFormProps {
  onSubmit: (feedback: string) => void;
  isLoading: boolean;
}

export default function FeedbackForm({ onSubmit, isLoading }: FeedbackFormProps) {
  const [feedback, setFeedback] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(feedback);
    setFeedback(""); // Clear feedback after submission
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <MessageSquare className="mr-2 h-6 w-6 text-primary" />
          Provide Feedback
        </CardTitle>
        <CardDescription>
          Help us improve! Let us know what you think about the generated application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="feedback-input" className="sr-only">Your Feedback</Label>
            <Textarea
              id="feedback-input"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="e.g., The styling is great, but I need an API endpoint for..."
              rows={4}
              className="resize-none"
              disabled={isLoading}
              aria-label="Your Feedback"
            />
          </div>
          <Button type="submit" disabled={isLoading || !feedback.trim()} className="w-full">
            {isLoading ? "Submitting..." : "Submit Feedback"}
            {!isLoading && <MessageSquare className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
