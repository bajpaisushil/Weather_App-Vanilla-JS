//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi={
    key: "f986e08b102d99070176f39b00baf25f",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
}
const searchInputBox=document.getElementById('input-box');
// searchInputBox.addEventListener('keypress', (event)=>{
//     if(event.keyCode==13){
//         console.log(searchInputBox.value);
//         getWeatherReport(searchInputBox.value);
//         document.querySelector('.weather-body').style.display='block';
//     }
    
// });
function show(){
    console.log(searchInputBox.value);
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display='block';
}

//Get Weather Report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

//Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city=document.getElementById('city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;

    let temperature=document.getElementById('temp');
    temperature.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp=document.getElementById('min-max');
    minMaxTemp.innerHTML=`${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`

    let weatherType=document.getElementById('weather');
    weatherType.innerText=`${weather.weather[0].main}`

    let date=document.getElementById('date');
    let todayDate=new Date();
    date.innerText=dateManage(todayDate);

    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage="url('images/clear_weather.jpeg')";
    } else if(weatherType.textContent=='Clouds'){
        document.body.style.backgroundImage="url('images/cold_weather.jpeg')";
    } else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage="url('images/rainy_weather.jpeg')";
    } else if(weatherType.textContent=='Mist'){
        document.body.style.backgroundImage="url('images/mist_weather.jpg')";
    } else if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage="url('images/haze_weather.jpeg')";
    }
}

//Date Manage
function dateManage(dateArgs){
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year=dateArgs.getFullYear();
    let month=months[dateArgs.getMonth()];
    let date=dateArgs.getDate();
    let day=days[dateArgs.getDay()];
    return `${date} ${month} (${day}), ${year}`;
}

//button
