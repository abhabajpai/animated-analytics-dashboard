"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { LoadingScreen, useLoadingState } from "@/components/loading-screen";

// Lazy load heavy components for better performance
const MetricsCards = lazy(() => import("@/components/metrics-cards").then(m => ({ default: m.MetricsCards })));
const ChartsSection = lazy(() => import("@/components/charts-section").then(m => ({ default: m.ChartsSection })));
const OrderList = lazy(() => import("@/components/order-list").then(m => ({ default: m.OrderList })));
const NotificationsPanel = lazy(() => import("@/components/notifications-panel").then(m => ({ default: m.NotificationsPanel })));
const ProjectionsChart = lazy(() => import("@/components/projections-chart").then(m => ({ default: m.ProjectionsChart })));

// Loading fallback component
const ComponentLoader = () => (
  <div className="flex items-center justify-center p-4">
    <div className="w-6 h-6 border-2 border-muted border-t-primary rounded-full animate-spin"></div>
  </div>
);

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const { isLoading } = useLoadingState();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Manage body and html classes for loading state
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('loading-state');
      document.documentElement.classList.add('loading-state');
    } else {
      // Delay removal to ensure smooth transition
      const timer = setTimeout(() => {
        document.body.classList.remove('loading-state');
        document.documentElement.classList.remove('loading-state');
      }, 100);
      return () => clearTimeout(timer);
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('loading-state');
      document.documentElement.classList.remove('loading-state');
    };
  }, [isLoading]);

  // Animation variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.4
  };

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />
      
      <div className={`min-h-screen bg-background ${darkMode ? "dark" : ""}`}>
        <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
                  <Sidebar onViewChange={setCurrentView} currentView={currentView} />
                </div>

          {/* Mobile Sidebar */}
          <MobileSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onViewChange={setCurrentView}
            currentView={currentView}
          />

          <div className="flex flex-col flex-1 min-w-0">
          <Header
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onMenuClick={() => setSidebarOpen(true)}
            onNotificationsClick={() => setNotificationsOpen(true)}
          />

          <div className="flex flex-1">
            <main className={`flex-1 overflow-x-hidden ${currentView === "dashboard" ? "p-4 lg:p-1" : "p-4 lg:p-6"} ${isLoading ? 'overflow-hidden' : ''}`}>
              <AnimatePresence mode="wait">
                {!isLoading && currentView === "dashboard" ? (
                  <div className="space-y-4 lg:space-y-2">
                    {/* Mobile and Desktop Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                      <div className="w-full">
                        <Suspense fallback={<ComponentLoader />}>
                        <MetricsCards />
                        </Suspense>
                      </div>
                      <div className="w-full">
                        <Suspense fallback={<ComponentLoader />}>
                        <ProjectionsChart />
                        </Suspense>
                      </div>
                    </div>

                    <div className="w-full">
                      <Suspense fallback={<ComponentLoader />}>
                      <ChartsSection />
                      </Suspense>
                    </div>
                  </div>
                ) : !isLoading && currentView === "orders" ? (
                  <div className="w-full">
                    <Suspense fallback={<ComponentLoader />}>
                    <OrderList />
                    </Suspense>
                  </div>
                ) : null}
              </AnimatePresence>
            </main>
            
            {/* Desktop Notifications Panel - Show on large screens and up for dashboard view */}
            {currentView === "dashboard" && (
              <div className="hidden lg:block">
                <Suspense fallback={<ComponentLoader />}>
                <NotificationsPanel />
                </Suspense>
              </div>
            )}
          </div>
          </div>
          
          {/* Mobile Notifications Panel */}
          <Suspense fallback={null}>
          <NotificationsPanel 
            isMobile={true}
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />
          </Suspense>
        </div>
      </div>
    </>
  );
}
