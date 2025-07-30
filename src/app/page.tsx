
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselDots } from "@/components/ui/carousel";
import { getCourses, Course } from "@/lib/firebase/courses";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const banners = [
  {
    title: "Unlock Your Potential",
    description: "Join thousands of learners and professionals on Azoums to master new skills.",
    image: "https://placehold.co/1200x400.png",
    hint: "technology future",
    buttonText: "Explore Courses",
    href: "/",
  },
  {
    title: "Launch Your Dream Career",
    description: "Find the perfect job opportunity in the ever-growing tech industry.",
    image: "https://placehold.co/1200x400.png",
    hint: "job interview professional",
    buttonText: "Browse Jobs",
    href: "/jobs",
  },
  {
    title: "Build with AI",
    description: "Leverage the power of AI to build and deploy applications faster than ever.",
    image: "https://placehold.co/1200x400.png",
    hint: "ai robot development",
    buttonText: "Start Building",
    href: "/ai",
  },
];


function CourseCardSkeleton() {
    return (
        <Card className="flex flex-col overflow-hidden w-full">
            <CardHeader className="p-0">
                <Skeleton className="w-full h-48" />
            </CardHeader>
            <CardContent className="flex-grow p-6 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    )
}

export default function HomePage() {
  const [courses, setCourses] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchCourses = async () => {
        setLoading(true);
        const fetchedCourses = await getCourses();
        setCourses(fetchedCourses);
        setLoading(false);
    }
    fetchCourses();
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Banner Section */}
       <Carousel
        className="w-full rounded-lg overflow-hidden mb-8 shadow-2xl"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <Link href={banner.href}>
                <div className="relative w-full h-64 md:h-80 lg:h-96 cursor-pointer">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover z-0"
                    data-ai-hint={banner.hint}
                  />
                  <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-center p-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-headline mb-4">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
                      {banner.description}
                    </p>
                    <Button size="lg">{banner.buttonText}</Button>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>

      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Expand your skills with our expert-led courses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
             Array.from({ length: 3 }).map((_, i) => <CourseCardSkeleton key={i} />)
        ) : (
            courses.map((course) => (
            <Link href={`/courses/${course.slug}`} key={course.id} className="flex">
                <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 w-full">
                <CardHeader className="p-0">
                    <Image
                    src={course.image}
                    alt={course.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={course.hint}
                    />
                </CardHeader>
                <CardContent className="flex-grow p-6 space-y-2">
                    <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <Button className="w-full">View Course</Button>
                </CardFooter>
                </Card>
            </Link>
            ))
        )}
      </div>
    </div>
  );
}
