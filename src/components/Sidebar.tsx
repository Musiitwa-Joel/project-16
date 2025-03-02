import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  FileText, 
  Settings, 
  Shield, 
  HelpCircle,
  BookOpen,
  LogOut
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  isOpen: boolean;
  badge?: number;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, isActive, isOpen, badge, onClick }: SidebarItemProps) => {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-2 mb-1",
        isActive ? "bg-secondary" : "hover:bg-secondary/50",
        !isOpen && "px-2"
      )}
      onClick={onClick}
    >
      {icon}
      {isOpen && (
        <span className="flex-1 text-left">{label}</span>
      )}
      {isOpen && badge && (
        <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1">
          {badge}
        </span>
      )}
    </Button>
  );
};

export function Sidebar({ isOpen }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const { toast } = useToast();

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    toast({
      title: `Navigated to ${item}`,
      description: `You are now viewing the ${item} section`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <div
      className={cn(
        "border-r bg-card h-full flex flex-col transition-all duration-300",
        isOpen ? "w-64" : "w-14"
      )}
    >
      <div className={cn(
        "p-4 flex items-center gap-2",
        !isOpen && "justify-center"
      )}>
        {isOpen ? (
          <>
            <BookOpen className="h-6 w-6 text-primary" />
            <div className="font-semibold text-lg">Nkumba Counseling</div>
          </>
        ) : (
          <BookOpen className="h-6 w-6 text-primary" />
        )}
      </div>
      <Separator />
      
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <SidebarItem 
              icon={<LayoutDashboard className="h-5 w-5" />} 
              label="Dashboard" 
              isActive={activeItem === 'dashboard'} 
              isOpen={isOpen}
              onClick={() => handleItemClick('dashboard')}
            />
            <SidebarItem 
              icon={<Users className="h-5 w-5" />} 
              label="User Management" 
              isActive={activeItem === 'users'} 
              isOpen={isOpen}
              onClick={() => handleItemClick('users')}
            />
            <SidebarItem 
              icon={<Calendar className="h-5 w-5" />} 
              label="Appointments" 
              isActive={activeItem === 'appointments'} 
              isOpen={isOpen}
              badge={5}
              onClick={() => handleItemClick('appointments')}
            />
            <SidebarItem 
              icon={<BarChart3 className="h-5 w-5" />} 
              label="Reports & Analytics" 
              isActive={activeItem === 'reports'} 
              isOpen={isOpen}
              onClick={() => handleItemClick('reports')}
            />
            <SidebarItem 
              icon={<MessageSquare className="h-5 w-5" />} 
              label="Communication" 
              isActive={activeItem === 'communication'} 
              isOpen={isOpen}
              badge={3}
              onClick={() => handleItemClick('communication')}
            />
            <SidebarItem 
              icon={<FileText className="h-5 w-5" />} 
              label="Resources" 
              isActive={activeItem === 'resources'} 
              isOpen={isOpen}
              onClick={() => handleItemClick('resources')}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-1">
            <SidebarItem 
              icon={<Settings className="h-5 w-5" />} 
              label="Settings" 
              isActive={activeItem === 'settings'} 
              isOpen={isOpen}
              onClick={() => handleItemClick('settings')}
            />
            <SidebarItem 
              icon={<Shield className="h-5 w-5" />} 
              label="Security & Audit" 
              isActive={activeItem === 'security'} 
              isOpen={isOpen}
              onClick={() => handleItemClick('security')}
            />
            <SidebarItem 
              icon={<HelpCircle className="h-5 w-5" />} 
              label="Help & Support" 
              isActive={activeItem === 'help'} 
              isOpen={isOpen}
              onClick={() => handleItemClick('help')}
            />
          </div>
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        {isOpen ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">Jane Doe</span>
              <span className="text-xs text-muted-foreground">Super Admin</span>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-center">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}