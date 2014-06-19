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
	 		eventsPromise = $http.jsonp('http://api.bandsintown.com/events/search?location=Charleston,SC&limit=75&radius=12&format=json&app_id=CHSdashboard&callback=JSON_CALLBACK').then(function(data){
	 			return data;
	 		});
	 		return eventsPromise;
	 	}
	};

})

// .factory('RestaurantsFactory', function($http){
// 	var restaurantsPromise;
// 	 return{
// 		async: function(){
// 			restaurantsPromise = $http.get('http://api.v3.factual.com/t/restaurants-us?geo={"$circle":{"$center":[32.781041, -79.931725],"$meters": 1000}}&limit=50&KEY=UB7s5HMDg9g3ugaIhDTSKiOEsOfcVcd8WteJyJLO').then(function(response){
// 					return response;
// 				})
// 			return restaurantsPromise;
// 		}
// 	};
// });
