import React from 'react';
import {loadSVGicon, convertKelvinToCelius, convertKelvinToFahrenheit} from '../../actions/actions';
// import PropTypes rom 'prop-types';
const ForecastCard = ({
	theme,
	day,
	temp,
	description,
	shortDescription,
	icon,
	tempFormat,
	toggleCF
}) => {
	let iconSVG = loadSVGicon(icon, temp.day);
	console.log(`theme in forecast cards ${theme}`);

	return (
		<div className='forecast-card'>
			<h2>{day}</h2>
			<div className='weather-svg-icon'>{iconSVG}</div>
			<h4 className='temperature'>
				{tempFormat ? convertKelvinToCelius(temp.day) : convertKelvinToFahrenheit(temp.day)}°
			</h4>
			<hr />

			<h4 className='weather-description'>{shortDescription}</h4>
		</div>
	);
};

// ForecastCard.propTypes = {};

export default ForecastCard;
