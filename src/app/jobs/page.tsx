
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { jobs } from "@/lib/jobs";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Star } from "lucide-react";

export default function JobsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="space-y-4 mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Job Board</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Find your next opportunity in the tech industry and earn XP to level up your career.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id} className="flex">
            <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 w-full">
              <CardHeader className="flex flex-row items-start gap-4 p-6">
                 <Image
                    src={job.companyLogo}
                    alt={`${job.company} logo`}
                    width={56}
                    height={56}
                    className="rounded-lg border border-border"
                    data-ai-hint="company logo"
                  />
                  <div className="flex-grow">
                     <CardTitle className="font-headline text-xl mb-1">{job.title}</CardTitle>
                     <CardDescription className="text-base">{job.company}</CardDescription>
                  </div>
              </CardHeader>
              <CardContent className="flex-grow p-6 pt-0 space-y-4">
                <p className="text-muted-foreground line-clamp-3">{job.description}</p>
                 <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="flex items-center gap-1.5">
                        <Star className="h-4 w-4" /> {job.xpRequirement} XP Required
                    </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full">
                    <Briefcase className="mr-2"/> View Job
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
