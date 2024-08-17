import { useEffect, useState } from "react"
import { TiWeatherCloudy, TiWeatherShower, TiWeatherSnow, TiWeatherSunny, TiWeatherWindy } from "react-icons/ti"
import { MdOutlineWaterDrop } from "react-icons/md"
export default function App () {

    const apiKey = "chaveapi"
    const link = "https://api.openweathermap.org/data/2.5/weather?q="
    const [currentCity, setCurrentCity] = useState("brasil")
    const [city, setCity] = useState()

    const capitalizeWord = (str) => {
        return str.split(" ").map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(" ")
    }

    const getWeather = (ev) => {
        if (ev) ev.preventDefault()
        fetch(`${link}${currentCity}&appid=${apiKey}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Cidade não encontrada")
                }
                return res.json()
            })
            .then(data => {
                setCity(data)
            }).catch(error => {
                console.log("Houve algum erro")
        })
    }

    useEffect(() => { getWeather() }, [])

    const weatherIcons = {
        Clear: <TiWeatherSunny className="icon-sun"/>,
        Clouds: <TiWeatherCloudy className="icon-cloud"/>,
        Rain: <TiWeatherShower className="icon-cloud"/>,
        Snow: <TiWeatherSnow className="icon-cloud"/>
    }

    const Card = () => {
        const getCelsius = (numb) => {
            return (numb - 273.15).toFixed()
        }
        if (city) {
            const weatherDescription = capitalizeWord(city.weather[0].description)
            return (
                <div className="container">
                    <div>
                        <h3>{city.name}, {city.sys.country}</h3>
                    </div>
                    <div>
                        {weatherIcons[city.weather[0].main] || <TiWeatherCloudy className="icon"/>}
                        <h3>{weatherDescription}</h3>
                        <h3>{getCelsius(city.main.feels_like)}°C</h3>
                    </div>
                    <div className="info-div">
                        <div className="info-div2">
                            <MdOutlineWaterDrop className="icon"/>
                            <h3>{city.main.humidity}</h3>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="info-div2">
                            <TiWeatherWindy className="icon"/>
                            <h3>{city.wind.speed}</h3>
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (
        <>
            <form onSubmit={(ev) => getWeather(ev)} className="search-input">
                <input onChange={(ev) => setCurrentCity(ev.currentTarget.value)} placeholder="search a city"/>
            </form>
            <Card/>
        </>
    )
}