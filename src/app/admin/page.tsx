
"use client"

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Users, BookOpen, Briefcase, Building, PlusCircle, Pencil, Trash2, Home } from "lucide-react"
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, addUser, updateUser, deleteUser, AppUser } from '@/lib/firebase/users';
import { getCourses, addCourse, updateCourse, deleteCourse, Course, Lesson } from '@/lib/firebase/courses';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const chartData = [
  { month: "January", users: 186 },
  { month: "February", users: 305 },
  { month: "March", users: 237 },
  { month: "April", users: 173 },
  { month: "May", users: 209 },
  { month: "June", users: 250 },
]

const chartConfig = {
  users: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
}

const mockData = {
    jobs: [
        { id: 'job_1', title: 'Frontend Developer', company: 'Tech Corp', status: 'Open' },
    ],
    business: [
        { id: 'biz_1', name: 'Business Solution A', status: 'Active' },
    ],
    banners: [
      { id: 'ban_1', title: 'Unlock Your Potential', image: 'https://placehold.co/1200x400.png' }
    ],
    hero: {
      title: 'Welcome to Azoums',
      description: 'Your one-stop platform for learning and growth.'
    }
}

const queryClient = new QueryClient();

export default function AdminDashboardPage() {
    return (
        <QueryClientProvider client={queryClient}>
            <AdminDashboardContent />
        </QueryClientProvider>
    )
}

function AdminDashboardContent() {
  const { data: users, isLoading: usersLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers });
  const { data: courses, isLoading: coursesLoading } = useQuery({ queryKey: ['courses'], queryFn: getCourses });
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your platform's users, courses, and more.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {usersLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{users?.length ?? 0}</div>}
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {coursesLoading ? <Skeleton className="h-8 w-1/2" /> : <div className="text-2xl font-bold">{courses?.length ?? 0}</div>}
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.jobs.length}</div>
            <p className="text-xs text-muted-foreground">+3 new jobs this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250,345</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="users" fill="var(--color-users)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Management Sections */}
      <div className="space-y-6">
        <HomePageManagementSection banners={mockData.banners} hero={mockData.hero} />
        <ManagementSection title="Users Management" data={users} isLoading={usersLoading} type="user" />
        <ManagementSection title="Course Management" data={courses} isLoading={coursesLoading} type="course" />
        <ManagementSection title="Jobs Management" data={mockData.jobs} type="job" />
        <ManagementSection title="Business Management" data={mockData.business} type="business" />
        <StripeManagementSection />
      </div>

    </div>
  )
}

interface ManagementSectionProps {
    title: string;
    data: any[] | undefined;
    type: 'user' | 'course' | 'job' | 'business';
    isLoading?: boolean;
}

