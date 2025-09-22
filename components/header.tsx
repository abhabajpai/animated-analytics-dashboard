"use client"

import { Bell, Search, Sun, Moon, User, Menu, Star, RotateCcw, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
  onMenuClick: () => void
  onNotificationsClick?: () => void
}

export function Header({ darkMode, toggleDarkMode, onMenuClick, onNotificationsClick }: HeaderProps) {
  return (
    <motion.header 
      className="bg-card border-b border-border px-3 sm:px-4 lg:px-6 py-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          {/* Mobile menu button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden text-muted-foreground hover:text-foreground flex-shrink-0"
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-1 sm:space-x-2 min-w-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <motion.div
              whileHover={{ rotate: 72, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Star className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </motion.div>
            <span className="text-sm text-muted-foreground hidden sm:inline">Dashboards</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">/</span>
            <span className="text-sm font-medium text-foreground truncate">Default</span>
          </motion.div>
        </div>

        <motion.div 
          className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <motion.div 
            className="relative hidden md:block"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search" className="pl-10 w-48 lg:w-64 bg-background border-border text-sm h-9" />
          </motion.div>

          {/* Mobile search button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground">
              <Search className="w-4 h-4" />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Settings className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="icon" className="hidden sm:flex text-muted-foreground hover:text-foreground">
              <motion.div
                whileHover={{ rotate: -180 }}
                transition={{ duration: 0.4 }}
              >
                <RotateCcw className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-muted-foreground hover:text-foreground"
            >
              <motion.div
                key={darkMode ? 'sun' : 'moon'}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground relative"
              onClick={onNotificationsClick}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Bell className="w-4 h-4" />
              </motion.div>
              <motion.span 
                className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <User className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.header>
  )
}
