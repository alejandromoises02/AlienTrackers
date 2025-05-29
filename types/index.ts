export type Category = "music" | "books" | "movies" | "series"

export interface Item {
  id: string
  title: string
  isCustom?: boolean
}
