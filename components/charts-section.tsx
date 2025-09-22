"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { memo, useMemo } from "react"
import { motion } from "framer-motion"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const projectionsData = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 30 },
  { name: "May", value: 35 },
  { name: "Jun", value: 25 },
]

const salesData = [

  { name: "Affiliate", value: 135.18, color: "#A7D2A9" },
    { name: "Direct", value: 300.56, color: "#000000" },
  { name: "Sponsored", value: 154.02, color: "#A7BFFF" },
  { name: "E-mail", value: 48.96, color: "#B1E3FF" },
]

const revenueData = [
  { name: "Jan", current: 12000000, previous: 8000000 },
  { name: "Feb", current: 9000000, previous: 15000000 },
  { name: "Mar", current: 11000000, previous: 13000000 },
  { name: "Apr", current: 16000000, previous: 12000000 },
  { name: "May", current: 20000000, previous: 17000000 },
  { name: "Jun", current: 19000000, previous: 23000000 },
]



const locationData = [
  { name: "New York", value: 72 },
  { name: "San Francisco", value: 39 },
  { name: "Sydney", value: 25 },
  { name: "Singapore", value: 61 },
];



const productsData = [
  { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
  { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
  { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
  { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
  { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
]

// Test with simple approach - just add the current line back
const testRevenueData = [
  { name: "Jan", current: 12000000, previous: 8000000 },
  { name: "Feb", current: 9000000, previous: 15000000 },
  { name: "Mar", current: 11000000, previous: 13000000 },
  { name: "Apr", current: 16000000, previous: 12000000 },
  { name: "May", current: 20000000, previous: 17000000 },
  { name: "Jun", current: 19000000, previous: 23000000 },
]

export const ChartsSection = memo(function ChartsSection() {
  // Memoize chart data to prevent unnecessary recalculations
  const memoizedRevenueData = useMemo(() => testRevenueData, [])
  const memoizedSalesData = useMemo(() => salesData, [])
  const memoizedLocationData = useMemo(() => locationData, [])
  const memoizedProductsData = useMemo(() => productsData, [])

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* First Row - eCommerce Header */}
      {/* <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">eCommerce</h2>
      </div> */}

      {/* Second Row - Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Revenue Card - 2/3 Width */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          whileHover={{ y: -2 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-1">
              <div className="flex items-center space-x-6 space-between">
                <CardTitle className="text-base font-medium text-card-foreground">Revenue</CardTitle>
                <div className="flex items-center space-x-6 text-sm">
                  <span className="flex items-center text-muted-foreground h-6">|</span>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-black dark:bg-[#ABC5DA]"></span>
                    <span className="text-muted-foreground">Current Week</span>
                    <span className="font-semibold text-card-foreground">$58,211</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ABC5DA' }}></span>
                    <span className="text-muted-foreground">Previous Week</span>
                    <span className="font-semibold text-card-foreground">$68,768</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Height reduced proportionally */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={memoizedRevenueData} className="[&_.recharts-line.current-week-line]:dark:stroke-[#ABC5DA]">
                    <CartesianGrid 
                      vertical={false} 
                      stroke="hsl(var(--border))" 
                      strokeOpacity={0.2}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      className="[&_text]:fill-muted-foreground"
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      domain={[0, 30000000]}
                      ticks={[0, 10000000, 20000000, 30000000]}
                      tickFormatter={(value) => `${value / 1_000_000}M`}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      className="[&_text]:fill-muted-foreground"
                    />
                    {/* Previous Week Line - Using Location Bar Color */}
                    <Line
                      type="monotone"
                      dataKey="previous"
                      stroke="#ABC5DA"
                      strokeWidth={3}
                      dot={false}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      activeDot={false}
                    />
                    {/* Current Week Line - Black in light, light blue in dark */}
                    <Line
                      type="monotone"
                      dataKey="current"
                      stroke="#000000"
                      strokeWidth={3}
                      dot={false}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      activeDot={false}
                      className="current-week-line"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Revenue by Location Card - 1/3 Width */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ y: -2 }}
        >
          <Card className="bg-card border-border flex flex-col justify-center">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-card-foreground p-0">
                Revenue by Location
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center justify-center space-y-8">
              {/* Map */}
              <motion.div 
                className="relative w-36 aspect-[154/84] rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/World Map.png"
                  alt="World Map"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Revenue List with Bars */}
              <div className="w-full space-y-3">
                {memoizedLocationData.map((location, index) => {
                  const percentage = Math.min((location.value / 100) * 100, 100);
                  return (
                    <motion.div 
                      key={index} 
                      className="space-y-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1), duration: 0.4 }}
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{location.name}</span>
                        <span className="font-medium text-card-foreground">
                          {location.value.toLocaleString()}K
                        </span>
                      </div>
                      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: '#ABC5DA',
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.6 + (index * 0.1), duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>



      {/* Third Row - Revenue Chart and Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ y: -2 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium text-card-foreground">Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Name</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Price</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Quantity</th>
                      <th className="text-left text-sm font-medium text-muted-foreground pb-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memoizedProductsData.map((product, index) => (
                      <motion.tr 
                        key={index} 
                        className="border-b border-border last:border-b-0"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (index * 0.05), duration: 0.3 }}
                        whileHover={{ backgroundColor: "hsl(var(--muted) / 0.1)" }}
                      >
                        <td className="py-3 text-sm text-card-foreground">{product.name}</td>
                        <td className="py-3 text-sm text-card-foreground">{product.price}</td>
                        <td className="py-3 text-sm text-card-foreground">{product.quantity}</td>
                        <td className="py-3 text-sm font-medium text-card-foreground">{product.amount}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Total Sales */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ y: -2 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-medium text-card-foreground">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative flex items-center justify-center mb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <ResponsiveContainer width={150} height={150}>
                    <PieChart>
                      <Pie
                        data={memoizedSalesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        startAngle={81}
                        endAngle={-270}
                        paddingAngle={2}
                        dataKey="value"
                        // Add spacing between cuts  
                        cornerRadius={5}
                      >
                        {salesData.map((entry, index) => (
                          <Cell key={`cell - ${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Precise Label Position on Direct Slice */}
                <motion.div
                  className="absolute font-medium text-xs px-2.5 py-2 rounded-md text-white bg-gray-700"
                  style={{
                    top: '100px',   // Adjust Y-position
                    left: '120px',  // Adjust X-position
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                >
                  38.6%
                </motion.div>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {salesData.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (index * 0.05), duration: 0.3 }}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-card-foreground">
                      ${item.value.toFixed(2)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
})