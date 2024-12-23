import React from 'react'

const Categories = ({ categoryValue, onChangeCategory }) => {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, index) => {
					return (
						<li
							key={index}
							onClick={() => onChangeCategory(index)}
							className={categoryValue === index ? 'active' : ''}
						>
							{categoryName}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Categories
