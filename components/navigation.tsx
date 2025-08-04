'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Heart, Menu, Sparkles, Twitter, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-200 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold gradient-text">FontPair.ai</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-8"
          >
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#examples" className="text-gray-300 hover:text-white transition-colors">
              Examples
            </a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <Link href="/favorites" className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Favorites
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <Twitter className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-white/20"
          >
                       <div className="px-4 py-4 space-y-4">
             <a href="#features" className="block text-gray-300 hover:text-white transition-colors">
               Features
             </a>
             <a href="#examples" className="block text-gray-300 hover:text-white transition-colors">
               Examples
             </a>
             <a href="#about" className="block text-gray-300 hover:text-white transition-colors">
               About
             </a>
             <Link href="/favorites" className="block text-gray-300 hover:text-white transition-colors flex items-center gap-1">
               <Heart className="w-4 h-4" />
               Favorites
             </Link>
             <div className="flex items-center gap-2 pt-4">
               <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                 <Github className="w-4 h-4" />
               </Button>
               <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                 <Twitter className="w-4 h-4" />
               </Button>
             </div>
           </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 