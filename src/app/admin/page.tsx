
"use client";

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addUser,
  deleteUser,
  updateUser,
  getUsers,
  type AppUser,
  type NewUser,
} from '@/lib/firebase/users';
import {
    addCourse,
    deleteCourse,
    updateCourse,
    getCourses,
    type Course,
    type NewCourseData,
    type Lesson,
} from '@/lib/firebase/courses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';

type Item = AppUser | Course | { id: string, name: string } | { id: string, title: string };

function ManagementSection<T extends Item>({
  title,
  description,
  queryKey,
  queryFn,
  addMutationFn,
  updateMutationFn,
  deleteMutationFn,
  columns,
  renderRow,
  FormComponent,
}: {
  title: string;
  description: string;
  queryKey: string;
  queryFn: () => Promise<T[]>;
  addMutationFn: (item: any) => Promise<any>;
  updateMutationFn: (item: T) => Promise<any>;
  deleteMutationFn: (id: string) => Promise<any>;
  columns: string[];
  renderRow: (item: T) => React.ReactNode;
  FormComponent: React.FC<{
    item?: T;
    onSave: (data: any) => Promise<void>;
    onClose: () => void;
    isLoading: boolean;
  }>;
}) {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);


    const { data, isLoading, isError, error } = useQuery<T[], Error>({
        queryKey: [queryKey],
        queryFn: queryFn,
    });

    const mutationConfig = {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast({ title: "Success", description: `${title.slice(0, -1)} saved successfully.` });
            setFormOpen(false);
            setSelectedItem(undefined);
        },
        onError: (error: Error) => {
            toast({ title: "Error", description: `Failed to save: ${error.message}`, variant: "destructive" });
        },
    };

    const addMutation = useMutation({
        mutationFn: addMutationFn,
        ...mutationConfig,
    });

    const updateMutation = useMutation({
        mutationFn: updateMutationFn,
        ...mutationConfig,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteMutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
            toast({ title: "Deleted", description: "Item deleted successfully." });
            setDeleteDialogOpen(false);
            setItemToDelete(null);
        },
        onError: (error: Error) => {
            toast({ title: "Error", description: `Failed to delete: ${error.message}`, variant: "destructive" });
        },
    });

    const handleSave = async (itemData: any) => {
        if (selectedItem) {
            await updateMutation.mutateAsync({ ...selectedItem, ...itemData });
        } else {
            await addMutation.mutateAsync(itemData);
        }
    };
    
    const handleAddNew = () => {
        setSelectedItem(undefined);
        setFormOpen(true);
    };

    const handleEdit = (item: T) => {
        setSelectedItem(item);
        setFormOpen(true);
    };

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
           await deleteMutation.mutateAsync(itemToDelete);
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <Dialog open={isFormOpen} onOpenChange={setFormOpen}>
                        <DialogTrigger asChild>
                             <Button onClick={handleAddNew}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add New
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>{selectedItem ? 'Edit' : 'Add New'} {title.slice(0, -1)}</DialogTitle>
                            </DialogHeader>
                            <FormComponent
                                item={selectedItem}
                                onSave={handleSave}
                                onClose={() => setFormOpen(false)}
                                isLoading={addMutation.isPending || updateMutation.isPending}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-md">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                {columns.map((col, i) => <TableHead key={i}>{col}</TableHead>)}
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TableRow key={i}>
                                        {columns.map((_, j) => (
                                            <TableCell key={j}><Skeleton className="h-5 w-full" /></TableCell>
                                        ))}
                                         <TableCell><Skeleton className="h-8 w-[72px]" /></TableCell>
                                    </TableRow>
                                ))
                            ) : isError ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} className="text-center text-destructive">
                                        Error loading data: {error.message}
                                    </TableCell>
                                </TableRow>
                            ) : !data || data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} className="text-center">No data found.</TableCell>
                                </TableRow>
                            ) : data.map(item => (
                                <TableRow key={item.id}>
                                    {renderRow(item)}
                                    <TableCell className="space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <AlertDialog open={isDeleteDialogOpen && itemToDelete === item.id} onOpenChange={(open) => !open && setDeleteDialogOpen(false)}>
                                            <AlertDialogTrigger asChild>
                                                 <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(item.id)}>
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the item.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={confirmDelete} disabled={deleteMutation.isPending}>
                                                        {deleteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Delete'}
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

// UserForm Component
const UserForm = ({ item, onSave, onClose, isLoading }: { item?: AppUser, onSave: (data: NewUser) => Promise<void>, onClose: () => void, isLoading: boolean }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        if (item) {
            setFormData({ name: item.name, email: item.email, password: '' });
        } else {
            setFormData({ name: '', email: '', password: '' });
        }
    }, [item]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSave: NewUser = { name: formData.name, email: formData.email };
        if (formData.password && !item) { // Only add password on creation
            dataToSave.password = formData.password;
        }
        await onSave(dataToSave);
    };

    return (
       <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input id="email" type="email" value={formData.email} onChange={handleChange} className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">Password</Label>
                    <Input id="password" type="password" placeholder={item ? 'Leave blank to keep unchanged' : ''} value={formData.password} onChange={handleChange} className="col-span-3" disabled={!!item} />
                </div>
            </div>
            <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>Close</Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                </Button>
            </DialogFooter>
        </form>
    );
};

