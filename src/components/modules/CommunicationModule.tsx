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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Bell, 
  Flag, 
  Settings, 
  Search, 
  MoreHorizontal, 
  AlertTriangle,
  CheckCircle2,
  Ban,
  UserPlus,
  Megaphone,
  FileText,
  Paperclip,
  Image,
  Smile,
  Trash2,
  Clock,
  Filter
} from 'lucide-react';

// Mock data for chats
const chats = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    lastMessage: "I'm feeling much better after our session",
    time: '10:30 AM',
    unread: 2,
    status: 'online',
    type: 'student'
  },
  {
    id: 2,
    name: 'Dr. Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    lastMessage: "Can we discuss the case of David Wilson?",
    time: '9:45 AM',
    unread: 1,
    status: 'online',
    type: 'counselor'
  },
  {
    id: 3,
    name: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    lastMessage: "When is my next appointment?",
    time: 'Yesterday',
    unread: 0,
    status: 'offline',
    type: 'student'
  },
  {
    id: 4,
    name: 'Dr. Johnson',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    lastMessage: "I've submitted my monthly report",
    time: 'Yesterday',
    unread: 0,
    status: 'offline',
    type: 'counselor'
  },
  {
    id: 5,
    name: 'Carol Davis',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    lastMessage: "Thank you for the resources",
    time: '2 days ago',
    unread: 0,
    status: 'offline',
    type: 'student'
  },
  {
    id: 6,
    name: 'Counseling Team',
    avatar: '',
    lastMessage: "Weekly meeting reminder",
    time: '3 days ago',
    unread: 0,
    status: 'offline',
    type: 'group'
  },
];

// Mock data for messages in a conversation
const mockConversation = [
  {
    id: 1,
    sender: 'Alice Johnson',
    senderType: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    message: "Hello, I wanted to ask about the resources you mentioned in our last session.",
    time: '10:15 AM',
    status: 'read',
    flagged: false
  },
  {
    id: 2,
    sender: 'Admin',
    senderType: 'admin',
    avatar: '',
    message: "Hi Alice, I'll send those over to you right away. They're PDFs about stress management techniques.",
    time: '10:18 AM',
    status: 'read',
    flagged: false
  },
  {
    id: 3,
    sender: 'Alice Johnson',
    senderType: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    message: "Thank you! I've been practicing the breathing exercises and they're helping a lot.",
    time: '10:20 AM',
    status: 'read',
    flagged: false
  },
  {
    id: 4,
    sender: 'Admin',
    senderType: 'admin',
    avatar: '',
    message: "That's great to hear! How are you feeling overall compared to last week?",
    time: '10:22 AM',
    status: 'read',
    flagged: false
  },
  {
    id: 5,
    sender: 'Alice Johnson',
    senderType: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    message: "I'm feeling much better after our session. The anxiety is still there but it's more manageable now.",
    time: '10:25 AM',
    status: 'read',
    flagged: false
  },
  {
    id: 6,
    sender: 'Admin',
    senderType: 'admin',
    avatar: '',
    message: "I'm glad to hear that. Remember to keep using those techniques whenever you feel overwhelmed. Would you like to schedule another follow-up session next week?",
    time: '10:28 AM',
    status: 'read',
    flagged: false
  },
  {
    id: 7,
    sender: 'Alice Johnson',
    senderType: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    message: "Yes, that would be helpful. I'm available on Tuesday afternoon.",
    time: '10:30 AM',
    status: 'delivered',
    flagged: false
  },
];

// Mock data for flagged messages
const flaggedMessages = [
  {
    id: 1,
    sender: 'David Wilson',
    senderType: 'student',
    message: "I don't think I can handle this anymore. Everything feels hopeless.",
    time: '2 hours ago',
    severity: 'high',
    status: 'pending'
  },
  {
    id: 2,
    sender: 'Eva Martinez',
    senderType: 'student',
    message: "I've been having thoughts about hurting myself.",
    time: '1 day ago',
    severity: 'high',
    status: 'addressed'
  },
  {
    id: 3,
    sender: 'Frank Thomas',
    senderType: 'student',
    message: "I'm so stressed about exams I can't sleep at all.",
    time: '2 days ago',
    severity: 'medium',
    status: 'pending'
  },
];

