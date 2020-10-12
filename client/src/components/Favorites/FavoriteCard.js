import React from 'react';
import {loadSVGicon} from '../../actions/actions';
// import PropTypes from 'prop-types';

const FavoriteCard = ({name, hour, AMorPM, theme, temp, shortDescription, icon}) => {
	let iconSVG = loadSVGicon(icon);

	console.log(name, hour, AMorPM, theme, temp, shortDescription, icon);
	return (
		<div className='favoriteCardContainer'>
			<div className='cityContainer'>
				<h1 className={theme && `city-title-favorite ${theme}`}>{name}</h1>
			</div>
			<h4 className={theme && `temp-fav ${theme}`}>{temp}°</h4>
			<div className={theme && `weather-svg-icon-in-favorites ${theme}`}>{iconSVG}</div>
			<h2 className={theme && `favorite-card-shortDescription ${theme}`}>{shortDescription}</h2>
			<div className={theme && `hourAMPM ${theme}`}>
				<h3 className={theme && `hour ${theme}`}>{hour}</h3>
				<h3 className={theme && `AMorPM ${theme}`}>{AMorPM}</h3>
			</div>
		</div>
	);
};

// FavoriteCard.propTypes = {};

export default FavoriteCard;
