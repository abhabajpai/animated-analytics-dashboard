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
  isClickable?: boolean; // New property to control clickability
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Favorites",
    items: [
      { icon: Home, label: "Overview", hasSubmenu: false, isClickable: false },
      { icon: FolderOpen, label: "Projects", hasSubmenu: false, isClickable: false },
    ],
  },
  {
    title: "Recently",
    items: [
      { icon: Home, label: "Overview", hasSubmenu: false, isClickable: false },
      { icon: FolderOpen, label: "Projects", hasSubmenu: false, isClickable: false },
    ],
  },
  {
    title: "Dashboards",
    items: [
      { icon: Home, label: "Default", hasSubmenu: false, isClickable: true },
      { icon: BarChart3, label: "eCommerce", hasSubmenu: false, isClickable: true },
      { icon: FolderOpen, label: "Projects", hasSubmenu: false, isClickable: false },
      { icon: BookOpen, label: "Online Courses", hasSubmenu: false, isClickable: false },
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
        isClickable: true,
      },
      { icon: CreditCard, label: "Account", hasSubmenu: false, isClickable: false },
      { icon: Building2, label: "Corporate", hasSubmenu: false, isClickable: false },
      { icon: FileText, label: "Blog", hasSubmenu: false, isClickable: false },
      { icon: Share2, label: "Social", hasSubmenu: false, isClickable: false },
    ],
  },
]

interface SidebarProps {
  onViewChange?: (view: string) => void;
  currentView?: string; // New prop to track current view
}

export function Sidebar({ onViewChange, currentView = "dashboard" }: SidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [activeSubmenuItem, setActiveSubmenuItem] = useState<string | null>(null)

  // Determine active item based on current view
  const getActiveItem = () => {
    if (currentView === "dashboard") return "Default"
    if (currentView === "orders") return "eCommerce"
    return "Default" // fallback
  }

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
          <div key={section.title} className="mb-5">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-1">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <li key={item.label}>
                  <div>
                    <button
                      onClick={() => {
                        // Only handle clicks for clickable items
                        if (!item.isClickable && !item.hasSubmenu) return
                        
                        if (item.hasSubmenu) {
                          toggleSubmenu(item.label)
                        } else if (item.isClickable) {
                          // Handle view changes for clickable items only
                          if (item.label === "eCommerce" && onViewChange) {
                            onViewChange("orders")
                          } else if (item.label === "Default" && onViewChange) {
                            onViewChange("dashboard")
                          }
                        }
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors duration-200",
                        getActiveItem() === item.label
                          ? "bg-foreground text-background"
                          : item.isClickable || item.hasSubmenu
                          ? "text-muted-foreground hover:text-foreground hover:bg-muted/20 cursor-pointer"
                          : "text-muted-foreground/60 cursor-default",
                      )}
                      disabled={!item.isClickable && !item.hasSubmenu}
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.hasSubmenu && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            expandedMenus.includes(item.label) ? "rotate-180" : "",
                          )}
                        />
                      )}
                    </button>

                    {/* Submenu */}
                    {item.hasSubmenu && expandedMenus.includes(item.label) && (
                      <ul className="ml-6 mt-1 space-y-0.5 transition-all duration-200 ease-in-out">
                        {item.submenu?.map((subItem, subIndex) => (
                          <li key={subItem}>
                            <button
                              onClick={() => setActiveSubmenuItem(subItem)}
                              className={cn(
                                "w-full text-left px-2 py-1 rounded-md text-sm transition-colors duration-200",
                                activeSubmenuItem === subItem
                                  ? "text-foreground bg-muted/30"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/10",
                              )}
                            >
                              {subItem}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}