function ManagementSection({ title, data, type, isLoading }: ManagementSectionProps) {
    const headers = {
        user: ['Name', 'Email', 'Role', 'Actions'],
        course: ['Course Title', 'XP', 'Lessons', 'Actions'],
        job: ['Job Title', 'Company', 'Status', 'Actions'],
        business: ['Solution Name', 'Status', 'Actions']
    }
    
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<any>(null);

    const handleEditClick = (item: any) => {
      setSelectedItem(item);
      setIsFormOpen(true);
    }
    
    const handleAddNewClick = () => {
        setSelectedItem(null);
        setIsFormOpen(true);
    }

    const renderRow = (item: any) => {
        switch(type) {
            case 'user': return <><TableCell>{item.name}</TableCell><TableCell>{item.email}</TableCell><TableCell><Badge>{item.role || 'User'}</Badge></TableCell></>;
            case 'course': return <><TableCell>{item.title}</TableCell><TableCell>{item.xp}</TableCell><TableCell>{item.lessons?.length || 0}</TableCell></>;
            case 'job': return <><TableCell>{item.title}</TableCell><TableCell>{item.company}</TableCell><TableCell><Badge>{item.status}</Badge></TableCell></>;
            case 'business': return <><TableCell>{item.name}</TableCell><TableCell><Badge>{item.status}</Badge></TableCell></>;
        }
    }

    const renderForm = (item?: any) => {
        switch(type) {
            case 'user': return <UserForm currentUser={item} setOpen={setIsFormOpen} />;
            case 'course': return <CourseForm currentCourse={item} setOpen={setIsFormOpen} />;
            case 'job': return <JobForm job={item} setOpen={setIsFormOpen} />;
            case 'business': return <BusinessForm business={item} setOpen={setIsFormOpen} />;
        }
    }
    
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const getDeleteMutation = () => {
        switch(type) {
            case 'user': return useMutation({
                mutationFn: (id: string) => deleteUser(id),
                onSuccess: () => {
                    toast({ title: 'Success', description: 'User deleted successfully.' });
                    queryClient.invalidateQueries({ queryKey: ['users'] });
                },
                onError: (error: Error) => {
                    toast({ title: 'Error', description: error.message, variant: 'destructive' });
                }
            });
            case 'course': return useMutation({
                mutationFn: (id: string) => deleteCourse(id),
                onSuccess: () => {
                    toast({ title: 'Success', description: 'Course deleted successfully.' });
                    queryClient.invalidateQueries({ queryKey: ['courses'] });
                },
                onError: (error: Error) => {
                    toast({ title: 'Error', description: error.message, variant: 'destructive' });
                }
            });
            default: return null;
        }
    }

    const deleteMutation = getDeleteMutation();

    const handleDelete = (id: string) => {
        if (!deleteMutation) return;
        deleteMutation.mutate(id);
    }
    
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>View, add, edit, or delete entries.</CardDescription>
                </div>
                <Button size="sm" onClick={handleAddNewClick}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headers[type].map(h => <TableHead key={h}>{h}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={`skel-${i}`}>
                                    {headers[type].map((h) => <TableCell key={h}><Skeleton className="h-5 w-full" /></TableCell>)}
                                </TableRow>
                            ))
                        ) : data?.map(item => (
                            <TableRow key={item.id}>
                                {renderRow(item)}
                                <TableCell className="space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => handleEditClick(item)} disabled={type === 'job' || type === 'business'}><Pencil className="h-4 w-4" /></Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon" disabled={!deleteMutation || (type === 'job' || type === 'business')}><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete this {type}.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                  <DialogTitle>{selectedItem ? 'Edit' : 'Add New'} {typeTitle}</DialogTitle>
                  <DialogDescription>
                      {selectedItem ? 'Update the details for this entry.' : 'Fill in the details below to add a new entry.'}
                  </DialogDescription>
                  </DialogHeader>
                  {renderForm(selectedItem)}
              </DialogContent>
          </Dialog>
        </Card>
    );
}

function UserForm({ currentUser, setOpen }: { currentUser?: AppUser, setOpen: (open: boolean) => void }) {
    const [name, setName] = React.useState(currentUser?.name || '');
    const [email, setEmail] = React.useState(currentUser?.email || '');
    const [password, setPassword] = React.useState('');
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { mutate: addUserMutation, isPending: isAdding } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users']});
            toast({ title: 'Success', description: 'User added successfully.' });
            setOpen(false);
        },
        onError: (error: Error) => {
            toast({ title: 'Error adding user', description: error.message, variant: 'destructive' });
        }
    });

    const { mutate: updateUserMutation, isPending: isUpdating } = useMutation({
        mutationFn: (userData: Omit<AppUser, 'role'>) => updateUser(userData.id, userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users']});
            toast({ title: 'Success', description: 'User updated successfully.' });
            setOpen(false);
        },
        onError: (error: Error) => {
            toast({ title: 'Error updating user', description: error.message, variant: 'destructive' });
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            toast({ title: 'Error', description: 'Name and email are required.', variant: 'destructive' });
            return;
        }
        
        if (currentUser) {
            updateUserMutation({ id: currentUser.id, name, email });
        } else {
             if (!password) {
                toast({ title: 'Error', description: 'Password is required for new users.', variant: 'destructive' });
                return;
            }
            addUserMutation({ name, email, password });
        }
    };
    
    const isPending = isAdding || isUpdating;
    
    return (
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} disabled={isPending} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isPending} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={currentUser ? "Leave blank to keep unchanged" : "Enter password"} disabled={isPending || !!currentUser} />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary" disabled={isPending}>Close</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
            </DialogFooter>
        </form>
    );
}

