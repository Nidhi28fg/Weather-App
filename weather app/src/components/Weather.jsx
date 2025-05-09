import { useEffect, useRef, useState } from "react";
import pic from "../assets/weather.jpeg";
import weatherpic from "../assets/weatherdesign.png";
import mint from "../assets/mint3.png";
import clear from "../assets/clear.png";
import thunder from "../assets/thunder.png";
import rain from "../assets/rain.png";
import cloud from "../assets/cloud.png";
import snowing from "../assets/snowing.png";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { RiTempColdFill } from "react-icons/ri";
import { WiSunrise } from "react-icons/wi";
import { TbSunset2 } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { MdOutlineWindPower } from "react-icons/md";
import { FaWater } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import { FaCloud } from "react-icons/fa";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
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
      class="h-full bg-cover flex justify-center text-white"
      style={{ backgroundImage: `url(${weatherpic})` }}
    >
      <div
        class="h-full bg-black/10 backdrop-opacity-10 flex flex-col justify-center items-center w-[600px] my-7 py-7 rounded-[20%]"
        style={{ backgroundImage: `url(${pic})` }}
      >
        <section class="text-5xl font-bold mb-4">
          {" "}
          WEATHER APP
        </section>
        <div class="flex bg-white/80 backdrop-opacity-10 text-black my-2">
          
            <input
              class="border-0 p-1 text-md font-bold text-center"
              ref={inputRef}
              type="text"
              onChange={() => search(inputRef.current.value)}
              placeholder="Write Your City Name...."
            />
        
        </div>
        <hr class="text-white border w-[400px]"/>
        <div>
          <img src={weatherData.icon} alt="" width="150px" />
        </div>
        <div class="uppercase">
          {weatherData.description}
        </div>
        <section class="text-8xl font-bold flex ">
          {weatherData.temperature}&#176;C
        </section>
        <div class="flex items-center gap-2 mb-2">
        <div class="flex text-5xl font-bold text-[#00029e]">
          {" "}
          {weatherData.location} 
        </div>
        <div class="text-2xl font-bold mb-[-13px]">({weatherData.country})</div></div> 
        {/* <div class="text-2xl font-bold">{weatherData.country}</div> */}
        <hr class="text-white border w-[400px]"/>
        <div class="flex gap-19 mt-7">
          {" "}
          <div class="text-3xl font-bold flex">{weatherData.maxtem}&#176;C</div>
          <div class="text-3xl font-bold flex">{weatherData.mintem}&#176;C</div>
        </div>
        <div class="flex gap-20 mb-4">
          {" "}
          <div class="flex items-center gap-1"><FaTemperatureArrowDown/>Max-temp</div>
          <div class="flex items-center gap-1"><FaTemperatureArrowUp />Min-temp</div>
        </div>
        <div class="flex items-center gap-1 text-[20px] font-bold mb-2"> <RiTempColdFill />Feel Like: {weatherData.feels_like}&#176;C</div>
        {/* <hr class="text-white border w-[400px]"/> */}
        <div class="flex flex-wrap justify-between gap-x-10 p-4 w-[400px] bg-[#315c7c] rounded-[20px]">
          <div class="flex items-center gap-1"> < WiSunrise/> Sunrise: {weatherData.formattedSunrise} am</div>
          <div class="flex items-center gap-1 "> <TbSunset2 />Sunset: {weatherData.formattedSunset} pm</div>
          <div class="flex items-center gap-1"> <FaWind /> Wind Speed: {weatherData.Windspeed}</div>
          <div class="flex items-center gap-1"><MdOutlineWindPower /> Pressure: {weatherData.pressure}</div>
          <div class="flex items-center gap-1"><FaWater />Sea Level: {weatherData.sea_level}</div>
          <div class="flex items-center gap-1"><MdOutlineVisibility /> Visibility : {weatherData.visibility}</div>
          <div class="flex items-center gap-1"> <FaCloud />Clods: {weatherData.clouds}%</div>
        </div>
        {/* <hr class="text-white border w-[400px]"/> */}
      </div>
    </div>
  );
};

export default Weather;
