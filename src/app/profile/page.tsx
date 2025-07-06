
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Award, ArrowUpCircle } from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import LoadingSpinner from '@/components/LoadingSpinner';

// Mock data for ranks
const rankDetails = {
    Beginner: { nextRank: "Intermediate", xpThreshold: 100 },
    Intermediate: { nextRank: "Advanced", xpThreshold: 200 },
    Advanced: { nextRank: "Expert", xpThreshold: 500 },
    Expert: { nextRank: null, xpThreshold: 1000 },
};

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    // Mock data for the user profile - will be enhanced with real data later
    const userProfileData = {
        rank: "Intermediate",
        currentXp: 120,
        xpForNextRank: 200,
        subscription: "Free Plan",
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/sign-in');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <LoadingSpinner text="Loading profile..." />;
    }

    const progressPercentage = (userProfileData.currentXp / userProfileData.xpForNextRank) * 100;

    return (
        <div className="container mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex flex-col items-center space-y-8">
                <Card className="w-full max-w-2xl shadow-2xl">
                    <CardHeader className="text-center items-center">
                        <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                            <AvatarImage src={user.photoURL || "https://placehold.co/128x128.png"} alt={user.displayName || "User"} data-ai-hint="person portrait" />
                            <AvatarFallback>
                                <User className="w-12 h-12" />
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle className="font-headline text-3xl">{user.displayName || "User Name"}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Subscription Section */}
                        <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">Subscription</h3>
                                <p className="text-muted-foreground">{userProfileData.subscription}</p>
                            </div>
                            <Button>
                                <ArrowUpCircle className="mr-2 h-5 w-5" />
                                Upgrade to Pro
                            </Button>
                        </div>

                        {/* Ranking / XP System Section */}
                        <div className="space-y-4">
                            <h3 className="font-headline text-xl font-semibold text-center">Your Rank</h3>
                            <div className="flex justify-center">
                                <Badge variant="secondary" className="text-lg py-1 px-4 flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    {userProfileData.rank}
                                </Badge>
                            </div>
                            
                            <div className="w-full pt-2">
                                <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                                    <span>{userProfileData.currentXp} XP</span>
                                    {rankDetails[userProfileData.rank as keyof typeof rankDetails].nextRank && (
                                        <span>
                                            {userProfileData.xpForNextRank} XP to {rankDetails[userProfileData.rank as keyof typeof rankDetails].nextRank}
                                        </span>
                                    )}
                                </div>
                                <Progress value={progressPercentage} className="h-3" />
                            </div>
                        </div>

                        {/* How to progress section */}
                        <div className="text-center p-4 border-t border-border/40">
                             <h4 className="font-semibold mb-2">How to Rank Up</h4>
                             <p className="text-sm text-muted-foreground">
                                Complete courses, finish jobs, and use Azoums AI daily to earn XP and unlock new ranks for greater visibility on the platform.
                             </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
