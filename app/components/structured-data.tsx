export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FontPilot.io",
    "description": "Navigate typography with precision using AI-powered font pairing. Find perfect font combinations for websites, logos, and digital projects instantly.",
    "url": "https://fontpilot.io",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Person",
      "name": "Nitin Semwal",
      "url": "https://github.com/NitinSemwal2605"
    },
    "creator": {
      "@type": "Person",
      "name": "Nitin Semwal",
      "url": "https://github.com/NitinSemwal2605"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FontPilot.io"
    },
    "featureList": [
      "AI-powered font pairing",
      "Google Fonts integration",
      "Live preview functionality",
      "CSS export capability",
      "Favorites system",
      "Category-based browsing"
    ],
    "screenshot": "https://fontpair.ai/og-image.png",
    "softwareVersion": "1.0.0",
    "dateCreated": "2025-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 