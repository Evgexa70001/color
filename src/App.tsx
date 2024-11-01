import { useState, useMemo, useEffect } from 'react'
import { Search, Plus } from 'lucide-react'
import ColorCard from './components/ColorCard'
import EditColorModal from './components/EditColorModal'
import ColorDetailsModal from './components/ColorDetailsModal'
import NewColorModal from './components/NewColorModal'
import NewCategoryModal from './components/NewCategoryModal'
import {
	saveColors,
	getColors,
	saveCategories,
	getCategories,
} from './services/storage'
import type { PantoneColor } from './types'

export default function App() {
	const [colors, setColors] = useState<PantoneColor[]>([])
	const [categories, setCategories] = useState<string[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
	const [editingColor, setEditingColor] = useState<PantoneColor | null>(null)
	const [selectedColor, setSelectedColor] = useState<PantoneColor | null>(null)
	const [isNewColorModalOpen, setIsNewColorModalOpen] = useState(false)
	const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false)

	useEffect(() => {
		setColors(getColors())
		setCategories(getCategories())
	}, [])

	const filteredColors = useMemo(() => {
		return colors.filter(color => {
			const matchesSearch =
				color.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				color.id.toLowerCase().includes(searchTerm.toLowerCase())
			const matchesCategory =
				!selectedCategory || color.category === selectedCategory
			return matchesSearch && matchesCategory
		})
	}, [colors, searchTerm, selectedCategory])

	const getSimilarColors = (color: PantoneColor): PantoneColor[] => {
		return colors
			.filter(c => c.id !== color.id && c.category === color.category)
			.slice(0, 10)
	}

	const handleSaveColor = (updatedColor: PantoneColor) => {
		const updatedColors = colors.map(c =>
			c.id === updatedColor.id ? updatedColor : c
		)
		setColors(updatedColors)
		saveColors(updatedColors)
	}

	const handleAddNewColor = (newColor: PantoneColor) => {
		const updatedColors = [...colors, newColor]
		setColors(updatedColors)
		saveColors(updatedColors)
	}

	const handleDeleteColor = (colorId: string) => {
		const updatedColors = colors.filter(c => c.id !== colorId)
		setColors(updatedColors)
		saveColors(updatedColors)
	}

	const handleAddNewCategory = (newCategory: string) => {
		const updatedCategories = [...categories, newCategory]
		setCategories(updatedCategories)
		saveCategories(updatedCategories)
	}

	return (
		<div className='min-h-screen bg-gray-50 p-8'>
			<div className='max-w-7xl mx-auto space-y-8'>
				<div className='flex items-center space-x-4'>
					<div className='relative flex-1'>
						<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
						<input
							type='text'
							placeholder='Поиск цвета'
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
							className='w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
					</div>
					<button
						onClick={() => setIsNewColorModalOpen(true)}
						className='px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2'
					>
						<Plus className='w-5 h-5' />
						<span>Новый цвет</span>
					</button>
					<button
						onClick={() => setIsNewCategoryModalOpen(true)}
						className='px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2'
					>
						<Plus className='w-5 h-5' />
						<span>Новая категория</span>
					</button>
				</div>

				<div className='flex flex-wrap gap-3'>
					{categories.map(category => (
						<button
							key={category}
							onClick={() =>
								setSelectedCategory(
									selectedCategory === category ? null : category
								)
							}
							className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${
									selectedCategory === category
										? 'bg-blue-600 text-white'
										: 'bg-white text-gray-700 hover:bg-gray-100'
								}`}
						>
							{category}
						</button>
					))}
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{filteredColors.map(color => (
						<ColorCard
							key={color.id}
							color={color}
							onEdit={() => setEditingColor(color)}
							onClick={() => setSelectedColor(color)}
							onDelete={() => handleDeleteColor(color.id)}
						/>
					))}
				</div>

				<div className='flex justify-center'>
					<button className='px-6 py-3 bg-white text-gray-700 rounded-lg shadow hover:bg-gray-50'>
						Показать еще
					</button>
				</div>

				{editingColor && (
					<EditColorModal
						color={editingColor}
						isOpen={true}
						onClose={() => setEditingColor(null)}
						onSave={handleSaveColor}
					/>
				)}

				{selectedColor && (
					<ColorDetailsModal
						color={selectedColor}
						isOpen={true}
						onClose={() => setSelectedColor(null)}
						similarColors={getSimilarColors(selectedColor)}
					/>
				)}

				<NewColorModal
					isOpen={isNewColorModalOpen}
					onClose={() => setIsNewColorModalOpen(false)}
					onSave={handleAddNewColor}
					categories={categories}
				/>

				<NewCategoryModal
					isOpen={isNewCategoryModalOpen}
					onClose={() => setIsNewCategoryModalOpen(false)}
					onSave={handleAddNewCategory}
					existingCategories={categories}
				/>
			</div>
		</div>
	)
}
