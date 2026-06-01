'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, MapPin, DollarSign, Star } from 'lucide-react'
import { useMarketplace } from '@/hooks/useMarketplace'
import { useCartStore } from '@/store/cartStore'

export default function MarketplacePage() {
  const { products, loading, fetchProducts } = useMarketplace()
  const { addItem } = useCartStore()
  const [filters, setFilters] = useState({
    campus: '',
    condition: '',
  })

  useEffect(() => {
    fetchProducts(filters)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  const handleAddToCart = (product: any) => {
    addItem({
      product_id: product.id,
      quantity: 1,
      product,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Campus Marketplace</h1>
          <a
            href="/marketplace/create"
            className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Sell Item
          </a>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{product.title}</h3>
                    {product.condition === 'NEW' && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                        NEW
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">KES {product.price.toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-600">4.5</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4" />
                      <span>{product.campus}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {product.stock} in stock
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-accent text-white py-2 rounded-lg font-semibold hover:bg-opacity-90"
                    >
                      Add to Cart
                    </button>
                    <a
                      href={`/marketplace/${product.id}`}
                      className="flex-1 border border-primary text-primary py-2 rounded-lg font-semibold text-center hover:bg-primary hover:text-white transition"
                    >
                      View
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Need to import Plus icon
import { Plus } from 'lucide-react'