import axios from "axios";

const baseImgUrl = "https://openweathermap.org/img/wn";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = async (latlng) => {
  return axios
    .get(`${baseUrl}lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`)
    .then((response) => response.data);
};

const getWeatherIconUrl = (icon) =>
  icon
    ? `${baseImgUrl}/${icon}@2x.png`
    : `https://openweathermap.org/img/wn/10d@2x.png`;

export default { getWeather, getWeatherIconUrl };
