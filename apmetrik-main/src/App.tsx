import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicPlayerProvider } from "@/contexts/MusicPlayerContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PlayerBar } from "@/components/PlayerBar";
import { DragBar } from "@/components/ui/dragbar"
import Index from "./pages/Index";
import Library from "./pages/Library";
import Playlists from "./pages/Playlists";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MusicPlayerProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <DragBar />
            <div className="min-h-screen flex w-full bg-background">
              <AppSidebar />
              <main className="flex-1 flex flex-col relative">
                <div className="flex-1 p-6 pb-24 overflow-auto">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/playlists" element={<Playlists />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/listening" element={<Analytics />} />
                    <Route path="/focus" element={<Analytics />} />
                    <Route path="/platforms" element={<Settings />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                  <div className="absolute bottom-0 left-0 right-0">
                    <PlayerBar />
                  </div>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </MusicPlayerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;