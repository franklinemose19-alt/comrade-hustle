'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const JOB_CATEGORIES = [
  'tutoring',
  'assignment_writing',
  'coding_help',
  'design_work',
  'photography',
  'errands',
  'video_editing',
]

const CAMPUSES = ['UoN', 'KU', 'Maseno', 'Moi']

export default function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    deadline: '',
    campus: '',
    urgent: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Create job with Supabase
    console.log('Creating job:', formData)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <Plus className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Post a Gig</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gig Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Help with Python assignment"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what you need..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select a category</option>
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace('_', ' ').charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget (KES)</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="500"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Campus */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campus</label>
              <select
                name="campus"
                value={formData.campus}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select campus</option>
                {CAMPUSES.map((campus) => (
                  <option key={campus} value={campus}>
                    {campus}
                  </option>
                ))}
              </select>
            </div>

            {/* Urgent */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="urgent"
                name="urgent"
                checked={formData.urgent}
                onChange={handleChange}
                className="w-4 h-4 text-primary rounded"
              />
              <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
                Mark as urgent (costs 2x more visibility)
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-opacity-90 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition"
            >
              {loading ? 'Creating...' : 'Post Gig'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}