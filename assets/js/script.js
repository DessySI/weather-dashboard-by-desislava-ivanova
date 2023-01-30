

   var index = 0;  
//after search button is clicked save input value to local storage and append to URL
$("#search-button").on("click", function (event) {
   event.preventDefault();
   var city=$("#search-input").val();
   $("#search-button").clone().appendTo("#history").addClass('history-button bg-light w-100 btn mt-3 text-dark').text(city);

   console.log($('.history-button').text());
   localStorage.setItem(index, $('.history-button').text());
   sessionStorage.setItem(index, city);
//get values from object (server API)
function weatherToday(){
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&limit=5&appid=f77b11b08e40dc9c363bd82623c07c7f" 
$.ajax({  
    url: queryURL,
    method: "GET"
  }).then(function(response) {
     var lat = response.coord.lat;
     var lon = response.coord.lon;
     console.log(lat, lon);
     localStorage.setItem(index+1, lat);
     localStorage.setItem(index+2, lon);
   }).then(function(){
   var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?" + 
   "lat=" + localStorage.getItem(index+1) + 
   "&lon=" + localStorage.getItem(index+2) + 
   "&limit=5&appid=f77b11b08e40dc9c363bd82623c07c7f" 
   $.ajax({  
       url: queryURL2,
       method: "GET"
     }).then(function(response) {
         console.log(city);
         localStorage.clear();
         console.log(response);
         var iconCode = response.list[0].weather[0].icon;
         var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
         var now = moment().format("DD/MM/YYYY");
         $("#today").text(response.city.name + ' ' + '(' + now + ')');
         $("#today").append($('<img>').attr("src", iconUrl));
         $("#temp").text("Temp: " + (response.list[0].main.temp - 273.15).toFixed(2) + " °C");
         $("#wind").text("Wind: " + response.list[0].wind.speed + " KPH");
         $("#humidity").text("Humidity: " + response.list[0].main.humidity + "%");
         
         var iconCodeD1 = response.list[7].weather[0].icon;
         var iconUrlD1 = "https://openweathermap.org/img/wn/" + iconCodeD1 + ".png";
         $(".day1-h5").text(moment(response.list[7].dt_txt).format("DD/MM/YYYY"));
         $("#imgDay1").attr("src", iconUrlD1);
         $(".day1-t").text("Temp: " + (response.list[7].main.temp - 273.15).toFixed(2) + " °C");
         $(".day1-w").text("Wind: " + response.list[7].wind.speed + " KPH");
         $(".day1-h").text("Humidity: " + response.list[7].main.humidity + "%");
      
         var iconCodeD2 = response.list[15].weather[0].icon;
         var iconUrlD2 = "https://openweathermap.org/img/wn/" + iconCodeD2 + ".png";
         $(".day2-h5").text(moment(response.list[15].dt_txt).format("DD/MM/YYYY"));
         $("#imgDay2").attr("src", iconUrlD2);
         $(".day2-t").text("Temp: " + (response.list[15].main.temp - 273.15).toFixed(2) + " °C");
         $(".day2-w").text("Wind: " + response.list[15].wind.speed + " KPH");
         $(".day2-h").text("Humidity: " + response.list[15].main.humidity + "%");

         var iconCodeD3 = response.list[23].weather[0].icon;
         var iconUrlD3 = "https://openweathermap.org/img/wn/" + iconCodeD3 + ".png";
         $(".day3-h5").text(moment(response.list[23].dt_txt).format("DD/MM/YYYY"));
         $("#imgDay3").attr("src", iconUrlD3);
         $(".day3-t").text("Temp: " + (response.list[23].main.temp - 273.15).toFixed(2) + " °C");
         $(".day3-w").text("Wind: " + response.list[23].wind.speed + " KPH");
         $(".day3-h").text("Humidity: " + response.list[23].main.humidity + "%");

         var iconCodeD4 = response.list[31].weather[0].icon;
         var iconUrlD4 = "https://openweathermap.org/img/wn/" + iconCodeD4 + ".png";
         $(".day4-h5").text(moment(response.list[31].dt_txt).format("DD/MM/YYYY"));
         $("#imgDay4").attr("src", iconUrlD4);
         $(".day4-t").text("Temp: " + (response.list[31].main.temp - 273.15).toFixed(2) + " °C");
         $(".day4-w").text("Wind: " + response.list[31].wind.speed + " KPH");
         $(".day4-h").text("Humidity: " + response.list[31].main.humidity + "%");

         var iconCodeD5 = response.list[39].weather[0].icon;
         var iconUrlD5 = "https://openweathermap.org/img/wn/" + iconCodeD5 + ".png";
         $(".day5-h5").text(moment(response.list[39].dt_txt).format("DD/MM/YYYY"));
         $("#imgDay5").attr("src", iconUrlD5);
         $(".day5-t").text("Temp: " + (response.list[39].main.temp - 273.15).toFixed(2) + " °C");
         $(".day5-w").text("Wind: " + response.list[39].wind.speed + " KPH");
         $(".day5-h").text("Humidity: " + response.list[39].main.humidity + "%");
      });
      });
    
   }
    weatherToday();

    $('.history-button').on("click", function(event){
        event.preventDefault();
        city= $(this).text();
        console.log(city);
        localStorage.setItem(index, city);
        weatherToday()
        })
   });

    
