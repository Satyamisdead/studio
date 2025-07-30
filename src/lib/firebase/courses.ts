
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, getDoc, limit } from "firebase/firestore";

// Structure for a single lesson within a course
export interface Lesson {
  title: string;
  duration: string;
  videoUrl: string; // Added video URL
}

// Main course structure
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

// Data needed to create a new course (id, slug, image, hint are auto-generated)
export type NewCourseData = Omit<Course, 'id' | 'slug' | 'image' | 'hint'>;

// Slugify function to create a URL-friendly slug from a title
const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

// --- Firestore Service Functions ---

// Add a new course to Firestore
export const addCourse = async (courseData: NewCourseData): Promise<Course> => {
    try {
        const newSlug = slugify(courseData.title);
        // In a real app, you would handle image uploads here and get a URL
        const imageUrl = "https://placehold.co/600x400.png";
        const imageHint = "online course";

        const docRef = await addDoc(collection(db, "courses"), {
            ...courseData,
            slug: newSlug,
            image: imageUrl,
            hint: imageHint,
        });
        return { 
            id: docRef.id, 
            slug: newSlug,
            image: imageUrl,
            hint: imageHint,
            ...courseData 
        };
    } catch (e: any) {
        console.error("Error adding course: ", e);
        throw new Error("Failed to add course: " + e.message);
    }
}

// Update an existing course in Firestore
export const updateCourse = async (courseId: string, courseData: Partial<NewCourseData>): Promise<void> => {
    try {
        const courseRef = doc(db, "courses", courseId);
        const updateData: any = { ...courseData };

        // If title is updated, slug should be updated too
        if (courseData.title) {
            updateData.slug = slugify(courseData.title);
        }

        await updateDoc(courseRef, updateData);
    } catch (e: any) {
        console.error("Error updating course: ", e);
        throw new Error("Failed to update course: " + e.message);
    }
};

// Delete a course from Firestore
export const deleteCourse = async (courseId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "courses", courseId));
    } catch (e: any) {
        console.error("Error deleting course: ", e);
        throw new Error("Failed to delete course: " + e.message);
    }
}

// Fetch all courses from Firestore
export const getCourses = async (): Promise<Course[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const courses: Course[] = [];
        querySnapshot.forEach((doc) => {
            courses.push({ id: doc.id, ...doc.data() } as Course);
        });
        return courses;
    } catch(e: any) {
        console.error("Error fetching courses:", e);
        throw new Error("Failed to fetch courses: " + e.message);
    }
};


// Fetch a single course by its slug
export const getCourseBySlug = async (slug: string): Promise<Course | null> => {
    try {
        const q = query(collection(db, "courses"), where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`No course found with slug: ${slug}`);
            return null;
        }
        
        const courseDoc = querySnapshot.docs[0];
        return { id: courseDoc.id, ...courseDoc.data() } as Course;

    } catch (e: any) {
        console.error("Error fetching course by slug:", e);
        throw new Error("Failed to fetch course: " + e.message);
    }
}
