"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Filter, MoreHorizontal, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const orderData = [
  {
    id: "#CM9801",
    user: {
      name: "Natali Craig",
      avatar: "/users/natali-craig.svg",
      initials: "NC",
    },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    statusColor: "text-blue-500",
    dotColor: "bg-blue-500",
  },
  {
    id: "#CM9802",
    user: {
      name: "Kate Morrison",
      avatar: "/users/kate-morrison.svg",
      initials: "KM",
    },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    statusColor: "text-green-500",
    dotColor: "bg-green-500",
  },
  {
    id: "#CM9803",
    user: {
      name: "Drew Cano",
      avatar: "/users/drew-cano.svg",
      initials: "DC",
    },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    statusColor: "text-orange-500",
    dotColor: "bg-orange-500",
  },
  {
    id: "#CM9804",
    user: {
      name: "Orlando Diggs",
      avatar: "/users/orlando-diggs.svg",
      initials: "OD",
    },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
  },
  {
    id: "#CM9805",
    user: {
      name: "Andi Lane",
      avatar: "/users/andi-lane.svg",
      initials: "AL",
    },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    statusColor: "text-red-500",
    dotColor: "bg-red-500",
  },
  {
    id: "#CM9801",
    user: {
      name: "Natali Craig",
      avatar: "/users/natali-craig.svg",
      initials: "NC",
    },
    project: "Landing Page",
    address: "Meadow Lane Oakland",
    date: "Just now",
    status: "In Progress",
    statusColor: "text-blue-500",
    dotColor: "bg-blue-500",
  },
  {
    id: "#CM9802",
    user: {
      name: "Kate Morrison",
      avatar: "/users/kate-morrison.svg",
      initials: "KM",
    },
    project: "CRM Admin pages",
    address: "Larry San Francisco",
    date: "A minute ago",
    status: "Complete",
    statusColor: "text-green-500",
    dotColor: "bg-green-500",
  },
  {
    id: "#CM9803",
    user: {
      name: "Drew Cano",
      avatar: "/users/drew-cano.svg",
      initials: "DC",
    },
    project: "Client Project",
    address: "Bagwell Avenue Ocala",
    date: "1 hour ago",
    status: "Pending",
    statusColor: "text-orange-500",
    dotColor: "bg-orange-500",
  },
  {
    id: "#CM9804",
    user: {
      name: "Orlando Diggs",
      avatar: "/users/orlando-diggs.svg",
      initials: "OD",
    },
    project: "Admin Dashboard",
    address: "Washburn Baton Rouge",
    date: "Yesterday",
    status: "Approved",
    statusColor: "text-yellow-500",
    dotColor: "bg-yellow-500",
  },
  {
    id: "#CM9805",
    user: {
      name: "Andi Lane",
      avatar: "/users/andi-lane.svg",
      initials: "AL",
    },
    project: "App Landing Page",
    address: "Nest Lane Olivette",
    date: "Feb 2, 2023",
    status: "Rejected",
    statusColor: "text-red-500",
    dotColor: "bg-red-500",
  },
];

export function OrderList() {
  return (
    <motion.div 
      className="space-y-4 w-full max-w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <div className="flex items-center space-x-2">
          <h1 className="text-sm font-bold text-foreground">Order List</h1>
        </div>
      </motion.div>

      {/* Actions Bar */}
      <motion.div 
        className="flex items-center justify-between flex-wrap gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
              <Plus className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
              <Filter className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
          <Input
            placeholder="Search"
            className="pl-8 w-48 sm:w-64 h-7 text-xs bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </motion.div>
      </motion.div>

      {/* Order Table */}
      <motion.div 
        className="w-full overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="h-10 border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 w-10">
                  <input type="checkbox" className="w-3 h-3 accent-primary" />
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 min-w-[80px]">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 min-w-[150px]">
                  User
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 min-w-[120px]">
                  Project
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 min-w-[150px]">
                  Address
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 min-w-[100px]">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 min-w-[100px]">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-2 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <motion.tr
                  key={`${order.id}-${index}`}
                  className={cn(
                    "hover:bg-muted/20 h-8 border-b border-border transition-colors cursor-pointer",
                    index === 2 && "bg-muted/30"
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.03), duration: 0.3 }}
                  whileHover={{ backgroundColor: "hsl(var(--muted) / 0.1)" }}
                >
                  <td className="px-3 py-1">
                    <input
                      type="checkbox"
                      className="w-3 h-3 accent-primary"
                      defaultChecked={index === 3}
                    />
                  </td>
                  <td className="px-3 py-1">
                    <span className="font-medium text-foreground text-xs whitespace-nowrap">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-3 py-1">
                    <div className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Avatar className="w-5 h-5 flex-shrink-0">
                          <AvatarImage
                            src={order.user.avatar}
                            alt={order.user.name}
                          />
                          <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground">
                            {order.user.initials}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-foreground leading-tight truncate">
                          {order.user.name}
                        </div>
                        <div className="text-xs text-muted-foreground leading-tight">
                          User
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-1">
                    <span className="text-xs text-foreground truncate block">
                      {order.project}
                    </span>
                  </td>
                  <td className="px-3 py-1">
                    <span className="text-xs text-muted-foreground truncate block">
                      {order.address}
                    </span>
                  </td>
                  <td className="px-3 py-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {order.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-1">
                    <div
                      className={cn(
                        "flex items-center space-x-1",
                        order.statusColor
                      )}
                    >
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          order.dotColor
                        )}
                      ></div>
                      <span className="text-xs font-medium whitespace-nowrap">
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-1">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button variant="ghost" size="sm" className="w-5 h-5 p-0 text-muted-foreground hover:text-foreground">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </motion.div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div 
        className="flex items-center justify-between flex-wrap gap-2 pt-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="text-xs text-muted-foreground">
          Showing 1 to 10 of 10 entries
        </div>
        <div className="flex items-center space-x-1">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="h-7 w-7 p-0 text-xs text-muted-foreground"
            >
              ←
            </Button>
          </motion.div>
          {[1, 2, 3, 4, 5].map((page) => (
            <motion.div 
              key={page}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={page === 1 ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-7 w-7 p-0 text-xs",
                  page === 1 
                    ? "bg-foreground text-background" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {page}
              </Button>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-xs text-muted-foreground hover:text-foreground">
              →
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
