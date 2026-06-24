import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";


function Dashboard() {
    const categories =
  JSON.parse(localStorage.getItem("categories")) || [];
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [newsIndex, setNewsIndex] = useState(0);
    const [weather, setWeather] = useState(null);
    const [articles, setArticles] = useState([]);
    const movie = localStorage.getItem("movie");
      useEffect(() => {
     axios.get(
          "https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=663cd3a5e51a943a71d417aece3b1ebc&units=metric"


    )
    .then((response) => {
      setWeather(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
      }, []);

         useEffect(() => {
        axios
    .get(
        "https://gnews.io/api/v4/top-headlines?category=general&lang=en&max=10&apikey=756643ba4e713657b6c2a0f746d92be8"
        )
        .then((res) => {
         setArticles(res.data.articles);
         })
         .catch((err) => {
         console.log(err);
         });
        }, []);
    

    const userName = localStorage.getItem("name");
    const userEmail = localStorage.getItem("email");
    const [note, setNote] = useState(
       localStorage.getItem("notes") || ""
      );
      useEffect(() => {
        localStorage.setItem("notes", note);
       }, [note])
       useEffect(() => {
       if (articles.length === 0) return;
       const interval = setInterval(() => {
        setNewsIndex((prev) => (prev + 1) % articles.length);
          }, 2000);
          return () => clearInterval(interval);
            }, [articles]);


        useEffect(() => {
          let interval;

         if (isRunning) {
           interval = setInterval(() => {
           setSeconds((prev) => prev + 1);
             }, 1000);
         }

       return () => clearInterval(interval);
           }, [isRunning]);

  return (

     <>
  <div className="top-bar">
    <button
      className="logout-btn"
      onClick={() => {
        localStorage.clear();
        navigate("/");
      }}
    >
      Logout
    </button>
  </div>
        <h1 className="dashboard-title">
         🎬 Entertainment Dashboard
        </h1>

    <div className="dashboard-container">


      <div className="profile-card">
         <h3>👤 User Profile</h3>
         <p>Name: {userName}</p>
         <p>Username: {localStorage.getItem("username")}</p>
          <p>Email: {userEmail}</p>
          <p>Mobile: {localStorage.getItem("mobile")}</p>
        <p>Categories: {categories.join(", ")}</p>
        <p>Favorite Movie: {movie}</p>
        </div>

         <div className="weather-card">
          <h3>🌤 Weather</h3>
          {weather && (
           <>
           <p>City: {weather.name}</p>
           <p className="temp">
              {weather.main.temp}°C
                </p>
           <p>Humidity: {weather.main.humidity}%</p>
            <p>Condition: {weather.weather[0].main}</p>
            <p>Pressure: {weather.main.pressure} hPa</p>
             <p>Wind Speed: {weather.wind.speed} m/s</p>
          </>
         )}
        </div>
        <div className="notes-card">
       <h3>📝 Notes</h3>
         <textarea
         value={note}
         onChange={(e) => setNote(e.target.value)}
         placeholder="Write your notes..."
         ></textarea>

         <button
             onClick={() => {
               setNote("");
               localStorage.removeItem("notes");
                 }}
               >
             Clear Notes
            </button>
       </div>
    
           <div className="timer-card">
             <h3>⏱ Timer</h3>
             <h1>{seconds}</h1>
             <button onClick={() => setIsRunning(true)}>
                      Start
              </button>
            <button onClick={() => setIsRunning(false)}>
                 Pause
            </button>

            <button onClick={() => setSeconds(0)}>
                 Reset
            </button>
            </div>


         <div className="news-card">
           <h3>📰 News</h3>

         {articles.length > 0 && (
           <>
          <img
           src={articles[newsIndex]?.image}
          alt="news"
          width="100%"
         />

         <h4>{articles[newsIndex]?.title}</h4>

          <p>{articles[newsIndex]?.description}</p>
        </>
            )}
              </div>


        <div className="movies-card">
           <h3>🎬 Movies</h3>
           <button  className="movies-btn"
              onClick={() => navigate("/movies")}
          >
              Browse Movies
              </button>
             </div>

        </div>
        
        </>
  );
}

export default Dashboard;