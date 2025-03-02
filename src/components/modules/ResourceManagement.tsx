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
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  FileText, 
  FolderOpen, 
  Search, 
  Filter,
  Plus,
  Download,
  Upload,
  Link,
  Eye,
  Edit,
  Trash2,
  Share2,
  Tag,
  CheckCircle2,
  Clock,
  Users,
  FileUp,
  Video,
  FileQuestion,
  Bookmark,
  Star,
  StarHalf,
  ThumbsUp,
  MessageSquare,
  MoreHorizontal,
  ExternalLink,
  Paperclip
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock data for resources
const resources = [
  { 
    id: 1, 
    title: 'Anxiety Management Techniques', 
    type: 'PDF', 
    category: 'Mental Health',
    tags: ['anxiety', 'coping strategies', 'self-help'],
    author: 'Dr. Smith',
    dateAdded: '2025-05-15',
    size: '2.4 MB',
    downloads: 145,
    visibility: 'public',
    description: 'A comprehensive guide to anxiety management techniques for students, including breathing exercises, cognitive restructuring, and mindfulness practices.'
  },
  { 
    id: 2, 
    title: 'Depression Screening Questionnaire', 
    type: 'DOCX', 
    category: 'Assessment Tools',
    tags: ['depression', 'screening', 'assessment'],
    author: 'Dr. Johnson',
    dateAdded: '2025-05-10',
    size: '1.1 MB',
    downloads: 98,
    visibility: 'counselors-only',
    description: 'Standardized questionnaire for depression screening, including scoring guide and interpretation guidelines for counselors.'
  },
  { 
    id: 3, 
    title: 'Stress Management Workshop Slides', 
    type: 'PPTX', 
    category: 'Workshops',
    tags: ['stress', 'workshop', 'presentation'],
    author: 'Dr. Williams',
    dateAdded: '2025-06-01',
    size: '5.7 MB',
    downloads: 72,
    visibility: 'public',
    description: 'Presentation slides for the stress management workshop, covering sources of academic stress, physiological responses, and effective management strategies.'
  },
  { 
    id: 4, 
    title: 'Crisis Intervention Protocol', 
    type: 'PDF', 
    category: 'Procedures',
    tags: ['crisis', 'emergency', 'protocol'],
    author: 'Admin',
    dateAdded: '2025-04-20',
    size: '3.2 MB',
    downloads: 56,
    visibility: 'counselors-only',
    description: 'Official protocol for crisis intervention, including emergency contacts, step-by-step procedures, and documentation requirements.'
  },
  { 
    id: 5, 
    title: 'Mindfulness Meditation Audio Guide', 
    type: 'MP3', 
    category: 'Self-Help',
    tags: ['mindfulness', 'meditation', 'audio'],
    author: 'Dr. Garcia',
    dateAdded: '2025-05-25',
    size: '18.5 MB',
    downloads: 210,
    visibility: 'public',
    description: 'Guided meditation audio recordings for stress reduction and mindfulness practice, with sessions ranging from 5 to 30 minutes.'
  },
  { 
    id: 6, 
    title: 'Academic Success Strategies', 
    type: 'PDF', 
    category: 'Academic',
    tags: ['study skills', 'time management', 'academic'],
    author: 'Dr. Brown',
    dateAdded: '2025-05-05',
    size: '4.1 MB',
    downloads: 185,
    visibility: 'public',
    description: 'Comprehensive guide to academic success strategies, including effective study techniques, time management, and test preparation.'
  },
  { 
    id: 7, 
    title: 'Relationship Counseling Handbook', 
    type: 'PDF', 
    category: 'Relationships',
    tags: ['relationships', 'counseling', 'handbook'],
    author: 'Dr. Williams',
    dateAdded: '2025-04-15',
    size: '6.8 MB',
    downloads: 67,
    visibility: 'counselors-only',
    description: 'Handbook for counselors on relationship counseling approaches, common issues, and effective intervention strategies.'
  },
];

