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
  Shield, 
  User, 
  Key, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  Lock,
  Unlock,
  UserX,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Eye,
  EyeOff,
  FileUp,
  Download
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for users
const users = [
  { 
    id: 1, 
    name: 'Jane Doe', 
    email: 'jane.doe@example.com', 
    role: 'Super Admin', 
    status: 'active',
    lastLogin: '2025-06-14 09:45 AM',
    twoFactorEnabled: true
  },
  { 
    id: 2, 
    name: 'Dr. Smith', 
    email: 'dr.smith@example.com', 
    role: 'Counselor', 
    status: 'active',
    lastLogin: '2025-06-14 10:30 AM',
    twoFactorEnabled: true
  },
  { 
    id: 3, 
    name: 'Dr. Johnson', 
    email: 'dr.johnson@example.com', 
    role: 'Counselor', 
    status: 'active',
    lastLogin: '2025-06-13 03:15 PM',
    twoFactorEnabled: false
  },
  { 
    id: 4, 
    name: 'Alice Johnson', 
    email: 'alice.johnson@example.com', 
    role: 'Student', 
    status: 'active',
    lastLogin: '2025-06-12 11:20 AM',
    twoFactorEnabled: false
  },
  { 
    id: 5, 
    name: 'Bob Smith', 
    email: 'bob.smith@example.com', 
    role: 'Student', 
    status: 'inactive',
    lastLogin: '2025-05-30 02:10 PM',
    twoFactorEnabled: false
  },
  { 
    id: 6, 
    name: 'Carol Davis', 
    email: 'carol.davis@example.com', 
    role: 'Student', 
    status: 'locked',
    lastLogin: '2025-06-10 09:05 AM',
    twoFactorEnabled: true
  },
];

// Mock data for audit logs
const auditLogs = [
  { 
    id: 1, 
    user: 'Jane Doe', 
    action: 'User Login', 
    details: 'Successful login from 192.168.1.1', 
    timestamp: '2025-06-14 09:45:22',
    ipAddress: '192.168.1.1',
    status: 'success'
  },
  { 
    id: 2, 
    user: 'Jane Doe', 
    action: 'Password Reset', 
    details: 'Reset password for user dr.williams@example.com', 
    timestamp: '2025-06-14 10:15:45',
    ipAddress: '192.168.1.1',
    status: 'success'
  },
  { 
    id: 3, 
    user: 'Dr. Smith', 
    action: 'Record Access', 
    details: 'Accessed student record for Alice Johnson', 
    timestamp: '2025-06-14 10:30:12',
    ipAddress: '192.168.1.2',
    status: 'success'
  },
  { 
    id: 4, 
    user: 'System', 
    action: 'Backup Created', 
    details: 'Automated daily backup completed', 
    timestamp: '2025-06-14 01:00:00',
    ipAddress: 'localhost',
    status: 'success'
  },
  { 
    id: 5, 
    user: 'Unknown', 
    action: 'Failed Login', 
    details: 'Failed login attempt for user admin@example.com', 
    timestamp: '2025-06-14 03:22:18',
    ipAddress: '203.0.113.42',
    status: 'failed'
  },
  { 
    id: 6, 
    user: 'Dr. Johnson', 
    action: 'Report Generated', 
    details: 'Generated monthly counseling report', 
    timestamp: '2025-06-13 03:45:30',
    ipAddress: '192.168.1.3',
    status: 'success'
  },
  { 
    id: 7, 
    user: 'Jane Doe', 
    action: 'User Created', 
    details: 'Created new counselor account for Dr. Garcia', 
    timestamp: '2025-06-13 11:20:05',
    ipAddress: '192.168.1.1',
    status: 'success'
  },
  { 
    id: 8, 
    user: 'Carol Davis', 
    action: 'Failed Login', 
    details: 'Multiple failed login attempts', 
    timestamp: '2025-06-10 09:05:12',
    ipAddress: '192.168.1.10',
    status: 'failed'
  },
];

// Mock data for compliance documents
const complianceDocuments = [
  { 
    id: 1, 
    title: 'Data Privacy Policy', 
    description: 'Guidelines for handling student data and ensuring privacy', 
    lastUpdated: '2025-05-15',
    status: 'active',
    reviewDate: '2025-11-15'
  },
  { 
    id: 2, 
    title: 'Confidentiality Agreement', 
    description: 'Agreement signed by all counselors regarding client confidentiality', 
    lastUpdated: '2025-04-20',
    status: 'active',
    reviewDate: '2025-10-20'
  },
  { 
    id: 3, 
    title: 'Emergency Response Protocol', 
    description: 'Procedures for handling crisis situations and emergencies', 
    lastUpdated: '2025-06-01',
    status: 'active',
    reviewDate: '2025-12-01'
  },
  { 
    id: 4, 
    title: 'Data Retention Policy', 
    description: 'Guidelines for how long different types of data should be retained', 
    lastUpdated: '2025-03-10',
    status: 'review-needed',
    reviewDate: '2025-09-10'
  },
  { 
    id: 5, 
    title: 'Security Incident Response Plan', 
    description: 'Steps to take in case of a data breach or security incident', 
    lastUpdated: '2025-05-22',
    status: 'active',
    reviewDate: '2025-11-22'
  },
];

