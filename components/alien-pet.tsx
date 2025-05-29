"use client"

import { useMemo } from "react"
import type { Category, Item } from "@/types"

interface AlienPetProps {
  completedItems: Record<Category, Item[]>
}

export function AlienPet({ completedItems }: AlienPetProps) {
  const { alienImage, stats, message, currentCategory } = useMemo(() => {
    const totals = {
      music: completedItems.music.length,
      books: completedItems.books.length,
      movies: completedItems.movies.length,
      series: completedItems.series.length,
    }

    const totalCompleted = Object.values(totals).reduce((sum, count) => sum + count, 0)

    if (totalCompleted === 0) {
      return {
        alienImage: "/images/alien_base.png",
        stats: totals,
        message: "Complete some items to see me evolve!",
        currentCategory: null,
      }
    }

    // Calculate percentages
    const percentages = Object.entries(totals).map(([category, count]) => ({
      category: category as Category,
      percentage: (count / totalCompleted) * 100,
      count,
    }))

    // Find dominant category
    const dominant = percentages.find((p) => p.percentage > 50)
    const light = percentages.find((p) => p.percentage >= 30 && p.percentage <= 50)

    let imageUrl = "/images/alien_base.png"
    let message = "I'm growing! Keep exploring different types of culture."
    let currentCategory = null

    if (dominant) {
      const dominantImages: Record<Category, string> = {
        music: "/images/alien_music2.png",
        books: "/images/alien_book2.png",
        movies: "/images/alien_movie2.png",
        series: "/images/alien_series2.png",
      }
      imageUrl = dominantImages[dominant.category]
      message = `I've become a ${dominant.category} master!`
      currentCategory = dominant.category
    } else if (light) {
      const lightImages: Record<Category, string> = {
        music: "/images/alien_music1.png",
        books: "/images/alien_book1.png",
        movies: "/images/alien_movie1.png",
        series: "/images/alien_series1.png",
      }
      imageUrl = lightImages[light.category]
      message = `I'm becoming a ${light.category} enthusiast!`
      currentCategory = light.category
    }

    return { alienImage: imageUrl, stats: totals, message, currentCategory }
  }, [completedItems])

  const totalCompleted = Object.values(stats).reduce((sum, count) => sum + count, 0)

  // Generate descriptive alt text based on the alien's current state
  const getAltText = () => {
    if (!currentCategory) return "Pink alien pet in default state"

    const categoryDescriptions = {
      music: {
        light: "Pink alien wearing headphones and holding a boombox",
        dominant: "Pink alien wearing a top hat and playing an electric guitar",
      },
      books: {
        light: "Pink alien reading an orange book",
        dominant: "Pink alien with glasses reading an orange book",
      },
      movies: {
        light: "Pink alien holding popcorn",
        dominant: "Pink alien wearing 3D glasses and holding popcorn",
      },
      series: {
        light: "Pink alien in black clothes holding popcorn",
        dominant: "Pink alien in blue pajamas with yellow polka dots",
      },
    }

    const intensity = totalCompleted > 0 && stats[currentCategory] / totalCompleted > 0.5 ? "dominant" : "light"
    return categoryDescriptions[currentCategory][intensity]
  }

  return (
    <section
      aria-labelledby="alien-pet-heading"
      className="bg-white rounded-lg shadow-md p-6 text-center sticky top-4 border border-blue-100"
    >
      <h2 id="alien-pet-heading" className="text-xl font-semibold mb-4 text-purple-600">
        Your Alien Pet
      </h2>

      <div className="relative mb-6">
        <div className="w-64 h-64 mx-auto rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border-2 border-blue-100">
          <img
            src={alienImage || "/placeholder.svg"}
            alt={getAltText()}
            className="w-full h-full object-contain"
            aria-describedby="alien-status"
          />
        </div>
        {totalCompleted > 0 && (
          <div
            className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold"
            aria-label={`${totalCompleted} items completed`}
          >
            {totalCompleted}
          </div>
        )}
      </div>

      {totalCompleted > 0 && (
        <div id="alien-status" className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-100">
          <p className="text-sm text-blue-700">{message}</p>
        </div>
      )}

      <div className="space-y-3">
        <div className="text-lg font-semibold text-purple-600">Total Completed: {totalCompleted}</div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>🎧 Music:</span>
            <span className="font-medium">{stats.music}</span>
          </div>
          <div className="flex justify-between">
            <span>📚 Books:</span>
            <span className="font-medium">{stats.books}</span>
          </div>
          <div className="flex justify-between">
            <span>🎬 Movies:</span>
            <span className="font-medium">{stats.movies}</span>
          </div>
          <div className="flex justify-between">
            <span>📺 Series:</span>
            <span className="font-medium">{stats.series}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
