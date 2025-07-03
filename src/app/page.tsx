import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const courses = [
  {
    title: "Introduction to AI Development",
    description: "Learn the fundamentals of AI and build your first intelligent application.",
    image: "https://placehold.co/600x400.png",
    hint: "artificial intelligence",
  },
  {
    title: "Advanced Next.js Techniques",
    description: "Master server components, advanced routing, and performance optimization in Next.js.",
    image: "https://placehold.co/600x400.png",
    hint: "web development",
  },
  {
    title: "UI/UX Design for Developers",
    description: "Understand design principles to build beautiful and intuitive user interfaces.",
    image: "https://placehold.co/600x400.png",
    hint: "design interface",
  },
];

export default function CoursesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
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