// CourseForm Component
const CourseForm = ({ item, onSave, onClose, isLoading }: { item?: Course, onSave: (data: NewCourseData) => Promise<void>, onClose: () => void, isLoading: boolean }) => {
    const [formData, setFormData] = useState<Omit<NewCourseData, 'id'>>({
        title: '',
        description: '',
        longDescription: '',
        lessons: [{ title: '', duration: '', videoUrl: '' }],
        xp: 0,
        providesCertificate: false,
    });

    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title,
                description: item.description,
                longDescription: item.longDescription,
                lessons: item.lessons,
                xp: item.xp,
                providesCertificate: item.providesCertificate
            });
        } else {
             setFormData({
                title: '',
                description: '',
                longDescription: '',
                lessons: [{ title: '', duration: '', videoUrl: '' }],
                xp: 0,
                providesCertificate: false,
            });
        }
    }, [item]);

    const handleLessonChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newLessons = [...formData.lessons];
        const field = e.target.id.split('-')[0] as keyof Lesson; // e.g. 'title' from 'title-0'
        (newLessons[index] as any)[field] = e.target.value;
        setFormData(prev => ({ ...prev, lessons: newLessons }));
    };

    const addLesson = () => {
        setFormData(prev => ({ ...prev, lessons: [...prev.lessons, { title: '', duration: '', videoUrl: '' }] }));
    };

    const removeLesson = (index: number) => {
        const newLessons = formData.lessons.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, lessons: newLessons }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Course Title</Label>
                    <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="longDescription">Long Description</Label>
                    <Textarea id="longDescription" value={formData.longDescription} onChange={(e) => setFormData({...formData, longDescription: e.target.value})} rows={5} />
                </div>
                <div className="space-y-2">
                    <Label>Lessons</Label>
                    {formData.lessons.map((lesson, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 border rounded-md relative">
                            <div className="flex-grow space-y-2">
                                <Input id={`title-${index}`} placeholder="Lesson Title" value={lesson.title} onChange={(e) => handleLessonChange(index, e)} />
                                <Input id={`duration-${index}`} placeholder="Duration (e.g., 15m)" value={lesson.duration} onChange={(e) => handleLessonChange(index, e)} />
                                <Input id={`videoUrl-${index}`} placeholder="Video URL" value={lesson.videoUrl || ''} onChange={(e) => handleLessonChange(index, e)} />
                            </div>
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeLesson(index)} className="absolute top-1 right-1">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addLesson}>Add Lesson</Button>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="xp">XP Points</Label>
                    <Input id="xp" type="number" value={formData.xp} onChange={(e) => setFormData({...formData, xp: Number(e.target.value)})} />
                </div>
                 <div className="flex items-center space-x-2">
                    <Input type="checkbox" id="providesCertificate" checked={formData.providesCertificate} onChange={(e) => setFormData({...formData, providesCertificate: e.target.checked})} className="h-4 w-4" />
                    <Label htmlFor="providesCertificate">Provides Certificate</Label>
                </div>
            </div>
             <DialogFooter className="mt-4">
                <Button type="button" variant="outline" onClick={onClose}>Close</Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save Changes'}
                </Button>
            </DialogFooter>
        </form>
    );
};


