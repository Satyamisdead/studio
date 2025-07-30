
"use client"

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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Users, BookOpen, Briefcase, Building, PlusCircle, Pencil, Trash2 } from "lucide-react"

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
    ]
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
      
      {/* Management Sections in Tabs */}
      <div className="space-y-6">
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

    const renderRow = (item: any) => {
        switch(type) {
            case 'user': return <><TableCell>{item.name}</TableCell><TableCell>{item.email}</TableCell><TableCell><Badge>{item.role}</Badge></TableCell></>;
            case 'course': return <><TableCell>{item.name}</TableCell><TableCell>{item.category}</TableCell><TableCell>{item.students}</TableCell></>;
            case 'job': return <><TableCell>{item.title}</TableCell><TableCell>{item.company}</TableCell><TableCell><Badge>{item.status}</Badge></TableCell></>;
            case 'business': return <><TableCell>{item.name}</TableCell><TableCell><Badge>{item.status}</Badge></TableCell></>;
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>View, add, edit, or delete entries.</CardDescription>
                </div>
                <Button size="sm">
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
                        {data.map(item => (
                            <TableRow key={item.id}>
                                {renderRow(item)}
                                <TableCell className="space-x-2">
                                    <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function StripeManagementSection() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Stripe Payment Gateway</CardTitle>
                <CardDescription>Manage your Stripe API keys.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Public Key</label>
                    <p className="text-sm p-2 bg-muted rounded-md font-mono">pk_live_********************</p>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Private Key</label>
                    <p className="text-sm p-2 bg-muted rounded-md font-mono">sk_live_********************</p>
                </div>
                <Button>Update Keys</Button>
            </CardContent>
        </Card>
    );
}
