import { useEffect, useRef, useState } from "react";
import pic from "../assets/weather.jpeg";
import mint from "../assets/mint3.png";
import clear from "../assets/clear.png";
import thunder from "../assets/thunder.png";
import rain from "../assets/rain.png";
import cloud from "../assets/cloud.png";
import snowing from "../assets/snowing.png";


const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  // const allicon = {
  //   "01d": "https://openweathermap.org/img/wn/01d@2x.png",
  //   "02d": "https://openweathermap.org/img/wn/02d@2x.png",
  //   "03d": "https://openweathermap.org/img/wn/03d@2x.png",
  //   "04d": "https://openweathermap.org/img/wn/04d@2x.png",
  //   "09d": "https://openweathermap.org/img/wn/09d@2x.png",
  //   "10d": "https://openweathermap.org/img/wn/10d@2x.png",
  //   "11d": "https://openweathermap.org/img/wn/11d@2x.png",
  //   "13d": "https://openweathermap.org/img/wn/13d@2x.png",
  //   "50d": "https://openweathermap.org/img/wn/50d@2x.png",

  //   "01n": "https://openweathermap.org/img/wn/01n@2x.png",
  //   "02n": "https://openweathermap.org/img/wn/02n@2x.png",
  //   "03n": "https://openweathermap.org/img/wn/03n@2x.png",
  //   "04n": "https://openweathermap.org/img/wn/04n@2x.png",
  //   "09n": "https://openweathermap.org/img/wn/09n@2x.png",
  //   "10n": "https://openweathermap.org/img/wn/10n@2x.png",
  //   "11n": "https://openweathermap.org/img/wn/11n@2x.png",
  //   "13n": "https://openweathermap.org/img/wn/13n@2x.png",
  //   "50n": "https://openweathermap.org/img/wn/50n@2x.png",
  // };

  const allicon = {
    "01d": clear,
    "02d": mint,
    "03d": cloud,
    "04d": cloud,
    "09d": mint,
    "10d": rain,
    "11d": thunder,
    "13d": snowing,
    "50d": mint,

    "01n": clear,
    "02n": mint,
    "03n": cloud,
    "04n": cloud,
    "09n": mint,
    "10n": rain,
    "11n": thunder,
    "13n": snowing,
    "50n": mint,
  };

  function formatTime(timestamp) {
    const date = new Date(timestamp * 10000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  }

  const search = async (city) => {
      try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allicon[data.weather[0].icon];
      
      const sunriseTimestamp = data.sys.sunrise;
      const sunsetTimestamp = data.sys.sunset;
      const formattedSunrise = formatTime(sunriseTimestamp);
      const formattedSunset = formatTime(sunsetTimestamp);

      setWeatherData({
        humidity: data.main.humidity,
        feels_like: data.main.feels_like,
        Windspeed: data.wind.speed,
        pressure: data.main.pressure,
        sea_level: data.main.sea_level,
        temperature: Math.floor(data.main.temp),
        maxtem: Math.floor(data.main.temp_max),
        mintem: Math.floor(data.main.temp_min),
        location: data.name,
        icon: icon,
        visibility: data.visibility,
        country: data.sys.country,
        clouds: data.clouds.all,
        formattedSunrise: formattedSunrise,
        formattedSunset: formattedSunset,
        description: data.weather[0].description,
      });
    } catch (error) {}
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div
      class="h-screen bg-cover flex justify-center text-white"
      style={{ backgroundImage: `url(${pic})` }}
    >
      <div
        class="bg-black/10 backdrop-opacity-10 flex flex-col justify-center items-center w-[600px] my-7 rounded-[20%]"
        style={{ backgroundImage: `url(${pic})` }}
      >
        <div class="text-3xl font-bold text-[#00029e] mb-4 ">
          {" "}
          WRITE YOUR CITY NAME
        </div>
        <div class="flex gap-2 bg-white/80 backdrop-opacity-10 text-black my-2">
          
            <input
              class="border-0 p-2 text-xl font-bold uppercase text-center"
              ref={inputRef}
              type="text"
              onChange={() => search(inputRef.current.value)}
            />
        
        </div>
        <hr class="text-white border w-[400px]"/>
        <div>
          <img src={weatherData.icon} alt="" width="150px" />
        </div>
        <div class="uppercase">
          {weatherData.description}
        </div>
        <div class="text-9xl font-bold flex ">
          {weatherData.temperature}&#176;C
        </div>
         
        <div class="text-6xl font-bold text-[#00029e]">
          {" "}
          {weatherData.location}{" "}
        </div>
        <div class="text-2xl font-bold">{weatherData.country}</div>
        <hr class="text-white border w-[400px]"/>
        <div class="flex gap-20 mt-7">
          {" "}
          <div class="text-3xl font-bold flex">{weatherData.maxtem}&#176;C</div>
          <div class="text-3xl font-bold">{weatherData.mintem}&#176;C</div>
        </div>
        <div class="flex gap-20 mb-7">
          {" "}
          <div>Max-temp</div>
          <div>Min-temp</div>
        </div>
        <div>Feel Like: {weatherData.feels_like}&#176;C</div>
        <hr class="text-white border w-[400px]"/>
        <div class="flex flex-wrap justify-between gap-x-10 p-4 w-[372px] ">
          <div>Sunrise: {weatherData.formattedSunrise} am</div>
          <div>Sunset: {weatherData.formattedSunset} pm</div>
          <div> Wind Speed: {weatherData.Windspeed}</div>
          <div> Pressure: {weatherData.pressure}</div>
          <div>Sea Level: {weatherData.sea_level}</div>
          <div>Visibility: {weatherData.visibility}</div>
          <div>Clods: {weatherData.clouds}%</div>
        </div>
        <hr class="text-white border w-[400px]"/>
      </div>
    </div>
  );
};

export default Weather;
