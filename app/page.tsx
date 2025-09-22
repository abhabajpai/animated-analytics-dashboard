"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MetricsCards } from "@/components/metrics-cards";
import { ChartsSection } from "@/components/charts-section";
import { OrderList } from "@/components/order-list";
import { MobileSidebar } from "@/components/mobile-sidebar";
import { NotificationsPanel } from "@/components/notifications-panel";
import { ProjectionsChart } from "@/components/projections-chart";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

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
      <div className={`min-h-screen bg-background ${darkMode ? "dark" : ""}`}>
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
            <Sidebar onViewChange={setCurrentView} />
          </div>

          {/* Mobile Sidebar */}
          <MobileSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onViewChange={setCurrentView}
          />

          <div className="flex flex-col flex-1 min-w-0">
          <Header
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onMenuClick={() => setSidebarOpen(true)}
            onNotificationsClick={() => setNotificationsOpen(true)}
          />

          <div className="flex flex-1">
            <main className={`flex-1 overflow-x-hidden ${currentView === "dashboard" ? "p-4 lg:p-1" : "p-4 lg:p-6"}`}>
              <AnimatePresence mode="wait">
                {currentView === "dashboard" ? (
                  <motion.div
                    key="dashboard"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="space-y-4 lg:space-y-2"
                  >
                    {/* Mobile and Desktop Grid Layout */}
                    <motion.div 
                      className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                    >
                      <motion.div 
                        className="w-full"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <MetricsCards />
                      </motion.div>
                      <motion.div 
                        className="w-full"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <ProjectionsChart />
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      className="w-full"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <ChartsSection />
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="orders"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                    className="w-full"
                  >
                    <OrderList />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>
            
            {/* Desktop Notifications Panel - Show on large screens and up for dashboard view */}
            {currentView === "dashboard" && (
              <div className="hidden lg:block">
                <NotificationsPanel />
              </div>
            )}
          </div>
          </div>
          
          {/* Mobile Notifications Panel */}
          <NotificationsPanel 
            isMobile={true}
            isOpen={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />
        </div>
      </div>
    </>
  );
}