function CourseForm({ currentCourse, setOpen }: { currentCourse?: Course, setOpen: (open: boolean) => void }) {
    const [title, setTitle] = React.useState(currentCourse?.title || '');
    const [description, setDescription] = React.useState(currentCourse?.description || '');
    const [longDescription, setLongDescription] = React.useState(currentCourse?.longDescription || '');
    const [xp, setXp] = React.useState(currentCourse?.xp || 0);
    const [lessons, setLessons] = React.useState<Omit<Lesson, 'id'>[]>(currentCourse?.lessons || [{ title: '', duration: '', videoUrl: '' }]);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { mutate: courseMutation, isPending } = useMutation({
        mutationFn: (courseData: any) => currentCourse ? updateCourse(currentCourse.id, courseData) : addCourse(courseData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses']});
            toast({ title: 'Success', description: `Course ${currentCourse ? 'updated' : 'added'} successfully.` });
            setOpen(false);
        },
        onError: (error: Error) => {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const courseData = { title, description, longDescription, xp: Number(xp), providesCertificate: true, lessons };
        courseMutation(courseData);
    };

    const handleLessonChange = (index: number, field: keyof Lesson, value: string) => {
        const newLessons = [...lessons];
        newLessons[index][field] = value;
        setLessons(newLessons);
    }
    const addLesson = () => setLessons([...lessons, { title: '', duration: '', videoUrl: '' }]);
    const removeLesson = (index: number) => {
        if (lessons.length > 1) {
            setLessons(lessons.filter((_, i) => i !== index));
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="courseName">Course Title</Label>
                <Input id="courseName" placeholder="e.g., Learn AI" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isPending} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="courseDescription">Short Description</Label>
                <Textarea id="courseDescription" placeholder="A short, catchy description for the course card." value={description} onChange={(e) => setDescription(e.target.value)} disabled={isPending} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="courseLongDescription">Full Description</Label>
                <Textarea id="courseLongDescription" placeholder="A detailed description for the course page." value={longDescription} onChange={(e) => setLongDescription(e.target.value)} rows={5} disabled={isPending} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="xp">XP Reward</Label>
                <Input id="xp" type="number" placeholder="e.g., 150" value={xp} onChange={(e) => setXp(Number(e.target.value))} disabled={isPending} />
            </div>
            <div className="space-y-2">
                <Label>Lessons</Label>
                {lessons.map((lesson, index) => (
                     <div key={index} className="flex items-end gap-2 p-2 border rounded-md">
                       <div className="flex-grow space-y-2">
                           <Label className="text-xs text-muted-foreground">Lesson {index + 1}</Label>
                           <Input placeholder="Lesson Title" value={lesson.title} onChange={(e) => handleLessonChange(index, 'title', e.target.value)} disabled={isPending} />
                           <Input placeholder="Duration (e.g., 15m)" value={lesson.duration} onChange={(e) => handleLessonChange(index, 'duration', e.target.value)} disabled={isPending} />
                           <Input placeholder="Video URL" value={lesson.videoUrl} onChange={(e) => handleLessonChange(index, 'videoUrl', e.target.value)} disabled={isPending} />
                       </div>
                       <Button type="button" variant="destructive" size="icon" onClick={() => removeLesson(index)} disabled={lessons.length === 1 || isPending}><Trash2 className="h-4 w-4"/></Button>
                    </div>
                ))}
               
                <Button type="button" variant="outline" size="sm" onClick={addLesson} disabled={isPending}><PlusCircle className="mr-2 h-4 w-4"/>Add Lesson</Button>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary" disabled={isPending}>Close</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>{isPending ? 'Saving...' : 'Save Changes'}</Button>
            </DialogFooter>
        </form>
    );
}


function JobForm({ job, setOpen }: { job?: any, setOpen: (open: boolean) => void }) {
    return (
        <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" placeholder="e.g., Frontend Developer" defaultValue={job?.title} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="e.g., Tech Corp" defaultValue={job?.company} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="jobDescription">Description</Label>
                <Textarea id="jobDescription" placeholder="Job responsibilities include..." defaultValue={job?.description} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="payment">Payment/Salary</Label>
                <Input id="payment" placeholder="e.g., $80,000/year" defaultValue={job?.payment} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="xp">XP Reward</Label>
                <Input id="xp" type="number" placeholder="e.g., 150" defaultValue={job?.xp} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="companyLogo">Company Logo</Label>
                <Input id="companyLogo" type="file" />
            </div>
             <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Close</Button>
                </DialogClose>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
        </form>
    )
}

function BusinessForm({ business, setOpen }: { business?: any, setOpen: (open: boolean) => void}) {
    return (
        <form className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="solutionName">Solution Name</Label>
                <Input id="solutionName" placeholder="e.g., Business Solution A" defaultValue={business?.name} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="solutionDescription">Description</Label>
                <Textarea id="solutionDescription" placeholder="Describe the business solution..." defaultValue={business?.description}/>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Close</Button>
                </DialogClose>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
        </form>
    )
}


function StripeManagementSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Stripe Payment Gateway</CardTitle>
                <CardDescription>Manage your Stripe API keys. Changes here require backend updates to take effect.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="pk">Public Key</Label>
                    <Input id="pk" placeholder="pk_live_********************" defaultValue="pk_test_12345" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="sk">Private Key</Label>
                    <Input id="sk" type="password" placeholder="sk_live_********************" defaultValue="sk_test_12345" />
                </div>
                <Button>Update Keys</Button>
            </CardContent>
        </Card>
    );
}

