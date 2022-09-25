import axios from "axios";

const api = {
    key: "d0e7f53c0b4dca3cef0b6c4a16b86a2b",
    base: "https://api.openweathermap.org/data/2.5/"
}

const fetchweatherData = async (search) => {
    const response = await axios.get(`${api.base}weather?q=${search}&appid=${api.key}&units=metric`)
    const {data} = response
    // console.log(data)
    const current = destructData(data)
    // console.log(x)
    const {lat,lon} = current
    const daysData = await axios.get(`${api.base}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely&appid=${api.key}&units=metric`)
    const {data:dataDays} = daysData
    const {timezone,daily,hourly} = dataDays
    return {current,timezone,daily,hourly}
}
const destructData = (data) => {
 const {
    coord: {lon,lat},
    main: {temp},
    name,
    weather,
 } = data
 const {main, icon} = weather[0]
 return {lon,lat,temp,name,main,icon}
}

export default fetchweatherData