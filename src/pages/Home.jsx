import React, { useEffect, useState } from 'react'
import Categories from '../components/categories/Categories'
import Sort from '../components/sort/Sort'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'
import Skeleton from '../components/pizzaBlock/Skeleton'

const Home = () => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch('https://65e430913070132b3b24590e.mockapi.io/items')
			.then(res => res.json())
			.then(arr => {
				setItems(arr)
				setIsLoading(false)
			})
	}, [])
	return (
		<>
			<div className='content__top'>
				<Categories />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{/* {items.map(obj => (
							<Skeleton key={obj.id} {...obj} />
						))} */}
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
			</div>
		</>
	)
}

export default Home
