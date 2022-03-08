$.getJSON("https://api.openweathermap.org/data/2.5/weather?q=New York,US-NY&units=Imperial&appid=073c7caba2dfdebeab637b01b15f251a", function(data){
  displayWeather(data);
});

function updateLocation() {
  console.log("Clicked.");
  var loc = document.getElementById('loc');

  $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + loc.elements[0].value + "," + loc.elements[1].value +"&units=Imperial&appid=073c7caba2dfdebeab637b01b15f251a", function(data){
    displayWeather(data);
  });
}

function displayWeather(data) {
  console.log(data);

  var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  var temp = Math.round(data.main.temp);
  var weather = data.weather[0].main;

  var location = document.getElementById('location');
  if(location.innerHTML === "") {
    location = data.name + ", " + "NY";
  } else {
    loc = document.getElementById('loc');
    location = data.name + ", " + loc.elements[1].value.slice(-2).toUpperCase();
  }

  $('.location').html(location);
  $('.weather-icon').attr('src', icon);
  $('.weather').html(weather);
  $('.temp').html(temp);
}