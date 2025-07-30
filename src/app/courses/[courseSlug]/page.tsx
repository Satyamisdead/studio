
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { courses } from '@/lib/courses';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, Star, Clock, PlayCircle } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { courseSlug: string } }) {
  const course = courses.find(c => c.slug === params.courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      {/* Header Section */}
      <header className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8 shadow-2xl">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover z-0"
          data-ai-hint={course.hint}
        />
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-headline mb-4">
            {course.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
            {course.description}
          </p>
          <Button size="lg">
            <PlayCircle className="mr-2" />
            Start Course
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: About and Lessons */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About this course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{course.longDescription}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {course.lessons.map((lesson, index) => (
                  <AccordionItem value={`item-${index}`} key={lesson.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-4">
                         <PlayCircle className="h-5 w-5 text-primary" />
                         <span>{lesson.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10 space-y-2">
                        <p className="text-muted-foreground">This is a brief description of the lesson content. It will cover key topics and learning objectives.</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Duration: {lesson.duration}</span>
                        </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Certificate and XP */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="text-primary" />
                Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              {course.providesCertificate ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <p className="text-muted-foreground">Certificate of Completion provided.</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No certificate is provided for this course.</p>
              )}
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="text-primary" />
                Experience Points
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center">
                    <Badge variant="secondary" className="text-2xl py-2 px-6">
                        {course.xp} XP
                    </Badge>
                </div>
               <p className="text-center mt-4 text-muted-foreground">Complete the course to earn XP and level up your profile.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
