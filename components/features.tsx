'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Download, Eye, Palette, Share2, Sparkles, Zap } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Navigation',
    description: 'Navigate typography with precision using intelligent algorithms that understand your design needs and suggest perfect font combinations.',
    color: 'from-blue-500 to-purple-500'
  },
  {
    icon: Eye,
    title: 'Live Previews',
    description: 'Experience your font choices in real-time with live previews of headers, blog titles, and landing pages.',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: Download,
    title: 'Export CSS',
    description: 'Get production-ready CSS code with Google Fonts links and optimized font-family declarations for immediate use.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Share2,
    title: 'Share & Save',
    description: 'Build your typography library by saving favorite combinations and sharing them with your team.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Navigate to perfect typography in seconds, not hours. Get beautiful font pairings instantly.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Palette,
    title: 'Google Fonts',
    description: 'Access the complete Google Fonts library with expertly curated pairings that harmonize perfectly.',
    color: 'from-indigo-500 to-blue-500'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose FontPilot.io?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate typography with precision using AI-powered tools that transform your design workflow and deliver stunning results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
                         >
               <Card className="h-full hover-lift glass-effect border-white/20 bg-black">
                 <CardHeader>
                   <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-white to-gray-200 flex items-center justify-center mb-4">
                     <feature.icon className="w-6 h-6 text-black" />
                   </div>
                   <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                 </CardContent>
               </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 