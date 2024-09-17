import { useEffect,useState } from "react";

import { IoSearch } from "react-icons/io5";
import { TbWind } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";


import { MdSunny } from "react-icons/md";
import { IoRainy } from "react-icons/io5";


type weatherDataProps={
  temp:number,
  windSpeed:number,
  humidity:number,
  location:string,
  weatherType:string,
  weathericon:string,
}


function WeatherBox() {
  
  const [weatherData, setweatherData] = useState<null | weatherDataProps>(null)

  const WeatherSearch = async(city:string)=>{
    const api_key:string='f6ff443fbb53018cf4727e7987baf0eb'
    const url:string =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
    const response=await fetch(url)
    const data=await response.json()
    console.log(data)
    const temp:number=data?.main.temp 
    temp.toFixed(0)
    setweatherData({
      temp:temp,
      windSpeed:data?.wind.speed,
      humidity:data?.main.humidity,
      location:data?.name,
      weatherType:data?.weather[0].main,
      weathericon:data?.weather[0].icon,
    })
  }

  useEffect(() => {
    WeatherSearch("delhi")
  }, [])
  


  return (
    <div className="border border-gray-400 mx-auto container bg-emerald-700  my-7 px-4 w-[30vw] rounded-lg">
      <div className="flex space-x-3 justify-center py-4">
        <input type="text" placeholder="search" className="border-2 border-black rounded-full px-2 py-1 w-3/4" name="searchBar" id="" />
        <button title="search" className="btn bg-white border-2 border-black  rounded-full px-2 " ><IoSearch /></button>
      </div>
      <h3 className="mb-2 text-xl text-center">{weatherData?.location}</h3>
      <div className="flex justify-center">
      <img src="/" alt="hello" className="w-40 h-40 bg-pink-300 "/>
      </div>
      <h3 className="text-center font-semibold text-2xl text-white my-2">{weatherData?.weatherType}</h3>
      <h1 className="text-6xl  text-white text-center">{weatherData?.temp}°c</h1>
      <div className="flex justify-evenly  my-4">
        <div className="">
            <div className="flex justify-center items-center">
            <WiHumidity className=" size-8 text-white" />
            </div>
            <p className="text-white text-center ">humidity</p>
            <p className="text-white text-center  ">{weatherData?.humidity}%</p>
        </div>
        <div>
            <div className="flex justify-center">
            <TbWind className="size-8 text-white" />
            </div>
            <p className="text-white text-center ">Wind Speed</p>
            <p className="text-white text-center">{weatherData?.windSpeed} Km/h</p>
        </div>

      </div>
    </div>
  )
}

export default WeatherBox
