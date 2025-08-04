# FontPilot.io 🎨

Navigate typography with precision. An intelligent, AI-powered font pairing assistant designed for modern designers, developers, and creators who want to elevate their typography game without spending hours on experimentation.

## ✨ Features

- **AI-Powered Navigation**: Navigate typography with precision using intelligent algorithms that understand your design needs
- **Live Previews**: Experience your font choices in real-time with live previews of headers, blog titles, and landing pages
- **Export CSS**: Get production-ready CSS code with Google Fonts links and optimized font-family declarations
- **Share & Save**: Build your typography library by saving favorite combinations and sharing them with your team
- **Instant Results**: Navigate to perfect typography in seconds, not hours. Get beautiful font pairings instantly
- **Google Fonts Integration**: Access the complete Google Fonts library with expertly curated pairings that harmonize perfectly

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** (for Next.js 14 features)
- **npm or yarn** (package manager)
- **Git** (for version control)

### Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/NitinSemwal2605/fontpilot-io.git
cd fontpilot-io
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables:**
```bash
# Create .env.local file
cp .env.example .env.local

# Edit .env.local with your API keys
NEXT_PUBLIC_GOOGLE_FONTS_API_KEY=your_google_fonts_api_key
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key
```

4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Google Fonts API Key
NEXT_PUBLIC_GOOGLE_FONTS_API_KEY=your_google_fonts_api_key_here

# Google Gemini AI API Key  
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

### Getting API Keys

1. **Google Fonts API**: 
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Google Fonts API
   - Create credentials and get your API key

2. **Google Gemini AI API**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key for Gemini Pro

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Toast Notifications**: react-hot-toast
- **SEO**: Structured data, sitemap, robots.txt
- **PWA**: Web app manifest for mobile experience
- **AI Integration**: Google Gemini Pro for intelligent recommendations
- **Font Management**: Google Fonts API integration

## 🎯 Usage

1. **AI-Powered Search**: Describe your project like "Building a SaaS landing page" or "Creating a wedding website"
2. **Browse Categories**: Explore curated collections by style (Professional, Creative, Modern, etc.)
3. **Live Previews**: See font combinations in real UI components
4. **Export CSS**: Copy production-ready CSS with Google Fonts links
5. **Save Favorites**: Build your typography library with saved combinations

## 🎨 Design System

The application uses a modern design system with:
- Gradient text effects
- Smooth animations and transitions
- Glass morphism effects
- Responsive design
- Dark mode support (coming soon)

## 📱 Responsive Design

FontPair.ai is fully responsive and works beautifully on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Google Fonts API Key
NEXT_PUBLIC_GOOGLE_FONTS_API_KEY=your_google_fonts_api_key_here

# Google Gemini AI API Key  
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

### Getting API Keys

1. **Google Fonts API**: 
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Google Fonts API
   - Create credentials and get your API key

2. **Google Gemini AI API**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key for Gemini Pro

## 📁 Project Structure

```
fontpilot-io/
├── app/                          # Next.js 14 App Router
│   ├── components/               # Shared components
│   │   └── structured-data.tsx  # SEO structured data
│   ├── favorites/               # Favorites page
│   │   └── page.tsx
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with metadata
│   ├── manifest.ts              # PWA manifest
│   ├── page.tsx                 # Home page
│   ├── robots.ts                # SEO robots.txt
│   └── sitemap.ts              # SEO sitemap
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── features.tsx             # Features section
│   ├── footer.tsx               # Footer component
│   ├── font-card.tsx            # Font pair card
│   ├── font-preview.tsx         # Font loading component
│   ├── navigation.tsx           # Navigation bar
│   └── ai-reasoning.tsx         # AI reasoning display
├── lib/                         # Utility libraries
│   ├── ai-recommendations.ts    # AI integration
│   ├── favorites.ts             # Local storage management
│   ├── fonts.ts                 # Google Fonts integration
│   ├── font-styles.ts           # Font categorization
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
└── package.json                 # Dependencies
```

## 🏗️ Architecture Overview

