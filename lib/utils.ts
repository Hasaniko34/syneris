import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility for conditionally joining CSS class names together
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("tr-TR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }
  return text.slice(0, length) + "..."
}

export function getFirstLetters(text: string): string {
  const words = text.split(" ")
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
}

export function stringToColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const hue = Math.abs(hash % 360)
  return `hsl(${hue}, 70%, 40%)`
}
