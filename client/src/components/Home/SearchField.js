import React, { useState, useEffect, Fragment } from 'react';
import CurrentWeatherByLocation from './CurrentWeatherByLocation';
import { callWeatherAPI, callAutoCompleteAPI } from '../../actions/actions';
import { v4 as uuidv4 } from 'uuid';
import emptyStarDayTheme from '../../img/star-bookmark/dayTheme/d_Clear Star.svg';
import fullStarDayTheme from '../../img/star-bookmark/dayTheme/d_Full Star.svg';
import emptyStarNightTheme from '../../img/star-bookmark/nightTheme/n_Clear Star.svg';
import fullStarNightTheme from '../../img/star-bookmark/nightTheme/n_Full Star.svg';

const SearchField = ({ theme }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchOptions, setsearchOptions] = useState([]);
	const [weatherForecast, loadCityWeatherForecast] = useState(null);
	const [city, selectCity] = useState(null);
	const [toasters, setToasters] = useState([]);
	const [tempFormat, toggeleCeliusFahrenheit] = useState(true); //true = celius
	/// favorites (favorite cities) state object
	const [favorites, setFavorites] = useState(() => {
		if (JSON.parse(window.localStorage.getItem('favorites')))
			return JSON.parse(window.localStorage.getItem('favorites'));
		else return [];
	});

	//update localStorage with favorite state object, this line runs each time component reload, that means everytime after one of the state objects updates
	window.localStorage.setItem('favorites', JSON.stringify(favorites));

	const addOrRemoveFromFavorites = () => {
		if (!checkIfInFavorites(city.id, favorites)) {
			setFavorites([...favorites, city]);
			createOrRemoveToasters({
				msg: `Youv'e added ${city.name} to your favorite cities`,
				id: uuidv4(),
				type: 'positive'
			});
		} else {
			setFavorites((favorites) => favorites.filter((favoriteCity) => favoriteCity.id !== city.id));
			createOrRemoveToasters({
				msg: `Youv'e removed ${city.name} to your favorite cities`,
				id: uuidv4(),
				type: 'negative'
			});
		}
	};

	const toasterNotifications = toasters !== null && (
		<div className={`toaster-wrapper ${toasters.type}`} key={toasters.id}>
			<div className='container'>
				<h3> {toasters.msg}</h3>
			</div>
		</div>
	);

	const createOrRemoveToasters = ({ msg, id, type, seconds = 3000 }) => {
		setToasters({ msg: msg, id: id, type: type });
		setTimeout(() => {
			setToasters(null);
		}, seconds);
	};

	useEffect(() => {
		// IIFE that loads default weather forecast which is set to be the weather of london
		(async () => {
			selectCity({
				name: 'London',
				country: 'GB',
				id: 2643743,
				coord: { lat: 51.50853, lon: -0.12574 }
			});
			setSearchTerm('London GB');
			let results = await callWeatherAPI(51.50853, -0.12574);
			if (results === false) {
				createOrRemoveToasters({
					msg: 'Weather API Too Many Requests Error, try to use later on',
					id: uuidv4(),
					type: 'error',
					seconds: 6000
				});
			} else loadCityWeatherForecast(results);
		})();
	}, []);

	const handleToggleTempClick = () => {
		toggeleCeliusFahrenheit(!tempFormat);
	};

	const checkIfInFavorites = () => {
		let isFavorite = false;
		for (const favCity of favorites) {
			isFavorite = favCity.id === city.id && true;
		}
		return isFavorite;
	};

	const handleSelectedCityChange = async ({ name, country, id, coord: { lat, lon } }) => {
		selectCity({ name, country, id, coord: { lat, lon } });
		setSearchTerm(`${name} ${country}`);
		setsearchOptions([]);
		loadCityWeatherForecast(await callWeatherAPI(lat, lon));
		if (weatherForecast === false) {
			createOrRemoveToasters({
				msg: 'Weather API Too Many Requests Error, try to use later on',
				id: uuidv4(),
				type: 'error'
			});
		}
	};

	const handleInputChange = async (event) => {
		const lettersAndSpaceRegExp = /^[A-Za-z\s]+$/;
		let input = event.target.value;
		setSearchTerm(input);
		let cleanInput = input.match(lettersAndSpaceRegExp);
		if (cleanInput)
			cleanInput.input.length > 2 && setsearchOptions(await callAutoCompleteAPI(cleanInput.input));
		else setsearchOptions([]);
	};

	const prettyDateRange = weatherForecast && (
		<label className='date-range'>
			{`${weatherForecast.current.month} 
		${weatherForecast.current.dayNumeric}`}
			<sup className='th'>th</sup>
			{`— ${weatherForecast.daily[4].dayNumeric}`}
			<sup>th</sup>
		</label>
	);

	const toggleCF = (
		<span onClick={() => handleToggleTempClick()} className='toggleCF-home'>
			<span className={tempFormat ? 'c active' : 'c'}>C°</span>
			<div className='toggle-wrapper-home'>
				<div className={tempFormat ? 'toggle-btn-home c' : 'toggle-btn-home f'}></div>
			</div>
			<span className={!tempFormat ? 'f active' : 'f'}>F°</span>
		</span>
	);

	const makeFavorite = city && (
		<div className='make-favorite'>
			{checkIfInFavorites() ? (
				<img
					onClick={addOrRemoveFromFavorites}
					src={theme === 'dayTheme' ? fullStarDayTheme : fullStarNightTheme}
					alt={theme === 'dayTheme' ? fullStarDayTheme : fullStarNightTheme}
				></img>
			) : (
				<img
					onClick={addOrRemoveFromFavorites}
					src={theme === 'dayTheme' ? emptyStarDayTheme : emptyStarNightTheme}
					alt={theme === 'dayTheme' ? emptyStarDayTheme : emptyStarNightTheme}
				></img>
			)}
		</div>
	);

	//// Search Field Component's Elements

	const search = (
		<div>
			<div className='container'>
				<div className='search'>
					{searchOptions && (
						<input
							type='text'
							className={searchOptions.length > 0 ? 'open' : 'closed'}
							placeholder='Search'
							value={searchTerm}
							onChange={handleInputChange}
						/>
					)}
					<ul>
						{searchOptions.length > 0 &&
							searchOptions.map((cityOption, index) => {
								return (
									<li
										value={cityOption}
										key={index}
										onClick={() => handleSelectedCityChange(cityOption)}
									>
										{`${cityOption.name}, ${cityOption.country} `}
									</li>
								);
							})}
					</ul>
				</div>
			</div>
		</div>
	);

	const weatherForecastResultsHeader = city && weatherForecast && (
		<div className='container'>
			<div className='results-title'>
				{makeFavorite}

				<span className='city-title'>
					<h1>{city.name} </h1>
				</span>

				<h1 className='country-title'>{city.country}</h1>

				{toggleCF}
				{prettyDateRange}
			</div>
		</div>
	);

	const weatherForecastResultsHeaderMobile = city && weatherForecast && (
		<div className='container'>
			<div className='results-title-mobile'>
				{makeFavorite}
				<div className='city-country-date-container'>
					<h1>
						{city.name} <span>{city.country}</span>
					</h1>

					<div className='mobile-date-range'>
						<label>
							{`${weatherForecast.current.day} 
							${weatherForecast.current.dayNumeric}`}
							<sup className='th'>th</sup>
						</label>
					</div>
				</div>
			</div>
		</div>
	);

	const weatherForecastResultsContent = weatherForecast && (
		<CurrentWeatherByLocation
			theme={theme}
			tempFormat={tempFormat}
			weeklyForecast={weatherForecast.daily}
		/>
	);

	return (
		<Fragment>
			{toasterNotifications}
			{search}
			{weatherForecastResultsHeader}
			{weatherForecastResultsHeaderMobile}
			{weatherForecastResultsContent}
		</Fragment>
	);
};

export default SearchField;
