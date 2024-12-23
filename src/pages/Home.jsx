import React, { useEffect, useState } from 'react'
import Categories from '../components/categories/Categories'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'
import Skeleton from '../components/pizzaBlock/Skeleton'
import Sort from '../components/sort/Sort'

const Home = () => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	useEffect(() => {
		setIsLoading(true)
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const sortBy = sortType.sortProperty.replace('-', '')

		fetch(
			`https://65e430913070132b3b24590e.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
		)
			.then(res => res.json())
			.then(arr => {
				setItems(arr)
				setIsLoading(false)
			})
			.catch(error => {
				console.error('Ошибка при запросе:', error)
			})
		window.scrollTo(0, 0)
	}, [categoryId, sortType])

	return (
		<>
			<div className='content__top'>
				<Categories
					categoryValue={categoryId}
					onChangeCategory={id => setCategoryId(id)}
				/>
				<Sort sortValue={sortType} onChangeSort={id => setSortType(id)} />
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
