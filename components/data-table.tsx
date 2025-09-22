"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { useState } from "react"

const tableData = [
  {
    id: "INV001",
    customer: "John Doe",
    email: "john@example.com",
    status: "Paid",
    amount: "$250.00",
    date: "2024-01-15",
  },
  {
    id: "INV002",
    customer: "Jane Smith",
    email: "jane@example.com",
    status: "Pending",
    amount: "$150.00",
    date: "2024-01-14",
  },
  {
    id: "INV003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    status: "Unpaid",
    amount: "$350.00",
    date: "2024-01-13",
  },
  {
    id: "INV004",
    customer: "Alice Brown",
    email: "alice@example.com",
    status: "Paid",
    amount: "$450.00",
    date: "2024-01-12",
  },
  {
    id: "INV005",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    status: "Paid",
    amount: "$550.00",
    date: "2024-01-11",
  },
  {
    id: "INV006",
    customer: "Diana Davis",
    email: "diana@example.com",
    status: "Pending",
    amount: "$200.00",
    date: "2024-01-10",
  },
]

const recentActivity = [
  {
    user: "John Doe",
    action: "Created new invoice",
    time: "2 minutes ago",
    avatar: "JD",
  },
  {
    user: "Jane Smith",
    action: "Updated customer profile",
    time: "5 minutes ago",
    avatar: "JS",
  },
  {
    user: "Bob Johnson",
    action: "Processed payment",
    time: "10 minutes ago",
    avatar: "BJ",
  },
  {
    user: "Alice Brown",
    action: "Generated report",
    time: "15 minutes ago",
    avatar: "AB",
  },
  {
    user: "Charlie Wilson",
    action: "Updated settings",
    time: "20 minutes ago",
    avatar: "CW",
  },
]

export function DataTable() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Unpaid: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    }
    return variants[status as keyof typeof variants] || variants.Pending
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Data Table */}
      <Card className="lg:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("id")}
                      className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                    >
                      Invoice
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("customer")}
                      className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                    >
                      Customer
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("amount")}
                      className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                    >
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={row.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-card-foreground">{row.id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-card-foreground">{row.customer}</div>
                        <div className="text-sm text-muted-foreground">{row.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusBadge(row.status)}>{row.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-card-foreground">{row.amount}</div>
                      <div className="text-sm text-muted-foreground">{row.date}</div>
                    </td>
                    <td className="py-4 px-4">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{activity.user}</p>
                  <p className="text-sm text-muted-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
