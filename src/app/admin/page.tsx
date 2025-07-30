
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
    users: [
        { id: 'usr_1', name: 'Satyam', email: 'satyam@example.com', role: 'Admin' },
        { id: 'usr_2', name: 'Jane Doe', email: 'jane@example.com', role: 'User' },
    ],
    courses: [
        { id: 'crs_1', name: 'Learn AI', category: 'Technology', students: 1500 },
        { id: 'crs_2', name: 'Learn App Development', category: 'Development', students: 1200 },
    ],
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

export default function AdminDashboardPage() {
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
            <div className="text-2xl font-bold">10,234</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
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
        <ManagementSection title="Users Management" data={mockData.users} type="user" />
        <ManagementSection title="Course Management" data={mockData.courses} type="course" />
        <ManagementSection title="Jobs Management" data={mockData.jobs} type="job" />
        <ManagementSection title="Business Management" data={mockData.business} type="business" />
        <StripeManagementSection />
      </div>

    </div>
  )
}

interface ManagementSectionProps {
    title: string;
    data: any[];
    type: 'user' | 'course' | 'job' | 'business';
}

function ManagementSection({ title, data, type }: ManagementSectionProps) {
    const headers = {
        user: ['Name', 'Email', 'Role', 'Actions'],
        course: ['Course Name', 'Category', 'Students', 'Actions'],
        job: ['Job Title', 'Company', 'Status', 'Actions'],
        business: ['Solution Name', 'Status', 'Actions']
    }
    
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState<any>(null);

    const handleEditClick = (item: any) => {
      setSelectedItem(item);
      setIsEditDialogOpen(true);
    }

    const renderRow = (item: any) => {
        switch(type) {
            case 'user': return <><TableCell>{item.name}</TableCell><TableCell>{item.email}</TableCell><TableCell><Badge>{item.role}</Badge></TableCell></>;
            case 'course': return <><TableCell>{item.name}</TableCell><TableCell>{item.category}</TableCell><TableCell>{item.students}</TableCell></>;
            case 'job': return <><TableCell>{item.title}</TableCell><TableCell>{item.company}</TableCell><TableCell><Badge>{item.status}</Badge></TableCell></>;
            case 'business': return <><TableCell>{item.name}</TableCell><TableCell><Badge>{item.status}</Badge></TableCell></>;
        }
    }

    const renderForm = (item?: any) => {
        switch(type) {
            case 'user': return <UserForm user={item} />;
            case 'course': return <CourseForm course={item}/>;
            case 'job': return <JobForm job={item} />;
            case 'business': return <BusinessForm business={item} />;
        }
    }
    
    const typeTitle = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>View, add, edit, or delete entries.</CardDescription>
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                        <DialogTitle>Add New {typeTitle}</DialogTitle>
                        <DialogDescription>
                            Fill in the details below to add a new entry.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           {renderForm()}
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Close</Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            {headers[type].map(h => <TableHead key={h}>{h}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map(item => (
                            <TableRow key={item.id}>
                                {renderRow(item)}
                                <TableCell className="space-x-2">
                                    <Button variant="outline" size="icon" onClick={() => handleEditClick(item)}><Pencil className="h-4 w-4" /></Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
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
                                            <AlertDialogAction className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                  <DialogTitle>Edit {typeTitle}</DialogTitle>
                  <DialogDescription>
                      Update the details for this entry.
                  </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                     {renderForm(selectedItem)}
                  </div>
                  <DialogFooter>
                      <DialogClose asChild>
                          <Button type="button" variant="secondary">Close</Button>
                      </DialogClose>
                      <Button type="submit">Save Changes</Button>
                  </DialogFooter>
              </DialogContent>
          </Dialog>
        </Card>
    );
}

function UserForm({ user }: { user?: any }) {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" defaultValue={user?.name} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" defaultValue={user?.email}/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Leave blank to keep unchanged" />
            </div>
        </>
    );
}

function CourseForm({ course }: { course?: any }) {
    const [lessons, setLessons] = React.useState(course?.lessons || [{ title: '' }]);

    const addLesson = () => setLessons([...lessons, { title: '' }]);
    const removeLesson = (index: number) => {
        if (lessons.length > 1) {
            setLessons(lessons.filter((_, i) => i !== index));
        }
    };
    
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="courseName">Course Name</Label>
                <Input id="courseName" placeholder="e.g., Learn AI" defaultValue={course?.name}/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="courseDescription">Description</Label>
                <Textarea id="courseDescription" placeholder="A comprehensive course about..." defaultValue={course?.description}/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="videoUrl">Intro Video URL</Label>
                <Input id="videoUrl" placeholder="https://example.com/video.mp4" defaultValue={course?.videoUrl}/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bannerImage">Banner Image</Label>
                <Input id="bannerImage" type="file" />
            </div>
            <div className="space-y-2">
                <Label>Lessons</Label>
                {lessons.map((lesson: any, index: number) => (
                     <div key={index} className="flex items-center gap-2">
                       <Input placeholder={`Lesson ${index + 1} Title`} defaultValue={lesson.title} className="flex-grow"/>
                       <Button type="button" variant="destructive" size="icon" onClick={() => removeLesson(index)} disabled={lessons.length === 1}><Trash2 className="h-4 w-4"/></Button>
                    </div>
                ))}
               
                <Button type="button" variant="outline" size="sm" onClick={addLesson}><PlusCircle className="mr-2 h-4 w-4"/>Add Lesson</Button>
            </div>
        </>
    );
}

function JobForm({ job }: { job?: any }) {
    return (
         <>
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
        </>
    )
}

function BusinessForm({ business }: { business?: any}) {
    return (
        <>
            <div className="space-y-2">
                <Label htmlFor="solutionName">Solution Name</Label>
                <Input id="solutionName" placeholder="e.g., Business Solution A" defaultValue={business?.name} />
            </div>
             <div className="space-y-2">
                <Label htmlFor="solutionDescription">Description</Label>
                <Textarea id="solutionDescription" placeholder="Describe the business solution..." defaultValue={business?.description}/>
            </div>
        </>
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
    const [isBannerEditDialogOpen, setIsBannerEditDialogOpen] = React.useState(false);
    const [selectedBanner, setSelectedBanner] = React.useState<any>(null);

    const handleEditClick = (banner: any) => {
        setSelectedBanner(banner);
        setIsBannerEditDialogOpen(true);
    };

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
                <div className="space-y-4 p-4 border rounded-lg">
                    <h3 className="font-semibold">Hero Section</h3>
                    <div className="space-y-2">
                        <Label htmlFor="heroTitle">Hero Title</Label>
                        <Input id="heroTitle" defaultValue={hero.title} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="heroDescription">Hero Description</Label>
                        <Textarea id="heroDescription" defaultValue={hero.description} />
                    </div>
                    <Button size="sm">Save Hero Content</Button>
                </div>

                {/* Banners Section */}
                <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">Banners</h3>
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Banner
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                <DialogTitle>Add New Banner</DialogTitle>
                                </DialogHeader>
                                <BannerForm />
                                 <DialogFooter>
                                    <DialogClose asChild><Button type="button" variant="secondary">Close</Button></DialogClose>
                                    <Button type="submit">Save Changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
                 <Dialog open={isBannerEditDialogOpen} onOpenChange={setIsBannerEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Banner</DialogTitle>
                        </DialogHeader>
                        <BannerForm banner={selectedBanner} />
                         <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="secondary">Close</Button></DialogClose>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}

function BannerForm({ banner }: { banner?: any }) {
    return (
         <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="bannerTitle">Banner Title</Label>
                <Input id="bannerTitle" placeholder="e.g., Unlock Your Potential" defaultValue={banner?.title}/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bannerImage">Banner Image</Label>
                <Input id="bannerImage" type="file" />
                {banner?.image && <img src={banner.image} alt="Current banner" className="mt-2 h-20 w-auto rounded-md" />}
            </div>
        </div>
    )
}

    