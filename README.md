# FontPair.ai 🎨

An intelligent, AI-powered font pairing assistant designed for modern designers, developers, and creators who want to elevate their typography game without spending hours on experimentation.

## ✨ Features

- **AI-Powered Pairing**: Intelligent algorithms suggest perfect font combinations based on mood, brand, or style preferences
- **Live Previews**: See how font combinations look in real UI components like headers, blog titles, and landing pages
- **Export CSS**: Get ready-to-use CSS code with Google Fonts links and proper font-family declarations
- **Share & Save**: Save your favorite combinations and share them with your team or the community
- **Instant Results**: Get beautiful font pairings instantly without spending hours on experimentation
- **Google Fonts Integration**: Access the entire Google Fonts library with curated pairings that work perfectly together

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fontpair-ai.git
cd fontpair-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
# Create a .env.local file in the root directory
cp .env.example .env.local
# Then edit .env.local with your API keys
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Toast Notifications**: react-hot-toast

## 🎯 Usage

1. **Search by Mood**: Enter keywords like "playful", "professional", "luxury"
2. **Search by Brand**: Try "tech startup", "eco-friendly", "fashion"
3. **Search by Font**: Enter a specific font name like "Poppins" or "Playfair Display"
4. **Browse Categories**: Explore curated collections by style
5. **Preview & Export**: See live previews and copy ready-to-use CSS

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

## 🔧 Customization

### Adding New Font Pairs

Edit the `sampleFontPairs` array in `app/page.tsx`:

```typescript
const newFontPair = {
  heading: 'Your+Heading+Font',
  body: 'Your+Body+Font',
  description: 'Description of the pairing',
  category: 'Category',
  tags: ['tag1', 'tag2', 'tag3']
}
```

### Styling

The app uses Tailwind CSS with custom utilities. Key classes:
- `.gradient-text`: Gradient text effect
- `.glass-effect`: Glass morphism effect
- `.hover-lift`: Hover animation
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
