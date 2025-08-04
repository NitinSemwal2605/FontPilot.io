export interface FavoriteFont {
  heading: string
  body: string
  description: string
  category: string
  tags: string[]
  addedAt: string
  id: string
}

const FAVORITES_KEY = 'fontpair-favorites'

export function getFavorites(): FavoriteFont[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load favorites:', error)
    return []
  }
}

export function addToFavorites(fontPair: {
  heading: string
  body: string
  description: string
  category: string
  tags: string[]
}): boolean {
  try {
    const favorites = getFavorites()
    const newFavorite: FavoriteFont = {
      ...fontPair,
      addedAt: new Date().toISOString(),
      id: `${fontPair.heading}-${fontPair.body}-${Date.now()}`
    }
    
    // Check if already exists
    const exists = favorites.some(fav => 
      fav.heading === fontPair.heading && fav.body === fontPair.body
    )
    
    if (exists) {
      return false // Already in favorites
    }
    
    favorites.push(newFavorite)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
    return true
  } catch (error) {
    console.error('Failed to add to favorites:', error)
    return false
  }
}

export function removeFromFavorites(fontPair: {
  heading: string
  body: string
}): boolean {
  try {
    const favorites = getFavorites()
    const filtered = favorites.filter(fav => 
      !(fav.heading === fontPair.heading && fav.body === fontPair.body)
    )
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Failed to remove from favorites:', error)
    return false
  }
}

export function isFavorite(fontPair: {
  heading: string
  body: string
}): boolean {
  const favorites = getFavorites()
  return favorites.some(fav => 
    fav.heading === fontPair.heading && fav.body === fontPair.body
  )
}

export function clearFavorites(): boolean {
  try {
    localStorage.removeItem(FAVORITES_KEY)
    return true
  } catch (error) {
    console.error('Failed to clear favorites:', error)
    return false
  }
} 