import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Edit, 
  FileText, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Trash2, 
  UserPlus, 
  X,
  CheckCircle2,
  AlertTriangle,
  Clock4
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for appointments
const appointments = [
  { 
    id: 1, 
    student: 'Alice Johnson', 
    studentId: 'STU001',
    counselor: 'Dr. Smith', 
    counselorId: 'COU001',
    date: '2025-06-15', 
    time: '10:00 AM', 
    duration: 60,
    type: 'Individual',
    status: 'confirmed',
    notes: 'Follow-up session on academic stress management',
    history: [
      { date: '2025-05-20', counselor: 'Dr. Smith', notes: 'Initial assessment completed' },
      { date: '2025-06-01', counselor: 'Dr. Smith', notes: 'Discussed coping strategies' }
    ]
  },
  { 
    id: 2, 
    student: 'Bob Smith', 
    studentId: 'STU002',
    counselor: 'Dr. Johnson', 
    counselorId: 'COU002',
    date: '2025-06-15', 
    time: '11:30 AM', 
    duration: 45,
    type: 'Individual',
    status: 'pending',
    notes: 'First session - anxiety assessment',
    history: []
  },
  { 
    id: 3, 
    student: 'Carol Davis', 
    studentId: 'STU003',
    counselor: 'Dr. Williams', 
    counselorId: 'COU003',
    date: '2025-06-15', 
    time: '2:00 PM', 
    duration: 60,
    type: 'Group',
    status: 'confirmed',
    notes: 'Group therapy session - social anxiety',
    history: [
      { date: '2025-05-15', counselor: 'Dr. Williams', notes: 'Group introduction session' }
    ]
  },
  { 
    id: 4, 
    student: 'David Wilson', 
    studentId: 'STU004',
    counselor: 'Dr. Brown', 
    counselorId: 'COU004',
    date: '2025-06-15', 
    time: '3:30 PM', 
    duration: 90,
    type: 'Crisis',
    status: 'urgent',
    notes: 'Emergency session - severe depression symptoms',
    history: [
      { date: '2025-06-10', counselor: 'Dr. Johnson', notes: 'Initial crisis assessment' },
      { date: '2025-06-12', counselor: 'Dr. Brown', notes: 'Follow-up on medication' }
    ]
  },
  { 
    id: 5, 
    student: 'Eva Martinez', 
    studentId: 'STU005',
    counselor: 'Dr. Smith', 
    counselorId: 'COU001',
    date: '2025-06-16', 
    time: '9:00 AM', 
    duration: 60,
    type: 'Individual',
    status: 'confirmed',
    notes: 'Career counseling session',
    history: [
      { date: '2025-05-25', counselor: 'Dr. Smith', notes: 'Career assessment completed' }
    ]
  },
  { 
    id: 6, 
    student: 'Frank Thomas', 
    studentId: 'STU006',
    counselor: 'Dr. Johnson', 
    counselorId: 'COU002',
    date: '2025-06-16', 
    time: '10:30 AM', 
    duration: 60,
    type: 'Individual',
    status: 'cancelled',
    notes: 'Student requested cancellation',
    history: [
      { date: '2025-05-18', counselor: 'Dr. Johnson', notes: 'Initial consultation' }
    ]
  },
  { 
    id: 7, 
    student: 'Grace Lee', 
    studentId: 'STU007',
    counselor: 'Dr. Williams', 
    counselorId: 'COU003',
    date: '2025-06-16', 
    time: '1:00 PM', 
    duration: 45,
    type: 'Individual',
    status: 'confirmed',
    notes: 'Follow-up on relationship counseling',
    history: [
      { date: '2025-05-10', counselor: 'Dr. Williams', notes: 'Initial relationship assessment' },
      { date: '2025-05-24', counselor: 'Dr. Williams', notes: 'Communication strategies discussed' }
    ]
  },
];

// Mock data for counselors
const counselors = [
  { id: 'COU001', name: 'Dr. Smith', specialization: 'Anxiety & Depression', availability: 'High', sessions: 45 },
  { id: 'COU002', name: 'Dr. Johnson', specialization: 'Academic Stress', availability: 'Medium', sessions: 38 },
  { id: 'COU003', name: 'Dr. Williams', specialization: 'Relationship Counseling', availability: 'Low', sessions: 42 },
  { id: 'COU004', name: 'Dr. Brown', specialization: 'Crisis Intervention', availability: 'Medium', sessions: 36 },
  { id: 'COU005', name: 'Dr. Garcia', specialization: 'Career Counseling', availability: 'High', sessions: 30 },
];

