'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, ShoppingBag, Zap } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-2xl"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-block p-3 bg-white rounded-full shadow-lg">
              <Zap className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl font-bold text-white mb-4">
            ComradeHustle
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl text-white mb-4 opacity-90">
            Earn through gigs. Trade products. Transact safely.
          </motion.p>

          <motion.p variants={itemVariants} className="text-lg text-white opacity-75 mb-8">
            The campus super-app where students earn, buy, sell, and grow together.
          </motion.p>

          {/* Features */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-12"
          >
            {[
              {
                icon: Briefcase,
                title: 'Freelance Gigs',
                desc: 'Earn through tutoring, design, coding & more',
              },
              {
                icon: ShoppingBag,
                title: 'Marketplace',
                desc: 'Buy & sell products on campus',
              },
              {
                icon: Zap,
                title: 'Secure Escrow',
                desc: 'Safe transactions with M-Pesa integration',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-6 text-white border border-white border-opacity-20"
              >
                <feature.icon className="w-8 h-8 mb-3 mx-auto text-accent" />
                <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                <p className="text-sm opacity-75">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={containerVariants} className="flex gap-4 justify-center">
            <motion.div variants={itemVariants}>
              <Link
                href="/auth/signup"
                className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:shadow-lg transition transform hover:scale-105"
              >
                Get Started
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/auth/login"
                className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition"
              >
                Login
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}