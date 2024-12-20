import Header from './components/header/Header'
import Home from './pages/Home'
import './scss/app.scss'
//00.00.00 #7

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Home />
				</div>
			</div>
		</div>
	)
}

export default App
