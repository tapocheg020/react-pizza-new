import Categories from './components/categories/Categories'
import Header from './components/header/Header'
import PizzaBlock from './components/pizzaBlock/PizzaBlock'
import Sort from './components/sort/Sort'
import './scss/app.scss'

function App() {
	return (
		<div class='wrapper'>
			<Header />
			<div class='content'>
				<div class='container'>
					<div class='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 class='content__title'>Все пиццы</h2>
					<div class='content__items'>
						<PizzaBlock title='Мексиканская пицца' price='396' />
						<PizzaBlock title='Сырная пицца' price='450' />
						<PizzaBlock title='Европейская пицца' price='520' />
						<PizzaBlock title='Итальянская пицца' price='651' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
