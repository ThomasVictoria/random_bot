var request = require('request-promise');
var city_list = require('../assets/city.list.min.json')

module.exports = async () => {
	let n =  Math.floor(Math.random() * (city_list.length - 0) + 0)
	let city = city_list[n]

	let res = await request(`https://api.openweathermap.org/data/2.5/weather?id=${city.id}&units=metric&appid=${process.env.WEATHER}`).then(res => {
		return JSON.parse(res)
	})

	let country = await request(`https://restcountries.eu/rest/v2/alpha/${res.sys.country}`).then(res => {
		return JSON.parse(res)
	})

	return `*${res.name}, ${country.name}*\n${getWeatherIcon(res.weather[0].icon)}\n>${res.weather[0].description}, ${res.main.temp}°C, wind speed is ${res.wind.speed}km/h.`
}

function getWeatherIcon(code) {

	let icons = [
		['01d', '01n', 'sunny'],
		['02d', '02n', 'cloudy_s_sunny'],
		['03d', '03n', 'cloudy'],
		['04d', '04n', 'cloudy'],
		['09d', '09n', 'rain'],
		['10d', '10n', 'sunny_s_rain'],
		['11d', '11n', 'thunderstorms'],
		['13d', '13n', 'snow'],
		['50d', '50n', 'fog']
	]

	let icon = icons.find(e => {return (e[0] == code || e[1] == code)})[2]

	return 'https://ssl.gstatic.com/onebox/weather/256/'+icon+'.png' 
}