const apiKey = "e55b36a715e3c0bac7c4f380968a68ce"; 
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiURL +city+ `&appid=${apiKey}`); 


    if (response.status == 404)
    {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }
    else
    {
        var data = await response.json(); 

        //console.log(data); 
        document.querySelector(".city").innerHTML = data.name; 
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°c"; 
        document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
        document.querySelector(".wind").innerHTML = data.wind.speed +"Km/h";

        if (data.weather[0].main == "Clouds")
        {
            weatherIcon.src = "images/clouds.png"; 
        }
        else if (data.weather[0].main == "Clear")
        {
            weatherIcon.src = "images/clear.png"; 
        }
        else if (data.weather[0].main == "Rain")
        {
            weatherIcon.src = "images/rain.png"; 
        }
        else if (data.weather[0].main == "Drizzle")
        {
            weatherIcon.src = "images/drizzle.png"; 
        }
        else if (data.weather[0].main == "Mist")
        {
            weatherIcon.src = "images/mist.png"; 
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"

    }
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
 

document.querySelector(".card").addEventListener("mousemove", (e) => {
const cardRect = e.currentTarget.getBoundingClientRect();
const x = (e.clientX - cardRect.left) / cardRect.width;
const y = (e.clientY - cardRect.top) / cardRect.height;

const movement = 15;  // Adjust this value for stronger/weaker effect

const translateX = (x - 0.5) * movement;
const translateY = (y - 0.5) * movement;

document.querySelector(".weather").style.transform = `translate(${translateX}px, ${translateY}px)`;
});



//for the card
const card = document.querySelector('.card');

document.addEventListener('mousemove', (e) => {
// Get the card's bounding box.
const cardRect = card.getBoundingClientRect();

// Calculate distances from the center of the card.
const distX = (e.clientX - (cardRect.left + cardRect.width / 2)) * 0.025; 
const distY = (e.clientY - (cardRect.top + cardRect.height / 2)) * 0.025; 

// Rotate the card based on the distance from the center. 
// This gives the illusion that the card is reacting to the mouse's movement.
card.style.transform = `rotateY(${distX}deg) rotateX(${-distY}deg)`;
});

// Reset the card's position when the mouse leaves the card.
card.addEventListener('mouseleave', () => {
card.style.transform = 'rotateY(0deg) rotateX(0deg)';
});