function HomePageManagementSection({ banners, hero }: { banners: any[], hero: any }) {
    const [isBannerFormOpen, setIsBannerFormOpen] = React.useState(false);
    const [selectedBanner, setSelectedBanner] = React.useState<any>(null);

    const handleEditClick = (banner: any) => {
        setSelectedBanner(banner);
        setIsBannerFormOpen(true);
    };

    const handleAddNewClick = () => {
        setSelectedBanner(null);
        setIsBannerFormOpen(true);
    }
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="flex items-center"><Home className="mr-2 h-5 w-5"/>Home Page Management</CardTitle>
                    <CardDescription>Manage banners and hero section content.</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Hero Section */}
                <form className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold">Hero Section</h3>
                    <div className="space-y-2">
                        <Label htmlFor="heroTitle">Hero Title</Label>
                        <Input id="heroTitle" defaultValue={hero.title} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="heroDescription">Hero Description</Label>
                        <Textarea id="heroDescription" defaultValue={hero.description} />
                    </div>
                    <Button size="sm" type="submit">Save Hero Content</Button>
                </form>

                {/* Banners Section */}
                <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Banners</h3>
                         <Button size="sm" onClick={handleAddNewClick}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New Banner
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Banner Title</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {banners.map((banner) => (
                                <TableRow key={banner.id}>
                                    <TableCell>{banner.title}</TableCell>
                                    <TableCell><img src={banner.image} alt={banner.title} className="h-10 w-auto rounded-md" /></TableCell>
                                    <TableCell className="space-x-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEditClick(banner)}><Pencil className="h-4 w-4" /></Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>This will permanently delete this banner.</AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                 <Dialog open={isBannerFormOpen} onOpenChange={setIsBannerFormOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedBanner ? 'Edit' : 'Add New'} Banner</DialogTitle>
                        </DialogHeader>
                        <BannerForm banner={selectedBanner} setOpen={setIsBannerFormOpen} />
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}

function BannerForm({ banner, setOpen }: { banner?: any, setOpen: (open: boolean) => void }) {
    return (
         <form className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="bannerTitle">Banner Title</Label>
                <Input id="bannerTitle" placeholder="e.g., Unlock Your Potential" defaultValue={banner?.title}/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bannerImage">Banner Image</Label>
                <Input id="bannerImage" type="file" />
                {banner?.image && <img src={banner.image} alt="Current banner" className="mt-2 h-20 w-auto rounded-md" />}
            </div>
             <DialogFooter>
                <DialogClose asChild><Button type="button" variant="secondary" onClick={() => setOpen(false)}>Close</Button></DialogClose>
                <Button type="submit">Save Changes</Button>
            </DialogFooter>
        </form>
    )
}

