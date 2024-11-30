import React, { useContext, useState } from 'react';
import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/UI/Header/Header';
/* import GridContainer from './components/UI/GridContainer/GridContainer'; */
/* import Content from './components/UI/Content/Content'; */
import Sidebar from './components/UI/Sidebar/Sidebar';
import Content from './components/UI/Content/Content';
import { AuthContext } from './context';
import Login from './pages/Login';

function App() {
	const [isAuth, setIsAuth] = useState(localStorage.getItem('auth'));
	return (
		<AuthContext.Provider
			value={{
				isAuth,
				setIsAuth,
			}}>
			<BrowserRouter>
				{isAuth ? (
					<div className='grid-container'>
						<Header />
						<Content />
						<Sidebar />
					</div>
				) : (
					<Login />
				)}
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
