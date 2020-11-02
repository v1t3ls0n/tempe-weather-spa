import React, {useState, useEffect} from 'react';
import Moon from '../img/lightDarkThemeIcons/Moon.svg';
import Sun from '../img/lightDarkThemeIcons/Sun.svg';
import Routes from './Routes';
import '../style.css';

const App = () => {
	useEffect(() => isItDayOrNight(), []);

	const [lightDarkThemeToggle, setTheme] = useState(true);

	const isItDayOrNight = () => {
		const currentHour = new Date().getHours();
		currentHour > 18 || currentHour < 6 ? setTheme(false) : setTheme(true);
	};

	const toggleLightDarkMode = (
		<span onClick={() => setTheme(!lightDarkThemeToggle)} className='toggleLightDarkMode-wrapper'>
			<img
				src={lightDarkThemeToggle ? Sun : Moon}
				alt=''
				className={lightDarkThemeToggle ? 'SunIcon Active' : 'MoonIcon Active'}
			/>
		</span>
	);

	return (
		<Routes
			toggleLightDarkMode={toggleLightDarkMode}
			theme={lightDarkThemeToggle ? 'dayTheme' : 'nightTheme'}
		/>
	);
};

export default App;
