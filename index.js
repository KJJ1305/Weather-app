//Weather App

const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apiKey="6767f52b6c7357f77d19513d8cbfed9b";

weatherform.addEventListener("submit",async (e)=>{
    e.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData=await getWeather(city);
            displayWeather(weatherData);
        }
        catch(error){
            console.error(error);
            displayError("Error fetching weather data");
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeather(city){
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response=await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("City not found");
    }
    const data=await response.json();
    return data;
}

function displayWeather(data){
    const {name :city, main: {temp, humidity}, weather: [{description, id}]} = data;

    card.textContent="";
    card.style.display="flex";
    const cityDisplay=document.createElement("h1");
    const temperature=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descriptionDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    cityDisplay.classList.add("cityDisplay");
    card.appendChild(cityDisplay);

    temperature.textContent=`${temp}°C`;
    temperature.classList.add("temperature");
    card.appendChild(temperature);

    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidity");
    card.appendChild(humidityDisplay);

    descriptionDisplay.textContent=description;
    descriptionDisplay.classList.add("description");
    card.appendChild(descriptionDisplay);

    weatherEmoji.textContent=getWeatherEmoji(id);
    weatherEmoji.classList.add("weather-emoji");
    card.appendChild(weatherEmoji);

}

function getWeatherEmoji(weatherid){
    switch(true){
        case weatherid>=200 && weatherid<300:
            return "🌩️";
        case weatherid>=300 && weatherid<400:
            return "🌧️";
        case weatherid>=500 && weatherid<600:
            return "🌧️";
        case weatherid>=600 && weatherid<700:
            return "❄️";
        case weatherid>=700 && weatherid<800:
            return "🌫️";
        case weatherid==800:
            return "🌞";
        default:
            return "🌤️";
    }
}

function displayError(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}