// Mock data for announcements
const announcements = [
  {
    id: 1,
    title: 'Mental Health Awareness Week',
    content: 'Join us for a series of workshops and events during Mental Health Awareness Week (June 20-24). All students are encouraged to participate.',
    date: '2025-06-10',
    sender: 'Admin',
    recipients: 'All Students',
    status: 'scheduled'
  },
  {
    id: 2,
    title: 'New Counselor Introduction',
    content: 'We are pleased to welcome Dr. Garcia to our counseling team. She specializes in career counseling and will be available starting next week.',
    date: '2025-06-05',
    sender: 'Admin',
    recipients: 'All Students, All Counselors',
    status: 'sent'
  },
  {
    id: 3,
    title: 'System Maintenance Notice',
    content: 'The counseling portal will be unavailable for maintenance on Sunday, June 15, from 2 AM to 5 AM. We apologize for any inconvenience.',
    date: '2025-06-01',
    sender: 'System',
    recipients: 'All Users',
    status: 'sent'
  },
];

const CommunicationModule = () => {
  const [activeChat, setActiveChat] = useState<number | null>(1); // Default to first chat
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [chatFilter, setChatFilter] = useState('all');
  const [isAnnouncementDialogOpen, setIsAnnouncementDialogOpen] = useState(false);
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementContent, setAnnouncementContent] = useState('');
  const [announcementRecipients, setAnnouncementRecipients] = useState('all-students');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been delivered",
      });
      setMessageInput('');
    }
  };

  const handleFlagMessage = (messageId: number) => {
    toast({
      title: "Message Flagged",
      description: "This message has been flagged for review",
    });
  };

  const handleCreateAnnouncement = () => {
    if (announcementTitle.trim() && announcementContent.trim()) {
      toast({
        title: "Announcement Created",
        description: `"${announcementTitle}" will be sent to ${announcementRecipients === 'all-students' ? 'all students' : announcementRecipients === 'all-counselors' ? 'all counselors' : 'all users'}`,
      });
      setIsAnnouncementDialogOpen(false);
      setAnnouncementTitle('');
      setAnnouncementContent('');
      setAnnouncementRecipients('all-students');
    }
  };

  const handleAddressFlag = (id: number) => {
    toast({
      title: "Flag Addressed",
      description: "This flagged message has been marked as addressed",
    });
  };

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = 
      chatFilter === 'all' || 
      (chatFilter === 'students' && chat.type === 'student') ||
      (chatFilter === 'counselors' && chat.type === 'counselor') ||
      (chatFilter === 'groups' && chat.type === 'group');
    
    return matchesSearch && matchesFilter;
  });

  const selectedChat = chats.find(chat => chat.id === activeChat);

  return (
    <div className="space-y-4">
      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>Messages</span>
          </TabsTrigger>
          <TabsTrigger value="flagged" className="flex items-center gap-1">
            <Flag className="h-4 w-4" />
            <span>Flagged Messages</span>
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-1">
            <Bell className="h-4 w-4" />
            <span>Announcements</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>Chat Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-250px)] min-h-[500px]">
                {/* Chat List */}
                <div className="border-r col-span-1">
                  <div className="p-4 border-b">
                    <div className="relative mb-3">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search conversations..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <select 
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={chatFilter}
                        onChange={(e) => setChatFilter(e.target.value)}
                      >
                        <option value="all">All Chats</option>
                        <option value="students">Students</option>
                        <option value="counselors">Counselors</option>
                        <option value="groups">Groups</option>
                      </select>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(100vh-350px)] min-h-[400px]">
                    {filteredChats.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">No conversations found</p>
                      </div>
                    ) : (
                      <div>
                        {filteredChats.map((chat) => (
                          <div 
                            key={chat.id}
                            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${activeChat === chat.id ? 'bg-muted' : ''}`}
                            onClick={() => setActiveChat(chat.id)}
                          >
                            {chat.type === 'group' ? (
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary" />
                              </div>
                            ) : (
                              <div className="relative">
                                <Avatar>
                                  <AvatarImage src={chat.avatar} />
                                  <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${chat.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p className="font-medium truncate">{chat.name}</p>
                                <span className="text-xs text-muted-foreground">{chat.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                            </div>
                            {chat.unread > 0 && (
                              <Badge className="ml-auto">{chat.unread}</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>

                {/* Chat Messages */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col">
                  {activeChat ? (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {selectedChat?.type === 'group' ? (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                          ) : (
                            <Avatar>
                              <AvatarImage src={selectedChat?.avatar} />
                              <AvatarFallback>{selectedChat?.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <p className="font-medium">{selectedChat?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedChat?.status === 'online' ? 'Online' : 'Last seen recently'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Search in Conversation</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                              <DropdownMenuItem>Block User</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-500">Clear Chat</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Messages */}
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {mockConversation.map((message) => (
                            <div 
                              key={message.id} 
                              className={`flex ${message.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`flex gap-3 max-w-[80%] ${message.senderType === 'admin' ? 'flex-row-reverse' : ''}`}>
                                {message.senderType !== 'admin' && (
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src={message.avatar} />
                                    <AvatarFallback>{message.sender.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                )}
                                <div>
                                  <div className={`rounded-lg p-3 ${message.senderType === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                    <p className="text-sm">{message.message}</p>
                                  </div>
                                  <div className={`flex items-center mt-1 text-xs text-muted-foreground ${message.senderType === 'admin' ? 'justify-end' : ''}`}>
                                    <span>{message.time}</span>
                                    {message.senderType === 'admin' && (
                                      <span className="ml-1">{message.status === 'read' ? '✓✓' : '✓'}</span>
                                    )}
                                    {message.senderType !== 'admin' && (
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6 ml-1"
                                        onClick={() => handleFlagMessage(message.id)}
                                      >
                                        <Flag className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>

                      {/* Message Input */}
                      <div className="p-4 border-t">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Image className="h-5 w-5" />
                          </Button>
                          <Input 
                            placeholder="Type a message..." 
                            className="flex-1"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button variant="ghost" size="icon">
                            <Smile className="h-5 w-5" />
                          </Button>
                          <Button onClick={handleSendMessage}>
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No conversation selected</h3>
                        <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flagged Messages Tab */}
        <TabsContent value="flagged">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Messages</CardTitle>
              <CardDescription>
                Messages that require attention or have been flagged for inappropriate content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left font-medium">Sender</th>
                      <th className="p-3 text-left font-medium">Message</th>
                      <th className="p-3 text-left font-medium">Time</th>
                      <th className="p-3 text-left font-medium">Severity</th>
                      <th className="p-3 text-left font-medium">Status</th>
                      <th className="p-3 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flaggedMessages.map((message) => (
                      <tr key={message.id} className="border-b">
                        <td className="p-3">
                          <div className="font-medium">{message.sender}</div>
                          <div className="text-xs text-muted-foreground">{message.senderType}</div>
                        </td>
                        <td className="p-3">
                          <p className="text-sm">{message.message}</p>
                        </td>
                        <td className="p-3 text-sm">{message.time}</td>
                        <td className="p-3">
                          <Badge className={message.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}>
                            {message.severity === 'high' ? 'High' : 'Medium'}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={message.status === 'pending' ? 'outline' : 'secondary'}>
                            {message.status === 'pending' ? 'Pending' : 'Addressed'}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setActiveChat(1)}
                            >
                              View Chat
                            </Button>
                            {message.status === 'pending' && (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleAddressFlag(message.id)}
                              >
                                Address
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Announcements</CardTitle>
                  <CardDescription>
                    Create and manage announcements for students and counselors
                  </CardDescription>
                </div>
                <Dialog open={isAnnouncementDialogOpen} onOpenChange={setIsAnnouncementDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-1">
                      <Megaphone className="h-4 w-4" />
                      New Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Announcement</DialogTitle>
                      <DialogDescription>
                        Create a new announcement to be sent to students and counselors
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <Input 
                          id="title" 
                          placeholder="Announcement title"
                          value={announcementTitle}
                          onChange={(e) => setAnnouncementTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="content" className="text-sm font-medium">Content</label>
                        <Textarea 
                          id="content" 
                          placeholder="Announcement content"
                          className="min-h-[100px]"
                          value={announcementContent}
                          onChange={(e) => setAnnouncementContent(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="recipients" className="text-sm font-medium">Recipients</label>
                        <select 
                          id="recipients"
                          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                          value={announcementRecipients}
                          onChange={(e) => setAnnouncementRecipients(e.target.value)}
                        >
                          <option value="all-students">All Students</option>
                          <option value="all-counselors">All Counselors</option>
                          <option value="all-users">All Users</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="schedule" className="text-sm font-medium">Schedule</label>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="send-now" name="schedule" className="rounded" defaultChecked />
                          <label htmlFor="send-now" className="text-sm">Send immediately</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="radio" id="schedule-later" name="schedule" className="rounded" />
                          <label htmlFor="schedule-later" className="text-sm">Schedule for later</label>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAnnouncementDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleCreateAnnouncement}>Create Announcement</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{announcement.title}</CardTitle>
                          <CardDescription>
                            {new Date(announcement.date).toLocaleDateString()} • To: {announcement.recipients}
                          </CardDescription>
                        </div>
                        <Badge variant={announcement.status === 'scheduled' ? 'outline' : 'secondary'}>
                          {announcement.status === 'scheduled' ? 'Scheduled' : 'Sent'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{announcement.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="text-xs text-muted-foreground">
                        Sent by: {announcement.sender}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        {announcement.status === 'scheduled' && (
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chat Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Chat Settings</CardTitle>
              <CardDescription>
                Configure chat settings and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable Chat System</p>
                      <p className="text-sm text-muted-foreground">Allow users to send and receive messages</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="enable-chat" className="rounded" defaultChecked />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Allow File Sharing</p>
                      <p className="text-sm text-muted-foreground">Enable users to share files and images</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="file-sharing" className="rounded" defaultChecked />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Retention Period</p>
                      <p className="text-sm text-muted-foreground">How long to keep message history</p>
                    </div>
                    <select className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="180">180 days</option>
                      <option value="365">1 year</option>
                      <option value="forever">Forever</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">User Permissions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Student-to-Student Chat</p>
                      <p className="text-sm text-muted-foreground">Allow students to message each other</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="student-chat" className="rounded" />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Group Chat Creation</p>
                      <p className="text-sm text-muted-foreground">Who can create group chats</p>
                    </div>
                    <select className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="admin">Admins Only</option>
                      <option value="counselor">Counselors & Admins</option>
                      <option value="all">All Users</option>
                    </select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Message Flagging Sensitivity</p>
                      <p className="text-sm text-muted-foreground">Threshold for automatic message flagging</p>
                    </div>
                    <select className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="high">High (Flag fewer messages)</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low (Flag more messages)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Send email for unread messages</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="email-notifications" className="rounded" defaultChecked />
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Urgent Message Alerts</p>
                      <p className="text-sm text-muted-foreground">Special notification for urgent messages</p>
                    </div>
                    <div className="flex items-center h-6">
                      <input type="checkbox" id="urgent-alerts" className="rounded" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationModule;