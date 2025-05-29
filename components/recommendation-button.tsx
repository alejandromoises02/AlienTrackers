"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import type { Category } from "@/types"

interface RecommendationButtonProps {
  category: Category
  onAddRecommendation: () => void
}

export function RecommendationButton({ category, onAddRecommendation }: RecommendationButtonProps) {
  return (
    <div className="text-center">
      <Button
        onClick={onAddRecommendation}
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Generate recommendation"
      >
        <Sparkles className="w-6 h-6 mr-3" aria-hidden="true" />
        Generate Recommendation
      </Button>
    </div>
  )
}
