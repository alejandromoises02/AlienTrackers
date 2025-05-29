"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Check } from "lucide-react"
import type { Item, Category } from "@/types"

interface ItemListProps {
  title: string
  items: Item[]
  onItemAction: (itemId: string) => void
  onRemoveItem: (itemId: string) => void
  actionLabel: string
  category: Category
}

const categoryLabels: Record<Category, string> = {
  music: "Music",
  books: "Books",
  movies: "Movies",
  series: "Series",
}

export function ItemList({ title, items, onItemAction, onRemoveItem, actionLabel, category }: ItemListProps) {
  const isPending = title === "Pending"
  const headingId = `${isPending ? "pending" : "completed"}-heading`
  const listId = `${isPending ? "pending" : "completed"}-list`

  const displayTitle = isPending ? `Pending ${categoryLabels[category]}` : title

  return (
    <Card className="border border-blue-100 shadow-md w-full">
      <CardHeader className={`${isPending ? "bg-blue-50" : "bg-purple-50"} border-b border-blue-100`}>
        <CardTitle id={headingId} className="flex items-center justify-between">
          {displayTitle}
          <span className="text-sm font-normal text-blue-600">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {items.length === 0 ? (
          <p className="text-center py-4 text-blue-600" id={listId}>
            No items yet
          </p>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto" aria-labelledby={headingId} id={listId}>
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-200 transition-colors"
              >
                <div className="flex-1">
                  <span className="text-sm font-medium">{item.title}</span>
                  {item.isCustom && (
                    <span
                      className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                      aria-label="Custom item"
                    >
                      Custom
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isPending ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onItemAction(item.id)}
                      aria-label={`${actionLabel} ${item.title}`}
                      className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onItemAction(item.id)}
                      aria-label={`${actionLabel} ${item.title}`}
                      className="text-xs border-purple-200 text-purple-600"
                    >
                      {actionLabel}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.title}`}
                    className="text-blue-600 hover:text-blue-800 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
