'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { isFavorite } from '@/lib/favorites'
import { formatFontFamily, loadGoogleFont } from '@/lib/fonts'
import { generateCSS } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Copy, Eye, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import AIReasoning from './ai-reasoning'

interface FontPair {
  heading: string
  body: string
  description: string
  category: string
  tags: string[]
}

interface FontCardProps {
  pair: FontPair
  index: number
  onCopyCSS: (pair: FontPair) => void
  onPreviewInHero: (pair: FontPair) => void
  onSavePair: (pair: FontPair) => void
  fontsLoading: boolean
  aiReasoning?: {
    reasoning: string
    useCase: string
    category: string
  }
}

export default function FontCard({ 
  pair, 
  index, 
  onCopyCSS, 
  onPreviewInHero, 
  onSavePair, 
  fontsLoading,
  aiReasoning
}: FontCardProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [cssApplied, setCssApplied] = useState(false)

  useEffect(() => {
    const loadAndApplyFonts = async () => {
      try {
        // Load fonts
        await loadGoogleFont(formatFontFamily(pair.heading))
        await loadGoogleFont(formatFontFamily(pair.body))
        setFontsLoaded(true)

        // Generate and apply CSS
        const css = generateCSS(pair)
        const styleId = `font-card-${index}`
        
        // Remove existing style if any
        const existingStyle = document.getElementById(styleId)
        if (existingStyle) {
          existingStyle.remove()
        }

        // Create new style element
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = css
        document.head.appendChild(style)
        
        setCssApplied(true)
      } catch (error) {
        console.error('Failed to load fonts for card:', error)
        setFontsLoaded(true) // Show text anyway
      }
    }

    loadAndApplyFonts()

    // Cleanup function
    return () => {
      const styleId = `font-card-${index}`
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [pair, index])

  const getHeadingText = (category: string) => {
    switch (category) {
      case 'Creative': return 'Creative Design'
      case 'Luxury': return 'Luxury Brand'
      case 'Tech': return 'Tech Platform'
      case 'Editorial': return 'Editorial Content'
      case 'Bold': return 'Bold Statement'
      case 'Friendly': return 'Friendly Message'
      case 'Academic': return 'Academic Paper'
      case 'Warm': return 'Warm Welcome'
      case 'Professional': return 'Professional Content'
      case 'Modern': return 'Modern Design'
      case 'Contemporary': return 'Contemporary Style'
      case 'Elegant': return 'Elegant Typography'
      case 'Classic': return 'Classic Design'
      default: return 'Beautiful Typography'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      layout
    >
                        <Card className="h-full hover-lift glass-effect border-white/20 bg-black group relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <CardTitle 
                          className="text-xl text-white group-hover:text-white transition-colors"
                          style={{ fontFamily: `'${formatFontFamily(pair.heading)}', serif` }}
                        >
                          {pair.category}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onSavePair(pair)}
                          className={`transition-all duration-200 hover:scale-110 border ${
                            isFavorite(pair) 
                              ? 'text-red-400 border-red-400/40 hover:border-red-400/60' 
                              : 'text-white border-white/20 hover:text-gray-300 hover:border-white/40'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFavorite(pair) ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 relative z-10">
           {/* AI Reasoning */}
           {aiReasoning && (
             <AIReasoning
               reasoning={aiReasoning.reasoning}
               useCase={aiReasoning.useCase}
               category={aiReasoning.category}
               headingFont={formatFontFamily(pair.heading)}
               bodyFont={formatFontFamily(pair.body)}
             />
           )}
           
           {/* Font Preview with Applied CSS */}
           <div className="space-y-4">
            {!fontsLoaded ? (
              <>
                <div className="text-3xl font-bold text-white animate-pulse bg-gray-700 h-10 rounded"></div>
                <div className="text-sm text-gray-300 animate-pulse bg-gray-700 h-20 rounded"></div>
              </>
            ) : (
                             <>
                 <div 
                   className="text-3xl font-bold text-white leading-tight"
                   style={{ 
                     fontFamily: `'${formatFontFamily(pair.heading)}', serif`
                   }}
                 >
                   {getHeadingText(pair.category)}
                 </div>
                 <div 
                   className="text-sm text-gray-300 leading-relaxed"
                   style={{ 
                     fontFamily: `'${formatFontFamily(pair.body)}', sans-serif`
                   }}
                 >
                   {pair.description}
                 </div>
               </>
            )}
          </div>

                                           {/* Font Names */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span 
                            className="text-sm font-medium text-gray-300"
                            style={{ fontFamily: `'${formatFontFamily(pair.heading)}', serif` }}
                          >
                            {formatFontFamily(pair.heading)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span 
                            className="text-sm font-medium text-gray-300"
                            style={{ fontFamily: `'${formatFontFamily(pair.body)}', sans-serif` }}
                          >
                            {formatFontFamily(pair.body)}
                          </span>
                        </div>
                      </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6">
                         <Button
               variant="outline"
               size="sm"
               onClick={() => onCopyCSS(pair)}
               className="flex-1 border-white text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 hover:scale-105 bg-black"
               style={{ fontFamily: `'${formatFontFamily(pair.body)}', sans-serif` }}
             >
               <Copy className="w-4 h-4 mr-2" />
               Copy CSS
             </Button>
             <Button
               variant="outline"
               size="sm"
               onClick={() => onPreviewInHero(pair)}
               disabled={fontsLoading}
               className="flex-1 border-white text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 hover:scale-105 bg-black disabled:opacity-50"
               style={{ fontFamily: `'${formatFontFamily(pair.body)}', sans-serif` }}
             >
               <Eye className="w-4 h-4 mr-2" />
               {fontsLoading ? 'Loading...' : 'Preview in Hero'}
             </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
} 