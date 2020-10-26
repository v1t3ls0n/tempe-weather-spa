import React, {useState, useEffect} from 'react';
import FavoriteCard from './FavoriteCard';
// import Loader from './../Loader';
import {v4 as uuidv4} from 'uuid';
import {
	callWeatherAPI,
	convertKelvinToCelius,
	convertKelvinToFahrenheit,
	convertDayNumberToName
} from '../../actions/actions';
import nightFavoriteIcon from '../../img/favorites/n_Favorite.svg';
import dayFavoriteIcon from '../../img/favorites/d_Favorite.svg';

const Favorites = ({theme}) => {
	const [tempFormat, toggeleCeliusFahrenheit] = useState(true); //true = celius
	const [toasters, setToasters] = useState([]);
	const [citiesCurrentWeatherData, setCitiesWeather] = useState([]);
	const [favorites, setFavorites] = useState(() => {
		if (JSON.parse(window.localStorage.getItem('favorites')))
			return JSON.parse(window.localStorage.getItem('favorites'));
		else return [];
	});

	//update localStorage with favorite state object, this line runs each time component reload, that means everytime after one of the state objects updates
	window.localStorage.setItem('favorites', JSON.stringify(favorites));

	const isLoadingPageDataFinished =
		citiesCurrentWeatherData.length === favorites.length ? true : false;

	const createOrRemoveToasters = ({msg, id, type, seconds = 3000}) => {
		setToasters({msg: msg, id: id, type: type});
		if (seconds !== 'forever') {
			setTimeout(() => {
				setToasters(null);
			}, seconds);
		}
	};

	const checkIfInFavorites = (cityID) => {
		let isFavorite = false;
		for (const city of favorites) {
			isFavorite = city.id === cityID ? true : false;
		}
		return isFavorite;
	};

	const removeFromFavorites = (cityID, cityName) => {
		if (checkIfInFavorites(cityID))
			setFavorites((favorites) => favorites.filter((favoriteCity) => favoriteCity.id !== cityID));
		createOrRemoveToasters({
			msg: `Youv'e removed ${cityName} to your favorite cities`,
			id: uuidv4(),
			type: 'negative',
			seconds: 6000
		});
	};

	const doesUserHaveFavoriteCitiesSavedOnLocalStorage = favorites.length === 0 ? false : true;

	const getCurrentDate = () => {
		const currentDayName = convertDayNumberToName(new Date().getDay());
		const currentDayNumberInMonth = new Date().getDate();

		return (
			<span className={theme && `fav-date ${theme}`}>
				<h1>{currentDayName}</h1>
				<h1>{currentDayNumberInMonth}</h1>
				<sup>th</sup>
			</span>
		);
	};

	useEffect(() => {
		console.log('inside useEffect');
		console.log(favorites);
		// IIFE that loads the current weather data of your favorite cities
		(async () => {
			try {
				for await (const favoriteCity of favorites) {
					let {
						coord: {lat, lon},
						name,
						id,
						country
					} = favoriteCity;
					let results = await callWeatherAPI(lat, lon);

					if (!results) {
						createOrRemoveToasters({
							msg: 'Weather API Too Many Requests Error, try to use later on',
							id: uuidv4(),
							type: 'error'
						});
						setCitiesWeather(false);
						break;
					} else {
						setCitiesWeather((prev) => [
							...prev,
							{
								name,
								id,
								country,
								current: results.current,
								timezone: results.timezone,
								timezone_offset: results.timezone_offset
							}
						]);
					}
				}
			} catch (err) {
				console.log(err);
			}
		})();
	}, [favorites]);

	const handleToggleTempClick = () => {
		toggeleCeliusFahrenheit(!tempFormat);
	};

	const toasterNotifications = toasters !== null && (
		<div className='container'>
			<div className={`toaster-wrapper ${toasters.type}`} key={toasters.id}>
				<h3> {toasters.msg}</h3>
			</div>
		</div>
	);

	const toggleCF = isLoadingPageDataFinished && favorites.length > 0 && (
		<div className='favoriteCardContainerGrid'>
			<div onClick={() => handleToggleTempClick()} className='toggleCF'>
				<span className={tempFormat ? 'c active' : 'c'}>C°</span>
				<div className='toggle-wrapper'>
					<div className={tempFormat ? 'toggle-btn c' : 'toggle-btn f'}></div>
				</div>
				<span className={!tempFormat ? 'f active' : 'f'}>F°</span>
			</div>
		</div>
	);

	const welcomingTitle = (
		<div className='fav-header'>
			<div className={theme && `favoriteTitle ${theme}`}>
				<h1>It's Your's Favorite Cities Weathers For </h1>
			</div>
			{getCurrentDate()}
			<div className='FavoriteIcon'>
				{theme === 'dayTheme' ? (
					<img src={dayFavoriteIcon} alt={dayFavoriteIcon} className='BigSunImg'></img>
				) : (
					<img src={nightFavoriteIcon} alt={nightFavoriteIcon} className='BigMoonImg'></img>
				)}
			</div>
		</div>
	);

	const favoriteHeader = doesUserHaveFavoriteCitiesSavedOnLocalStorage ? (
		<div>{welcomingTitle}</div>
	) : (
		<div className='fav-header-no-favorites'>
			<div className='user-have-no-favorites'>
				<h1>
					<span role='img' aria-label=''>
						😒
					</span>
					You Currently Dont Have Even One Favorite City! Go Back To Homepage And Add Some
				</h1>
			</div>
			{welcomingTitle}
		</div>
	);

	return (
		<main id='favorites' className={theme}>
			<div className='container'>
				<div className='FavoriteComponentDiv'>
					{toasterNotifications}
					{favoriteHeader}

					<div className='favoritesContainer'>
						<div className='toggleDiv'>{toggleCF}</div>
						{isLoadingPageDataFinished &&
							citiesCurrentWeatherData.map((cityWeather, i) => {
								return (
									<FavoriteCard
										theme={theme}
										key={i}
										name={cityWeather.name}
										country={cityWeather.country}
										timezone={cityWeather.timezone}
										timezone_offset={cityWeather.timezone_offset}
										hour={cityWeather.current.hour}
										AMorPM={cityWeather.current.AMorPM}
										cityID={cityWeather.id}
										date_timestamp={cityWeather.current.date_timestamp}
										day={cityWeather.current.day}
										dayNumeric={cityWeather.current.dayNumeric}
										month={cityWeather.current.month}
										monthNumeric={cityWeather.current.monthNumeric}
										year={cityWeather.current.year}
										yearShorten={cityWeather.current.yearShorten}
										date={cityWeather.current.date}
										temp={
											tempFormat
												? convertKelvinToCelius(cityWeather.current.temp)
												: convertKelvinToFahrenheit(cityWeather.current.temp)
										}
										description={cityWeather.current.description}
										shortDescription={cityWeather.current.shortDescription}
										icon={cityWeather.current.icon}
										checkIfInFavorite={checkIfInFavorites}
										removeFromFavorites={removeFromFavorites}
									/>
								);
							})}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Favorites;
