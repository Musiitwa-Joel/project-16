import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { toast } = useToast();

  // Simulate login notification for demo purposes
  useEffect(() => {
    setTimeout(() => {
      toast({
        title: "Welcome back, Admin",
        description: "You have 5 pending appointment requests",
      });
    }, 1000);
  }, [toast]);

  return (
    <ThemeProvider defaultTheme="light" storageKey="nkumba-theme">
      <div className="min-h-screen bg-background">
        <div className="flex h-screen overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">
              <Dashboard />
            </main>
          </div>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;