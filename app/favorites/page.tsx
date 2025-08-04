'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FavoriteFont, getFavorites, removeFromFavorites } from '@/lib/favorites'
import { getFontStyleBadge, getFontStyleColor } from '@/lib/font-styles'
import { formatFontFamily, loadGoogleFont } from '@/lib/fonts'
import { generateCSS } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Copy, Eye, Heart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteFont[]>([])
  const [fontsLoading, setFontsLoading] = useState(false)

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const handleRemoveFavorite = (favorite: FavoriteFont) => {
    const success = removeFromFavorites({
      heading: favorite.heading,
      body: favorite.body
    })
    
    if (success) {
      setFavorites(getFavorites())
      toast.success('Removed!')
    } else {
      toast.error('Failed to remove')
    }
  }

  const handleCopyCSS = (favorite: FavoriteFont) => {
    const css = generateCSS(favorite)
    navigator.clipboard.writeText(css)
    toast.success('CSS copied!')
  }

  const handlePreviewInHero = async (favorite: FavoriteFont) => {
    try {
      setFontsLoading(true)
      await loadGoogleFont(formatFontFamily(favorite.heading))
      await loadGoogleFont(formatFontFamily(favorite.body))
      
      sessionStorage.setItem('hero-fonts', JSON.stringify({
        heading: formatFontFamily(favorite.heading),
        body: formatFontFamily(favorite.body)
      }))
      
      window.location.href = '/#hero-section'
      toast.success('Applied to hero!')
    } catch (error) {
      toast.error('Failed to load fonts')
    } finally {
      setFontsLoading(false)
    }
  }

  const handleClearAll = () => {
    if (confirm('Clear all favorites?')) {
      localStorage.removeItem('fontpair-favorites')
      setFavorites([])
      toast.success('Cleared!')
    }
  }

  return (
    <div className="min-h-screen dark-gradient pattern-bg">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Favorites</h1>
              <p className="text-gray-400">{favorites.length} saved combinations</p>
            </div>
          </div>
          {favorites.length > 0 && (
            <Button
              onClick={handleClearAll}
              variant="outline"
              size="sm"
              className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No Favorites</h2>
            <p className="text-gray-400 mb-8 text-lg">Start exploring and save your favorite combinations</p>
            <Link href="/">
              <Button className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg">
                Explore Fonts
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  layout
                >
                  <Card className="h-full hover-lift glass-effect border-white/20 bg-black group relative overflow-hidden">
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFavorite(favorite)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-110 border border-red-400/20 hover:border-red-400/40 bg-black/50 backdrop-blur-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    
                    <CardContent className="p-6">
                      {/* Font Preview */}
                      <div className="space-y-4 mb-6">
                        <div 
                          className="text-3xl font-bold text-white leading-tight"
                          style={{ fontFamily: `'${formatFontFamily(favorite.heading)}', serif` }}
                        >
                          {favorite.category === 'Creative' ? 'Creative' :
                           favorite.category === 'Luxury' ? 'Luxury' :
                           favorite.category === 'Tech' ? 'Tech' :
                           favorite.category === 'Editorial' ? 'Editorial' :
                           favorite.category === 'Bold' ? 'Bold' :
                           favorite.category === 'Friendly' ? 'Friendly' :
                           favorite.category === 'Academic' ? 'Academic' :
                           favorite.category === 'Warm' ? 'Warm' :
                           favorite.category === 'Professional' ? 'Professional' :
                           favorite.category === 'Modern' ? 'Modern' :
                           favorite.category === 'Contemporary' ? 'Contemporary' :
                           favorite.category === 'Elegant' ? 'Elegant' :
                           favorite.category === 'Classic' ? 'Classic' :
                           'Beautiful'}
                        </div>
                        <div 
                          className="text-sm text-gray-300 leading-relaxed"
                          style={{ fontFamily: `'${formatFontFamily(favorite.body)}', sans-serif` }}
                        >
                          {favorite.description}
                        </div>
                      </div>

                      {/* Font Names */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-300">
                            {formatFontFamily(favorite.heading)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getFontStyleColor(favorite.heading)} bg-white/10`}>
                            {getFontStyleBadge(favorite.heading)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-300">
                            {formatFontFamily(favorite.body)}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getFontStyleColor(favorite.body)} bg-white/10`}>
                            {getFontStyleBadge(favorite.body)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyCSS(favorite)}
                          className="flex-1 border-white text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 hover:scale-105 bg-black"
                          style={{ fontFamily: `'${formatFontFamily(favorite.body)}', sans-serif` }}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy CSS
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewInHero(favorite)}
                          disabled={fontsLoading}
                          className="flex-1 border-white text-white hover:border-white hover:bg-white hover:text-black transition-all duration-200 hover:scale-105 bg-black disabled:opacity-50"
                          style={{ fontFamily: `'${formatFontFamily(favorite.body)}', sans-serif` }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {fontsLoading ? 'Loading...' : 'Preview'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
} 