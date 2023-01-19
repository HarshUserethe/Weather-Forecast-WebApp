//  var search = document.querySelector(".search");
//  var searchBar = document.querySelector(".searchBar>input");
//  var main = document.querySelector(".main-background");
//  var inputSearchButton = document.querySelector(".searchBar>i");

//  search.addEventListener("click", () => {
//     search.style.display = "none";
//     searchBar.style.display = "initial";
//     inputSearchButton.style.display = "initial";
//  })
//  main.addEventListener("click", () => {
//     search.style.display = "initial";
//     searchBar.style.display = "none";
//     inputSearchButton.style.display = "none";
//  })

var searchBar = document.querySelector("#search");
var bg = document.querySelector(".bg");
var sideSlide = document.querySelector(".side-slide");
var backbtn = document.querySelector(".ri-arrow-right-s-line");
var hour = new Date().getHours();
var isDayTime = hour > 6 && hour < 19;

searchBar.addEventListener("click", () => {
  bg.style.display = "initial";
  searchBar.style.height = "10vh";
});

bg.addEventListener("click", () => {
  bg.style.display = "none";
  searchBar.style.height = "5vh";
});

navi.addEventListener("click", function () {
  sideSlide.style.display = "flex";
});

backbtn.addEventListener("click", function () {
  sideSlide.style.display = " none ";
  bg.style.display = "none";
  searchBar.style.height = "5vh";
});

var city = document.querySelector(".city");
var degree = document.querySelector(".degree");
var weather = document.querySelector(".weather");
var maxTemp = document.querySelector("#maximumTemp");
var minTemp = document.querySelector("#minimumTemp");
var submit = document.querySelector("#submitdata");
var aqi = document.querySelector("#aqi");
var pBar = document.querySelector(".pBar");
var humidity = document.querySelector("#humidity");
var pressure = document.querySelector("#pressure");
var currTime = document.querySelector(".currTime");

const APIKEY = "f7f89364af3e9f95fc8b630a7ca17af4";

var sunr = document.querySelector("#sunrise");
var suns = document.querySelector("#sunset");

