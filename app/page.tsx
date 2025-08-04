'use client'

import Features from '@/components/features'
import FontCard from '@/components/font-card'
import Footer from '@/components/footer'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AIRecommendation, getAIRecommendations } from '@/lib/ai-recommendations'
import { addToFavorites } from '@/lib/favorites'
import { formatFontFamily, getPopularFonts, GoogleFont, loadFontsForPair, loadGoogleFont } from '@/lib/fonts'
import { formatFontName, generateCSS } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Copy, Heart, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface FontPair {
  heading: string
  body: string
  description: string
  category: string
  tags: string[]
}

interface HeroFonts {
  heading: string
  body: string
}

const sampleFontPairs: FontPair[] = [
  {
    heading: 'Playfair+Display',
    body: 'Inter',
    description: 'Elegant serif heading with clean sans-serif body for professional content',
    category: 'Professional',
    tags: ['elegant', 'professional', 'clean']
  },
  {
    heading: 'Poppins',
    body: 'Open+Sans',
    description: 'Modern geometric sans-serif pairing perfect for tech and startup websites',
    category: 'Modern',
    tags: ['modern', 'tech', 'clean']
  },
  {
    heading: 'Merriweather',
    body: 'Source+Sans+Pro',
    description: 'Classic serif and sans-serif combination for editorial and blog content',
    category: 'Editorial',
    tags: ['classic', 'editorial', 'readable']
  },
  {
    heading: 'Montserrat',
    body: 'Lato',
    description: 'Contemporary pairing with excellent readability for web applications',
    category: 'Contemporary',
    tags: ['contemporary', 'web', 'readable']
  },
  {
    heading: 'Roboto+Slab',
    body: 'Roboto',
    description: 'Slab serif and sans-serif combination for modern editorial design',
    category: 'Editorial',
    tags: ['slab', 'modern', 'editorial']
  },
  {
    heading: 'Oswald',
    body: 'Lato',
    description: 'Bold condensed heading with clean body for impactful presentations',
    category: 'Bold',
    tags: ['bold', 'condensed', 'impactful']
  },
  {
    heading: 'Raleway',
    body: 'Open+Sans',
    description: 'Elegant geometric sans-serif pairing for sophisticated web design',
    category: 'Elegant',
    tags: ['elegant', 'geometric', 'sophisticated']
  },
  {
    heading: 'Bebas+Neue',
    body: 'Roboto',
    description: 'Bold display font with clean sans-serif for high-impact designs',
    category: 'Bold',
    tags: ['bold', 'display', 'impactful']
  },
  {
    heading: 'Libre+Baskerville',
    body: 'Source+Sans+Pro',
    description: 'Classic serif and modern sans-serif for traditional yet contemporary look',
    category: 'Classic',
    tags: ['classic', 'traditional', 'serif']
  },
  {
    heading: 'Nunito',
    body: 'Open+Sans',
    description: 'Friendly rounded sans-serif pairing perfect for approachable brands',
    category: 'Friendly',
    tags: ['friendly', 'rounded', 'approachable']
  },
  {
    heading: 'Abril+Fatface',
    body: 'Lato',
    description: 'Decorative serif with clean sans-serif for luxury and fashion brands',
    category: 'Luxury',
    tags: ['decorative', 'luxury', 'fashion']
  },
  {
    heading: 'Work+Sans',
    body: 'Inter',
    description: 'Modern geometric sans-serif pairing optimized for digital interfaces',
    category: 'Modern',
    tags: ['geometric', 'digital', 'interface']
  },
  {
    heading: 'Crimson+Text',
    body: 'Open+Sans',
    description: 'Refined serif with clean sans-serif for academic and literary content',
    category: 'Academic',
    tags: ['refined', 'academic', 'literary']
  },
  {
    heading: 'Quicksand',
    body: 'Roboto',
    description: 'Rounded geometric sans-serif pairing for friendly, modern interfaces',
    category: 'Friendly',
    tags: ['rounded', 'friendly', 'modern']
  },
  {
    heading: 'Josefin+Sans',
    body: 'Lato',
    description: 'Elegant sans-serif with clean body for sophisticated minimal design',
    category: 'Elegant',
    tags: ['elegant', 'minimal', 'sophisticated']
  },
  {
    heading: 'Pacifico',
    body: 'Open+Sans',
    description: 'Playful script with clean sans-serif for creative and fun brands',
    category: 'Creative',
    tags: ['playful', 'script', 'creative']
  },
  {
    heading: 'Bitter',
    body: 'Source+Sans+Pro',
    description: 'Contemporary serif with modern sans-serif for readable long-form content',
    category: 'Editorial',
    tags: ['contemporary', 'readable', 'long-form']
  },
  {
    heading: 'Comfortaa',
    body: 'Roboto',
    description: 'Rounded geometric sans-serif pairing for approachable tech products',
    category: 'Friendly',
    tags: ['rounded', 'approachable', 'tech']
  },
  {
    heading: 'Alegreya',
    body: 'Open+Sans',
    description: 'Humanist serif with clean sans-serif for warm, readable content',
    category: 'Warm',
    tags: ['humanist', 'warm', 'readable']
  },
  {
    heading: 'Ubuntu',
    body: 'Lato',
    description: 'Modern sans-serif pairing perfect for software and tech documentation',
    category: 'Tech',
    tags: ['modern', 'software', 'documentation']
  },
  {
    heading: 'Dancing+Script',
    body: 'Open+Sans',
    description: 'Elegant script with clean sans-serif for wedding and event designs',
    category: 'Elegant',
    tags: ['script', 'elegant', 'events']
  },
  {
    heading: 'Fira+Sans',
    body: 'Inter',
    description: 'Professional sans-serif pairing optimized for technical documentation',
    category: 'Tech',
    tags: ['professional', 'technical', 'documentation']
  },
  {
    heading: 'Lora',
    body: 'Source+Sans+Pro',
    description: 'Contemporary serif with modern sans-serif for blog and article content',
    category: 'Editorial',
    tags: ['contemporary', 'blog', 'articles']
  }
]

