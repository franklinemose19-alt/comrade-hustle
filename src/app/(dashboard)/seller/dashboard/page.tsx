'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, DollarSign, Package, TrendingUp } from 'lucide-react'

export default function SellerDashboardPage() {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    totalProducts: 0,
    averageRating: 0,
  })
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch seller stats and orders
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const statCards = [
    {
      label: 'Total Earnings',
      value: `KES ${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: Package,
      color: 'text-blue-600',
    },
    {
      label: 'Active Products',
      value: stats.totalProducts,
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      label: 'Average Rating',
      value: `${stats.averageRating.toFixed(1)} ⭐`,
      icon: BarChart3,
      color: 'text-yellow-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <a
              href="/marketplace/create"
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Add Product
            </a>
          </div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-600 font-medium">{card.label}</p>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : orders.length === 0 ? (
              <p className="text-gray-600 text-center py-12">No orders yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Order ID</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="px-4 py-3 text-sm text-gray-900 font-semibold">{order.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.productName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-bold">KES {order.amount?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                        <td className="px-4 py-3 text-sm">
                          <a href={`/orders/${order.id}`} className="text-primary hover:underline">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}