### Core Components

1. **AI Integration** (`lib/ai-recommendations.ts`)
   - Google Gemini Pro integration
   - Context-aware font recommendations
   - Fallback recommendations for different use cases

2. **Font Management** (`lib/fonts.ts`)
   - Google Fonts API integration
   - Dynamic font loading
   - Font categorization and filtering

3. **State Management**
   - React hooks for local state
   - Local storage for favorites
   - Session storage for font previews

4. **UI Components**
   - Modular component architecture
   - Reusable shadcn/ui components
   - Responsive design with Tailwind CSS

### Key Features Implementation

#### AI-Powered Recommendations
```typescript
// lib/ai-recommendations.ts
export async function getAIRecommendations(userNeed: string): Promise<AIRecommendation[]>
```
- Analyzes user input for context
- Generates 10 tailored font combinations
- Provides reasoning and use cases

#### Font Loading System
```typescript
// lib/fonts.ts
export function loadFontsForPair(headingFont: string, bodyFont: string): Promise<void>
```
- Dynamic Google Fonts loading
- Prevents duplicate font requests
- Handles loading states

#### Favorites System
```typescript
// lib/favorites.ts
export function addToFavorites(fontPair: FontPair): boolean
```
- Local storage persistence
- Add/remove functionality
- Dedicated favorites page

## 🔧 Development Guidelines

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **Component Structure**: Functional components with hooks

### Adding New Features

1. **New Font Categories**
   ```typescript
   // Add to lib/font-styles.ts
   export const fontStyles = {
     'New Category': {
       icon: '🎨',
       color: 'text-blue-500',
       description: 'Description here'
     }
   }
   ```

2. **New AI Recommendations**
   ```typescript
   // Add to lib/ai-recommendations.ts
   const newRecommendations = [
     {
       heading: 'Font Name',
       body: 'Font Name',
       category: 'Category',
       description: 'Description',
       reasoning: 'Why this works',
       useCase: 'Specific use case'
     }
   ]
   ```

3. **New UI Components**
   ```typescript
   // Create in components/
   export default function NewComponent() {
     return (
       <div className="your-styles">
         {/* Component content */}
       </div>
     )
   }
   ```

### Environment Setup

1. **Development**
   ```bash
   npm run dev
   ```

2. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

3. **Type Checking**
   ```bash
   npm run type-check
   ```

4. **Linting**
   ```bash
   npm run lint
   ```

## 🧪 Testing

### Manual Testing Checklist
- [ ] AI recommendations work for different inputs
- [ ] Font loading and preview functionality
- [ ] Favorites system (add/remove/save)
- [ ] CSS export functionality
- [ ] Responsive design on different screen sizes
- [ ] SEO metadata and structured data
- [ ] PWA functionality

### Performance Testing
- [ ] Font loading performance
- [ ] AI response times
- [ ] Bundle size optimization
- [ ] Lighthouse scores

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Similar to Vercel setup
- **Railway**: Container-based deployment
- **AWS/GCP**: Custom server setup

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Contribution Guidelines
- Follow TypeScript best practices
- Add proper error handling
- Include loading states for async operations
- Test on multiple browsers
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Fonts API** for font data
- **Google Gemini Pro** for AI recommendations
- **shadcn/ui** for beautiful components
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling

## 📞 Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/NitinSemwal2605/fontpilot-io/issues)
- **Email**: 55semwalnitin@gmail.com
- **Twitter**: [@nitintweetz](https://x.com/nitintweetz)

---

**Made with ❤️ by [Nitin Semwal](https://github.com/NitinSemwal2605)**
- `.animate-gradient-shift`: Animated gradient background

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Fonts](https://fonts.google.com/) for the font library
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

- 🐛 Report bugs: [GitHub Issues](https://github.com/yourusername/fontpair-ai/issues)
- 💡 Feature requests: [GitHub Discussions](https://github.com/yourusername/fontpair-ai/discussions)
- 📧 Email: hello@fontpair.ai

---

Made with ❤️ for designers and developers
