'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Sparkles } from 'lucide-react'

interface AIReasoningProps {
  reasoning: string
  useCase: string
  category: string
  headingFont?: string
  bodyFont?: string
}

export default function AIReasoning({ reasoning, useCase, category, headingFont, bodyFont }: AIReasoningProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/50 border border-white/20 rounded-lg p-4 mb-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
                     <div className="flex items-center gap-2 mb-2">
             <span 
               className="text-sm font-medium text-white bg-white/10 px-2 py-1 rounded"
               style={{ fontFamily: headingFont ? `'${headingFont}', serif` : undefined }}
             >
               {category}
             </span>
             <span className="text-xs text-gray-400">AI Reasoning</span>
           </div>
           <p 
             className="text-sm text-gray-300 leading-relaxed mb-2"
             style={{ fontFamily: bodyFont ? `'${bodyFont}', sans-serif` : undefined }}
           >
             {reasoning}
           </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <CheckCircle className="w-3 h-3" />
            <span>Perfect for: {useCase}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 