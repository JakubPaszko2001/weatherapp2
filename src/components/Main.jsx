import { DateTime } from 'luxon'
import React, {useState, useEffect} from 'react'
import fetchweatherData from './api'
const Main = () => {
    const [search, setSearch] = useState("Warsaw")
    const [weatherData, setWeatherData] = useState()
    const [buttonData, setButtonData] = useState()
    useEffect(() => {
        async function fetchData() {
            const data = await fetchweatherData(search)
            setWeatherData(data)
            console.log(weatherData)
        }
        fetchData()
    }, [buttonData])


    const handleClick = () => {
        setButtonData(search)
    }

  return (
<div class='h-screen bg-gradient-to-b from-sky-500 to-white'>
    <div class='m-auto max-w-xl'>
        <div class='flex flex-col items-center justify-center pt-12'>
            <div class='flex'>
                <input placeholder='Search for city...' onChange={(e) => {setSearch(e.target.value)}}></input>
                <button class='ml-2 p-2 bg-transparent border-2 border-white text-white' type="button" onClick={handleClick}>Search</button>
            </div>
        </div>
        {buttonData &&
        <div>
            <div class='flex flex-col items-center justify-center'>
                <h1 class='pt-8 text-white text-6xl'>{weatherData.current.name}</h1>
                <h1 class='pt-2 text-white text-2xl'>{weatherData.current.main}</h1>
                <h1 class='pt-6 text-white text-7xl'>{Math.floor(weatherData.current.temp)}°C</h1>
            </div>
            <div class='pt-10 flex flex-col'>
                <h1 class='text-white text-2xl'>Today</h1>
                <div class='flex justify-between pt-8'>
                    {weatherData.hourly.slice(1,6).map((item) => {
                        const time = DateTime.fromSeconds(item.dt).setZone(weatherData.timezone).toFormat('hh:mm a')
                        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                        return(
                            <div class='flex flex-col items-center bg-white  pb-6 pt-6'>
                                <h1>{time}</h1>
                                <img src={icon} alt='weatherIcon'></img>
                                <h1>{item.temp}</h1>
                            </div>
                        )
                    })}
                </div>
                <div class='flex flex-col pt-8 text-black'>
                    {weatherData.daily.slice(1,6).map((item) => {
                        const time = DateTime.fromSeconds(item.dt).setZone(weatherData.timezone).toFormat('LLL dd')
                        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
                        return(
                            <div class='flex justify-between items-center pb-6'>
                                <h1>{time}</h1>
                                <img src={icon} alt='weatherIcon'></img>
                                <h1>{Math.floor(item.temp.day)}°C</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        }
    </div>
</div>
  )
}

export default Main