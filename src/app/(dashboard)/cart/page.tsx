'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

export default function CartPage() {
  const { items, total, removeItem, updateQuantity, clearCart } = useCartStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // TODO: Implement M-Pesa payment integration
    // Redirect to checkout page
    setTimeout(() => {
      setIsCheckingOut(false)
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
            <Link
              href="/marketplace"
              className="inline-block bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow p-6 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{item.product?.title}</h3>
                    <p className="text-sm text-gray-600">KES {item.product?.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Seller: {item.product?.seller?.full_name}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary mb-2">
                      KES {((item.product?.price || 0) * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>KES 100</span>
                </div>
                <div className="border-t pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">KES {(total + 100).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition mb-3"
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <button
                onClick={() => clearCart()}
                className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition"
              >
                Clear Cart
              </button>

              <Link
                href="/marketplace"
                className="block text-center text-primary hover:underline mt-4 font-semibold"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}