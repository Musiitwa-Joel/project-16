import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  FileText, 
  Download, 
  Filter, 
  Calendar, 
  BarChart3, 
  PieChart as PieChartIcon, 
  LineChart as LineChartIcon, 
  Users, 
  Brain, 
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  FileDown,
  Share2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for charts
const sessionsByDayData = [
  { day: 'Mon', count: 15 },
  { day: 'Tue', count: 22 },
  { day: 'Wed', count: 18 },
  { day: 'Thu', count: 25 },
  { day: 'Fri', count: 20 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 5 },
];

const issueTypeData = [
  { name: 'Anxiety', value: 35 },
  { name: 'Depression', value: 25 },
  { name: 'Academic Stress', value: 20 },
  { name: 'Relationship', value: 15 },
  { name: 'Other', value: 5 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

const monthlyTrendsData = [
  { month: 'Jan', sessions: 120, students: 85 },
  { month: 'Feb', sessions: 145, students: 95 },
  { month: 'Mar', sessions: 160, students: 105 },
  { month: 'Apr', sessions: 170, students: 115 },
  { month: 'May', sessions: 185, students: 125 },
  { month: 'Jun', sessions: 200, students: 140 },
];

const counselorPerformanceData = [
  { name: 'Dr. Smith', sessions: 45, rating: 4.8, students: 32 },
  { name: 'Dr. Johnson', sessions: 38, rating: 4.6, students: 28 },
  { name: 'Dr. Williams', sessions: 42, rating: 4.9, students: 30 },
  { name: 'Dr. Brown', sessions: 36, rating: 4.7, students: 25 },
  { name: 'Dr. Garcia', sessions: 30, rating: 4.5, students: 22 },
];

const studentEngagementData = [
  { program: 'Psychology', engagement: 85 },
  { program: 'Engineering', engagement: 65 },
  { program: 'Business', engagement: 72 },
  { program: 'Medicine', engagement: 78 },
  { program: 'Arts', engagement: 70 },
  { program: 'Computer Science', engagement: 68 },
  { program: 'Education', engagement: 75 },
];

// Mock data for at-risk students
const atRiskStudentsData = [
  { 
    id: 1, 
    name: 'David Wilson', 
    program: 'Medicine', 
    year: 'Senior', 
    riskLevel: 'high', 
    riskScore: 85,
    indicators: ['Missed 3 sessions', 'Reported severe depression', 'Academic performance decline'],
    lastContact: '2 days ago'
  },
  { 
    id: 2, 
    name: 'Eva Martinez', 
    program: 'Psychology', 
    year: 'Junior', 
    riskLevel: 'medium', 
    riskScore: 65,
    indicators: ['Anxiety symptoms', 'Recent relationship issues'],
    lastContact: '1 week ago'
  },
  { 
    id: 3, 
    name: 'Frank Thomas', 
    program: 'Engineering', 
    year: 'Freshman', 
    riskLevel: 'medium', 
    riskScore: 60,
    indicators: ['Adjustment difficulties', 'Homesickness', 'Sleep issues'],
    lastContact: '3 days ago'
  },
  { 
    id: 4, 
    name: 'Grace Lee', 
    program: 'Business', 
    year: 'Senior', 
    riskLevel: 'high', 
    riskScore: 78,
    indicators: ['Suicidal ideation mentioned', 'Isolation from peers'],
    lastContact: '1 day ago'
  },
  { 
    id: 5, 
    name: 'Henry Garcia', 
    program: 'Computer Science', 
    year: 'Sophomore', 
    riskLevel: 'low', 
    riskScore: 45,
    indicators: ['Mild stress symptoms', 'Academic pressure'],
    lastContact: '5 days ago'
  },
];

// Mock data for generated reports
const savedReportsData = [
  { 
    id: 1, 
    title: 'Monthly Counseling Summary - May 2025', 
    type: 'Monthly Summary', 
    created: '2025-06-01', 
    createdBy: 'Admin',
    format: 'PDF'
  },
  { 
    id: 2, 
    title: 'Counselor Performance Q2 2025', 
    type: 'Performance Analysis', 
    created: '2025-05-15', 
    createdBy: 'Admin',
    format: 'Excel'
  },
  { 
    id: 3, 
    title: 'Student Engagement by Program', 
    type: 'Engagement Report', 
    created: '2025-05-10', 
    createdBy: 'System',
    format: 'PDF'
  },
  { 
    id: 4, 
    title: 'At-Risk Students Analysis', 
    type: 'Risk Assessment', 
    created: '2025-05-05', 
    createdBy: 'Admin',
    format: 'PDF'
  },
  { 
    id: 5, 
    title: 'Issue Type Distribution 2025', 
    type: 'Issue Analysis', 
    created: '2025-04-30', 
    createdBy: 'System',
    format: 'CSV'
  },
];

const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('session-summary');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: `${reportType} report has been exported as ${exportFormat.toUpperCase()}`,
    });
    setIsExportDialogOpen(false);
  };

  const handleViewReport = (reportId: number) => {
    toast({
      title: "Opening Report",
      description: `Opening report #${reportId}`,
    });
  };

  const handleDownloadReport = (reportId: number) => {
    toast({
      title: "Downloading Report",
      description: `Report #${reportId} is being downloaded`,
    });
  };

  const handleContactStudent = (studentId: number) => {
    toast({
      title: "Contact Initiated",
      description: `Contacting student #${studentId}`,
    });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
          <TabsTrigger value="risk-analysis" className="flex items-center gap-1">
            <Brain className="h-4 w-4" />
            <span>AI Risk Analysis</span>
          </TabsTrigger>
        </TabsList>

        {/* Analytics Dashboard Tab */}
        <TabsContent value="dashboard">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <div className="flex items-center gap-2">
              <Select defaultValue={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="year-to-date">Year to Date</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Export Analytics</DialogTitle>
                    <DialogDescription>
                      Choose the report type and format to export
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <label htmlFor="report-type" className="text-sm font-medium">Report Type</label>
                      <Select defaultValue={reportType} onValueChange={setReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="session-summary">Session Summary</SelectItem>
                          <SelectItem value="counselor-performance">Counselor Performance</SelectItem>
                          <SelectItem value="student-engagement">Student Engagement</SelectItem>
                          <SelectItem value="issue-distribution">Issue Distribution</SelectItem>
                          <SelectItem value="complete-analytics">Complete Analytics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="export-format" className="text-sm font-medium">Export Format</label>
                      <Select defaultValue={exportFormat} onValueChange={setExportFormat}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleExportReport}>Export</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>12% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">
                  <Users className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>5% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52 min</div>
                <div className="flex items-center text-xs text-red-500">
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                  <span>3% from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
                <div className="h-4 w-4 text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="flex items-center text-xs text-green-500">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  <span>2% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Monthly Trends</CardTitle>
                <CardDescription>
                  Session and student engagement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Area type="monotone" dataKey="sessions" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="students" stackId="2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} />
                  </AreaChart>
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
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Counselor Performance</CardTitle>
                <CardDescription>
                  Session completion and student satisfaction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={counselorPerformanceData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="sessions" name="Sessions" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="students" name="Students" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Engagement by Program</CardTitle>
                <CardDescription>
                  Engagement levels across different academic programs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={studentEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="program" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="engagement" name="Engagement %" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Sessions by Day of Week</CardTitle>
                <CardDescription>
                  Distribution of counseling sessions across weekdays
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sessionsByDayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="count" name="Sessions" fill="hsl(var(--chart-4))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>
                  AI-generated insights from your counseling data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Peak Session Times</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Most counseling sessions occur between 2PM and 4PM. Consider adding more counselors during these hours to reduce wait times.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Anxiety Trend</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Anxiety-related sessions have increased by 15% this month, particularly among Engineering students. Consider targeted workshops for this group.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Counselor Specialization</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Dr. Smith has the highest satisfaction rating for depression-related sessions. Consider routing more of these cases to her.
                      </p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <h3 className="font-medium">Follow-up Impact</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Students who receive follow-up messages within 48 hours of their session are 30% more likely to schedule another appointment.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Report Generation</CardTitle>
                  <CardDescription>
                    Create and manage counseling reports
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-4">Generate New Report</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select defaultValue="session-summary">
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="session-summary">Session Summary</SelectItem>
                        <SelectItem value="counselor-performance">Counselor Performance</SelectItem>
                        <SelectItem value="student-engagement">Student Engagement</SelectItem>
                        <SelectItem value="issue-distribution">Issue Distribution</SelectItem>
                        <SelectItem value="risk-assessment">Risk Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date Range</label>
                    <Select defaultValue="last-30-days">
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                        <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                        <SelectItem value="year-to-date">Year to Date</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Include Data</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="include-charts" className="rounded" defaultChecked />
                        <label htmlFor="include-charts" className="text-sm">Charts and Graphs</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="include-tables" className="rounded" defaultChecked />
                        <label htmlFor="include-tables" className="text-sm">Data Tables</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="include-insights" className="rounded" defaultChecked />
                        <label htmlFor="include-insights" className="text-sm">AI Insights</label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Export Format</label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <FileDown className="h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Saved Reports</h3>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Report Title</th>
                        <th className="p-3 text-left font-medium">Type</th>
                        <th className="p-3 text-left font-medium">Created</th>
                        <th className="p-3 text-left font-medium">Created By</th>
                        <th className="p-3 text-left font-medium">Format</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedReportsData.map((report) => (
                        <tr key={report.id} className="border-b">
                          <td className="p-3 font-medium">{report.title}</td>
                          <td className="p-3">{report.type}</td>
                          <td className="p-3">{new Date(report.created).toLocaleDateString()}</td>
                          <td className="p-3">{report.createdBy}</td>
                          <td className="p-3">
                            <Badge variant="outline">{report.format}</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewReport(report.id)}
                              >
                                View
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDownloadReport(report.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Risk Analysis Tab */}
        <TabsContent value="risk-analysis">
          <Card>
            <CardHeader>
              <CardTitle>AI Risk Analysis</CardTitle>
              <CardDescription>
                AI-powered identification of students who may need urgent attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Risk Assessment Dashboard</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Export List
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-left font-medium">Student</th>
                        <th className="p-3 text-left font-medium">Program</th>
                        <th className="p-3 text-left font-medium">Risk Level</th>
                        <th className="p-3 text-left font-medium">Risk Score</th>
                        <th className="p-3 text-left font-medium">Last Contact</th>
                        <th className="p-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {atRiskStudentsData.map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.year}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">{student.program}</td>
                          <td className="p-3">
                            <Badge className={
                              student.riskLevel === 'high' 
                                ? 'bg-red-500' 
                                : student.riskLevel === 'medium'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                            }>
                              {student.riskLevel === 'high' 
                                ? 'High' 
                                : student.riskLevel === 'medium'
                                  ? 'Medium'
                                  : 'Low'
                              }
                            </Badge>
                          </td>
                          <td className="p-3">{student.riskScore}/100</td>
                          <td className="p-3">{student.lastContact}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleContactStudent(student.id)}
                              >
                                Contact
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                              >
                                View Details
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Risk Indicators</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Missed appointments</span>
                          <span className="text-sm font-medium">32 students</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Depression symptoms</span>
                          <span className="text-sm font-medium">28 students</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Academic decline</span>
                          <span className="text-sm font-medium">24 students</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Suicidal ideation</span>
                          <span className="text-sm font-medium">5 students</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Social isolation</span>
                          <span className="text-sm font-medium">18 students</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Risk Distribution by Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={[
                          { program: 'Medicine', high: 8, medium: 15, low: 25 },
                          { program: 'Engineering', high: 5, medium: 20, low: 30 },
                          { program: 'Business', high: 3, medium: 12, low: 22 },
                          { program: 'Arts', high: 4, medium: 10, low: 18 },
                          { program: 'CS', high: 6, medium: 14, low: 20 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="program" />
                          <YAxis />
                          <RechartsTooltip />
                          <Legend />
                          <Bar dataKey="high" name="High Risk" stackId="a" fill="#ef4444" />
                          <Bar dataKey="medium" name="Medium Risk" stackId="a" fill="#eab308" />
                          <Bar dataKey="low" name="Low Risk" stackId="a" fill="#22c55e" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Student Risk Details</h3>
                  {atRiskStudentsData.length > 0 && (
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarFallback>{atRiskStudentsData[0].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{atRiskStudentsData[0].name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {atRiskStudentsData[0].program} • {atRiskStudentsData[0].year}
                          </p>
                        </div>
                        <Badge className="ml-auto bg-red-500">High Risk</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2">Risk Indicators</h5>
                          <ul className="space-y-1">
                            {atRiskStudentsData[0].indicators.map((indicator, index) => (
                              <li key={index} className="text-sm flex items-center gap-2">
                                <AlertTriangle className="h-3 w-3 text-red-500" />
                                {indicator}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2">AI Recommendations</h5>
                          <ul className="space-y-1">
                            <li className="text-sm flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              Schedule urgent counseling session
                            </li>
                            <li className="text-sm flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              Conduct depression assessment
                            </li>
                            <li className="text-sm flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-500" />
                              Connect with academic advisor
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">View Full Profile</Button>
                        <Button>Contact Student</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;