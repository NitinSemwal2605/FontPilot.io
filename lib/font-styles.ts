export interface FontStyle {
  name: string
  icon: string
  color: string
  description: string
}

export const fontStyles: { [key: string]: FontStyle } = {
  'serif': {
    name: 'Serif',
    icon: '📜',
    color: 'text-amber-400',
    description: 'Classic serif fonts with decorative strokes'
  },
  'sans-serif': {
    name: 'Sans-Serif',
    icon: '📝',
    color: 'text-blue-400',
    description: 'Clean geometric fonts without decorative strokes'
  },
  'display': {
    name: 'Display',
    icon: '🎯',
    color: 'text-purple-400',
    description: 'Bold impact fonts for headlines'
  },
  'handwriting': {
    name: 'Handwriting',
    icon: '✍️',
    color: 'text-green-400',
    description: 'Natural handwritten style fonts'
  },
  'geometric': {
    name: 'Geometric',
    icon: '🔷',
    color: 'text-cyan-400',
    description: 'Modern geometric sans-serif fonts'
  },
  'rounded': {
    name: 'Rounded',
    icon: '⭕',
    color: 'text-pink-400',
    description: 'Friendly rounded sans-serif fonts'
  },
  'condensed': {
    name: 'Condensed',
    icon: '📏',
    color: 'text-orange-400',
    description: 'Narrow condensed display fonts'
  },
  'script': {
    name: 'Script',
    icon: '✒️',
    color: 'text-red-400',
    description: 'Elegant script and calligraphic fonts'
  }
}

export function getFontStyle(fontName: string): FontStyle {
  const font = fontName.toLowerCase()
  
  // Serif fonts
  if (font.includes('playfair') || font.includes('merriweather') || font.includes('libre') || 
      font.includes('crimson') || font.includes('lora') || font.includes('alegreya') || 
      font.includes('bitter') || font.includes('abril')) {
    return fontStyles['serif']
  }
  
  // Handwriting fonts
  if (font.includes('pacifico') || font.includes('dancing') || font.includes('kaushan') || 
      font.includes('great') || font.includes('satisfy')) {
    return fontStyles['handwriting']
  }
  
  // Script fonts
  if (font.includes('script') || font.includes('calligraphy') || font.includes('elegant')) {
    return fontStyles['script']
  }
  
  // Display fonts
  if (font.includes('bebas') || font.includes('oswald') || font.includes('impact') || 
      font.includes('display') || font.includes('condensed')) {
    return fontStyles['display']
  }
  
  // Condensed fonts
  if (font.includes('condensed') || font.includes('narrow') || font.includes('compressed')) {
    return fontStyles['condensed']
  }
  
  // Rounded fonts
  if (font.includes('nunito') || font.includes('quicksand') || font.includes('comfortaa') || 
      font.includes('rounded') || font.includes('soft')) {
    return fontStyles['rounded']
  }
  
  // Geometric fonts
  if (font.includes('inter') || font.includes('poppins') || font.includes('montserrat') || 
      font.includes('raleway') || font.includes('work') || font.includes('fira') || 
      font.includes('josefin')) {
    return fontStyles['geometric']
  }
  
  // Default to sans-serif
  return fontStyles['sans-serif']
}

export function getFontStyleBadge(fontName: string): string {
  const style = getFontStyle(fontName)
  return `${style.icon} ${style.name}`
}

export function getFontStyleColor(fontName: string): string {
  const style = getFontStyle(fontName)
  return style.color
} 