'use strict';

angular.module('chsdashboardApp.controllers', [])
.controller('AppCtrl', function($scope){
	$scope.name="module"
})

.controller('WeatherCtrl', function($scope, WeatherFactory){
	WeatherFactory.async().then(function(data) {
		$scope.weather = data;
		console.log($scope.weather)
	});
})

.controller('EventsCtrl', function($scope, EventsFactory){
	EventsFactory.async().then(function(data){
		$scope.events = data.data;
		console.log($scope.events)

	});
})

// .controller('ImgCtrl', function($scope, ImgFactory))

.controller('RestaurantsCtrl', function($scope, RestaurantsFactory){
	RestaurantsFactory.async().then(function(data){
		$scope.restaurants = data.data.response.data;
		console.log($scope.restaurants)
	});	
})
