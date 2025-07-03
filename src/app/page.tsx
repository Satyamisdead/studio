
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const courses = [
  {
    title: "Learn AI",
    description: "Master the fundamentals of AI and build your first intelligent applications.",
    image: "https://placehold.co/600x400.png",
    hint: "artificial intelligence robot",
  },
  {
    title: "Learn App Development",
    description: "Dive deep into application development with modern frameworks and best practices.",
    image: "https://placehold.co/600x400.png",
    hint: "mobile app code",
  },
  {
    title: "Learn Website Development",
    description: "Build beautiful, responsive, and high-performance websites from scratch.",
    image: "https://placehold.co/600x400.png",
    hint: "website design code",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Banner Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8 shadow-2xl">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Promotional Banner"
          fill
          className="object-cover z-0"
          data-ai-hint="technology future"
        />
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-headline mb-4">
            Unlock Your Potential
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
            Join thousands of learners and professionals on Azoums to master new skills.
          </p>
          <Button size="lg">Explore Courses</Button>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Expand your skills with our expert-led courses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
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
              <Button className="w-full">Enroll Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
