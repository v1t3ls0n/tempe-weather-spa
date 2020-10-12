import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './Home/Home';
import LogoIcon from '../img/Logo/LOGO_SVG.svg';
import Favorites from './Favorites/Favorites';

import '../style.css';

const Routes = ({theme, toggleLightDarkMode}) => {
	const [isFirstLoad, setFirstLoadToFalse] = useState(true);

	useEffect(() => {
		setFirstLoadToFalse(false);
	}, []);

	return (
		<div id='app-root'>
			<Router>
				<header className='header-container'>
					<div className='container'>
						<img src={LogoIcon} alt={LogoIcon} className='LogoIcon'></img>
						{toggleLightDarkMode}
						<ul>
							<li>
								<a href='/home'>Home</a>
							</li>
							<li>
								<a href='/Favorites'>Favorites</a>
							</li>
						</ul>
					</div>
				</header>
				{/* <footer>
					<div className='container'>
						<h2>Footer</h2>
					</div>
				</footer> */}
				<Switch>
					<Route exact path='/' render={() => isFirstLoad && <Redirect to='/home' />} />
					<Route exact path='/home' render={() => <Home theme={theme} />} />
					<Route exact path='/favorites' render={() => <Favorites theme={theme} />} />
				</Switch>
			</Router>
		</div>
	);
};

// Header.propTypes = {};

export default Routes;