// AdminDashboardPage is the main component for the admin page
export default function AdminDashboardPage() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">Admin Dashboard</h1>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    <ManagementSection<AppUser>
                        title="Users Management"
                        description="Manage all registered users."
                        queryKey="users"
                        queryFn={getUsers}
                        addMutationFn={(newUser: NewUser) => addUser(newUser)}
                        updateMutationFn={(user: AppUser) => updateUser(user.id, user)}
                        deleteMutationFn={(id: string) => deleteUser(id)}
                        columns={['Name', 'Email', 'Role']}
                        renderRow={(user) => (
                            <>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </>
                        )}
                        FormComponent={UserForm}
                    />
                    <ManagementSection<Course>
                        title="Courses Management"
                        description="Manage all courses."
                        queryKey="courses"
                        queryFn={getCourses}
                        addMutationFn={(newCourse: NewCourseData) => addCourse(newCourse)}
                        updateMutationFn={(course: Course) => updateCourse(course.id, course)}
                        deleteMutationFn={(id: string) => deleteCourse(id)}
                        columns={['Title', 'Description', 'Lessons', 'XP']}
                        renderRow={(course) => (
                            <>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.description}</TableCell>
                                <TableCell>{course.lessons.length}</TableCell>
                                <TableCell>{course.xp}</TableCell>
                            </>
                        )}
                        FormComponent={CourseForm}
                    />
                     <Card>
                        <CardHeader>
                            <CardTitle>Jobs Management</CardTitle>
                            <CardDescription>Manage all job listings.</CardDescription>
                        </CardHeader>
                        <CardContent><p>Job management UI coming soon.</p></CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Business Solutions</CardTitle>
                            <CardDescription>Manage business solutions page.</CardDescription>
                        </CardHeader>
                        <CardContent><p>Business solutions management UI coming soon.</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Home Page Management</CardTitle>
                            <CardDescription>Edit hero section and banners.</CardDescription>
                        </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="heroTitle">Hero Title</Label>
                                <Input id="heroTitle" defaultValue="Unlock Your Potential" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="heroDescription">Hero Description</Label>
                                <Textarea id="heroDescription" defaultValue="Join thousands of learners and professionals on Azoums to master new skills." />
                            </div>
                            <div className="space-y-2">
                                <Label>Banners</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                     <div className="relative aspect-video border rounded-md overflow-hidden">
                                        <Image src="https://placehold.co/1200x400.png" alt="Banner 1" fill className="object-cover" />
                                    </div>
                                    <div className="relative aspect-video border rounded-md overflow-hidden">
                                        <Image src="https://placehold.co/1200x400.png" alt="Banner 2" fill className="object-cover" />
                                    </div>
                                    <Button variant="outline" className="aspect-video w-full h-full flex items-center justify-center">
                                        <PlusCircle className="h-8 w-8 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>
                            <Button>Save Home Page Changes</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Stripe Payment Gateway</CardTitle>
                            <CardDescription>Manage your Stripe API keys. Changes require backend updates.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="pk">Public Key</Label>
                                <Input id="pk" placeholder="pk_live_..." defaultValue={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="sk">Private Key</Label>
                                <Input id="sk" type="password" placeholder="sk_live_..." defaultValue="**************" />
                            </div>
                            <Button>Update Keys</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}

    