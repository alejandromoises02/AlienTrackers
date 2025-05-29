"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import type { Category } from "@/types"

interface AddItemFormProps {
  onAddItem: (title: string) => void
  selectedCategory: Category
}

const categoryLabels: Record<Category, string> = {
  music: "Music Album",
  books: "Book",
  movies: "Movie",
  series: "TV Series",
}

export function AddItemForm({ onAddItem, selectedCategory }: AddItemFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddItem(title.trim())
      setTitle("")
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-blue-100">
      <form
        onSubmit={handleSubmit}
        className="flex gap-3"
        aria-label={`Add custom ${categoryLabels[selectedCategory].toLowerCase()}`}
      >
        <Input
          type="text"
          id="item-title"
          name="item-title"
          placeholder={`Add ${categoryLabels[selectedCategory].toLowerCase()}...`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border-blue-200"
          aria-label={`${categoryLabels[selectedCategory]} title`}
          required
        />
        <Button
          type="submit"
          disabled={!title.trim()}
          className="bg-purple-600 hover:bg-purple-700"
          aria-label={`Add ${categoryLabels[selectedCategory].toLowerCase()}`}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
        </Button>
      </form>
    </div>
  )
}
