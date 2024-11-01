import type { PantoneColor } from '../types'

const STORAGE_KEYS = {
	COLORS: 'pantone_colors',
	CATEGORIES: 'pantone_categories',
} as const

export function saveColors(colors: PantoneColor[]): void {
	localStorage.setItem(STORAGE_KEYS.COLORS, JSON.stringify(colors))
}

export function getColors(): PantoneColor[] {
	const stored = localStorage.getItem(STORAGE_KEYS.COLORS)
	return stored ? JSON.parse(stored) : []
}

export function saveCategories(categories: string[]): void {
	localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories))
}

export function getCategories(): string[] {
	const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES)
	return stored
		? JSON.parse(stored)
		: ['Желтые', 'Синие', 'Коричневые', 'Красные']
}
