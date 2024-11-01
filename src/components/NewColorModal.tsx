import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import type { NewColorModalProps } from '../types'

export default function NewColorModal({
	isOpen,
	onClose,
	onSave,
	categories,
}: NewColorModalProps) {
	const [name, setName] = useState('')
	const [hex, setHex] = useState('#')
	const [category, setCategory] = useState(categories[0] || '')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const newColor = {
			id: `PAN-${Math.random().toString(36).substr(2, 9)}`, // Temporary ID generation
			name,
			hex,
			category,
			inStock: true,
		}

		onSave(newColor)
		onClose()
		setName('')
		setHex('#')
		setCategory(categories[0] || '')
	}

	return (
		<Dialog open={isOpen} onClose={onClose} className='relative z-50'>
			<div className='fixed inset-0 bg-black/30' aria-hidden='true' />
			<div className='fixed inset-0 flex items-center justify-center p-4'>
				<Dialog.Panel className='mx-auto max-w-lg w-full rounded-lg bg-white p-6'>
					<Dialog.Title className='text-lg font-medium mb-4'>
						Добавить новый цвет
					</Dialog.Title>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Название
							</label>
							<input
								type='text'
								value={name}
								onChange={e => setName(e.target.value)}
								required
								className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
							/>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700'>
								HEX код
							</label>
							<div className='mt-1 flex items-center space-x-2'>
								<input
									type='text'
									value={hex}
									onChange={e => setHex(e.target.value)}
									pattern='^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'
									required
									className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
								/>
								<div
									className='w-10 h-10 rounded border'
									style={{ backgroundColor: hex }}
								/>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700'>
								Категория
							</label>
							<select
								value={category}
								onChange={e => setCategory(e.target.value)}
								required
								className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
							>
								{categories.map(cat => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
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
								Добавить
							</button>
						</div>
					</form>
				</Dialog.Panel>
			</div>
		</Dialog>
	)
}
