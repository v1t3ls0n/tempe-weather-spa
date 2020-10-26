import React from 'react';
import {loadSVGicon} from '../../actions/actions';

const FavoriteCard = ({
	name,
	cityID,
	hour,
	AMorPM,
	theme,
	temp,
	shortDescription,
	icon,
	removeFromFavorites
}) => {
	let iconSVG = loadSVGicon(icon);

	return (
		<div className='favoriteCardContainer'>
			<div className='cityContainer'>
				<h1 className={theme && `city-title-favorite ${theme}`}>{name}</h1>
			</div>

			<div className='data-col'>
				<div className={theme && `temp-fav ${theme}`}>
					<h4>{temp}°</h4>
				</div>
				<div className={theme && `weather-svg-icon-in-favorites ${theme}`}>{iconSVG}</div>
				<div className={theme && `favorite-card-shortDescription ${theme}`}>
					<h2>{shortDescription}</h2>
				</div>
				<div className={theme && `hourAMPM ${theme}`}>
					<h3 className={theme && `hour ${theme}`}>{hour}</h3>
					<h3 className={theme && `AMorPM ${theme}`}>{AMorPM}</h3>
				</div>

				{/* <div className='remove-btn'>
					<button onClick={() => removeFromFavorites(cityID, name)}>remove</button>
				</div>
 */}
			</div>
		</div>
	);
};

export default FavoriteCard;
