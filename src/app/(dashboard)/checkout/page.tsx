'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Phone, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1) // 1: Summary, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    phoneNumber: '',
    deliveryAddress: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMPesaPayment = async () => {
    setLoading(true)
    // TODO: Integrate M-Pesa STK Push
    // const mpesaResponse = await initiateMPesaSTKPush({
    //   phoneNumber: formData.phoneNumber,
    //   amount: total,
    //   orderId: generateOrderId(),
    // })
    // On success, create order record in Supabase with escrow transaction
    setTimeout(() => {
      setStep(3)
      setLoading(false)
    }, 2000)
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Summary</h1>

            {/* Order Items */}
            <div className="mb-8 pb-8 border-b">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Items</h2>
              <div className="space-y-4">
                {/* TODO: Display cart items */}
                <div className="flex justify-between">
                  <span>Sample Product x 1</span>
                  <span>KES 5,000</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                placeholder="Enter delivery address"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Total */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span className="text-primary">KES 5,100</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg"
            >
              Proceed to Payment
            </button>
          </motion.div>
        </div>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <CreditCard className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">M-Pesa Payment</h1>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
              <p className="text-blue-800">
                You will receive an STK push (M-Pesa prompt) on your phone. Enter your M-Pesa PIN to confirm payment.
              </p>
            </div>

            {/* Phone Number */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="254712345678"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Amount */}
            <div className="bg-gray-50 p-4 rounded-lg mb-8">
              <div className="flex justify-between text-lg font-bold">
                <span>Amount to Pay</span>
                <span className="text-primary">KES 5,100</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleMPesaPayment}
                disabled={loading || !formData.phoneNumber}
                className="flex-1 bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-semibold py-3 rounded-lg"
              >
                {loading ? 'Processing...' : 'Pay with M-Pesa'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Your order has been placed and is now in escrow. The seller will be notified.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <div className="text-sm text-gray-600 mb-2">Order ID</div>
            <div className="text-2xl font-bold text-primary">#ORD-2024-12345</div>
          </div>

          <div className="space-y-3">
            <a
              href="/dashboard/orders"
              className="block w-full bg-primary hover:bg-opacity-90 text-white font-semibold py-3 rounded-lg"
            >
              View My Orders
            </a>
            <a
              href="/marketplace"
              className="block w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}