const categories = [
  { name: 'All', icon: '🎯' },
  { name: 'Professional', icon: '💼' },
  { name: 'Modern', icon: '🚀' },
  { name: 'Creative', icon: '🎨' },
  { name: 'Luxury', icon: '💎' },
  { name: 'Tech', icon: '⚡' }
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [fontPairs, setFontPairs] = useState<FontPair[]>(sampleFontPairs)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPair, setSelectedPair] = useState<FontPair | null>(null)
  const [heroFonts, setHeroFonts] = useState<HeroFonts>({
    heading: 'Merriweather',
    body: 'Open Sans'
  })
  const [fontsLoading, setFontsLoading] = useState(false)
  const [cardsLoading, setCardsLoading] = useState(true)
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [isAiLoading, setIsAiLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a description of your project')
      return
    }
    
    setIsLoading(true)
    setIsAiLoading(true)
    
    // Show loading toast
    const loadingToast = toast.loading('Analyzing your project and finding perfect font combinations...')
    
    try {
      // Get AI recommendations with timeout
      const aiPromise = getAIRecommendations(searchQuery)
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('AI request timeout')), 15000)
      )
      
      const recommendations = await Promise.race([aiPromise, timeoutPromise]) as AIRecommendation[]
      setAiRecommendations(recommendations)
      
      // Convert AI recommendations to FontPair format
      const aiPairs: FontPair[] = recommendations.map(rec => ({
        heading: rec.heading.replace(/\s+/g, '+'),
        body: rec.body.replace(/\s+/g, '+'),
        category: rec.category,
        description: rec.description,
        tags: [rec.category.toLowerCase(), rec.useCase.toLowerCase()]
      }))
      
      setFontPairs(aiPairs)
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast)
      toast.success(`Found ${aiPairs.length} perfect font combinations for your needs!`)
      
      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.querySelector('[data-section="font-results"]')
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 500)
      
    } catch (error) {
      console.error('AI recommendation error:', error)
      toast.dismiss(loadingToast)
      toast.error('Failed to get AI recommendations. Showing default fonts.')
      setFontPairs(sampleFontPairs)
    } finally {
      setIsLoading(false)
      setIsAiLoading(false)
    }
  }

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName)
    
    // Show loading state briefly for smooth transition
    const loadingToast = toast.loading(`Loading ${categoryName} fonts...`)
    
    setTimeout(() => {
      if (categoryName === 'All') {
        setFontPairs(sampleFontPairs)
      } else {
        const filteredPairs = sampleFontPairs.filter(pair => pair.category === categoryName)
        setFontPairs(filteredPairs)
      }
      
      toast.dismiss(loadingToast)
      toast.success(`Showing ${categoryName} font combinations`)
      
      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.querySelector('[data-section="font-results"]')
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 300)
    }, 500)
  }

  const handleCopyCSS = (pair: FontPair) => {
    const css = generateCSS(pair)
    
    navigator.clipboard.writeText(css).then(() => {
      toast.success('CSS copied to clipboard!', {
        duration: 3000,
        icon: '📋',
      })
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = css
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      toast.success('CSS copied to clipboard!', {
        duration: 3000,
        icon: '📋',
      })
    })
  }

  const handleSavePair = (pair: FontPair) => {
    const success = addToFavorites(pair)
    if (success) {
      toast.success('Font pair saved to favorites!')
    } else {
      toast.error('Font pair is already in favorites!')
    }
  }

  const handlePreviewInHero = async (pair: FontPair) => {
    try {
      setFontsLoading(true)
      
      // Show loading toast
      const loadingToast = toast.loading('Loading fonts and applying to hero...')
      
      // Load fonts dynamically with timeout
      const fontLoadPromise = loadFontsForPair(formatFontFamily(pair.heading), formatFontFamily(pair.body))
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Font loading timeout')), 10000)
      )
      
      await Promise.race([fontLoadPromise, timeoutPromise])
      
      // Update hero fonts with smooth transition
      setHeroFonts({
        heading: formatFontFamily(pair.heading),
        body: formatFontFamily(pair.body)
      })
      
      // Close any open modals
      setSelectedPair(null)
      
      // Dismiss loading toast and show success
      toast.dismiss(loadingToast)
      toast.success('Font pair applied to hero section!')
      
      // Smooth scroll to hero section with delay for font rendering
      setTimeout(() => {
        const heroSection = document.getElementById('hero-section')
        if (heroSection) {
          heroSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 300)
      
    } catch (error) {
      console.error('Font loading error:', error)
      toast.error('Failed to load fonts. Please try again.')
    } finally {
      setFontsLoading(false)
    }
  }

  const resetHeroFonts = () => {
    setHeroFonts({
      heading: 'Merriweather',
      body: 'Open Sans'
    })
    toast.success('Reset to default fonts!')
  }

  // Preload fonts when component mounts
  useEffect(() => {
    const preloadFonts = async () => {
      try {
        // Load a few key fonts initially
        const initialFonts = [
          'Inter',
          'Playfair Display',
          'Poppins',
          'Open Sans',
          'Merriweather',
          'Source Sans Pro'
        ]
        
        await Promise.all(
          initialFonts.map(font => loadGoogleFont(font))
        )
      } catch (error) {
        console.error('Failed to preload fonts:', error)
      }
    }
    
    preloadFonts()
  }, [])

  // Restore hero fonts from favorites if available
  useEffect(() => {
    const heroFontsData = sessionStorage.getItem('hero-fonts')
    if (heroFontsData) {
      try {
        const fonts = JSON.parse(heroFontsData)
        setHeroFonts(fonts)
        sessionStorage.removeItem('hero-fonts') // Clear after use
      } catch (error) {
        console.error('Failed to restore hero fonts:', error)
      }
    }
  }, [])

  // Generate dynamic font pairs from API
  useEffect(() => {
    const generateDynamicPairs = async () => {
      try {
        const popularFonts = await getPopularFonts(100)
        
        // Create dynamic font pairs
        const dynamicPairs: FontPair[] = []
        const serifFonts = popularFonts.filter(f => f.category === 'serif')
        const sansFonts = popularFonts.filter(f => f.category === 'sans-serif')
        const displayFonts = popularFonts.filter(f => f.category === 'display')
        
        // Create diverse combinations
        for (let i = 0; i < 24; i++) {
          const headingFont = serifFonts[i % serifFonts.length] || popularFonts[i % popularFonts.length]
          const bodyFont = sansFonts[i % sansFonts.length] || popularFonts[(i + 10) % popularFonts.length]
          
          dynamicPairs.push({
            heading: headingFont.family.replace(/\s+/g, '+'),
            body: bodyFont.family.replace(/\s+/g, '+'),
            category: getCategoryForPair(headingFont, bodyFont),
            description: getDescriptionForCategory(getCategoryForPair(headingFont, bodyFont)),
            tags: [headingFont.category, bodyFont.category, getCategoryForPair(headingFont, bodyFont).toLowerCase()]
          })
        }
        
        setFontPairs(dynamicPairs)
        setCardsLoading(false)
        
        // Preload all fonts for the cards
        const allFonts = dynamicPairs.flatMap(pair => [pair.heading, pair.body])
        const uniqueFonts = [...new Set(allFonts)]
        
        // Load fonts in batches to avoid overwhelming the browser
        const batchSize = 5
        for (let i = 0; i < uniqueFonts.length; i += batchSize) {
          const batch = uniqueFonts.slice(i, i + batchSize)
          await Promise.all(
            batch.map(font => loadGoogleFont(formatFontFamily(font)))
          )
        }
      } catch (error) {
        console.error('Failed to generate dynamic pairs:', error)
        // Keep using the original sampleFontPairs
      }
    }
    
    generateDynamicPairs()
  }, [])

  const getCategoryForPair = (headingFont: GoogleFont, bodyFont: GoogleFont): string => {
    if (headingFont.category === 'serif' && bodyFont.category === 'sans-serif') {
      return 'Editorial'
    } else if (headingFont.category === 'display') {
      return 'Bold'
    } else if (bodyFont.category === 'handwriting') {
      return 'Creative'
    } else if (headingFont.category === 'serif' && bodyFont.category === 'serif') {
      return 'Luxury'
    } else {
      return 'Contemporary'
    }
  }

  const getDescriptionForCategory = (category: string): string => {
    const descriptions = {
      'Creative': 'Express your creativity with this playful yet professional combination.',
      'Luxury': 'Elevate your brand with sophisticated typography that conveys premium quality.',
      'Tech': 'Modern, clean typography optimized for digital interfaces.',
      'Editorial': 'Classic serif and sans-serif pairing for excellent readability.',
      'Bold': 'Make a strong impression with this high-impact combination.',
      'Friendly': 'Approachable and welcoming typography for warm connections.',
      'Academic': 'Refined typography perfect for scholarly content.',
      'Warm': 'Humanist typography that feels personal and engaging.',
      'Contemporary': 'Modern typography that balances style and functionality.'
    }
    return descriptions[category as keyof typeof descriptions] || 'Beautiful typography combination.'
  }

  return (
    <main className="min-h-screen dark-gradient pattern-bg">
      <Navigation />
      {/* Hero Section */}
      <motion.div 
        id="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black" />
        
        {/* Floating Background Elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-xl"
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-white to-gray-200 text-black px-4 py-2 rounded-full text-sm font-medium mb-6 neon-glow"
            >
              <Sparkles className="w-4 h-4" />
              {heroFonts.heading !== 'Merriweather' ? 'Live Font Preview' : 'AI-Powered Font Pairing'}
              {heroFonts.heading !== 'Merriweather' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetHeroFonts}
                  className="ml-2 text-black hover:text-gray-700"
                >
                  Reset
                </Button>
              )}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold text-white mb-8"
              style={{ fontFamily: `'${heroFonts.heading}', serif` }}
            >
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                FontPilot
              </motion.span>
              <motion.span 
                className="gradient-text"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                .io
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              style={{ fontFamily: `'${heroFonts.body}', sans-serif` }}
            >
              AI-powered font pairing that understands your vision. 
              Get perfectly harmonized typography combinations instantly.
            </motion.p>

            {/* AI-Powered Search Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              
                             <div className="flex gap-3">
                 <Input
                   placeholder="Tell us about your project: 'Building a luxury brand', 'Creating a tech startup', 'Designing a wedding website'..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                   className="flex-1 text-lg bg-black border-white/20 text-white placeholder:text-gray-400"
                 />
                 <Button 
                   onClick={handleSearch}
                   disabled={isLoading || isAiLoading}
                   className="px-8 bg-white hover:bg-gray-200 text-black font-semibold shadow-lg transition-all duration-200 hover:scale-105"
                 >
                  {isLoading || isAiLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                </Button>
               </div>
               
               {/* Floating Down Arrow */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 1.0 }}
                 className="mt-16 text-center"
               >
                 <motion.div
                   animate={{ y: [0, 10, 0] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                   className="inline-flex flex-col items-center gap-2 text-gray-400 hover:text-white cursor-pointer"
                   onClick={() => {
                     const resultsSection = document.querySelector('[data-section="font-results"]')
                     if (resultsSection) {
                       resultsSection.scrollIntoView({ 
                         behavior: 'smooth',
                         block: 'start'
                       })
                     }
                   }}
                 >
                   <span className="text-sm font-medium">Explore Curated Font Combinations</span>
                   <motion.div
                     animate={{ y: [0, 5, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <ChevronDown className="w-6 h-6" />
                   </motion.div>
                 </motion.div>
               </motion.div>

                              {/* Product Hunt Review Button */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 1.2 }}
                 className="mt-12 flex justify-center"
               >
                 <motion.a
                   href="https://www.producthunt.com/products/fontpilot-io?launch=fontpilot-io"
                   target="_blank"
                   rel="noopener noreferrer"
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.5, delay: 1.3 }}
                   whileHover={{ 
                     scale: 1.05,
                     y: -2,
                     transition: { duration: 0.2 }
                   }}
                   whileTap={{ scale: 0.95 }}
                   className="group inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/25"
                 >
                   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M13.604 8.18c0-.738.662-1.28 1.423-1.28.76 0 1.423.542 1.423 1.28 0 .738-.662 1.28-1.423 1.28-.76 0-1.423-.542-1.423-1.28zm-3.604 0c0-.738.662-1.28 1.423-1.28.76 0 1.423.542 1.423 1.28 0 .738-.662 1.28-1.423 1.28-.76 0-1.423-.542-1.423-1.28zm-3.604 0c0-.738.662-1.28 1.423-1.28.76 0 1.423.542 1.423 1.28 0 .738-.662 1.28-1.423 1.28-.76 0-1.423-.542-1.423-1.28z"/>
                   </svg>
                   <span className="text-sm font-semibold">Now on Product Hunt - Add Review</span>
                   <motion.div
                     animate={{ x: [0, 3, 0] }}
                     transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                     className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   >
                     →
                   </motion.div>
                 </motion.a>
               </motion.div>

               {/* Social Proof */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 1.5 }}
                 className="mt-8 text-center"
               >
                 <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                   <span>Trusted by designers & developers worldwide</span>
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                     <span className="text-green-400">Live</span>
                   </div>
                 </div>
               </motion.div>
           </motion.div>
          </div>
        </div>
      </motion.div>

             {/* Categories */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.8 }}
         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
       >
         <div className="text-center mb-12">
           <h2 className="text-4xl font-bold text-white mb-4">Browse Font Combinations by Category</h2>
           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
             From professional to creative, find the perfect typography for your project. 
             Each category is carefully curated to match your design needs.
           </p>
         </div>
         
         <div className="flex flex-wrap justify-center gap-4">
           {categories.map((category, index) => (
             <motion.button
               key={category.name}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               whileHover={{ 
                 scale: 1.05, 
                 y: -5,
                 transition: { duration: 0.2 }
               }}
               whileTap={{ scale: 0.95 }}
               onClick={() => handleCategorySelect(category.name)}
               className={`group relative px-6 py-3 rounded-full border-2 transition-all duration-300 overflow-hidden ${
                 selectedCategory === category.name
                   ? 'border-white bg-white/20 shadow-lg shadow-white/20'
                   : 'border-white bg-black hover:border-white hover:bg-white/10'
               }`}
             >
               {/* Background gradient effect */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               
               {/* Content */}
               <div className="relative z-10 flex items-center gap-2">
                 <div className="text-lg transform group-hover:scale-110 transition-transform duration-300">
                   {category.icon}
                 </div>
                 <div className="text-sm font-semibold text-white group-hover:text-white transition-colors duration-300">
                   {category.name}
                 </div>
                 
                 {/* Selection indicator */}
                 {selectedCategory === category.name && (
                   <motion.div
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                   />
                 )}
               </div>
             </motion.button>
           ))}
         </div>
         
         {/* Category description */}
         {selectedCategory && (
           <motion.div
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mt-8 text-center"
           >
             <p className="text-gray-400 text-sm">
               Showing fonts perfect for <span className="text-white font-medium">{selectedCategory.toLowerCase()}</span> designs
             </p>
           </motion.div>
         )}
       </motion.div>

                      {/* AI Recommendations Header */}
         {aiRecommendations.length > 0 && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="max-w-4xl mx-auto px-4 mb-12"
           >
             <div className="text-center">
               <h2 className="text-3xl font-bold text-white mb-4">AI-Recommended Font Combinations</h2>
               <p className="text-gray-300 text-lg">Perfectly matched for your specific needs</p>
             </div>
           </motion.div>
         )}

         {/* Font Pairs Grid */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1.0 }}
           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
           data-section="font-results"
         >
         <h2 className="text-3xl font-bold text-center mb-8 text-white">Discover AI-Curated Font Combinations</h2>
         <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
           Each combination is handpicked by our AI to ensure perfect harmony between heading and body fonts. 
           Test them in real-time and export ready-to-use CSS code.
         </p>
         

         
         {cardsLoading && (
           <div className="text-center py-12">
             <div className="inline-flex items-center gap-2 text-white">
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
               Loading our curated font collection...
             </div>
           </div>
         )}
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <AnimatePresence>
             {fontPairs.map((pair, index) => {
                 // Find matching AI recommendation
                 const aiRecommendation = aiRecommendations.find(rec => 
                   rec.heading.replace(/\s+/g, '+') === pair.heading &&
                   rec.body.replace(/\s+/g, '+') === pair.body
                 )
                 
                 return (
                   <FontCard
                     key={`${pair.heading}-${pair.body}`}
                     pair={pair}
                     index={index}
                     onCopyCSS={handleCopyCSS}
                     onPreviewInHero={handlePreviewInHero}
                     onSavePair={handleSavePair}
                     fontsLoading={fontsLoading}
                     aiReasoning={aiRecommendation ? {
                       reasoning: aiRecommendation.reasoning,
                       useCase: aiRecommendation.useCase,
                       category: aiRecommendation.category
                     } : undefined}
                   />
                 )
               })}
           </AnimatePresence>
         </div>
       </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedPair && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPair(null)}
          >
                       <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.9, opacity: 0 }}
             className="bg-black rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
             onClick={(e) => e.stopPropagation()}
           >
             <div className="p-8">
               <div className="flex items-center justify-between mb-6">
                 <h3 className="text-2xl font-bold text-white">Font Pair Preview</h3>
                                    <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => setSelectedPair(null)}
                     className="text-white hover:text-gray-300"
                   >
                   ×
                 </Button>
               </div>

                                 {/* Mock UI Components */}
                                      <div className="space-y-8">
                       {/* Hero Section */}
                                                <div className="border border-white/20 rounded-lg p-6 bg-black">
                           <h4 className="text-sm font-medium text-gray-400 mb-4">Hero Section</h4>
                           <div className="text-center space-y-4">
                             <div 
                               className="text-4xl md:text-6xl font-bold text-white"
                               style={{ fontFamily: `'${formatFontName(selectedPair.heading)}', serif` }}
                             >
                               Welcome to
                               <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                 FontPair.ai
                               </span>
                             </div>
                             <div 
                               className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
                               style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                             >
                               Experience the perfect blend of typography. This hero section showcases how your chosen fonts work together in real-world applications.
                             </div>
                             <div className="flex gap-4 justify-center mt-6">
                               <Button 
                                 className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 hover:from-gray-200 hover:to-gray-300 text-black"
                                 style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                               >
                                 Get Started
                               </Button>
                               <Button 
                                 variant="outline" 
                                 className="px-6 py-3 border-white/20 text-gray-300 hover:border-white hover:text-white"
                                 style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                               >
                                 Learn More
                               </Button>
                             </div>
                           </div>
                         </div>

                   {/* Website Header */}
                   <div className="border rounded-lg p-6 bg-white">
                     <h4 className="text-sm font-medium text-gray-500 mb-4">Website Header</h4>
                     <div className="flex items-center justify-between">
                       <div 
                         className="text-2xl font-bold text-gray-900"
                         style={{ fontFamily: `'${formatFontName(selectedPair.heading)}', serif` }}
                       >
                         BrandName
                       </div>
                       <nav className="flex gap-6">
                         <a 
                           href="#" 
                           className="text-gray-600 hover:text-gray-900 transition-colors"
                           style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                         >
                           Home
                         </a>
                         <a 
                           href="#" 
                           className="text-gray-600 hover:text-gray-900 transition-colors"
                           style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                         >
                           About
                         </a>
                         <a 
                           href="#" 
                           className="text-gray-600 hover:text-gray-900 transition-colors"
                           style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                         >
                           Services
                         </a>
                         <a 
                           href="#" 
                           className="text-gray-600 hover:text-gray-900 transition-colors"
                           style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                         >
                           Contact
                         </a>
                       </nav>
                     </div>
                   </div>

                  {/* Blog Title */}
                  <div className="border rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Blog Title</h4>
                    <div 
                      className="text-2xl font-semibold"
                      style={{ fontFamily: `'${formatFontName(selectedPair.heading)}', serif` }}
                    >
                      The Future of Design Systems
                    </div>
                  </div>

                  {/* Product Description */}
                  <div className="border rounded-lg p-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Product Description</h4>
                    <div 
                      className="text-lg font-semibold mb-3"
                      style={{ fontFamily: `'${formatFontName(selectedPair.heading)}', serif` }}
                    >
                      Premium Design Tool
                    </div>
                    <div 
                      className="text-gray-600 leading-relaxed"
                      style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                    >
                      Transform your creative workflow with our intuitive design platform. 
                      Built for modern teams who demand both power and simplicity.
                    </div>
                  </div>

                                     {/* Landing Page */}
                   <div className="border rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
                     <h4 className="text-sm font-medium text-gray-500 mb-4">Landing Page</h4>
                     <div className="space-y-6">
                       <div 
                         className="text-5xl font-bold text-gray-900 leading-tight"
                         style={{ fontFamily: `'${formatFontName(selectedPair.heading)}', serif` }}
                       >
                         Build Something
                         <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                           Amazing
                         </span>
                       </div>
                       <div 
                         className="text-xl text-gray-600 leading-relaxed max-w-2xl"
                         style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                       >
                         Create stunning designs with our comprehensive toolkit. 
                         Perfect for designers, developers, and creative professionals who demand excellence.
                       </div>
                       <div className="flex gap-4 pt-4">
                         <Button 
                           className="px-8 py-4 text-lg"
                           style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                         >
                           Get Started
                         </Button>
                         <Button 
                           variant="outline" 
                           className="px-8 py-4 text-lg"
                           style={{ fontFamily: `'${formatFontName(selectedPair.body)}', sans-serif` }}
                         >
                           View Demo
                         </Button>
                       </div>
                     </div>
                   </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8 pt-6 border-t">
                  <Button
                    onClick={() => handleCopyCSS(selectedPair)}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy CSS
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSavePair(selectedPair)}
                    className="flex-1"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save Pair
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <Features />
      
      {/* Footer */}
      <Footer />
    </main>
  )
} 