// Mock data for knowledge base articles
const knowledgeBaseArticles = [
  {
    id: 1,
    title: 'Understanding Anxiety Disorders in College Students',
    category: 'Mental Health',
    author: 'Dr. Smith',
    datePublished: '2025-05-20',
    lastUpdated: '2025-06-01',
    views: 342,
    rating: 4.8,
    visibility: 'public',
    content: `
      <h2>Introduction</h2>
      <p>Anxiety disorders are among the most common mental health concerns for college students. This article provides an overview of anxiety disorders, their symptoms, and effective treatment approaches in the college context.</p>
      
      <h2>Common Types of Anxiety Disorders</h2>
      <ul>
        <li><strong>Generalized Anxiety Disorder (GAD)</strong>: Characterized by persistent and excessive worry about various things.</li>
        <li><strong>Social Anxiety Disorder</strong>: Intense fear of social situations and being judged by others.</li>
        <li><strong>Panic Disorder</strong>: Recurrent unexpected panic attacks and worry about future attacks.</li>
        <li><strong>Test Anxiety</strong>: Excessive fear about academic performance and evaluation.</li>
      </ul>
      
      <h2>Signs and Symptoms</h2>
      <p>Common symptoms include:</p>
      <ul>
        <li>Excessive worry or fear</li>
        <li>Restlessness or feeling on edge</li>
        <li>Fatigue</li>
        <li>Difficulty concentrating</li>
        <li>Irritability</li>
        <li>Muscle tension</li>
        <li>Sleep disturbances</li>
        <li>Physical symptoms (racing heart, sweating, trembling)</li>
      </ul>
      
      <h2>Impact on Academic Performance</h2>
      <p>Anxiety can significantly impact academic performance through:</p>
      <ul>
        <li>Reduced concentration and focus</li>
        <li>Procrastination and avoidance behaviors</li>
        <li>Decreased class attendance</li>
        <li>Poor test performance</li>
        <li>Difficulty with presentations and group work</li>
      </ul>
      
      <h2>Treatment Approaches</h2>
      <p>Effective treatments include:</p>
      <ul>
        <li><strong>Cognitive-Behavioral Therapy (CBT)</strong>: Helps students identify and change negative thought patterns.</li>
        <li><strong>Mindfulness and Relaxation Techniques</strong>: Breathing exercises, meditation, and progressive muscle relaxation.</li>
        <li><strong>Exposure Therapy</strong>: Gradually facing feared situations in a controlled manner.</li>
        <li><strong>Medication</strong>: When appropriate, in consultation with healthcare providers.</li>
        <li><strong>Lifestyle Modifications</strong>: Regular exercise, adequate sleep, and balanced nutrition.</li>
      </ul>
      
      <h2>Resources for Students</h2>
      <p>Students experiencing anxiety should be encouraged to:</p>
      <ul>
        <li>Seek help from campus counseling services</li>
        <li>Utilize academic accommodations when needed</li>
        <li>Join support groups</li>
        <li>Practice self-care strategies</li>
        <li>Maintain social connections</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>With proper support and treatment, students with anxiety disorders can effectively manage their symptoms and succeed academically. Early intervention is key to preventing long-term impacts on academic and personal development.</p>
    `
  },
  {
    id: 2,
    title: 'Effective Crisis Intervention Strategies',
    category: 'Crisis Management',
    author: 'Dr. Johnson',
    datePublished: '2025-04-15',
    lastUpdated: '2025-05-10',
    views: 187,
    rating: 4.9,
    visibility: 'counselors-only',
    content: 'Detailed content about crisis intervention strategies...'
  },
  {
    id: 3,
    title: 'Supporting Students Through Grief and Loss',
    category: 'Emotional Support',
    author: 'Dr. Williams',
    datePublished: '2025-05-05',
    lastUpdated: '2025-05-05',
    views: 156,
    rating: 4.7,
    visibility: 'public',
    content: 'Detailed content about supporting students through grief and loss...'
  },
  {
    id: 4,
    title: 'Time Management Strategies for Academic Success',
    category: 'Academic',
    author: 'Dr. Brown',
    datePublished: '2025-06-01',
    lastUpdated: '2025-06-01',
    views: 289,
    rating: 4.5,
    visibility: 'public',
    content: 'Detailed content about time management strategies...'
  },
  {
    id: 5,
    title: 'Recognizing Signs of Substance Abuse',
    category: 'Substance Use',
    author: 'Dr. Garcia',
    datePublished: '2025-05-12',
    lastUpdated: '2025-05-30',
    views: 142,
    rating: 4.6,
    visibility: 'counselors-only',
    content: 'Detailed content about recognizing signs of substance abuse...'
  },
];

