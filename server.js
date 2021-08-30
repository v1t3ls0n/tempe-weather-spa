const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config');
const path = require('path');
const mongoURI = config.get('mongoURI');
const WeatherAPIkey = config.get('weatherAPIkey');

const PORT = process.env.PORT || 8080;

///////////////////////////////////////////////////
// for production version (build)

// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/home', function (req, res) {
// 	console.log('inside get app');
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.get('/Favorites', function (req, res) {
// 	console.log('inside get app');
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
////////////////////////////////////////////////////////

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));

//INIT MONGODB CONNECTION - Our database containing available cities (included in the Weather API) names, ids, lat,lon, etc..

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log('MongoDB of Weather App Connected...');
});

const cityOptionsSchema = new Schema({
	_id: Schema.Types.ObjectId,
	id: Number,
	coord: { lon: Number, lan: Number },
	country: String,
	geoname: {
		cl: String,
		code: String,
		parent: Number
	},
	langs: [Object],
	name: String,
	stat: {
		level: Number,
		population: Number
	},
	stations: [
		{
			id: Number,
			dist: Number,
			kf: Number
		}
	],
	zoom: Number
});

const availableCities = mongoose.model('cities', cityOptionsSchema);
// END OF THE MONGODB INIT SECTION

//city names in our DB starts with capital letter on each first word like it should be,
// here I'm converting user's city name input to match our DB filenaming style
const capitalizeCityInputName = (str) => {
	if (typeof str !== 'string') return false;
	str = str.toLowerCase();
	if (str.includes(' ')) {
		str = str.split(' ');
		for (let i = 0; i < str.length; i++) {
			if (str[i][0] === ' ') str.splice(i, 1);
			if (str[i][0] === undefined) break;
			else str[i] = str[i][0].toUpperCase() + str[i].substr(1);
		}
		return str.join(' ');
	} else {
		str = str.charAt(0).toUpperCase() + str.substr(1);
		return str;
	}
};

// @route       GET /autocomplete/:cityNameInput/limit/:size
// @desciption  autocomplete search input with optional city names
// @access      Public

