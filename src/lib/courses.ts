
export interface Lesson {
  id: string;
  title: string;
  duration: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  hint: string;
  lessons: Lesson[];
  xp: number;
  providesCertificate: boolean;
}


export const courses: Course[] = [
  {
    id: "1",
    slug: "learn-ai",
    title: "Learn AI",
    description: "Master the fundamentals of AI and build your first intelligent applications.",
    longDescription: "This comprehensive course covers the foundational concepts of Artificial Intelligence, from machine learning algorithms to neural networks. You will gain hands-on experience by building several AI-powered projects. Perfect for beginners and those looking to solidify their understanding of AI.",
    image: "https://placehold.co/600x400.png",
    hint: "artificial intelligence robot",
    xp: 500,
    providesCertificate: true,
    lessons: [
      { id: "l1_1", title: "Introduction to AI", duration: "15m" },
      { id: "l1_2", title: "Understanding Machine Learning", duration: "45m" },
      { id: "l1_3", title: "Deep Learning and Neural Networks", duration: "1h 15m" },
      { id: "l1_4", title: "Your First AI Project: Setup", duration: "30m" },
      { id: "l1_5", title: "Building a Predictive Model", duration: "1h 30m" },
    ],
  },
  {
    id: "2",
    slug: "learn-app-development",
    title: "Learn App Development",
    description: "Dive deep into application development with modern frameworks and best practices.",
    longDescription: "Become a proficient app developer by learning the most popular frameworks and development practices. This course takes you from the basics of UI/UX design to deploying a full-stack mobile application on both iOS and Android platforms.",
    image: "https://placehold.co/600x400.png",
    hint: "mobile app code",
    xp: 450,
    providesCertificate: true,
    lessons: [
      { id: "l2_1", title: "Choosing Your Tech Stack", duration: "20m" },
      { id: "l2_2", title: "UI/UX Fundamentals for Apps", duration: "1h" },
      { id: "l2_3", title: "Building a Frontend with React Native", duration: "2h" },
      { id: "l2_4", title: "Backend and Database Integration", duration: "1h 45m" },
      { id: "l2_5", title: "Deploying to App Stores", duration: "45m" },
    ],
  },
  {
    id: "3",
    slug: "learn-website-development",
    title: "Learn Website Development",
    description: "Build beautiful, responsive, and high-performance websites from scratch.",
    longDescription: "This course is your gateway to becoming a skilled web developer. You'll learn everything from HTML, CSS, and JavaScript fundamentals to advanced concepts in modern frontend frameworks like Next.js and backend technologies like Node.js.",
    image: "https://placehold.co/600x400.png",
    hint: "website design code",
    xp: 400,
    providesCertificate: true,
    lessons: [
      { id: "l3_1", title: "The Building Blocks: HTML & CSS", duration: "1h" },
      { id: "l3_2", title: "Interactive Websites with JavaScript", duration: "1h 30m" },
      { id: "l3_3", title: "Mastering Responsive Design", duration: "1h" },
      { id: "l3_4", title: "Introduction to Next.js", duration: "2h" },
      { id: "l3_5", title: "Deploying Your First Website", duration: "30m" },
    ],
  },
];