// Mock data for students
const students = [
  { id: 'STU001', name: 'Alice Johnson', year: 'Sophomore', program: 'Psychology', sessions: 5 },
  { id: 'STU002', name: 'Bob Smith', year: 'Freshman', program: 'Engineering', sessions: 1 },
  { id: 'STU003', name: 'Carol Davis', year: 'Junior', program: 'Business', sessions: 3 },
  { id: 'STU004', name: 'David Wilson', year: 'Senior', program: 'Medicine', sessions: 8 },
  { id: 'STU005', name: 'Eva Martinez', year: 'Sophomore', program: 'Education', sessions: 4 },
  { id: 'STU006', name: 'Frank Thomas', year: 'Freshman', program: 'Computer Science', sessions: 2 },
  { id: 'STU007', name: 'Grace Lee', year: 'Senior', program: 'Arts', sessions: 6 },
];

// Form schema for appointment creation/editing
const appointmentFormSchema = z.object({
  student: z.string().min(1, { message: "Student is required" }),
  counselor: z.string().min(1, { message: "Counselor is required" }),
  date: z.date({ required_error: "Date is required" }),
  time: z.string().min(1, { message: "Time is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  type: z.string().min(1, { message: "Session type is required" }),
  notes: z.string().optional(),
});

const AppointmentManagement = () => {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      student: "",
      counselor: "",
      time: "",
      duration: "60",
      type: "Individual",
      notes: "",
    },
  });

  const handleCreateAppointment = (data: z.infer<typeof appointmentFormSchema>) => {
    toast({
      title: "Appointment Created",
      description: `Appointment scheduled for ${data.student} with ${data.counselor} on ${format(data.date, 'PPP')} at ${data.time}`,
    });
    setIsCreateDialogOpen(false);
    form.reset();
  };

  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsDetailsDialogOpen(true);
  };

  const handleEditAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    form.reset({
      student: appointment.studentId,
      counselor: appointment.counselorId,
      date: new Date(appointment.date),
      time: appointment.time,
      duration: appointment.duration.toString(),
      type: appointment.type,
      notes: appointment.notes,
    });
    setIsCreateDialogOpen(true);
  };

  const handleDeleteAppointment = (id: number) => {
    toast({
      title: "Appointment Deleted",
      description: `Appointment #${id} has been deleted`,
    });
  };

  const handleStatusChange = (id: number, status: string) => {
    toast({
      title: "Status Updated",
      description: `Appointment #${id} status changed to ${status}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="flex items-center gap-1"><Clock4 className="h-3 w-3" /> Pending</Badge>;
      case 'urgent':
        return <Badge className="bg-red-500 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> Urgent</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="flex items-center gap-1"><X className="h-3 w-3" /> Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.counselor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.date.includes(searchQuery) ||
      appointment.time.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Appointment Management</CardTitle>
              <CardDescription>
                Schedule, view, and manage counseling appointments
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <Plus className="h-4 w-4" />
                    New Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{selectedAppointment ? 'Edit Appointment' : 'Create New Appointment'}</DialogTitle>
                    <DialogDescription>
                      {selectedAppointment 
                        ? 'Update the appointment details below.' 
                        : 'Fill in the details to schedule a new counseling appointment.'}
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateAppointment)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="student"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {students.map(student => (
                                  <SelectItem key={student.id} value={student.id}>
                                    {student.name} ({student.program})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="counselor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Counselor</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a counselor" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {counselors.map(counselor => (
                                  <SelectItem key={counselor.id} value={counselor.id}>
                                    {counselor.name} ({counselor.specialization})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="pl-3 text-left font-normal"
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
                                    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map(time => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration (minutes)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select duration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {['30', '45', '60', '90', '120'].map(duration => (
                                    <SelectItem key={duration} value={duration}>
                                      {duration} minutes
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Session Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {['Individual', 'Group', 'Crisis', 'Follow-up', 'Assessment'].map(type => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Add any relevant notes about this appointment"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button type="submit">
                          {selectedAppointment ? 'Update Appointment' : 'Schedule Appointment'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Counselor</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="font-medium">{appointment.student}</div>
                      </TableCell>
                      <TableCell>{appointment.counselor}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{format(new Date(appointment.date), 'MMM d, yyyy')}</span>
                          <span className="text-muted-foreground text-sm">{appointment.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewDetails(appointment)}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditAppointment(appointment)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'confirmed')}>
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                              Confirm
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'cancelled')}>
                              <X className="mr-2 h-4 w-4 text-red-500" />
                              Cancel
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(appointment.id, 'urgent')}>
                              <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                              Mark as Urgent
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteAppointment(appointment.id)}
                              className="text-red-500"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
                <DialogDescription>
                  Complete information about this counseling session
                </DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="history">Session History</TabsTrigger>
                  <TabsTrigger value="notes">Notes & Follow-up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Student Information</h4>
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarFallback>{selectedAppointment.student.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedAppointment.student}</p>
                          <p className="text-sm text-muted-foreground">ID: {selectedAppointment.studentId}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="grid grid-cols-2">
                          <span className="text-sm font-medium">Program:</span>
                          <span className="text-sm">
                            {students.find(s => s.id === selectedAppointment.studentId)?.program || 'N/A'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-sm font-medium">Year:</span>
                          <span className="text-sm">
                            {students.find(s => s.id === selectedAppointment.studentId)?.year || 'N/A'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-sm font-medium">Total Sessions:</span>
                          <span className="text-sm">
                            {students.find(s => s.id === selectedAppointment.studentId)?.sessions || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Counselor Information</h4>
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarFallback>{selectedAppointment.counselor.split(' ')[1][0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedAppointment.counselor}</p>
                          <p className="text-sm text-muted-foreground">ID: {selectedAppointment.counselorId}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="grid grid-cols-2">
                          <span className="text-sm font-medium">Specialization:</span>
                          <span className="text-sm">
                            {counselors.find(c => c.id === selectedAppointment.counselorId)?.specialization || 'N/A'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-sm font-medium">Availability:</span>
                          <span className="text-sm">
                            {counselors.find(c => c.id === selectedAppointment.counselorId)?.availability || 'N/A'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2">
                          <span className="text-sm font-medium">Total Sessions:</span>
                          <span className="text-sm">
                            {counselors.find(c => c.id === selectedAppointment.counselorId)?.sessions || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 space-y-4">
                    <h4 className="font-medium">Appointment Information</h4>
                    <div className="grid grid-cols-2 gap-y-2">
                      <div>
                        <p className="text-sm font-medium">Date & Time</p>
                        <p className="text-sm">
                          {format(new Date(selectedAppointment.date), 'MMMM d, yyyy')} at {selectedAppointment.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm">{selectedAppointment.duration} minutes</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Session Type</p>
                        <p className="text-sm">{selectedAppointment.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <div className="text-sm">{getStatusBadge(selectedAppointment.status)}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="pt-4">
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    {selectedAppointment.history.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No previous sessions found</p>
                    ) : (
                      <div className="space-y-4">
                        {selectedAppointment.history.map((session: any, index: number) => (
                          <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">{format(new Date(session.date), 'MMMM d, yyyy')}</p>
                                <p className="text-sm text-muted-foreground">Counselor: {session.counselor}</p>
                              </div>
                              <Button variant="outline" size="sm">View Full Report</Button>
                            </div>
                            <p className="text-sm">{session.notes}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4 pt-4">
                  <div>
                    <h4 className="font-medium mb-2">Session Notes</h4>
                    <Textarea 
                      className="min-h-[100px]" 
                      placeholder="Enter session notes here..."
                      defaultValue={selectedAppointment.notes}
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Follow-up Actions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="followup-1" className="rounded" />
                        <label htmlFor="followup-1" className="text-sm">Schedule follow-up appointment</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="followup-2" className="rounded" />
                        <label htmlFor="followup-2" className="text-sm">Send resource materials</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="followup-3" className="rounded" />
                        <label htmlFor="followup-3" className="text-sm">Refer to specialist</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="followup-4" className="rounded" />
                        <label htmlFor="followup-4" className="text-sm">Flag for urgent attention</label>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Save Notes & Follow-up</Button>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => handleEditAppointment(selectedAppointment)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Appointment
                </Button>
                <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentManagement;