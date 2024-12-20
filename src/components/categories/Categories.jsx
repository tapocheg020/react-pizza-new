import React, { useState } from 'react'

const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0)

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]

	// const onClickCategory = index => {
	// 	setActiveIndex(index)
	// }

	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, index) => {
					return (
						<li
							key={index}
							onClick={() => setActiveIndex(index)}
							className={activeIndex === index ? 'active' : ''}
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
