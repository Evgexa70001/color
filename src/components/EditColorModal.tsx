import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import type { ColorModalProps } from '../types'
import { getCategories } from '../services/storage'

export default function EditColorModal({
	color,
	isOpen,
	onClose,
	onSave,
}: ColorModalProps) {
	const [recipe, setRecipe] = useState(color.recipe || '')
	const [customers, setCustomers] = useState(color.customers?.join(', ') || '')
	const [inStock, setInStock] = useState(color.inStock)
	const [category, setCategory] = useState(color.category)
	const categories = getCategories()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSave({
			...color,
			recipe,
			category,
			customers: customers
				.split(',')
				.map(c => c.trim())
				.filter(Boolean),
			inStock,
		})
		onClose()
	}

	return (
		<Dialog open={isOpen} onClose={onClose} className='relative z-50'>
			<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
			<div className='fixed inset-0 flex items-center justify-center p-4'>
				<Dialog.Panel className='mx-auto max-w-lg rounded-lg bg-white p-6'>
					<Dialog.Title className='text-lg font-medium mb-4'>
						Редактировать {color.name}
					</Dialog.Title>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Категория
							</label>
							<select
								value={category}
								onChange={e => setCategory(e.target.value)}
								className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
							>
								{categories.map(cat => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Рецепт
							</label>
							<textarea
								value={recipe}
								onChange={e => setRecipe(e.target.value)}
								className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
								rows={3}
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Заказчики (через запятую)
							</label>
							<input
								type='text'
								value={customers}
								onChange={e => setCustomers(e.target.value)}
								className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Наличие
							</label>
							<select
								value={inStock.toString()}
								onChange={e => setInStock(e.target.value === 'true')}
								className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
							>
								<option value='true'>В наличии</option>
								<option value='false'>Отсутствует</option>
							</select>
						</div>

						<div className='flex justify-end space-x-3 mt-6'>
							<button
								type='button'
								onClick={onClose}
								className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
							>
								Отмена
							</button>
							<button
								type='submit'
								className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700'
							>
								Сохранить
							</button>
						</div>
					</form>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}
