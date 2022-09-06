import React, {useState, useEffect} from 'react'
import axios from 'axios'
import logo from './logo2.png'

function App() {
  useEffect( () => {
    document.title = 'Weather ';
    document.logo = './logo1.png';
  });

  const[data,setData] = useState({})
  const[location,setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ea5ec0ba2f81de8d7f3d76bd1a95e0f8&lang={ro}`

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
    const weatherFromApi = (weather && weather[0] && weather[0].main) || 'none';
    switch (weatherFromApi) {
      case 'Rain' : return 'app rain'
      case 'Clouds' : return 'app clouds'
      case 'Clear' : return 'app clear'
      case 'Fog': return 'app fog'
      case 'Thunderstorm': return 'app thunderstorm'
      case 'Snow': return 'app snow'
      case 'Sleet': return 'app sleet'
      default : return 'app'
    }
  
  }

  return (

    <div className={getContainerClasses(data && data.weather)}>
        
        <div className='logo-fam'>
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="font-effect-shadow-multiple">.B.A.S. Weather</h2>
          </div>

        <div className="search">
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text"
          />
        </div>
        
        <div className='container font-effect-shadow-multiple'>
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

          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className="bold">{data.wind.speed}KM/H</p> : null}
                <p>Wind Speed</p>
              </div>
              <div className='temp_min'>
                {data.main ? <p className='bold'>{data.main.temp_min.toFixed()}°C</p> : null}
                <p>Min Temp</p>
              </div>
              <div className='temp_max'>
                {data.main ? <p className='bold'>{data.main.temp_max.toFixed()}°C</p> : null}
                <p>Max Temp</p>
              </div>
            </div>
          }

          {data.name === undefined &&
          
            <div  className='top'>
              <div className="location">
                <p className='bold'>Search Location</p>
              </div>

              <div className='temp'>
                <h1 className='bold'>N/A°C</h1>
              </div>

              <div className="description">
                <p className='bold'>Description</p>
                <p className='bold'>N/A</p>
              </div>
            </div>
          }

          {data.name === undefined &&

              <div className="bottom">
                <div className="feels">
                  <p className='bold'>N/A</p>
                  <p>Feels Like</p>
                </div>

                <div className="humidity">
                <p className='bold'>N/A</p>
                  <p>Humidity</p>
                </div>

                <div className="wind">
                  <p className='bold'>N/A</p>
                  <p>Wind Speed</p>
                </div>

                <div className='temp_min'>
                  <p className='bold'>N/A°C</p>
                  <p>Min Temp</p>
                </div>

                <div className='temp_max'>
                <p className='bold'>N/A°C</p>
                  <p>Max Temp</p>
                </div>
            </div>
          
          }
        </div>
      
    </div>
  );
  
}

export default App;