// Mock data for resource categories
const resourceCategories = [
  { id: 1, name: 'Mental Health', count: 15 },
  { id: 2, name: 'Academic', count: 12 },
  { id: 3, name: 'Assessment Tools', count: 8 },
  { id: 4, name: 'Workshops', count: 6 },
  { id: 5, name: 'Procedures', count: 5 },
  { id: 6, name: 'Self-Help', count: 10 },
  { id: 7, name: 'Relationships', count: 7 },
  { id: 8, name: 'Crisis Management', count: 4 },
  { id: 9, name: 'Substance Use', count: 3 },
];

const ResourceManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [isArticleDialogOpen, setIsArticleDialogOpen] = useState(false);
  const [isViewArticleOpen, setIsViewArticleOpen] = useState(false);
  const { toast } = useToast();

  const handleUploadResource = () => {
    toast({
      title: "Resource Uploaded",
      description: "Your resource has been successfully uploaded",
    });
    setIsResourceDialogOpen(false);
  };

  const handleCreateArticle = () => {
    toast({
      title: "Article Created",
      description: "Your knowledge base article has been published",
    });
    setIsArticleDialogOpen(false);
  };

  const handleDownloadResource = (resourceId: number) => {
    const resource = resources.find(r => r.id === resourceId);
    toast({
      title: "Download Started",
      description: `Downloading ${resource?.title}`,
    });
  };

  const handleDeleteResource = (resourceId: number) => {
    toast({
      title: "Resource Deleted",
      description: "The resource has been deleted",
    });
  };

  const handleShareResource = (resourceId: number) => {
    toast({
      title: "Share Link Generated",
      description: "Resource sharing link has been copied to clipboard",
    });
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = 
      resourceFilter === 'all' || 
      resource.type.toLowerCase() === resourceFilter.toLowerCase();
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      resource.category === categoryFilter;
    
    return matchesSearch && matchesType && matchesCategory;
  });

  const filteredArticles = knowledgeBaseArticles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'all' || 
      article.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getResourceTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'docx':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'pptx':
        return <FileText className="h-4 w-4 text-orange-500" />;
      case 'mp3':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'mp4':
        return <Video className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 text-yellow-500 fill-yellow-500" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="resources" className="space-y-4">
        <TabsList>
          <TabsTrigger value="resources" className="flex items-center gap-1">
            <FolderOpen className="h-4 w-4" />
            <span>Resource Library</span>
          </TabsTrigger>
          <TabsTrigger value="knowledge-base" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Knowledge Base</span>
          </TabsTrigger>
        </TabsList>

        {/* Resource Library Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Resource Library</CardTitle>
                  <CardDescription>
                    Manage and share counseling resources and materials
                  </CardDescription>
                </div>
                <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-1">
                      <Upload className="h-4 w-4" />
                      Upload Resource
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Upload New Resource</DialogTitle>
                      <DialogDescription>
                        Add a new resource to the counseling library
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <Input id="title" placeholder="Resource title" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Description</label>
                        <Textarea 
                          id="description" 
                          placeholder="Brief description of the resource"
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="category" className="text-sm font-medium">Category</label>
                          <Select defaultValue="mental-health">
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {resourceCategories.map(category => (
                                <SelectItem key={category.id} value={category.name.toLowerCase().replace(/\s+/g, '-')}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="visibility" className="text-sm font-medium">Visibility</label>
                          <Select defaultValue="public">
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public (All Users)</SelectItem>
                              <SelectItem value="counselors-only">Counselors Only</SelectItem>
                              <SelectItem value="admin-only">Admin Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="tags" className="text-sm font-medium">Tags</label>
                        <Input id="tags" placeholder="Enter tags separated by commas" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="file" className="text-sm font-medium">File</label>
                        <div className="border-2 border-dashed rounded-md p-6 text-center">
                          <FileUp className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here, or click to browse</p>
                          <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, PPTX, MP3, MP4 (Max 50MB)</p>
                          <Input id="file" type="file" className="hidden" />
                          <Button variant="outline" size="sm" className="mt-4">
                            Browse Files
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsResourceDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleUploadResource}>Upload Resource</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search resources..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={resourceFilter} onValueChange={setResourceFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">Word (DOCX)</SelectItem>
                      <SelectItem value="pptx">PowerPoint</SelectItem>
                      <SelectItem value="mp3">Audio</SelectItem>
                      <SelectItem value="mp4">Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {resourceCategories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name} ({category.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResources.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No resources found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredResources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getResourceTypeIcon(resource.type)}
                              <div>
                                <p className="font-medium">{resource.title}</p>
                                <p className="text-xs text-muted-foreground">{resource.type} • {resource.size}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{resource.category}</TableCell>
                          <TableCell>{resource.author}</TableCell>
                          <TableCell>{new Date(resource.dateAdded).toLocaleDateString()}</TableCell>
                          <TableCell>{resource.downloads}</TableCell>
                          <TableCell>
                            <Badge variant={resource.visibility === 'public' ? 'default' : 'outline'}>
                              {resource.visibility === 'public' ? 'Public' : 'Restricted'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleDownloadResource(resource.id)}>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedResource(resource)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShareResource(resource.id)}>
                                  <Share2 className="mr-2 h-4 w-4" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setSelectedResource(resource)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteResource(resource.id)}
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
              
              {selectedResource && (
                <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Resource Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-muted rounded-md">
                            {getResourceTypeIcon(selectedResource.type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{selectedResource.title}</h3>
                            <p className="text-sm text-muted-foreground">{selectedResource.type} • {selectedResource.size}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Description</h4>
                          <p className="text-sm">{selectedResource.description}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedResource.tags.map((tag: string, index: number) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4 border-l pl-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Resource Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Category:</span>
                              <span>{selectedResource.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Author:</span>
                              <span>{selectedResource.author}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Date Added:</span>
                              <span>{new Date(selectedResource.dateAdded).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Downloads:</span>
                              <span>{selectedResource.downloads}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Visibility:</span>
                              <Badge variant={selectedResource.visibility === 'public' ? 'default' : 'outline'}>
                                {selectedResource.visibility === 'public' ? 'Public' : 'Restricted'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Button className="w-full" onClick={() => handleDownloadResource(selectedResource.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button variant="outline" className="w-full" onClick={() => handleShareResource(selectedResource.id)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge-base">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>
                    Create and manage articles, guides, and best practices
                  </CardDescription>
                </div>
                <Dialog open={isArticleDialogOpen} onOpenChange={setIsArticleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Create Article
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Create Knowledge Base Article</DialogTitle>
                      <DialogDescription>
                        Add a new article to the counseling knowledge base
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="article-title" className="text-sm font-medium">Title</label>
                        <Input id="article-title" placeholder="Article title" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="article-category" className="text-sm font-medium">Category</label>
                          <Select defaultValue="mental-health">
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {resourceCategories.map(category => (
                                <SelectItem key={category.id} value={category.name.toLowerCase().replace(/\s+/g, '-')}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="article-visibility" className="text-sm font-medium">Visibility</label>
                          <Select defaultValue="public">
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public (All Users)</SelectItem>
                              <SelectItem value="counselors-only">Counselors Only</SelectItem>
                              <SelectItem value="admin-only">Admin Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="article-content" className="text-sm font-medium">Content</label>
                        <div className="border rounded-md p-2">
                          <div className="flex items-center gap-1 border-b p-2">
                            <Button variant="ghost" size="sm">
                              <Bold className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Italic className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Underline className="h-4 w-4" />
                            </Button>
                            <Separator orientation="vertical" className="h-6 mx-1" />
                            <Button variant="ghost" size="sm">
                              <ListOrdered className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <List className="h-4 w-4" />
                            </Button>
                            <Separator orientation="vertical" className="h-6 mx-1" />
                            <Button variant="ghost" size="sm">
                              <Link className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Image className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <FileUp className="h-4 w-4" />
                            </Button>
                          </div>
                          <Textarea 
                            id="article-content" 
                            placeholder="Write your article content here..."
                            className="min-h-[300px] border-0 focus-visible:ring-0"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="article-attachments" className="text-sm font-medium">Attachments (Optional)</label>
                        <div className="border rounded-md p-4 text-center">
                          <Paperclip className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Drag and drop files to attach, or click to browse</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Add Attachments
                          </Button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsArticleDialogOpen(false)}>Cancel</Button>
                      <Button variant="outline">Save as Draft</Button>
                      <Button onClick={handleCreateArticle}>Publish Article</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search knowledge base..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {resourceCategories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    No articles found
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline">{article.category}</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                setSelectedArticle(article);
                                setIsViewArticleOpen(true);
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-500">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-base line-clamp-2 hover:underline cursor-pointer" onClick={() => {
                          setSelectedArticle(article);
                          setIsViewArticleOpen(true);
                        }}>
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{article.author.split(' ')[1][0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{article.author}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(article.datePublished).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{article.views} views</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center">
                            {getRatingStars(article.rating)}
                            <span className="text-xs ml-1">{article.rating}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="text-xs" onClick={() => {
                            setSelectedArticle(article);
                            setIsViewArticleOpen(true);
                          }}>
                            Read More
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
              
              {selectedArticle && (
                <Dialog open={isViewArticleOpen} onOpenChange={setIsViewArticleOpen}>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{selectedArticle.category}</Badge>
                        <div className="flex items-center gap-2">
                          <Badge variant={selectedArticle.visibility === 'public' ? 'default' : 'outline'}>
                            {selectedArticle.visibility === 'public' ? 'Public' : 'Restricted'}
                          </Badge>
                          <Button variant="ghost" size="icon">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Printer className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <DialogTitle className="text-xl">{selectedArticle.title}</DialogTitle>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{selectedArticle.author.split(' ')[1][0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{selectedArticle.author}</span>
                          <span className="text-xs text-muted-foreground">
                            Published: {new Date(selectedArticle.datePublished).toLocaleDateString()}
                          </span>
                          {selectedArticle.lastUpdated !== selectedArticle.datePublished && (
                            <span className="text-xs text-muted-foreground">
                              (Updated: {new Date(selectedArticle.lastUpdated).toLocaleDateString()})
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getRatingStars(selectedArticle.rating)}
                          <span className="text-sm">{selectedArticle.rating}</span>
                        </div>
                      </div>
                    </DialogHeader>
                    <ScrollArea className="flex-1 mt-4">
                      <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
                    </ScrollArea>
                    <div className="border-t mt-6 pt-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            Helpful
                          </Button>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            <span>{selectedArticle.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            Add Comment
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            Related Resources
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourceManagement;

// Helper components for the rich text editor
const Bold = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
  </svg>
);

const Italic = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="19" y1="4" x2="10" y2="4" />
    <line x1="14" y1="20" x2="5" y2="20" />
    <line x1="15" y1="4" x2="9" y2="20" />
  </svg>
);

const Underline = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
    <line x1="4" y1="21" x2="20" y2="21" />
  </svg>
);

const ListOrdered = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="10" y1="6" x2="21" y2="6" />
    <line x1="10" y1="12" x2="21" y2="12" />
    <line x1="10" y1="18" x2="21" y2="18" />
    <path d="M4 6h1v4" />
    <path d="M4 10h2" />
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
  </svg>
);

const List = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);