export interface PantoneColor {
	id: string
	name: string
	hex: string
	category: string
	recipe?: string
	customers?: string[]
	inStock: boolean
}

export interface ColorModalProps {
	color: PantoneColor
	isOpen: boolean
	onClose: () => void
	onSave: (updatedColor: PantoneColor) => void
}

export interface ColorDetailsModalProps {
	color: PantoneColor
	isOpen: boolean
	onClose: () => void
	similarColors: PantoneColor[]
}

export interface NewColorModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (newColor: PantoneColor) => void
	categories: string[]
}

export interface NewCategoryModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (category: string) => void
	existingCategories: string[]
}
