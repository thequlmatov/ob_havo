import React, {useState} from 'react'

const api = {
  key: "a9ffb0c99f8fb644e12fe539237db8e1",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        // setQuery("");
        console.log(result);
      });
    }
  };

  const dateBuilder = (s) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
  ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[s.getDay()];
    let date = s.getDate();
    let month = months[s.getMonth()];
    let year = s.getFullYear();

    return `${day} ${date} ${month} ${year}`;

  };


  return (
    <div className= {
      (typeof weather.main != 'undefined') ? ( (weather.main.temp > 16) ? 'app' : 'app could'): 'app'
    }>
      <main>
        <div className='search-box'>
          <input type="text" className="search-bar" placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search }
          />
        </div>
        {
          typeof weather.main != "undefined" ? (
            <div className="location-box">
          <div className='location'> {weather.name}, {weather.sys.country} </div>
          <div className="date"> {dateBuilder(new Date())} </div>
          <div className="weather-box">
            <div className='temp'>{Math.round(weather.main.temp)}°C</div>
            <div className="weather"> {weather.weather[0].main} </div>
          </div>

        </div>
          ) : ("")
        }
       {/*  <div className='auther'>
            <h3> author of Zuhriddin Qulmatov</h3>
            <h2>Toshkent 2022 &copy;</h2>
            </div> */}

      </main>
    </div>
  );
}

export default App