export interface GoogleFont {
  family: string
  variants: string[]
  category: string
}

// Google Fonts API configuration
const GOOGLE_FONTS_API_KEY = 'AIzaSyA0bVyjDLzW-ovQpSRSX_X4oXdaTcdtwh0'
const GOOGLE_FONTS_API_URL = 'https://www.googleapis.com/webfonts/v1/webfonts'

export const googleFonts: GoogleFont[] = [
  { family: 'Playfair Display', variants: ['400', '500', '600', '700', '800', '900'], category: 'serif' },
  { family: 'Inter', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Poppins', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Open Sans', variants: ['300', '400', '500', '600', '700', '800'], category: 'sans-serif' },
  { family: 'Merriweather', variants: ['300', '400', '700', '900'], category: 'serif' },
  { family: 'Source Sans Pro', variants: ['200', '300', '400', '600', '700', '900'], category: 'sans-serif' },
  { family: 'Montserrat', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Lato', variants: ['100', '300', '400', '700', '900'], category: 'sans-serif' },
  { family: 'Roboto Slab', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'serif' },
  { family: 'Oswald', variants: ['200', '300', '400', '500', '600', '700'], category: 'sans-serif' },
  { family: 'Raleway', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Bebas Neue', variants: ['400'], category: 'sans-serif' },
  { family: 'Libre Baskerville', variants: ['400', '700'], category: 'serif' },
  { family: 'Nunito', variants: ['200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Abril Fatface', variants: ['400'], category: 'serif' },
  { family: 'Work Sans', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Crimson Text', variants: ['400', '600', '700'], category: 'serif' },
  { family: 'Quicksand', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
  { family: 'Josefin Sans', variants: ['100', '200', '300', '400', '500', '600', '700'], category: 'sans-serif' },
  { family: 'Pacifico', variants: ['400'], category: 'handwriting' },
  { family: 'Bitter', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'serif' },
  { family: 'Comfortaa', variants: ['300', '400', '500', '600', '700'], category: 'sans-serif' },
  { family: 'Alegreya', variants: ['400', '500', '700', '800', '900'], category: 'serif' },
  { family: 'Ubuntu', variants: ['300', '400', '500', '700'], category: 'sans-serif' },
  { family: 'Dancing Script', variants: ['400', '500', '600', '700'], category: 'handwriting' },
  { family: 'Fira Sans', variants: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], category: 'sans-serif' },
  { family: 'Lora', variants: ['400', '500', '600', '700'], category: 'serif' }
]

// Fetch fonts from Google Fonts API
export async function fetchGoogleFonts(): Promise<GoogleFont[]> {
  try {
    const response = await fetch(`${GOOGLE_FONTS_API_URL}?key=${GOOGLE_FONTS_API_KEY}&sort=popularity`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data.items.map((font: any) => ({
      family: font.family,
      variants: font.variants,
      category: font.category
    }))
  } catch (error) {
    console.error('Failed to fetch Google Fonts:', error)
    // Fallback to our predefined fonts
    return googleFonts
  }
}

export function loadGoogleFont(fontFamily: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.fonts && document.fonts.check(`12px "${fontFamily}"`)) {
      resolve()
      return
    }

    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`
    link.rel = 'stylesheet'
    
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load font: ${fontFamily}`))
    
    document.head.appendChild(link)
  })
}

export function loadFontsForPair(headingFont: string, bodyFont: string): Promise<void> {
  return Promise.all([
    loadGoogleFont(headingFont),
    loadGoogleFont(bodyFont)
  ]).then(() => {})
}

export function formatFontFamily(fontName: string): string {
  return fontName.replace(/\+/g, ' ')
}

// Get popular fonts from API
export async function getPopularFonts(limit: number = 50): Promise<GoogleFont[]> {
  try {
    const fonts = await fetchGoogleFonts()
    return fonts.slice(0, limit)
  } catch (error) {
    console.error('Failed to get popular fonts:', error)
    return googleFonts.slice(0, limit)
  }
} 