import React, {useState} from 'react'
import axios from 'axios'
import { render } from '@testing-library/react'

function App() {
  const[data,setData] = useState({})
  const[location,setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ea5ec0ba2f81de8d7f3d76bd1a95e0f8`

  const searchLocation = (e) =>{
    if(e.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
  }
  }

  const getContainerClasses = (weather) =>  {

    console.log("weather= ",weather);
    const weatherFromApi = (weather && weather[0] && weather[0].main) || 'none';
    switch (weatherFromApi) {
      case 'Rain' : return 'app rain'
      case 'Clouds' : return 'app clouds'
      case 'Clear' : return 'app clear'
      case 'Fog': return 'app fog'
      default : return 'app'
    }
  
  }

  return (
    <div className={getContainerClasses(data && data.weather)}>

      <div className="search">
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like </p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity </p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed}KM/H</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
      
    </div>
  );
  
}

export default App;
