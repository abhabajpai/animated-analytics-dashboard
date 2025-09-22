"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { memo } from "react"
import { motion } from "framer-motion"

const metrics = [
  {
    title: "Customers",
    value: "3,781",
    change: "+11.01%",
    changeType: "positive" as const,
    icon: Users,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  {
    title: "Orders",
    value: "1,219",
    change: "-0.03%",
    changeType: "negative" as const,
    icon: ShoppingCart,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  },
  {
    title: "Revenue",
    value: "$695",
    change: "+15.03%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
  },
  {
    title: "Growth",
    value: "30.1%",
    change: "+6.08%",
    changeType: "positive" as const,
    icon: BarChart3,
    color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  },
]

export const MetricsCards = memo(function MetricsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-2">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ 
            y: -2,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 mb-1 mx-1 sm:mx-3 cursor-pointer">
            <CardContent className="p-2">
              <div className="flex items-center justify-between mb-2">
                <motion.div 
                  className={cn("p-1 rounded-md", metric.color)}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div>
                <p className="text-m font-bold text-bold-foreground mb-2">{metric.title}</p>
                <div className="flex items-center justify-between">
                  <motion.p 
                    className="text-lg font-semibold text-card-foreground mb-0.5"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {metric.value}
                  </motion.p>
                  <motion.div 
                    className="flex items-center space-x-2 text-s"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={cn("font-medium", metric.changeType === "positive" ? "text-green-500" : "text-red-500")}>
                      {metric.change}
                    </span>
                    <motion.div
                      animate={{ 
                        y: metric.changeType === "positive" ? [0, -2, 0] : [0, 2, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      {metric.changeType === "positive" ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
})