//curretn weather API
function defaultCity() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "87993ea398msh9e35b4c1d56c614p16c8fajsnee8af44e0c3b",
      "X-RapidAPI-Host": "air-quality-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(
    "https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=Delhi",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.overall_aqi);
      var aq = response.overall_aqi;
      aqi.innerHTML = response.overall_aqi + " " + "AQI";

      if (aq < 100) {
        pBar.style.left = "15%";
      } else if (aq > 101 && aq < 250) {
        pBar.style.left = "25%";
      } else if (aq > 250 && aq < 350) {
        pBar.style.left = "60%";
      } else if (aq > 350 && aq <= 500) {
        pBar.style.left = "90%";
      } else {
        pBar.style.left = "0%";
      }
    })
    .catch((err) => console.error(err));

  //weather API ----------------------------------------------->>>>>

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=f7f89364af3e9f95fc8b630a7ca17af4&units=metric`
  )
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);

      city.innerHTML = response.name;
      degree.innerHTML = Math.round(response.main.temp) + "°";
      weather.innerHTML = response.weather[0].description;
      // maxTemp.innerHTML = "H:"+Math.round(response.main.temp_max) + "°";
      // minTemp.innerHTML = "L:"+Math.round(response.main.temp_min) + "°";
      minTemp.innerHTML = Math.round(response.main.feels_like) + "°";
      windDeg.innerHTML = response.wind.deg + "°";
      sunr.innerHTML = window
        .moment(response.sys.sunrise * 1000)
        .format("hh:mm A");
      suns.innerHTML = window
        .moment(response.sys.sunset * 1000)
        .format("hh:mm A");

      btmcity.innerHTML = response.name;
      btmtemp.innerHTML = Math.floor(response.main.temp) + "°";
      btmweather.innerHTML = response.weather[0].description;

      //current Time
      var data = new Date();
      currTime.innerHTML = moment(data).format("hh:mm A - dddd");

      //humidity - pressure
      humidity.innerHTML = response.main.humidity;
      pressure.innerHTML = response.main.pressure;

      // if(response.wind.deg === "0"){
      // 	dir.innerHTML = "N"
      // 	console.log("north")
      // 	 }
      // 	 else if(response.wind.deg === "90"){
      // 	   dir.innerHTML = "E"
      // 	   console.log("east")
      // 	 }
      // 	 else if(response.wind.deg === "180"){
      // 	   dir.innerHTML = "S"
      // 	   console.log("south")
      // 	 }
      // 	 else if(response.wind.deg === "270"){
      // 	   dir.innerHTML = "W"
      // 	   console.log("west")
      // 	 }

      // 	 else if(response.wind.deg > "0" && response.wind.deg < "90"){
      // 	   dir.innerHTML = "NE"
      // 	   console.log("north-east")
      // 	 }
      // 	 else if(response.wind.deg >" 90 " && response.wind.deg < "180"){
      // 	   dir.innerHTML = "SE"
      // 	   console.log("south-east")
      // 	 }
      // 	 else if(response.wind.deg > "180" && response.wind.deg < "270"){
      // 	   dir.innerHTML = "SW"
      // 	   console.log("south-west")
      // 	 }
      // 	 else if(response.wind.deg > "270" && response.wind.deg < "360"){
      // 	   dir.innerHTML = "NW"
      // 	   console.log("north-west")
      // 	 }
    });

  //hourly weather --->

  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=Delhi&appid=f7f89364af3e9f95fc8b630a7ca17af4&units=metric"
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("Hourly");
      console.log(response);

      var crr1 = window.moment(response.list[1].dt_txt).format("hh A");
      var crr2 = window.moment(response.list[2].dt_txt).format("hh A");
      var crr3 = window.moment(response.list[3].dt_txt).format("hh A");
      var crr4 = window.moment(response.list[4].dt_txt).format("hh A");
      var crr5 = window.moment(response.list[5].dt_txt).format("hh A");

      t1.innerHTML = crr1;
      t2.innerHTML = crr2;
      t3.innerHTML = crr3;
      t4.innerHTML = crr4;
      t5.innerHTML = crr5;

      d1.innerHTML = Math.round(response.list[1].main.temp) + "°";
      d2.innerHTML = Math.round(response.list[2].main.temp) + "°";
      d3.innerHTML = Math.round(response.list[3].main.temp) + "°";
      d4.innerHTML = Math.round(response.list[4].main.temp) + "°";
      d5.innerHTML = Math.round(response.list[5].main.temp) + "°";

      var i1 = document.querySelector("#i1");
      var i2 = document.querySelector("#i2");
      var i3 = document.querySelector("#i3");
      var i4 = document.querySelector("#i4");
      var i5 = document.querySelector("#i5");

      // detect day and night program

      //   if(isDayTime === true){
      //
      //   }
      //   else{
      // 	console.log("night")
      //   }

      //index-1

      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[1].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[1].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[1].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[1].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[1].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[1].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i1.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[1].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[1].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[1].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[1].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[1].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[1].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i1.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }

        //------------------------>
      }

      //index-2
      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[2].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[2].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[2].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[2].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[2].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[2].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i2.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[2].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[2].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[2].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[2].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[2].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[2].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i2.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }
      }

      //------------------------>

      //index-3
      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[3].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[3].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[3].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[3].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[3].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[3].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i3.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[3].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[3].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[3].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[3].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[3].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[3].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i3.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }
      }

      //------------------------>

      //index-4
      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[4].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[4].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[4].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[4].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[4].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[4].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i4.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[4].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[4].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[4].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[4].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[4].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[4].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i4.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }
      }

      //------------------------>

      //index-5
      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[5].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[5].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[5].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[5].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[5].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[5].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i5.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[5].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[5].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[5].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[5].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[5].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[5].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i5.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }
      }

      //------------------------> END <----------------------------
    });
}

defaultCity();

var windDeg = document.querySelector("#wind_deg");
var dir = document.querySelector("#wnddir");

function getWeatherData(cityName) {
  // API for Air Quality

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "87993ea398msh9e35b4c1d56c614p16c8fajsnee8af44e0c3b",
      "X-RapidAPI-Host": "air-quality-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(
    `https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${cityName}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      var aqp = response.overall_aqi;
      aqi.innerHTML = response.overall_aqi + " " + "AQI";

      if (aqp < 100) {
        pBar.style.left = "15%";
      } else if (aqp > 101 && aqp < 250) {
        pBar.style.left = "25%";
      } else if (aqp > 250 && aqp < 350) {
        pBar.style.left = "60%";
      } else if (aqp > 350 && aqp <= 500) {
        pBar.style.left = "90%";
      } else {
        pBar.style.left = "0%";
      }
    })
    .catch((err) => console.error(err));

  //---------------------------------------------------------------------------------
  //------------------------Weather API ----------------------------------------------
  //----------------------------------------------------------------------------------

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f7f89364af3e9f95fc8b630a7ca17af4&units=metric`
  )
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);

      city.innerHTML = response.name;
      degree.innerHTML = Math.round(response.main.temp) + "°";
      weather.innerHTML = response.weather[0].description;
      // maxTemp.innerHTML = "H:"+Math.round(response.main.temp_max) + "°";
      // minTemp.innerHTML = "L:"+Math.round(response.main.temp_min) + "°";
      minTemp.innerHTML = Math.round(response.main.feels_like) + "°";
      windDeg.innerHTML = response.wind.deg + "°";
      sunr.innerHTML = window
        .moment(response.sys.sunrise * 1000)
        .format("hh:mm A");
      suns.innerHTML = window
        .moment(response.sys.sunset * 1000)
        .format("hh:mm A");

      btmcity.innerHTML = response.name;
      btmtemp.innerHTML = Math.floor(response.main.temp) + "°";
      btmweather.innerHTML = response.weather[0].description;

      //humidity - pressure
      humidity.innerHTML = response.main.humidity;
      pressure.innerHTML = response.main.pressure;

      //    if(response.wind.deg === "0"){
      // 	dir.innerHTML = "N";
      // 	 }
      // 	 else if(response.wind.deg === "90"){
      // 	   dir.innerHTML = "E";
      // 	 }
      // 	 else if(response.wind.deg === "180"){
      // 	   dir.innerHTML = "S";
      // 	 }
      // 	 else if(response.wind.deg === "270"){
      // 	   dir.innerHTML = "W";
      // 	 }
      // 	 else if(response.wind.deg > "0" && response.wind.deg < "90"){
      // 	   dir.innerHTML = "NE";
      // 	 }
      // 	 else if(response.wind.deg >" 90 " && response.wind.deg < "180"){
      // 	   dir.innerHTML = "SE";
      // 	 }
      // 	 else if(response.wind.deg > "180" && response.wind.deg < "270"){
      // 	   dir.innerHTML = "SW";
      // 	 }
      // 	 else if(response.wind.deg > "270" && response.wind.deg < "360"){
      // 	   dir.innerHTML = "NW"
      // 	 }
    });

  //5 - DAY API ----->

  var t1 = document.querySelector("#t1");
  var t2 = document.querySelector("#t2");
  var t3 = document.querySelector("#t3");
  var t4 = document.querySelector("#t4");
  var t5 = document.querySelector("#t5");
  var d1 = document.querySelector("#d1");
  var d2 = document.querySelector("#d2");
  var d3 = document.querySelector("#d3");
  var d4 = document.querySelector("#d4");
  var d5 = document.querySelector("#d5");

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=f7f89364af3e9f95fc8b630a7ca17af4&units=metric`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      var crr1 = window.moment(response.list[1].dt_txt).format("hh A");
      var crr2 = window.moment(response.list[2].dt_txt).format("hh A");
      var crr3 = window.moment(response.list[3].dt_txt).format("hh A");
      var crr4 = window.moment(response.list[4].dt_txt).format("hh A");
      var crr5 = window.moment(response.list[5].dt_txt).format("hh A");

      t1.innerHTML = crr1;
      t2.innerHTML = crr2;
      t3.innerHTML = crr3;
      t4.innerHTML = crr4;
      t5.innerHTML = crr5;

      d1.innerHTML = Math.round(response.list[1].main.temp) + "°";
      d2.innerHTML = Math.round(response.list[2].main.temp) + "°";
      d3.innerHTML = Math.round(response.list[3].main.temp) + "°";
      d4.innerHTML = Math.round(response.list[4].main.temp) + "°";
      d5.innerHTML = Math.round(response.list[5].main.temp) + "°";

      //weather icons conditions

      var i1 = document.querySelector("#i1");
      var i2 = document.querySelector("#i2");
      var i3 = document.querySelector("#i3");
      var i4 = document.querySelector("#i4");
      var i5 = document.querySelector("#i5");

      var comp = document.querySelector(".direction-deg>h3");

      //index-1

      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[1].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[1].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[1].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[1].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[1].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[1].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i1.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i1.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[1].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[1].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[1].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[1].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[1].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[1].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i1.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i1.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }

        //------------------------>
      }

      //index-2
      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[2].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[2].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[2].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[2].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[2].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[2].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i2.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i2.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[2].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[2].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[2].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[2].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[2].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[2].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i2.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i2.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }
      }

      //------------------------>

      //index-3
      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[3].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[3].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[3].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[3].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[3].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[3].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i3.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i3.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[3].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[3].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[3].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[3].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[3].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[3].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i3.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i3.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }
      }

      //------------------------>

      //index-4
      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[4].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[4].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[4].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[4].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[4].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[4].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i4.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i4.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[4].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[4].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[4].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[4].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[4].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[4].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i4.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i4.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }
      }

      //------------------------>

      //index-5
      if (isDayTime === true) {
        //cloudy weather
        if (
          response.list[5].weather[0].main === "Clouds" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-partly-cloudy-day.svg" alt="">`;
        }
        //clear weather
        else if (
          response.list[5].weather[0].main === "Clear" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-smiling-sun.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[5].weather[0].main === "Haze" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }
        //mist weather
        else if (
          response.list[5].weather[0].main === "Mist" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-haze.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[5].weather[0].main === "Thunderstrom" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-scattered-thunderstorms.svg" alt="">`;
        }
        //rainy weather
        else if (
          response.list[5].weather[0].main === "Rain" &&
          isDayTime === true
        ) {
          i5.innerHTML = `<img src="./assets/icons8-rain-cloud.svg" alt="">`;
        } else {
          i5.innerHTML = `<img src="./assets/icons8-smiling-sun.svg " alt="">`;
        }
      } else {
        //cloudy weather
        if (
          response.list[5].weather[0].main === "Clouds" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/cloudy-night.svg" alt="">`;
        }

        //clear weather
        else if (
          response.list[5].weather[0].main === "Clear" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/icons8-full-moon.svg" alt="">`;
        }

        //haze weather
        else if (
          response.list[5].weather[0].main === "Haze" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //mist weather
        else if (
          response.list[5].weather[0].main === "Mist" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/icons8-fog.svg" alt="">`;
        }

        //thunderstrom weather
        else if (
          response.list[5].weather[0].main === "Thunderstrom" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="img src="./assets/icons8-thunderstorm-night.svg" alt="">`;
        }

        //rainy weather
        else if (
          response.list[5].weather[0].main === "Rain" &&
          isDayTime === false
        ) {
          i5.innerHTML = `<img src="./assets/icons8-rainy-night.svg" alt="">`;
        } else {
          i5.innerHTML = `<img src="./assets/icons8-full-moon.svg alt="">`;
        }
      }

      //------------------------> END <----------------------------
    });
}

