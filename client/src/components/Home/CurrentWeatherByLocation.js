import React from 'react';
import ForecastCard from './ForecastCard';

// import PropTypes from 'prop-types';

const CurrentWeatherByLocation = ({weeklyForecast, tempFormat, theme}) => {
	return (
		<div className='container'>
			<div className='weekly-forecast'>
				{weeklyForecast.map((day, index) => {
					return (
						<ForecastCard
							className='forecast-card'
							theme={theme}
							tempFormat={tempFormat}
							key={index}
							index={day.index}
							date_timestamp={day.date_timestamp}
							day={day.day}
							dayNumeric={day.dayNumeric}
							month={day.month}
							monthNumeric={day.monthNumeric}
							year={day.year}
							yearShorten={day.yearShorten}
							date={day.date}
							temp={day.temp}
							description={day.description}
							shortDescription={day.shortDescription}
							icon={day.icon}
						/>
					);
				})}
			</div>
		</div>
	);
};

// CurrentWeatherByLocation.propTypes = {};

export default CurrentWeatherByLocation;