app.get('/api/autocomplete/:cityNameInput/limit/:size', cors(), async (req, res) => {
	//converting size param to an integer in case someone tried 	to input a floating number or different wrong input,
	// and also this sets default value to limit size if no limit size was transffered in the params
	let limit = parseInt(req.params.size) || 10;

	// making share sure that the limit size param is a number and not a string,
	//in case the size param is a string, that sets its default value to 10
	if (isNaN(limit)) limit = 10; // validating that

	let cityName = req.params.cityNameInput;

	//verifying that cityNameInput param is a string and not a number
	if (!isNaN(cityName))
		return res.status(400).json({ msg: 'wrong search Input, input must not include numbers' });

	//city names in our DB starts with capital letter on each first word like it should be,
	// here I'm converting user's city name input to match our DB filenaming style
	cityName = capitalizeCityInputName(req.params.cityNameInput);

	// finally here we fetching the autocomplete city name results from our MongoDB cities collection
	try {
		const results = await availableCities
			.find({ name: { $regex: '^(?=.{1,12}$)' + cityName } })
			.limit(limit)
			.select('name country id coord -_id');

		console.log(results);

		res.send(results);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route       GET /weatherForecast/lat/:lat/lon/:lon/
// @desciption  calls the weatherAPI in request of getting current weather and weekly forecast of selected city
// @access      Public

app.get('/api/weatherForecast/lat/:lat/lon/:lon/', cors(), async (req, res) => {
	console.log(`inside weatherapi get request before axios actions`);
	let { lat, lon } = req.params;
	lat = parseFloat(lat);
	lon = parseFloat(lon);
	if (isNaN(lat) || isNaN(lon)) return res.status(400).send('lat or lon passed are not numbers');

	try {
		const results = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WeatherAPIkey}`
		);

		////THE SECTION BELLOW IS FOR CONVERTING AND FORMATTING THE DATA WE GOT FROM WEATHER API IN ORDER TO SEND THE RELEVANT DATA TO CLIENT (FRONT END)

		const convertDayNumberToName = (dayNumber) => {
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
			}
		};

		const convertMonthNumberToName = (monthNumber) => {
			switch (monthNumber) {
				case 0:
					return 'January'; // (January gives 0)
				case 1:
					return 'February';
				case 2:
					return 'March';
				case 3:
					return 'April';
				case 4:
					return 'May';
				case 5:
					return 'June';
				case 6:
					return 'July';
				case 7:
					return 'August';
				case 8:
					return 'September';
				case 9:
					return 'October';
				case 10:
					return 'November';
				case 11:
					return 'December';
			}
		};

		/// prettify date convert single number date of the day to start with 0, for example 1 september will be 01 september and so on
		const prettifyNumericByAddingZero = (dayNumericForPrettify) => {
			if (dayNumericForPrettify < 10) return '0' + dayNumericForPrettify.toString();
			else return dayNumericForPrettify;
		};

		//creating 7 days forecast data object
		const forecast8days = results.data.daily.map((day, i) => {
			// reformat the current date and time we got from the API as UNIX timestamp
			const dateOfTheDayFormatted = new Date(day.dt * 1000);

			return {
				date_timestamp: day.dt,
				date: dateOfTheDayFormatted,
				day: convertDayNumberToName(dateOfTheDayFormatted.getDay()),
				month: convertMonthNumberToName(dateOfTheDayFormatted.getMonth()),
				dayNumeric: prettifyNumericByAddingZero(dateOfTheDayFormatted.getDate()),
				monthNumeric: prettifyNumericByAddingZero(dateOfTheDayFormatted.getMonth() + 1), //January gives 0, so need to increase by 1 for correct month number
				yearShorten: dateOfTheDayFormatted.getFullYear() - 2000,
				year: dateOfTheDayFormatted.getFullYear(),
				index: i,
				temp: day.temp,
				description: day.weather[0].description,
				shortDescription: day.weather[0].main,
				icon: `icon_${day.weather[0].icon}`
			};
		});
		//pop is used to cut out the extra 8th day weather results, we need only 7 days
		let forecast5days = forecast8days.slice(0, 5);

		// reformat the current date and time we got from the API as UNIX timestamp
		const currentDateFormatted = new Date(results.data.current.dt * 1000);
		const dateByTimeZone = new Date(currentDateFormatted).toLocaleString('en-US', {
			timeZone: results.data.timezone
		});
		let hour = dateByTimeZone.split(',')[1].split(':')[0];
		let AMorPM = dateByTimeZone.split('M')[0];
		AMorPM = AMorPM[AMorPM.length - 1] + 'M';

		/// relevantData object contains all the data that is about to be passed to the CLIENT (FRONT END)
		const relevantData = {
			daily: forecast5days,
			current: {
				date_timestamp: results.data.current.dt,
				AMorPM: AMorPM,
				hour: hour,
				date: currentDateFormatted,
				day: convertDayNumberToName(currentDateFormatted.getDay()),
				month: convertMonthNumberToName(currentDateFormatted.getMonth()),
				dayNumeric: prettifyNumericByAddingZero(currentDateFormatted.getDate()),
				monthNumeric: prettifyNumericByAddingZero(currentDateFormatted.getMonth() + 1), //January gives 0, so need to increase by 1 for correct month number
				year: currentDateFormatted.getFullYear(),
				yearShorten: currentDateFormatted.getFullYear() - 2000,
				temp: results.data.current.temp,
				description: results.data.current.weather[0].description,
				shortDescription: results.data.current.weather[0].main,
				icon: `icon_${results.data.current.weather[0].icon}`
			},

			timezone: results.data.timezone,
			timezone_offset: results.data.timezone_offset
		};

		res.send(relevantData);
	} catch (err) {
		console.log(err.response);
		if (err.response.status === 429) {
			console.log(`in 429 err`);
			return res
				.status(err.response.status)
				.json({ data: { err: '429', msg: 'Too Many GET Requests to Weather Maps API' } });
		} else res.status(err.response.status).send(err.response);
	}
});