submit.addEventListener("click", function () {
  bg.style.display = "none";
  searchBar.style.height = "5vh";
  var cityName = searchBar.value;
  sideSlide.style.display = "none";
  getWeatherData(cityName);
  searchBar.value = " ";
});

// submit.addEventListener("click", function(){

// 	var cityName = searchBar.value;
// 	sideSlide.style.display = "none";
// 	getWeatherData(cityName);
// 	searchBar.value = " ";
// })

var defaultTemp1 = document.querySelector("#default_temp_1");
var defaultimg1 = document.querySelector("#default_img_1");
var defaultupdown1 = document.querySelector("#default_updown_1");
var defaultloc1 = document.querySelector("#default_loc_1");
var defaultweather1 = document.querySelector("#default_weather_1");

var defaultTemp2 = document.querySelector("#default_temp_2");
var defaultimg2 = document.querySelector("#default_img_2");
var defaultupdown2 = document.querySelector("#default_updown_2");
var defaultloc2 = document.querySelector("#default_loc_2");
var defaultweather2 = document.querySelector("#default_weather_2");

var defaultTemp3 = document.querySelector("#default_temp_3");
var defaultimg3 = document.querySelector("#default_img_3");
var defaultupdown3 = document.querySelector("#default_updown_3");
var defaultloc3 = document.querySelector("#default_loc_3");
var defaultweather3 = document.querySelector("#default_weather_3");

var defaultTemp4 = document.querySelector("#default_temp_4");
var defaultimg4 = document.querySelector("#default_img_4");
var defaultupdown4 = document.querySelector("#default_updown_4");
var defaultloc4 = document.querySelector("#default_loc_4");
var defaultweather4 = document.querySelector("#default_weather_4");

//default city MUMBAI, INDIA
function mumbaiCity() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=f7f89364af3e9f95fc8b630a7ca17af4&units=metric"
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      defaultloc1.innerHTML = response.name;
      defaultTemp1.innerHTML = Math.round(response.main.temp) + "°";
      defaultweather1.innerHTML = response.weather[0].main;
      // defaultupdown1.innerHTML = "SR: " + window.moment(response.sys.sunrise*1000).format("hh:mm A") + `<br>` + "SS: " + window.moment(response.sys.sunset*1000).format("hh:mm A");
      defaultupdown1.innerHTML =
        "H: " +
        Math.round(response.main.temp_max) +
        "°" +
        " " +
        "L: " +
        Math.round(response.main.temp_min) +
        "°";
    });
}

//default city Bengaluru, INDIA
function bengaluruCity() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=f7f89364af3e9f95fc8b630a7ca17af4&units=metric"
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      defaultloc2.innerHTML = response.name;
      defaultTemp2.innerHTML = Math.round(response.main.temp) + "°";
      defaultweather2.innerHTML = response.weather[0].main;
      // defaultupdown2.innerHTML = "SR: " + window.moment(response.sys.sunrise*2000).format("hh:mm A") + `<br>` + "SS: " + window.moment(response.sys.sunset*2000).format("hh:mm A");
      defaultupdown2.innerHTML =
        "H: " +
        Math.round(response.main.temp_max) +
        "°" +
        " " +
        "L: " +
        Math.round(response.main.temp_min) +
        "°";
    });
}

//default city Guwahati, INDIA
function guwahatiCity() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Guwahati&appid=f7f89364af3e9f95fc8b630a7ca17af4&units=metric"
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      defaultloc3.innerHTML = response.name;
      defaultTemp3.innerHTML = Math.round(response.main.temp) + "°";
      defaultweather3.innerHTML = response.weather[0].main;
      // defaultupdown3.innerHTML = "SR: " + window.moment(response.sys.sunrise*3000).format("hh:mm A") + `<br>` + "SS: " + window.moment(response.sys.sunset*3000).format("hh:mm A");
      defaultupdown3.innerHTML =
        "H: " +
        Math.round(response.main.temp_max) +
        "°" +
        " " +
        "L: " +
        Math.round(response.main.temp_min) +
        "°";
    });
}
//default city NewYork, INDIA
function newYorkCity() {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=New York&appid=f7f89364af3e9f95fc8b630a7ca17af4&units=metric"
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      defaultloc4.innerHTML = response.name;
      defaultTemp4.innerHTML = Math.round(response.main.temp) + "°";
      defaultweather4.innerHTML = response.weather[0].main;
      // defaultupdown4.innerHTML = "SR: " + window.moment(response.sys.sunrise*4000).format("hh:mm A") + `<br>` + "SS: " + window.moment(response.sys.sunset*4000).format("hh:mm A");
      defaultupdown4.innerHTML =
        "H: " +
        Math.round(response.main.temp_max) +
        "°" +
        " " +
        "L: " +
        Math.round(response.main.temp_min) +
        "°";
    });
}

mumbaiCity();
bengaluruCity();
guwahatiCity();
newYorkCity();

// adding gsap in it..................

// gsap.to(".degree",{
// top: "80vh",
// left: "-10vw",
// position: "relative",
// duration: .5,
// fontSize: -9,
// fontWeight: "800",

// scrollTrigger: {
// trigger: ".topEdge",
// scroller: "body",

// start: "top: 20%",
// scrub: 1,

// }

// })
// gsap.to("#bgimage",{

//   duration: .5,
//   opacity: 1,

//   scrollTrigger: {
//     trigger: ".topEdge",
//     scroller: "body",

//     start: "top: 20%",
//     scrub: 1,

//     }

// })
// gsap.to("#houseimg",{

//   duration: .5,
//   opacity: 0,

//   scrollTrigger: {
//     trigger: ".topEdge",
//     scroller: "body",

//     start: "top: 20%",
//     scrub: 1,

//     }

// })
// gsap.to(".divider",{

//   opacity: 1,
//   duration: .5,

//   scrollTrigger: {
//     trigger: ".topEdge",
//     scroller: "body",

//     start: "top: 20%",
//     scrub: 1,

//     }

// })

// gsap.to(".city",{

//   top: "77vh",
//   left: "0vw",
//   position: "relative",
//   duration: .5,
//   fontSize: "2vw",
//   fontWeight: "400",

//   scrollTrigger: {
//     trigger: ".topEdge",
//     scroller: "body",

//     start: "top: 20%",
//     scrub: 1,

//     }

// })

var bottomCard = document.querySelector(".bottom-card");

var btmcity = document.querySelector(".btm-city");
var btmtemp = document.querySelector(".btm-temp");
var btmweather = document.querySelector(".btm-weather");

gsap.to("#bgimage", {
  duration: 0.5,
  opacity: "100%",

  scrollTrigger: {
    trigger: ".topEdge",
    scroller: "body",

    start: "top: 40%",

    scrub: 1,
  },
});

gsap.to("#houseimg", {
  duration: 0.5,
  y: 300,

  scrollTrigger: {
    trigger: ".topEdge",
    scroller: "body",

    start: "top: 40%",
    scrub: 1,
  },
});

gsap.to(".bottom-card", {
  duration: 0.5,
  color: "rgba(255, 255, 255)",

  scrollTrigger: {
    trigger: ".topEdge",
    scroller: "body",

    start: "top: 40%",
    scrub: 1,
  },
});

//see more card --->

var pointer = 0;

document.querySelector(".txt-2").addEventListener("click", function () {
  if (pointer === 0) {
    gsap.to(".aq", {
      marginTop: "0vh",
      duration: 0.5,
    });
    gsap.to(".see-more", {
      marginTop: "87%",
      duration: 0.5,
      opacity: 1,
      display: "flex",
    });
    // document.querySelector(".see-more").style.display = "flex";
    document.querySelector(".txt-2>span").innerHTML = "See less";
    pointer = 1;
  } else {
    gsap.to(".aq", {
      marginTop: "45vh",
      opacity: 1,
    });
    gsap.to(".see-more", {
      marginTop: "80%",
      opacity: 0,
      duration: 0.5,
      display: "none",
    });
    document.querySelector(".txt-2>span").innerHTML = "See more";
    pointer = 0;
  }
});

// javascript media query ----->

const mediaQuery = window.matchMedia("(min-width: 601px)");

if (mediaQuery.matches) {
  console.log("Welcome to js query");

  searchBar.addEventListener("click", () => {
    searchBar.style.height = "5vh";
  });

  sideSlide.addEventListener("click", () => {});

  submit.addEventListener("click", () => {
    bg.style.display = "initial";
    searchBar.style.height = "5vh";
    var cityName = searchBar.value;
    sideSlide.style.display = "initial";
    getWeatherData(cityName);
    searchBar.value = "";
  });
} else {
  console.log("not matched");
}
