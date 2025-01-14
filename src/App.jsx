import { Route, Routes } from 'react-router-dom'
import CartItemEmpty from './components/cart/CartItemEmpty'
import Header from './components/header/Header'
import Cart from './pages/Cart'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './scss/app.scss'
//00.00.00 #9

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='*' element={<NotFound />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='/cart-empty' element={<CartItemEmpty />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default App
