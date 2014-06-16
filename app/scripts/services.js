'use strict';

angular.module('chsdashboardApp.services', [])

.factory('WeatherFactory', function($http){
	var weatherPromise;
	 return {
		async: function(city) {
			weatherPromise = $http.jsonp('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',SC&callback=JSON_CALLBACK').then(function(data){
				return data;	
			});
			return weatherPromise;
			
		}
	};
})


.factory('EventsFactory', function($http){
	var eventsPromise;
	 return{
	 	async: function() {
	 		eventsPromise = $http.jsonp('http://api.bandsintown.com/events/search?location=Charleston,SC&radius=10&format=json&app_id=CHSdashboard&callback=JSON_CALLBACK').then(function(data){
	 			return data;
	 		});
	 		return eventsPromise;
	 	}
	};

})

.factory('RestaurantsFactory', function($http){
	var restaurantsPromise;
	 return{
		async: function(lat, lon, cuisine){
			restaurantsPromise = $http.get('http://api.v3.factual.com/t/restaurants-us?geo={"$circle":{"$center":[34.06021,-118.41828],"$meters": 5000}}&KEY=9McuJvuaxUh6XiYFFG2g1tUkcZM9eFd5GHTpKNID').then(function(response){
					return response;
				})
			return restaurantsPromise;
		}
	};
});
