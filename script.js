const apiKey = "6391dfac5ece021fd16d5226ea57a7df";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".feels-like").innerHTML = "Feels like: " + Math.round(data.main.feels_like) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const currentTime = data.dt * 1000;
        const sunrise = data.sys.sunrise * 1000;
        const sunset = data.sys.sunset * 1000;

        const isDay = currentTime >= sunrise && currentTime < sunset;

        document.body.classList.toggle("night", !isDay);

        if (data.weather[0].main == "Clear") {
            weatherIcon.src = isDay ? "images/clear.png" : "images/night.png";
        } else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = isDay ? "images/clouds.png" : "images/night-cloud.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = isDay ? "images/day-raining.png" : "images/night-raining.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

