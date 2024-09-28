import React, { useState,useEffect } from "react";

import { IoSearch } from "react-icons/io5";
import { TbWind } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";


import { IoPartlySunny } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { IoRainy } from "react-icons/io5";
import { IoCloudy } from "react-icons/io5";
import { BsCloudFogFill } from "react-icons/bs";

import { FiLoader } from "react-icons/fi";


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
  const [isloading, setisloading]= useState<boolean>(false)

  const [searchCity,setsearchCity]=useState<string>("")

  const WeatherSearch = async(city:string)=>{
    if(city===""){
      return(
        alert("enter a city name")
      )
    }
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
    setisloading(true)
  }
  
  const weatherName:string = weatherData?.weatherType ?? "lol"

  const iconChanger=(weather:string )=>{
    let iconElement:React.ReactNode;

    switch(weather.toLowerCase()){
      case "sunny":
      iconElement=<MdSunny className="size-40 text-yellow-400"/>
      break;
      case "rain":
      iconElement=<IoRainy className="size-40 text-blue-950"/>
      break;
      case "clear":
      iconElement=<MdSunny className="size-40 text-yellow-400"/>
      break;
      case "clouds":
      iconElement=<IoCloudy className="size-40 text-gray-400"/>
      break;
      case "mist":
      iconElement=<BsCloudFogFill className="size-40 text-gray-500"/>
      break;
      case "haze":
      iconElement=<BsCloudFogFill className="size-40 text-gray-500"/>
      break;
      default:
        iconElement=<IoPartlySunny className="size-40 text-yellow-400"/>
    }

    return(
      <span className="icon flex items-center justify-center">
        {iconElement}
      </span>
    )
  }

  useEffect(() => {
    WeatherSearch("delhi")
  }, [])
  


  return (
    <div className="border  mx-auto container bg-blue-500  my-7 px-4 min-w-[300px] w-[26vw] rounded-lg border-gray-700 h-[496px] ">
      <div className="flex space-x-3 justify-center py-4">
        <input type="text" value={searchCity} onChange={(e)=>setsearchCity(e.target.value)}  placeholder="search" className="border border-black rounded-full px-2 py-1 w-3/4" name="searchBar" id="" />
        <button title="search" onClick={()=>WeatherSearch(searchCity)} className="btn bg-white border border-black  rounded-full px-2 hover:bg-gray-300" ><IoSearch /></button>
      </div>

    {weatherData && isloading? (
      <>
      <h3 className="mb-2 text-white font-semibold text-3xl text-center">{weatherData?.location}</h3>
      <div className="flex justify-center w-40 h-40 mx-auto">
        {iconChanger(weatherName)}
      </div>
      <h3 className="text-center font-semibold text-3xl text-white my-2">{weatherData?.weatherType}</h3>
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
            <p className="text-white text-center ">{weatherData?.windSpeed} Km/h</p>
        </div>
      </div>
      </>
    ):(
      <div className="flex h-[430px] items-center justify-center">
        <div className="">
        <FiLoader className="size-28 animate-spin" />
        <p className="text-center">Loading</p>
        </div>
      </div>
    )
  }
  </div>
  )
}

export default WeatherBox
