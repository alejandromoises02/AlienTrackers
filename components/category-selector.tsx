"use client"

import { Button } from "@/components/ui/button"
import type { Category } from "@/types"

interface CategorySelectorProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
}

const categories: { key: Category; label: string; icon: string }[] = [
  { key: "music", label: "Music Albums", icon: "🎧" },
  { key: "books", label: "Books", icon: "📚" },
  { key: "movies", label: "Movies", icon: "🎬" },
  { key: "series", label: "TV Series", icon: "📺" },
]

export function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
  return (
    <section aria-labelledby="category-heading" className="bg-white rounded-lg shadow-md p-6 border border-blue-100">
      <h2 id="category-heading" className="text-xl font-semibold mb-4 text-purple-600">
        Select Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="radiogroup" aria-label="Content categories">
        {categories.map(({ key, label, icon }) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "default" : "outline"}
            onClick={() => onCategoryChange(key)}
            aria-checked={selectedCategory === key}
            role="radio"
            aria-label={label}
            className={`flex items-center gap-2 h-auto py-3 ${
              selectedCategory === key ? "bg-blue-600 hover:bg-blue-700" : "border-blue-200"
            }`}
          >
            <span aria-hidden="true">{icon}</span>
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </section>
  )
}
