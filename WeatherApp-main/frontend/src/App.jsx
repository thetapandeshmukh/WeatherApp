import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import search from './assets/search.svg'
import './App.css';
import { Hourly } from './components/hourly';

function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [hourlyData, setHourly]=useState([])
  const getWeather = async () => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c1018ddfc8116e66b1fd864ea4861a72`);
      const res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=c1018ddfc8116e66b1fd864ea4861a72`);
      const json = await res.json();
      const json2=await res2.json();
      setData(json); // Set the entire JSON object to data
      setHourly(json2.list.slice(0,8))
      console.log(hourlyData[0])
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div class="flex justify-center items-center h-screen">
      <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-96 h-5/6 rounded-lg shadow-2xl shadow-blue-500/50">
        <div class="flex justify-center my-5">        
          <input class="rounded-full px-3 h-7 hover:border border-black"type="text" placeholder='city name' onChange={(e)=>{
          const value=e.target.value;
          setCity(e.target.value);
          }}></input>
          <button class="rounded-full bg-white mx-1 px-1 hover:border border-black "onClick={getWeather}><img  src={search} class="w-5"></img></button>
        </div>
        <div class="flex justify-center">
          {data.weather&&
            <img class="h-40"src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="Weather icon" />
          }
        </div>
        <div class="text-8xl text-white text-center mb-5">
          {data.main && (
            <h1>{Math.round(data.main.temp - 273.15)}°C</h1>
          )}
        </div>
        <div class="text-xl text-white text-center">
          <h3>{data.name}</h3>
          {data.main&&
            <h1>{data.weather[0].description}</h1>
          }
        </div>
        <br></br>
        <div class="overflow-x-scroll no-scrollbar"><Hourly hourlyData={hourlyData}/></div>
      </div>
    </div>
  );
    

}

export default App;
