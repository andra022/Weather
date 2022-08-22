import React, {useState} from 'react'
import axios from 'axios'

function App() {
  const[data,setData] = useState({})
  const[location,setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lat=43.985489&lon=22.9446255&appid=ea5ec0ba2f81de8d7f3d76bd1a95e0f8`

  const searchLocation = (e) =>{
    if(e.key === 'Enter'){
      axios.get(url).then((response) =>{
        setData(response.data)
        console.log(response.data)
      })
  }
  }

  return (
    <div className="app">
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
            <p>Calafat</p>
          </div>
          <div className="temp">
            <h1>24°C</h1>
          </div>
          <div className="description">
            <p>Clouds</p>
          </div>
        </div>

        <div className="bottom">
          <div className="feels">
            <p className="bold">24°C</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">68%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">3 KM/H</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
