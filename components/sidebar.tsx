"use client"

import {
  Home,
  FolderOpen,
  BarChart3,
  BookOpen,
  User,
  Building2,
  Briefcase,
  MessageSquare,
  Users,
  ChevronDown,
  CreditCard,
  FileText,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface MenuItem {
  icon: React.ComponentType<any>;
  label: string;
  hasSubmenu: boolean;
  isActive?: boolean;
  submenu?: string[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Favorites",
    items: [
      { icon: Home, label: "Overview", hasSubmenu: false },
      { icon: FolderOpen, label: "Projects", hasSubmenu: false },
    ],
  },
  {
    title: "Recently",
    items: [
      { icon: Home, label: "Overview", hasSubmenu: false },
      { icon: FolderOpen, label: "Projects", hasSubmenu: false },
    ],
  },
  {
    title: "Dashboards",
    items: [
      { icon: Home, label: "Default", hasSubmenu: false, isActive: true },
      { icon: BarChart3, label: "eCommerce", hasSubmenu: false },
      { icon: FolderOpen, label: "Projects", hasSubmenu: false },
      { icon: BookOpen, label: "Online Courses", hasSubmenu: false },
    ],
  },
  {
    title: "Pages",
    items: [
      {
        icon: User,
        label: "User Profile",
        hasSubmenu: true,
        submenu: ["Overview", "Projects", "Campaigns", "Documents", "Followers"],
      },
      { icon: CreditCard, label: "Account", hasSubmenu: false },
      { icon: Building2, label: "Corporate", hasSubmenu: false },
      { icon: FileText, label: "Blog", hasSubmenu: false },
      { icon: Share2, label: "Social", hasSubmenu: false },
    ],
  },
]

interface SidebarProps {
  onViewChange?: (view: string) => void
}

export function Sidebar({ onViewChange }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("Default")
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    )
  }

  return (
    <div className="w-64 bg-background border-r border-border h-screen flex flex-col sticky top-0">
      {/* User Profile Section */}
      <div className="px-4 py-5 border-b border-border flex-shrink-0">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-background" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            ByeWind
          </span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
        {menuSections.map((section, sectionIndex) => (
          <motion.div 
            key={section.title} 
            className="mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sectionIndex * 0.1, duration: 0.3 }}
          >
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <motion.li 
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05), duration: 0.3 }}
                >
                  <div>
                    <motion.button
                      onClick={() => {
                        setActiveItem(item.label)
                        if (item.hasSubmenu) {
                          toggleSubmenu(item.label)
                        } else {
                          // Handle view changes
                          if (item.label === "eCommerce" && onViewChange) {
                            onViewChange("orders")
                          } else if (item.label === "Default" && onViewChange) {
                            onViewChange("dashboard")
                          }
                        }
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-all duration-200",
                        activeItem === item.label || item.isActive
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/20",
                      )}
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                        </motion.div>
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.hasSubmenu && (
                        <motion.div
                          animate={{ 
                            rotate: expandedMenus.includes(item.label) ? 180 : 0 
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {item.hasSubmenu && expandedMenus.includes(item.label) && (
                        <motion.ul 
                          className="ml-6 mt-1 space-y-0.5 overflow-hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {item.submenu?.map((subItem, subIndex) => (
                            <motion.li 
                              key={subItem}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                            >
                              <motion.button
                                onClick={() => setActiveItem(subItem)}
                                className={cn(
                                  "w-full text-left px-2 py-1 rounded-md text-sm transition-all duration-200",
                                  activeItem === subItem
                                    ? "text-foreground bg-muted/30"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/10",
                                )}
                                whileHover={{ x: 2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                              >
                                {subItem}
                              </motion.button>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </nav>
    </div>
  )
}
