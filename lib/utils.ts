import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFontName(fontName: string): string {
  return fontName.replace(/\+/g, ' ')
}

export function generateGoogleFontsUrl(fonts: string[]): string {
  const formattedFonts = fonts.map(font => font.replace(/\s+/g, '+'))
  return `https://fonts.googleapis.com/css2?${formattedFonts.map(font => `family=${font}:wght@300;400;500;600;700&display=swap`).join('&')}`
}

export function generateCSS(fontPair: { heading: string; body: string }): string {
  return `
/* FontPair.ai Generated CSS */
@import url('${generateGoogleFontsUrl([fontPair.heading, fontPair.body])}');

.heading-font {
  font-family: '${formatFontName(fontPair.heading)}', serif;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.3;
}

.body-font {
  font-family: '${formatFontName(fontPair.body)}', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  font-size: 0.875rem;
}

.display-font {
  font-family: '${formatFontName(fontPair.heading)}', serif;
  font-weight: 700;
  font-size: 3rem;
  line-height: 1.2;
}
`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
} 