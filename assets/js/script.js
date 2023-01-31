
   //assigns 0 to var index
   var index = 0;  
   //every time the search button is clicked , assign the value of search input to a new var 
   //duplicates the search-button, adds classes and adds "city" as text to it and appends it to the div element with id history.
   $("#search-button").on("click", function (event) {
   event.preventDefault();
   var city=$("#search-input").val();
   $("#search-button").clone().appendTo("#history").addClass('history-button bg-light w-100 btn mt-3 text-dark').text(city);
   //gets the value of 'city' and sets it in LocalStorage with key Index
   localStorage.setItem(index, $('.history-button').text());

//This  function will trigger the AJAX call, get values from object and logging the responses to elements/ new elements
function weatherToday(){
   //constructs the URL by adding the chosen city to it
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&limit=5&appid=f77b11b08e40dc9c363bd82623c07c7f" 
// Performing GET requests to the openweathermap API 
$.ajax({  
    url: queryURL,
    method: "GET"
    //then assignes the responses for lat and lon to new vars and adds them in localStorage , with Index based keys
  }).then(function(response) {
     var lat = response.coord.lat;
     var lon = response.coord.lon;
     localStorage.setItem(index+1, lat);
     localStorage.setItem(index+2, lon);
     //then reconstructs the link with lat and lon instead of city to reach data for 5 days forecast 
   }).then(function(){
   var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?" + 
   "lat=" + localStorage.getItem(index+1) + 
   "&lon=" + localStorage.getItem(index+2) + 
   "&limit=5&appid=f77b11b08e40dc9c363bd82623c07c7f" 
   $.ajax({  
       url: queryURL2,
       method: "GET"
     }).then(function(response) {
      // removes all items from local storage to prevent multiple city results
         localStorage.clear();
         //assign response value to variable iconCode, to get the code for image
         var iconCode = response.list[0].weather[0].icon;
         //constructs the img URL by adding the iconCode
         var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
         //shows current date
         var now = moment().format("DD/MM/YYYY");
         //Create elements containing data from the AJAX response object
         //repeats 5 more times to add the same for each card
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
   //call the function
    weatherToday();
   //function to show the data from previous search.
    $('.history-button').on("click", function(event){
        event.preventDefault();
        //using this will triger the function for the current button only
        city= $(this).text();
        localStorage.setItem(index, city);
        weatherToday()
        })
   });

    
