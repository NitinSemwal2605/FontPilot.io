import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini Pro
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY || 'AIzaSyBzfsWDuK4URe82Jwce-47EM-qxItOKYPA')

export interface AIRecommendation {
  heading: string
  body: string
  category: string
  description: string
  reasoning: string
  useCase: string
}

export async function getAIRecommendations(userNeed: string): Promise<AIRecommendation[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const prompt = `
You are an expert typography consultant specializing in font pairing for web design. 
The user needs: "${userNeed}"

Based on this specific requirement, recommend EXACTLY 10 diverse font combinations that would work best for this exact use case. 
For each combination, provide:

1. A heading font (serif, display, geometric sans-serif, or script for special cases)
2. A body font (sans-serif for readability)
3. A category (Professional, Modern, Creative, Luxury, Tech, Elegant, Playful, Minimalist, Bold, Sophisticated)
4. A brief description of why this combination works for this specific use case
5. Specific reasoning for why this pairing is perfect for the user's needs
6. The exact use case context

Consider the specific context:
- For testimonials: Focus on readability and trust-building fonts
- For wedding pages: Consider elegant serifs and romantic scripts
- For e-commerce: Focus on conversion-optimized, clean fonts
- For portfolios: Consider creative and personality-driven fonts
- For blogs: Focus on readability and content hierarchy
- For corporate sites: Consider professional and trustworthy fonts
- For creative agencies: Consider bold and personality-driven fonts
- For tech startups: Focus on modern, clean, and approachable fonts

Use diverse Google Fonts including:
- Serif: Playfair Display, Merriweather, Libre Baskerville, Crimson Text, Lora, Georgia, Times New Roman
- Sans-serif: Inter, Open Sans, Poppins, Montserrat, Source Sans Pro, Lato, Roboto, Helvetica
- Display: Bebas Neue, Oswald, Raleway, Work Sans, Nunito, Impact
- Script: Dancing Script, Pacifico, Great Vibes, Alex Brush, Satisfy
- Geometric: Futura, Arial, Verdana

Format your response as JSON with this structure:
[
  {
    "heading": "Font Name",
    "body": "Font Name", 
    "category": "Professional|Modern|Creative|Luxury|Tech|Elegant|Playful|Minimalist|Bold|Sophisticated",
    "description": "Brief description of why this combination works for this specific use case",
    "reasoning": "Detailed explanation of why this pairing is perfect for the user's specific needs",
    "useCase": "The exact application context (e.g., 'Wedding Landing Page', 'Testimonials Section', 'E-commerce Product Pages')"
  }
]

IMPORTANT: 
- Return EXACTLY 10 combinations, no more, no less
- Each combination should be specifically tailored to the user's exact use case
- Consider the emotional impact and user psychology for the specific context
- Ensure fonts are web-safe and widely available
- Provide diverse options (serif/sans-serif, modern/classic, bold/subtle)
- Focus on the specific user need, not generic recommendations

Make each recommendation highly specific to the user's exact use case.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      const recommendations = JSON.parse(jsonMatch[0])
      return recommendations
    }
    
    throw new Error('Invalid AI response format')
  } catch (error) {
    console.error('AI recommendation error:', error)
    // Fallback recommendations
    return getFallbackRecommendations(userNeed)
  }
}

function getFallbackRecommendations(userNeed: string): AIRecommendation[] {
  const userNeedLower = userNeed.toLowerCase()
  
  // More specific context detection
  const isSaaS = userNeedLower.includes('saas') || userNeedLower.includes('landing') || userNeedLower.includes('startup')
  const isTech = userNeedLower.includes('tech') || userNeedLower.includes('software') || userNeedLower.includes('app')
  const isCreative = userNeedLower.includes('creative') || userNeedLower.includes('design') || userNeedLower.includes('portfolio')
  const isLuxury = userNeedLower.includes('luxury') || userNeedLower.includes('premium') || userNeedLower.includes('high-end')
  const isProfessional = userNeedLower.includes('professional') || userNeedLower.includes('business') || userNeedLower.includes('corporate')
  const isWedding = userNeedLower.includes('wedding') || userNeedLower.includes('romantic') || userNeedLower.includes('elegant')
  const isTestimonials = userNeedLower.includes('testimonial') || userNeedLower.includes('review') || userNeedLower.includes('trust')
  const isEcommerce = userNeedLower.includes('ecommerce') || userNeedLower.includes('shop') || userNeedLower.includes('store')
  const isBlog = userNeedLower.includes('blog') || userNeedLower.includes('content') || userNeedLower.includes('article')
  const isAgency = userNeedLower.includes('agency') || userNeedLower.includes('creative') || userNeedLower.includes('branding')

  if (isWedding) {
    return [
      {
        heading: 'Great Vibes',
        body: 'Open Sans',
        category: 'Elegant',
        description: 'Romantic script with clean sans-serif for wedding elegance',
        reasoning: 'Great Vibes provides the romantic, elegant feel perfect for weddings while Open Sans ensures readability for important details',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Playfair Display',
        body: 'Lato',
        category: 'Sophisticated',
        description: 'Elegant serif with clean sans-serif for sophisticated wedding design',
        reasoning: 'Playfair Display conveys elegance and tradition while Lato ensures excellent readability for wedding information',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Dancing Script',
        body: 'Inter',
        category: 'Elegant',
        description: 'Beautiful script with modern sans-serif for contemporary weddings',
        reasoning: 'Dancing Script adds romantic elegance while Inter provides clean, modern readability',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Libre Baskerville',
        body: 'Open Sans',
        category: 'Sophisticated',
        description: 'Classic serif with clean sans-serif for traditional wedding elegance',
        reasoning: 'Libre Baskerville conveys timeless elegance while Open Sans ensures accessibility for all wedding details',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Alex Brush',
        body: 'Source Sans Pro',
        category: 'Elegant',
        description: 'Elegant script with refined sans-serif for romantic wedding design',
        reasoning: 'Alex Brush provides sophisticated script elegance while Source Sans Pro ensures excellent readability',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Crimson Text',
        body: 'Lato',
        category: 'Sophisticated',
        description: 'Refined serif with clean sans-serif for elegant wedding content',
        reasoning: 'Crimson Text provides sophisticated typography while Lato ensures comfortable reading for wedding information',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Satisfy',
        body: 'Inter',
        category: 'Elegant',
        description: 'Playful script with modern sans-serif for friendly wedding design',
        reasoning: 'Satisfy adds personality while Inter maintains clean readability for wedding details',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Merriweather',
        body: 'Open Sans',
        category: 'Sophisticated',
        description: 'Classic serif with clean sans-serif for traditional wedding elegance',
        reasoning: 'Merriweather conveys authority and elegance while Open Sans ensures accessibility',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Pacifico',
        body: 'Roboto',
        category: 'Elegant',
        description: 'Friendly script with clean sans-serif for approachable wedding design',
        reasoning: 'Pacifico adds warmth while Roboto ensures excellent readability for wedding information',
        useCase: 'Wedding Landing Pages'
      },
      {
        heading: 'Lora',
        body: 'Source Sans Pro',
        category: 'Sophisticated',
        description: 'Elegant serif with refined sans-serif for sophisticated wedding design',
        reasoning: 'Lora provides elegant typography while Source Sans Pro ensures excellent readability',
        useCase: 'Wedding Landing Pages'
      }
    ]
  }

  if (isTestimonials) {
    return [
      {
        heading: 'Inter',
        body: 'Open Sans',
        category: 'Professional',
        description: 'Clean, trustworthy fonts perfect for building credibility',
        reasoning: 'Inter provides excellent readability and trustworthiness while Open Sans ensures comfortable reading for testimonial content',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Roboto',
        body: 'Lato',
        category: 'Modern',
        description: 'Google\'s signature fonts for reliable, trustworthy testimonials',
        reasoning: 'Roboto and Lato are designed for screens and convey reliability, perfect for building trust through testimonials',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Source Sans Pro',
        body: 'Open Sans',
        category: 'Professional',
        description: 'Clean sans-serif pairing for trustworthy testimonial display',
        reasoning: 'Source Sans Pro provides excellent readability while Open Sans ensures accessibility for testimonial content',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Lato',
        body: 'Inter',
        category: 'Modern',
        description: 'Friendly yet professional fonts for approachable testimonials',
        reasoning: 'Lato adds warmth while Inter maintains professionalism, perfect for building trust through testimonials',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Open Sans',
        body: 'Roboto',
        category: 'Professional',
        description: 'Highly readable fonts for maximum testimonial impact',
        reasoning: 'Open Sans and Roboto are optimized for readability, ensuring testimonial content is easily digestible',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Poppins',
        body: 'Source Sans Pro',
        category: 'Modern',
        description: 'Friendly geometric fonts for approachable testimonials',
        reasoning: 'Poppins adds personality while Source Sans Pro ensures excellent readability for testimonial content',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Work Sans',
        body: 'Open Sans',
        category: 'Professional',
        description: 'Clean geometric fonts for trustworthy testimonial display',
        reasoning: 'Work Sans provides geometric clarity while Open Sans ensures excellent readability for testimonials',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Montserrat',
        body: 'Lato',
        category: 'Modern',
        description: 'Modern geometric fonts for contemporary testimonial design',
        reasoning: 'Montserrat provides strong hierarchy while Lato ensures comfortable reading for testimonial content',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Nunito',
        body: 'Inter',
        category: 'Modern',
        description: 'Friendly rounded fonts for approachable testimonials',
        reasoning: 'Nunito adds warmth while Inter maintains professionalism, perfect for building trust through testimonials',
        useCase: 'Testimonials Section'
      },
      {
        heading: 'Fira Sans',
        body: 'Open Sans',
        category: 'Professional',
        description: 'Mozilla\'s signature fonts for reliable testimonial display',
        reasoning: 'Fira Sans is designed for screens while Open Sans ensures excellent readability for testimonial content',
        useCase: 'Testimonials Section'
      }
    ]
  }

  if (isEcommerce) {
    return [
      {
        heading: 'Inter',
        body: 'Open Sans',
        category: 'Modern',
        description: 'Clean, conversion-optimized fonts for e-commerce',
        reasoning: 'Inter provides excellent readability for product information while Open Sans ensures comfortable reading for descriptions',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Poppins',
        body: 'Source Sans Pro',
        category: 'Modern',
        description: 'Friendly geometric fonts for approachable shopping experience',
        reasoning: 'Poppins adds personality while Source Sans Pro ensures excellent readability for product content',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Roboto',
        body: 'Lato',
        category: 'Professional',
        description: 'Google\'s signature fonts for reliable e-commerce',
        reasoning: 'Roboto and Lato are optimized for screens and convey trust, perfect for e-commerce conversions',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Montserrat',
        body: 'Open Sans',
        category: 'Modern',
        description: 'Clean geometric fonts for modern e-commerce design',
        reasoning: 'Montserrat provides strong product hierarchy while Open Sans ensures excellent readability',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Work Sans',
        body: 'Inter',
        category: 'Professional',
        description: 'Contemporary sans-serif pairing for clean e-commerce',
        reasoning: 'Work Sans offers geometric clarity while Inter ensures excellent UI readability for shopping',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Lato',
        body: 'Source Sans Pro',
        category: 'Modern',
        description: 'Friendly yet professional fonts for trustworthy shopping',
        reasoning: 'Lato adds warmth while Source Sans Pro ensures excellent readability for product information',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Nunito',
        body: 'Open Sans',
        category: 'Modern',
        description: 'Friendly rounded fonts for approachable e-commerce',
        reasoning: 'Nunito adds personality while Open Sans maintains professionalism for shopping experience',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Raleway',
        body: 'Inter',
        category: 'Sophisticated',
        description: 'Elegant geometric fonts for sophisticated e-commerce',
        reasoning: 'Raleway provides elegant headings while Inter ensures excellent readability for product content',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Source Sans Pro',
        body: 'Open Sans',
        category: 'Professional',
        description: 'Clean sans-serif pairing for professional e-commerce',
        reasoning: 'Source Sans Pro provides excellent readability while Open Sans ensures accessibility for shopping',
        useCase: 'E-commerce Product Pages'
      },
      {
        heading: 'Fira Sans',
        body: 'Lato',
        category: 'Modern',
        description: 'Mozilla\'s signature fonts for modern e-commerce',
        reasoning: 'Fira Sans is designed for screens while Lato ensures excellent readability for product information',
        useCase: 'E-commerce Product Pages'
      }
    ]
  }

  if (isSaaS || isTech) {
    return [
      {
        heading: 'Inter',
        body: 'Open Sans',
        category: 'Modern',
        description: 'Clean, modern combination perfect for SaaS platforms',
        reasoning: 'Inter provides excellent readability for UI elements while Open Sans ensures comfortable reading for body text',
        useCase: 'SaaS Landing Pages'
      },
      {
        heading: 'Poppins',
        body: 'Source Sans Pro',
        category: 'Tech',
        description: 'Contemporary geometric fonts for modern web applications',
        reasoning: 'Poppins offers a friendly yet professional look, perfect for tech companies',
        useCase: 'Software Platforms'
      },
      {
        heading: 'Montserrat',
        body: 'Lato',
        category: 'Modern',
        description: 'Clean geometric pairing for modern web applications',
        reasoning: 'Montserrat provides strong visual hierarchy while Lato ensures excellent readability',
        useCase: 'Modern Web Apps'
      },
      {
        heading: 'Roboto',
        body: 'Open Sans',
        category: 'Tech',
        description: 'Google\'s signature font combination for digital interfaces',
        reasoning: 'Roboto is optimized for screens while Open Sans provides comfortable reading',
        useCase: 'Digital Platforms'
      },
      {
        heading: 'Work Sans',
        body: 'Inter',
        category: 'Modern',
        description: 'Contemporary sans-serif pairing for clean design',
        reasoning: 'Work Sans offers geometric clarity while Inter ensures excellent UI readability',
        useCase: 'Clean Web Design'
      },
      {
        heading: 'Raleway',
        body: 'Source Sans Pro',
        category: 'Tech',
        description: 'Elegant geometric fonts for sophisticated tech brands',
        reasoning: 'Raleway provides elegant headings while Source Sans Pro ensures accessibility',
        useCase: 'Sophisticated Tech'
      },
      {
        heading: 'Nunito',
        body: 'Open Sans',
        category: 'Modern',
        description: 'Friendly rounded fonts for approachable tech brands',
        reasoning: 'Nunito adds personality while Open Sans maintains professionalism',
        useCase: 'Friendly Tech Brands'
      },
      {
        heading: 'Bebas Neue',
        body: 'Roboto',
        category: 'Tech',
        description: 'Bold display font with clean sans-serif for impact',
        reasoning: 'Bebas Neue creates strong visual impact while Roboto ensures readability',
        useCase: 'High-Impact Tech'
      },
      {
        heading: 'Oswald',
        body: 'Lato',
        category: 'Modern',
        description: 'Condensed display font with clean body text',
        reasoning: 'Oswald provides strong headlines while Lato ensures comfortable reading',
        useCase: 'Modern Tech Platforms'
      },
      {
        heading: 'Fira Sans',
        body: 'Inter',
        category: 'Tech',
        description: 'Mozilla\'s signature font combination for digital excellence',
        reasoning: 'Fira Sans is designed for screens while Inter provides excellent UI readability',
        useCase: 'Digital Excellence'
      }
    ]
  }

  if (isCreative) {
    return [
      {
        heading: 'Playfair Display',
        body: 'Inter',
        category: 'Creative',
        description: 'Elegant serif with clean sans-serif for creative projects',
        reasoning: 'Playfair Display adds personality while Inter maintains readability',
        useCase: 'Creative Agencies'
      },
      {
        heading: 'Abril Fatface',
        body: 'Open Sans',
        category: 'Creative',
        description: 'Decorative serif with clean sans-serif for artistic brands',
        reasoning: 'Abril Fatface provides strong personality while Open Sans ensures readability',
        useCase: 'Artistic Brands'
      },
      {
        heading: 'Pacifico',
        body: 'Roboto',
        category: 'Creative',
        description: 'Handwritten heading with clean body for friendly brands',
        reasoning: 'Pacifico adds warmth while Roboto maintains professionalism',
        useCase: 'Friendly Creative'
      },
      {
        heading: 'Dancing Script',
        body: 'Lato',
        category: 'Creative',
        description: 'Elegant script with clean sans-serif for sophisticated creativity',
        reasoning: 'Dancing Script adds elegance while Lato ensures accessibility',
        useCase: 'Sophisticated Creative'
      },
      {
        heading: 'Bebas Neue',
        body: 'Source Sans Pro',
        category: 'Creative',
        description: 'Bold display font for high-impact creative designs',
        reasoning: 'Bebas Neue creates strong visual impact while Source Sans Pro ensures readability',
        useCase: 'High-Impact Creative'
      },
      {
        heading: 'Oswald',
        body: 'Open Sans',
        category: 'Creative',
        description: 'Condensed display font for modern creative projects',
        reasoning: 'Oswald provides strong headlines while Open Sans ensures comfortable reading',
        useCase: 'Modern Creative'
      },
      {
        heading: 'Raleway',
        body: 'Inter',
        category: 'Creative',
        description: 'Elegant geometric fonts for sophisticated creative work',
        reasoning: 'Raleway provides elegant headings while Inter ensures excellent readability',
        useCase: 'Sophisticated Creative'
      },
      {
        heading: 'Nunito',
        body: 'Lato',
        category: 'Creative',
        description: 'Friendly rounded fonts for approachable creative brands',
        reasoning: 'Nunito adds personality while Lato maintains professionalism',
        useCase: 'Friendly Creative'
      },
      {
        heading: 'Quicksand',
        body: 'Roboto',
        category: 'Creative',
        description: 'Rounded geometric fonts for modern creative projects',
        reasoning: 'Quicksand adds warmth while Roboto ensures excellent readability',
        useCase: 'Modern Creative'
      },
      {
        heading: 'Josefin Sans',
        body: 'Open Sans',
        category: 'Creative',
        description: 'Elegant geometric sans-serif for sophisticated creativity',
        reasoning: 'Josefin Sans provides elegant headings while Open Sans ensures accessibility',
        useCase: 'Elegant Creative'
      }
    ]
  }

  if (isLuxury) {
    return [
      {
        heading: 'Libre Baskerville',
        body: 'Open Sans',
        category: 'Luxury',
        description: 'Sophisticated serif with clean sans-serif for premium brands',
        reasoning: 'Libre Baskerville conveys elegance while Open Sans ensures accessibility',
        useCase: 'Premium Brands'
      },
      {
        heading: 'Playfair Display',
        body: 'Source Sans Pro',
        category: 'Luxury',
        description: 'Elegant serif with refined sans-serif for luxury brands',
        reasoning: 'Playfair Display provides sophistication while Source Sans Pro ensures readability',
        useCase: 'Luxury Brands'
      },
      {
        heading: 'Merriweather',
        body: 'Lato',
        category: 'Luxury',
        description: 'Classic serif with clean sans-serif for premium content',
        reasoning: 'Merriweather conveys authority while Lato ensures excellent readability',
        useCase: 'Premium Content'
      },
      {
        heading: 'Crimson Text',
        body: 'Open Sans',
        category: 'Luxury',
        description: 'Refined serif with clean sans-serif for sophisticated brands',
        reasoning: 'Crimson Text provides elegance while Open Sans ensures accessibility',
        useCase: 'Sophisticated Brands'
      },
      {
        heading: 'Lora',
        body: 'Inter',
        category: 'Luxury',
        description: 'Elegant serif with modern sans-serif for contemporary luxury',
        reasoning: 'Lora provides sophistication while Inter ensures excellent readability',
        useCase: 'Contemporary Luxury'
      },
      {
        heading: 'Alegreya',
        body: 'Source Sans Pro',
        category: 'Luxury',
        description: 'Classic serif with refined sans-serif for traditional luxury',
        reasoning: 'Alegreya conveys tradition while Source Sans Pro ensures accessibility',
        useCase: 'Traditional Luxury'
      },
      {
        heading: 'Bitter',
        body: 'Lato',
        category: 'Luxury',
        description: 'Refined serif with clean sans-serif for premium brands',
        reasoning: 'Bitter provides sophistication while Lato ensures excellent readability',
        useCase: 'Premium Brands'
      },
      {
        heading: 'Abril Fatface',
        body: 'Open Sans',
        category: 'Luxury',
        description: 'Decorative serif with clean sans-serif for high-end brands',
        reasoning: 'Abril Fatface creates impact while Open Sans ensures accessibility',
        useCase: 'High-End Brands'
      },
      {
        heading: 'Libre Baskerville',
        body: 'Roboto',
        category: 'Luxury',
        description: 'Classic serif with modern sans-serif for contemporary luxury',
        reasoning: 'Libre Baskerville conveys elegance while Roboto ensures excellent readability',
        useCase: 'Contemporary Luxury'
      },
      {
        heading: 'Playfair Display',
        body: 'Montserrat',
        category: 'Luxury',
        description: 'Elegant serif with geometric sans-serif for modern luxury',
        reasoning: 'Playfair Display provides sophistication while Montserrat ensures clean design',
        useCase: 'Modern Luxury'
      }
    ]
  }

  // Default professional recommendations
  return [
    {
      heading: 'Merriweather',
      body: 'Open Sans',
      category: 'Professional',
      description: 'Classic serif and sans-serif pairing for professional content',
      reasoning: 'Merriweather provides authority while Open Sans ensures excellent readability',
      useCase: 'Professional Websites'
    },
    {
      heading: 'Roboto Slab',
      body: 'Roboto',
      category: 'Modern',
      description: 'Modern slab serif with clean sans-serif for contemporary design',
      reasoning: 'Roboto Slab adds character while Roboto maintains consistency',
      useCase: 'Modern Web Design'
    },
    {
      heading: 'Inter',
      body: 'Source Sans Pro',
      category: 'Professional',
      description: 'Clean geometric fonts for professional applications',
      reasoning: 'Inter provides excellent readability while Source Sans Pro ensures accessibility',
      useCase: 'Professional Applications'
    },
    {
      heading: 'Poppins',
      body: 'Open Sans',
      category: 'Modern',
      description: 'Friendly geometric fonts for approachable professionalism',
      reasoning: 'Poppins adds warmth while Open Sans maintains professionalism',
      useCase: 'Approachable Professional'
    },
    {
      heading: 'Montserrat',
      body: 'Lato',
      category: 'Professional',
      description: 'Clean geometric pairing for modern professional brands',
      reasoning: 'Montserrat provides strong hierarchy while Lato ensures excellent readability',
      useCase: 'Modern Professional'
    },
    {
      heading: 'Work Sans',
      body: 'Inter',
      category: 'Professional',
      description: 'Contemporary sans-serif pairing for clean professional design',
      reasoning: 'Work Sans offers geometric clarity while Inter ensures excellent UI readability',
      useCase: 'Clean Professional'
    },
    {
      heading: 'Raleway',
      body: 'Source Sans Pro',
      category: 'Professional',
      description: 'Elegant geometric fonts for sophisticated professional brands',
      reasoning: 'Raleway provides elegant headings while Source Sans Pro ensures accessibility',
      useCase: 'Sophisticated Professional'
    },
    {
      heading: 'Nunito',
      body: 'Open Sans',
      category: 'Modern',
      description: 'Friendly rounded fonts for approachable professional brands',
      reasoning: 'Nunito adds personality while Open Sans maintains professionalism',
      useCase: 'Friendly Professional'
    },
    {
      heading: 'Fira Sans',
      body: 'Inter',
      category: 'Professional',
      description: 'Mozilla\'s signature font combination for professional excellence',
      reasoning: 'Fira Sans is designed for screens while Inter provides excellent UI readability',
      useCase: 'Professional Excellence'
    },
    {
      heading: 'Lato',
      body: 'Open Sans',
      category: 'Professional',
      description: 'Clean sans-serif pairing for professional content',
      reasoning: 'Lato provides excellent readability while Open Sans ensures accessibility',
      useCase: 'Professional Content'
    }
  ]
} 