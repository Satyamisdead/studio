
"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { jobs } from '@/lib/jobs';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Star, Building, ExternalLink, ShieldAlert } from 'lucide-react';
import LoadingSpinner from '@/components/LoadingSpinner';

// Mock data for user profile - enhance later
const userProfileData = {
    rank: "Intermediate",
    currentXp: 120,
};

export default function JobDetailPage({ params }: { params: { jobId: string } }) {
  const { user, loading: authLoading } = useAuth();
  const job = jobs.find(j => j.id === params.jobId);

  if (!job) {
    notFound();
  }

  if (authLoading) {
      return <LoadingSpinner text="Loading job details..." />
  }

  const hasEnoughXp = userProfileData.currentXp >= job.xpRequirement;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
                 <CardHeader className="flex flex-col md:flex-row items-start gap-6 p-6">
                    <Image
                        src={job.companyLogo}
                        alt={`${job.company} logo`}
                        width={80}
                        height={80}
                        className="rounded-xl border-2 border-border"
                        data-ai-hint="company logo"
                    />
                    <div className="flex-grow">
                        <Badge variant="outline" className="mb-2">{job.type}</Badge>
                        <CardTitle className="font-headline text-3xl mb-1">{job.title}</CardTitle>
                        <div className="flex items-center gap-2 text-lg text-muted-foreground">
                            <Building className="h-5 w-5" />
                            <span>{job.company}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                    <h3 className="font-headline text-xl mb-4">Job Description</h3>
                    <div 
                        className="prose prose-invert max-w-none text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: job.fullDescription }}
                    />
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Apply Card */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-lg sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase />
                Apply Now
              </CardTitle>
              <CardDescription>Ready to take the next step in your career?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <span className="font-semibold">XP Required</span>
                  <Badge variant="secondary" className="text-lg flex items-center gap-1.5 py-1 px-3">
                      <Star className="h-4 w-4 text-amber-400" /> {job.xpRequirement}
                  </Badge>
              </div>
               <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                  <span className="font-semibold">Your Current XP</span>
                   <Badge variant={hasEnoughXp ? "default" : "destructive"} className="text-lg flex items-center gap-1.5 py-1 px-3">
                     {userProfileData.currentXp}
                  </Badge>
              </div>

              {!hasEnoughXp && (
                  <div className="flex items-start gap-3 p-3 rounded-md border border-destructive/50 bg-destructive/10 text-destructive">
                      <ShieldAlert className="h-5 w-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">You do not have enough XP to apply for this job. Complete more courses to increase your XP.</p>
                  </div>
              )}
             
              <Button size="lg" className="w-full" disabled={!hasEnoughXp}>
                  <ExternalLink className="mr-2" />
                  Apply on Company Site
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