const SecurityCompliance = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [auditFilter, setAuditFilter] = useState('all');
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleResetPassword = () => {
    toast({
      title: "Password Reset Link Sent",
      description: `A password reset link has been sent to the user's email address`,
    });
    setIsResetPasswordDialogOpen(false);
  };

  const handleLockUser = (userId: number) => {
    toast({
      title: "User Account Locked",
      description: `User account has been locked`,
    });
  };

  const handleUnlockUser = (userId: number) => {
    toast({
      title: "User Account Unlocked",
      description: `User account has been unlocked`,
    });
  };

  const handleEnforce2FA = (userId: number) => {
    toast({
      title: "2FA Enforcement Updated",
      description: `Two-factor authentication requirement has been updated for this user`,
    });
  };

  const handleDownloadDocument = (documentId: number) => {
    toast({
      title: "Document Downloaded",
      description: `Document is being downloaded`,
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      userFilter === 'all' || 
      (userFilter === 'admin' && user.role.includes('Admin')) ||
      (userFilter === 'counselor' && user.role === 'Counselor') ||
      (userFilter === 'student' && user.role === 'Student') ||
      (userFilter === 'active' && user.status === 'active') ||
      (userFilter === 'inactive' && user.status === 'inactive') ||
      (userFilter === 'locked' && user.status === 'locked');
    
    return matchesSearch && matchesFilter;
  });

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      auditFilter === 'all' || 
      (auditFilter === 'login' && log.action.includes('Login')) ||
      (auditFilter === 'data' && (log.action.includes('Access') || log.action.includes('Generated'))) ||
      (auditFilter === 'user' && (log.action.includes('User') || log.action.includes('Password'))) ||
      (auditFilter === 'success' && log.status === 'success') ||
      (auditFilter === 'failed' && log.status === 'failed');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      <Tabs defaultValue="user-auth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="user-auth" className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>User Authentication</span>
          </TabsTrigger>
          <TabsTrigger value="audit-logs" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>Audit Logs</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>Compliance</span>
          </TabsTrigger>
        </TabsList>

        {/* User Authentication Tab */}
        <TabsContent value="user-auth">
          <Card>
            <CardHeader>
              <CardTitle>User Authentication Management</CardTitle>
              <CardDescription>
                Manage user accounts, passwords, and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                      <SelectItem value="counselor">Counselors</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="locked">Locked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>2FA</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge className={
                              user.status === 'active' 
                                ? 'bg-green-500' 
                                : user.status === 'inactive'
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            {user.twoFactorEnabled ? (
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                Enabled
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                                Disabled
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog open={isResetPasswordDialogOpen && selectedUserId === user.id} onOpenChange={(open) => {
                                setIsResetPasswordDialogOpen(open);
                                if (!open) setSelectedUserId(null);
                              }}>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedUserId(user.id)}
                                  >
                                    <Key className="h-4 w-4 mr-1" />
                                    Reset
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Reset Password</DialogTitle>
                                    <DialogDescription>
                                      This will send a password reset link to the user's email address.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4">
                                    <p>Are you sure you want to reset the password for:</p>
                                    <p className="font-medium mt-2">{user.name} ({user.email})</p>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>Cancel</Button>
                                    <Button onClick={handleResetPassword}>Send Reset Link</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
                              {user.status === 'locked' ? (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleUnlockUser(user.id)}
                                >
                                  <Unlock className="h-4 w-4 mr-1" />
                                  Unlock
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleLockUser(user.id)}
                                >
                                  <Lock className="h-4 w-4 mr-1" />
                                  Lock
                                </Button>
                              )}
                              
                              <Button 
                                variant={user.twoFactorEnabled ? "outline" : "default"}
                                size="sm"
                                onClick={() => handleEnforce2FA(user.id)}
                              >
                                <Shield className="h-4 w-4 mr-1" />
                                {user.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enforce Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require all users to set up 2FA</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="enforce-2fa" className="rounded" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password Complexity</p>
                      <p className="text-sm text-muted-foreground">Minimum requirements for passwords</p>
                    </div>
                    <Select defaultValue="high">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (8+ characters)</SelectItem>
                        <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                        <SelectItem value="high">High (12+ chars, mixed case, symbols)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password Expiry</p>
                      <p className="text-sm text-muted-foreground">Force password reset after period</p>
                    </div>
                    <Select defaultValue="90">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Account Lockout</p>
                      <p className="text-sm text-muted-foreground">Lock account after failed login attempts</p>
                    </div>
                    <Select defaultValue="5">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select attempts" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 attempts</SelectItem>
                        <SelectItem value="5">5 attempts</SelectItem>
                        <SelectItem value="10">10 attempts</SelectItem>
                        <SelectItem value="never">Never lock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button>Save Security Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit-logs">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
              <CardDescription>
                Track and monitor all system activities for accountability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search audit logs..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={auditFilter} onValueChange={setAuditFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter logs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="login">Login Activities</SelectItem>
                      <SelectItem value="data">Data Access</SelectItem>
                      <SelectItem value="user">User Management</SelectItem>
                      <SelectItem value="success">Successful</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAuditLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No audit logs found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAuditLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                          <TableCell>{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                          <TableCell>{log.ipAddress}</TableCell>
                          <TableCell>
                            <Badge className={log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}>
                              {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredAuditLogs.length} of {auditLogs.length} logs
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Export Logs
                  </Button>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    View All
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Audit Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Log Retention Period</p>
                      <p className="text-sm text-muted-foreground">How long to keep audit logs</p>
                    </div>
                    <Select defaultValue="365">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                        <SelectItem value="forever">Forever</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Detailed Data Access Logging</p>
                      <p className="text-sm text-muted-foreground">Log all data access in detail</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="detailed-logging" className="rounded" defaultChecked />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Alert on Suspicious Activity</p>
                      <p className="text-sm text-muted-foreground">Send notifications for suspicious actions</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="suspicious-alerts" className="rounded" defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button>Save Audit Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Management</CardTitle>
              <CardDescription>
                Manage compliance policies and documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Compliance Documents</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Next Review</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {complianceDocuments.map((document) => (
                        <TableRow key={document.id}>
                          <TableCell className="font-medium">{document.title}</TableCell>
                          <TableCell className="max-w-xs truncate">{document.description}</TableCell>
                          <TableCell>{new Date(document.lastUpdated).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge className={document.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}>
                              {document.status === 'active' ? 'Active' : 'Review Needed'}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(document.reviewDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDownloadDocument(document.id)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="flex items-center gap-1 mr-2">
                    <FileUp className="h-4 w-4" />
                    Upload Document
                  </Button>
                  <Button className="flex items-center gap-1">
                    <RefreshCw className="h-4 w-4" />
                    Schedule Review
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Compliance Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Data Privacy</CardTitle>
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Policy Status</span>
                          <Badge className="bg-green-500">Compliant</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Last Audit</span>
                          <span className="text-sm">May 15, 2025</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next Review</span>
                          <span className="text-sm">Nov 15, 2025</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Confidentiality</CardTitle>
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Policy Status</span>
                          <Badge className="bg-green-500">Compliant</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Last Audit</span>
                          <span className="text-sm">Apr 20, 2025</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next Review</span>
                          <span className="text-sm">Oct 20, 2025</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Data Retention</CardTitle>
                        <ShieldAlert className="h-5 w-5 text-yellow-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Policy Status</span>
                          <Badge className="bg-yellow-500">Review Needed</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Last Audit</span>
                          <span className="text-sm">Mar 10, 2025</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next Review</span>
                          <span className="text-sm">Sep 10, 2025</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Compliance Checklist</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-md border">
                    <input type="checkbox" id="checklist-1" className="rounded" defaultChecked />
                    <label htmlFor="checklist-1" className="flex-1">All counselors have signed confidentiality agreements</label>
                    <Badge className="bg-green-500">Complete</Badge>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md border">
                    <input type="checkbox" id="checklist-2" className="rounded" defaultChecked />
                    <label htmlFor="checklist-2" className="flex-1">Data encryption implemented for all sensitive information</label>
                    <Badge className="bg-green-500">Complete</Badge>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md border">
                    <input type="checkbox" id="checklist-3" className="rounded" defaultChecked />
                    <label htmlFor="checklist-3" className="flex-1">Regular security training conducted for all staff</label>
                    <Badge className="bg-green-500">Complete</Badge>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md border">
                    <input type="checkbox" id="checklist-4" className="rounded" />
                    <label htmlFor="checklist-4" className="flex-1">Data retention policy review and update</label>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-md border">
                    <input type="checkbox" id="checklist-5" className="rounded" />
                    <label htmlFor="checklist-5" className="flex-1">Third-party security assessment</label>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Scheduled</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityCompliance;