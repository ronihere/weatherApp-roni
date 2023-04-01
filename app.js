let queryValue, responseData;
let ForC = document.querySelector(".ForC");
let city = document.querySelector(".city");
let description = document.querySelector(".description");
let temperature = document.querySelector(".temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let submitButton = document.querySelector(".button");
let options = {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // the content type header value is usually auto-set
    // depending on the request body
    // "Content-Type": "text/plain;charset=UTF-8",

    "X-Api-Key": "aJMjuhsPTXVBheWwWwZFug==ToCnFKSUZNFWBmWr",
  },
};

let getWeatherData = (city) => {
  let url = `https://api.api-ninjas.com/v1/weather?city=${city}`;
  fetch(url, options)
    .then((response) => {
      if (response.status != 200)
        window.alert(
          "Invalid input😒 For accurate weather report, please enter the name of the place without any space or special characters😊"
        );
      return response.json();
    })
    .then((data) => {
      responseData = data;
      // console.log(data);
      setTextContents(responseData, city);
      document.querySelector(".weather.loading").style.visibility = "visible";
    })
    .catch((err) => console.log(`${err}`));
};
let setTextContents = (responseData, cityName) => {
  if (responseData.cloud_pct < 50) {
    description.textContent = "Clear Sky";
  } else if (responseData.cloud_pct > 80) description.textContent = "Rainy";
  else if (responseData.cloud_pct > 70) description.textContent = "Too cloudy";
  else if (responseData.cloud_pct > 50)
    description.textContent = "Partly Cloudy";
  city.textContent = `Weather in ${cityName}`;
  temperature.textContent = responseData.temp + " °C";
  humidity.textContent = `Humidity: ${responseData.humidity} %`;
  wind.textContent = `Wind speed: ${responseData.wind_speed} mph`;
};
submitButton.addEventListener("click", () => {
  queryValue = document.querySelector("#whatcitybro").value;

  if (queryValue.length > 0) {
    getWeatherData(queryValue);
  } else; //console.log("invalid")
});

ForC.addEventListener("click", () => {
  let tempArray = temperature.textContent.split(" "); //[51 ,  °C]
  let temp = parseInt(tempArray[0]);
  if (tempArray[1].endsWith("C")) {
    let F = convertToFarenhite(temp);
    temperature.textContent = F + " °F";
    ForC.textContent = " | °C";
  } else {
    let C = convertToCelcius(temp);
    temperature.textContent = C + " °C";
    ForC.textContent = " | °F";
  }
  // temperature.textContent = 1.8 * celcius + 32;
});

let convertToFarenhite = (temp) => {
  return parseInt(1.8 * temp + 32);
};

let convertToCelcius = (temp) => {
  return parseInt((temp - 32) * (5 / 9)) + 1;
};
