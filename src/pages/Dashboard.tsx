import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  AlertCircle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Users, 
  FileText,
  TrendingUp,
  UserCheck,
  AlertTriangle,
  ShieldAlert,
  BookOpen,
  FileUp
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

// Import the module components
import AppointmentManagement from '@/components/modules/AppointmentManagement';
import CommunicationModule from '@/components/modules/CommunicationModule';
import ReportsAnalytics from '@/components/modules/ReportsAnalytics';
import SecurityCompliance from '@/components/modules/SecurityCompliance';
import ResourceManagement from '@/components/modules/ResourceManagement';

// Mock data for dashboard
const sessionData = [
  { name: 'Mon', sessions: 12 },
  { name: 'Tue', sessions: 19 },
  { name: 'Wed', sessions: 15 },
  { name: 'Thu', sessions: 22 },
  { name: 'Fri', sessions: 25 },
  { name: 'Sat', sessions: 8 },
  { name: 'Sun', sessions: 5 },
];

const issueTypeData = [
  { name: 'Anxiety', value: 35 },
  { name: 'Depression', value: 25 },
  { name: 'Academic Stress', value: 20 },
  { name: 'Relationship', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const counselorPerformance = [
  { name: 'Dr. Smith', sessions: 45, rating: 4.8, students: 32 },
  { name: 'Dr. Johnson', sessions: 38, rating: 4.6, students: 28 },
  { name: 'Dr. Williams', sessions: 42, rating: 4.9, students: 30 },
  { name: 'Dr. Brown', sessions: 36, rating: 4.7, students: 25 },
];

const upcomingSessions = [
  { id: 1, student: 'Alice Johnson', counselor: 'Dr. Smith', time: '10:00 AM', date: '2025-06-15', status: 'confirmed' },
  { id: 2, student: 'Bob Smith', counselor: 'Dr. Johnson', time: '11:30 AM', date: '2025-06-15', status: 'pending' },
  { id: 3, student: 'Carol Davis', counselor: 'Dr. Williams', time: '2:00 PM', date: '2025-06-15', status: 'confirmed' },
  { id: 4, student: 'David Wilson', counselor: 'Dr. Brown', time: '3:30 PM', date: '2025-06-15', status: 'urgent' },
  { id: 5, student: 'Eva Martinez', counselor: 'Dr. Smith', time: '9:00 AM', date: '2025-06-16', status: 'confirmed' },
];

const recentMessages = [
  { id: 1, from: 'Alice Johnson', message: 'I need to reschedule my appointment', time: '10 min ago', unread: true },
  { id: 2, from: 'Dr. Smith', message: 'Student report for David Wilson submitted', time: '25 min ago', unread: true },
  { id: 3, from: 'System', message: 'Flagged message detected in chat #2458', time: '1 hour ago', unread: false },
  { id: 4, from: 'Bob Smith', message: 'Thank you for the session today', time: '2 hours ago', unread: false },
];

const trendData = [
  { month: 'Jan', sessions: 120, students: 85 },
  { month: 'Feb', sessions: 145, students: 95 },
  { month: 'Mar', sessions: 160, students: 105 },
  { month: 'Apr', sessions: 170, students: 115 },
  { month: 'May', sessions: 185, students: 125 },
  { month: 'Jun', sessions: 200, students: 140 },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const handleAction = (action: string, item?: any) => {
    toast({
      title: `${action} action initiated`,
      description: item ? `For ${item}` : 'Processing your request',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'urgent':
        return <Badge className="bg-red-500">Urgent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Appointments</span>
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>Communication</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <ShieldAlert className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Resources</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Overview Dashboard */}
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">432</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Appointments</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Cases</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground text-red-500">Urgent attention needed</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Weekly Session Overview</CardTitle>
              <CardDescription>
                Number of counseling sessions conducted this week
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Issue Distribution</CardTitle>
              <CardDescription>
                Types of issues addressed in counseling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={issueTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {issueTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Today's scheduled counseling sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between space-x-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{session.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium leading-none">{session.student}</p>
                          <p className="text-sm text-muted-foreground">with {session.counselor}</p>
                          <div className="flex items-center pt-1">
                            <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{session.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(session.status)}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAction('View details', session.student)}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Counselor Performance</CardTitle>
              <CardDescription>
                Session completion and student satisfaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counselorPerformance.map((counselor) => (
                  <div key={counselor.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{counselor.name.split(' ')[1][0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{counselor.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{counselor.sessions} sessions</span>
                        </div>
                        <div className="flex items-center">
                          <UserCheck className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{counselor.students} students</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle2 className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{counselor.rating}/5.0</span>
                        </div>
                      </div>
                    </div>
                    <Progress value={counselor.rating * 20} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>
                Latest communications in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[250px]">
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>{message.from.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">{message.from}</p>
                          <div className="flex items-center">
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                            {message.unread && (
                              <span className="ml-2 h-2 w-2 rounded-full bg-primary"></span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="pt-4">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleAction('View all messages')}
                >
                  View All Messages
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Engagement Trends</CardTitle>
              <CardDescription>
                Session and student engagement over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sessions" stroke="hsl(var(--chart-1))" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="students" stroke="hsl(var(--chart-2))" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Appointment Management Tab */}
      <TabsContent value="appointments">
        <AppointmentManagement />
      </TabsContent>

      {/* Communication Module Tab */}
      <TabsContent value="communication">
        <CommunicationModule />
      </TabsContent>

      {/* Reports & Analytics Tab */}
      <TabsContent value="reports">
        <ReportsAnalytics />
      </TabsContent>

      {/* Security & Compliance Tab */}
      <TabsContent value="security">
        <SecurityCompliance />
      </TabsContent>

      {/* Resource Management Tab */}
      <TabsContent value="resources">
        <ResourceManagement />
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;