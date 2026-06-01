'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, MapPin, DollarSign, CheckCircle } from 'lucide-react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    // TODO: Fetch orders from Supabase
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Pending Payment': 'bg-yellow-100 text-yellow-800',
      'Paid': 'bg-blue-100 text-blue-800',
      'Processing': 'bg-indigo-100 text-indigo-800',
      'Out for Delivery': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Completed': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b">
            {['all', 'pending', 'processing', 'delivered'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold transition ${
                  activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No orders yet</p>
            </div>
          ) : (
            <motion.div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Order ID & Product */}
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-bold text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600 mt-2">{order.productName}</p>
                    </div>

                    {/* Amount */}
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="text-lg font-bold text-primary">KES {order.totalPrice?.toLocaleString()}</p>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {order.status === 'Processing' || order.status === 'Out for Delivery' ? (
                        <a
                          href={`/orders/${order.id}/track`}
                          className="flex-1 text-center bg-primary hover:bg-opacity-90 text-white py-2 rounded-lg font-semibold"
                        >
                          Track
                        </a>
                      ) : (
                        <a
                          href={`/orders/${order.id}`}
                          className="flex-1 text-center border border-primary text-primary py-2 rounded-lg font-semibold hover:bg-primary hover:text-white transition"
                        >
                          Details
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}