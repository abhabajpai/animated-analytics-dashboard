"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Bug, UserPlus, Upload, Edit, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const notifications = [
  {
    id: 1,
    type: "bug",
    title: "You have a bug that needs...",
    time: "Just now",
    icon: Bug,
    color: "text-red-500",
  },
  {
    id: 2,
    type: "user",
    title: "New user registered",
    time: "59 minutes ago",
    icon: UserPlus,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "bug",
    title: "You have a bug that needs...",
    time: "12 hours ago",
    icon: Bug,
    color: "text-red-500",
  },
  {
    id: 4,
    type: "subscription",
    title: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM",
    icon: Bell,
    color: "text-green-500",
  },
]

const activities = [
  {
    id: 1,
    title: "You have a bug that needs...",
    time: "Just now",
    avatar: "/users/activity-1.svg",
    user: "User 1",
  },
  {
    id: 2,
    title: "Released a new version",
    time: "59 minutes ago",
    avatar: "/users/activity-2.svg",
    user: "User 2",
  },
  {
    id: 3,
    title: "Submitted a bug",
    time: "12 hours ago",
    avatar: "/users/activity-3.svg",
    user: "User 3",
  },
  {
    id: 4,
    title: "Modified A data in Page X",
    time: "Today, 11:59 AM",
    avatar: "/users/activity-4.svg",
    user: "User 4",
  },
  {
    id: 5,
    title: "Deleted a page in Project X",
    time: "Feb 2, 2023",
    avatar: "/users/activity-5.svg",
    user: "User 5",
  },
]

const contacts = [
  { name: "Natali Craig", avatar: "/users/natali-craig.svg" },
  { name: "Drew Cano", avatar: "/users/drew-cano.svg" },
  { name: "Orlando Diggs", avatar: "/users/orlando-diggs.svg" },
  { name: "Andi Lane", avatar: "/users/andi-lane.svg" },
  { name: "Kate Morrison", avatar: "/users/kate-morrison.svg" },
  { name: "Koray Okumus", avatar: "/users/template-user.svg" },
]

interface NotificationsPanelProps {
  isMobile?: boolean
  isOpen?: boolean
  onClose?: () => void
}

export function NotificationsPanel({ isMobile = false, isOpen = true, onClose }: NotificationsPanelProps) {
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile Overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50 lg:hidden" 
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Mobile Notifications Panel */}
            <motion.div
              className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-background border-l border-border z-50 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <motion.div 
                  className="flex items-center justify-between p-4 border-b border-border"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="icon" onClick={onClose}>
                      <X className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Mobile Content */}
                <motion.div 
                  className="flex-1 p-4 space-y-6 overflow-y-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <NotificationContent />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  }

  return (
    <motion.div 
      className="w-80 bg-background border-l border-border p-4 space-y-6 overflow-y-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <NotificationContent />
    </motion.div>
  )
}

function NotificationContent() {
  return (
    <>
      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-foreground">Notifications</h3>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
              whileHover={{ x: 2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className={`p-1.5 rounded-full bg-muted ${notification.color}`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <notification.icon className="w-4 h-4" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">Activities</h3>
        <div className="space-y-2">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="flex items-center space-x-3 py-1.5 px-1 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.05), duration: 0.3 }}
              whileHover={{ x: 2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar className="w-9 h-9 flex-shrink-0">
                  <AvatarImage src={activity.avatar} alt={activity.user} />
                  <AvatarFallback className="text-xs font-medium">
                    {activity.user.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-tight truncate">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contacts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <h3 className="text-lg font-semibold mb-3 text-foreground">Contacts</h3>
        <div className="space-y-2">
          {contacts.map((contact, index) => (
            <motion.div 
              key={index} 
              className="flex items-center space-x-3 py-1.5 px-1 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (index * 0.05), duration: 0.3 }}
              whileHover={{ x: 2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar className="w-9 h-9 flex-shrink-0">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback className="text-xs font-medium">
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <p className="text-sm font-medium text-foreground leading-tight">{contact.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
