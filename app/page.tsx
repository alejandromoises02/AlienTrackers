"use client"

import { useState, useEffect } from "react"
import { CategorySelector } from "@/components/category-selector"
import { ItemList } from "@/components/item-list"
import { RecommendationButton } from "@/components/recommendation-button"
import { AlienPet } from "@/components/alien-pet"
import { AddItemForm } from "@/components/add-item-form"
import { top100Data } from "@/data/top100"
import { loadFromStorage, saveToStorage } from "@/lib/storage"
import type { Category, Item } from "@/types"

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("music")
  const [pendingItems, setPendingItems] = useState<Record<Category, Item[]>>({
    music: [],
    books: [],
    movies: [],
    series: [],
  })
  const [completedItems, setCompletedItems] = useState<Record<Category, Item[]>>({
    music: [],
    books: [],
    movies: [],
    series: [],
  })

  // Load data from localStorage on mount
  useEffect(() => {
    const savedPending = loadFromStorage("pendingItems")
    const savedCompleted = loadFromStorage("completedItems")
    const savedCategory = loadFromStorage("selectedCategory")

    if (savedPending) setPendingItems(savedPending)
    if (savedCompleted) setCompletedItems(savedCompleted)
    if (savedCategory) setSelectedCategory(savedCategory)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage("pendingItems", pendingItems)
  }, [pendingItems])

  useEffect(() => {
    saveToStorage("completedItems", completedItems)
  }, [completedItems])

  useEffect(() => {
    saveToStorage("selectedCategory", selectedCategory)
  }, [selectedCategory])

  const addCustomItem = (title: string) => {
    const newItem: Item = {
      id: Date.now().toString(),
      title,
      isCustom: true,
    }

    setPendingItems((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], newItem],
    }))
  }

  const addRecommendation = () => {
    const categoryData = top100Data[selectedCategory]
    const existingTitles = new Set([
      ...pendingItems[selectedCategory].map((item) => item.title.toLowerCase()),
      ...completedItems[selectedCategory].map((item) => item.title.toLowerCase()),
    ])

    const availableItems = categoryData.filter((item) => !existingTitles.has(item.title.toLowerCase()))

    if (availableItems.length === 0) {
      alert("All recommendations for this category have been added!")
      return
    }

    const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)]

    setPendingItems((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], randomItem],
    }))
  }

  const completeItem = (itemId: string) => {
    const item = pendingItems[selectedCategory].find((item) => item.id === itemId)
    if (!item) return

    setPendingItems((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter((item) => item.id !== itemId),
    }))

    setCompletedItems((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], item],
    }))
  }

  const uncompleteItem = (itemId: string) => {
    const item = completedItems[selectedCategory].find((item) => item.id === itemId)
    if (!item) return

    setCompletedItems((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter((item) => item.id !== itemId),
    }))

    setPendingItems((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], item],
    }))
  }

  const removeItem = (itemId: string, fromCompleted = false) => {
    if (fromCompleted) {
      setCompletedItems((prev) => ({
        ...prev,
        [selectedCategory]: prev[selectedCategory].filter((item) => item.id !== itemId),
      }))
    } else {
      setPendingItems((prev) => ({
        ...prev,
        [selectedCategory]: prev[selectedCategory].filter((item) => item.id !== itemId),
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      {/* Skip to content link for keyboard users */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50">
        Skip to main content
      </a>

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8" role="banner">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">CulturAlien</h1>
          <p className="text-blue-600">Track your enterainment journy</p>
        </header>

        <main id="main-content" className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Alien Pet */}
          <div className="lg:col-span-1">
            <AlienPet completedItems={completedItems} />
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <CategorySelector selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

            <AddItemForm onAddItem={addCustomItem} selectedCategory={selectedCategory} />

            <RecommendationButton category={selectedCategory} onAddRecommendation={addRecommendation} />

            <ItemList
              title="Pending"
              items={pendingItems[selectedCategory]}
              onItemAction={completeItem}
              onRemoveItem={removeItem}
              actionLabel="Complete"
              category={selectedCategory}
            />

            <ItemList
              title="Completed"
              items={completedItems[selectedCategory]}
              onItemAction={uncompleteItem}
              onRemoveItem={(id) => removeItem(id, true)}
              actionLabel="Undo"
              category={selectedCategory}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
