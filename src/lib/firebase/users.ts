
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, onSnapshot, doc, updateDoc, deleteDoc, query } from "firebase/firestore";

// This is a simplified user structure for the admin panel.
// Note: This does not handle Firebase Auth users, only user data in Firestore.
// A real application would need to sync these or use Cloud Functions.
export interface AppUser {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'User';
}

// A simplified type for adding a new user, password is used for creation only.
export type NewUser = Omit<AppUser, 'id' | 'role'> & { password?: string };

// This is a placeholder function. In a real app, you would use a Cloud Function
// to create a user in Firebase Auth and then add their details to Firestore.
// For now, we will just add the user to Firestore.
export const addUser = async (userData: NewUser): Promise<AppUser> => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            name: userData.name,
            email: userData.email,
            role: 'User' // Default role
        });
        return { id: docRef.id, ...userData, role: 'User' };
    } catch (e: any) {
        console.error("Error adding document: ", e);
        throw new Error("Failed to add user: " + e.message);
    }
}

export const updateUser = async (userId: string, userData: Partial<NewUser>): Promise<void> => {
    try {
        const userRef = doc(db, "users", userId);
        const updateData: any = { ...userData };
        delete updateData.password; // Do not store password in Firestore
        await updateDoc(userRef, updateData);
    } catch (e: any) {
        console.error("Error updating document: ", e);
        throw new Error("Failed to update user: " + e.message);
    }
};

export const deleteUser = async (userId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, "users", userId));
    } catch (e: any) {
        console.error("Error deleting document: ", e);
        throw new Error("Failed to delete user: " + e.message);
    }
}

// getUsers now uses onSnapshot for real-time updates
export const getUsers = (callback: (users: AppUser[]) => void): () => void => {
    const q = query(collection(db, "users"));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users: AppUser[] = [];
        querySnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() } as AppUser);
        });
        callback(users);
    }, (error) => {
        console.error("Error getting users in real-time: ", error);
        // In a real app, you might want to show a toast or error message to the user
    });

    return unsubscribe; // Return the unsubscribe function to clean up the listener
};
