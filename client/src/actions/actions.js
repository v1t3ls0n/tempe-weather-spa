import React from 'react';

// weather icons SVGs files import
import icon_01d_superHot from '../img/weather_icons_day/01d_SuperHot.svg';
import icon_01d from '../img/weather_icons_day/01d.svg';
import icon_02d from '../img/weather_icons_day/02d.svg';
import icon_03d from '../img/weather_icons_day/03d_new.svg';
import icon_04d from '../img/weather_icons_day/04d.svg';
import icon_09d from '../img/weather_icons_day/09d.svg';
import icon_10d from '../img/weather_icons_day/10d.svg';
import icon_11d from '../img/weather_icons_day/11d.svg';
import icon_13d from '../img/weather_icons_day/13d.svg';
import icon_50d from '../img/weather_icons_day/50d.svg';

import icon_01n from '../img/weather_icons_night/01n.svg';
import icon_02n from '../img/weather_icons_night/02n.svg';
import icon_03n from '../img/weather_icons_night/03n.svg';
import icon_04n from '../img/weather_icons_night/04n.svg';
import icon_09n from '../img/weather_icons_night/09n.svg';
import icon_10n from '../img/weather_icons_night/10n.svg';
import icon_11n from '../img/weather_icons_night/11n.svg';
import icon_13n from '../img/weather_icons_night/13n.svg';
import icon_50n from '../img/weather_icons_night/50n.svg';

import axios from 'axios';


axios.defaults.baseURL = ((process.env.NODE_ENV || '').trim() !== 'production') ? 'http://localhost:8080/' : '';

console.log({ baseURL: axios.defaults.baseURL });
axios.defaults.timeout = 90000;
axios.defaults.withCredentials = false;
axios.defaults.headers = {
	'Content-Type': 'application/json'
};


/// loads the right SVG weather icon for the specific weather description
export const loadSVGicon = (icon, temp) => {
	let iconSVG;

	switch (icon) {
		case 'icon_01d':
			iconSVG = <img alt={icon} src={icon_01d} className='icon_01d'></img>;
			break;
		case 'icon_02d':
			iconSVG = <img alt={icon} src={icon_02d}></img>;
			break;
		case 'icon_03d':
			iconSVG = <img alt={icon} src={icon_03d}></img>;
			break;
		case 'icon_04d':
			iconSVG = <img alt={icon} src={icon_04d}></img>;
			break;
		case 'icon_09d':
			iconSVG = <img alt={icon} src={icon_09d}></img>;
			break;
		case 'icon_10d':
			iconSVG = <img alt={icon} src={icon_10d}></img>;
			break;
		case 'icon_11d':
			iconSVG = <img alt={icon} src={icon_11d}></img>;
			break;
		case 'icon_13d':
			iconSVG = <img alt={icon} src={icon_13d}></img>;
			break;
		case 'icon_50d':
			iconSVG = <img alt={icon} src={icon_50d}></img>;
			break;
		case 'icon_01n':
			iconSVG = <img alt={icon} src={icon_01n} className='icon_01n'></img>;
			break;
		case 'icon_02n':
			iconSVG = <img alt={icon} src={icon_02n}></img>;
			break;
		case 'icon_03n':
			iconSVG = <img alt={icon} src={icon_03n}></img>;
			break;
		case 'icon_04n':
			iconSVG = <img alt={icon} src={icon_04n}></img>;
			break;
		case 'icon_09n':
			iconSVG = <img alt={icon} src={icon_09n}></img>;
			break;
		case 'icon_10n':
			iconSVG = <img alt={icon} src={icon_10n}></img>;
			break;
		case 'icon_11n':
			iconSVG = <img alt={icon} src={icon_11n}></img>;
			break;
		case 'icon_13n':
			iconSVG = <img alt={icon} src={icon_13n}></img>;
			break;
		case 'icon_50n':
			iconSVG = <img alt={icon} src={icon_50n}></img>;
			break;

		default:
			break;
	}
	if (convertKelvinToCelius(temp) > 30)
		iconSVG = <img alt={icon} src={icon_01d_superHot} className='icon_01d_superHot'></img>;
	return iconSVG;
};

export const convertKelvinToCelius = (temp) => Math.round(temp - 273.15);
export const convertKelvinToFahrenheit = (temp) => Math.round((temp - 273.15) * 1.8 + 32);

//get Weather from Backend (that uses Weather API)
export const callWeatherAPI = async (lat, lon) => {
	try {
		let res = await axios.get(`/api/weatherForecast/lat/${lat}/lon/${lon}`);
		return res.data;
	} catch (err) {
		console.log(err);
		return false;
	}
};

// autocomplete city name when typing on search input, this function calls our Backend REST API
export const callAutoCompleteAPI = async (input) => {
	try {
		let res = await axios.get(`/api/autocomplete/${input}/limit/10`);
		console.log(res.data);
		return res.data;
	} catch (err) {
		console.error(err);
	}
};

export const convertDayNumberToName = (dayNumber) => {
	switch (dayNumber) {
		case 0:
			return 'Sunday';
		case 1:
			return 'Monday';
		case 2:
			return 'Tuesday';
		case 3:
			return 'Wednesday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
		default:
			return 'err';
	}
};
