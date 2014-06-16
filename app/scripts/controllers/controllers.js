'use strict';

angular.module('chsdashboardApp.controllers', [])
.controller('AppCtrl', function($scope){
	$scope.name="module"
})

.controller('WeatherCtrl', function($scope, WeatherFactory){
	var locations='Folly+%20Beach'
	WeatherFactory.async(locations).then(function(data) {
		var temp = data.data.main.temp/10*9/5 + 32;
		$scope.temp = Math.floor(temp);
		console.log($scope.temp)
		console.log(data.data)
		$scope.icon = data.data.weather[0].icon
		$scope.name=data.data.name
	});
})

.controller('EventsCtrl', function($scope, EventsFactory){
	EventsFactory.async().then(function(data){
		$scope.events = data.data;
		console.log($scope.events)

	});
})

.controller('RestaurantsCtrl', function($scope, RestaurantsFactory, $routeParams){
	var cuisine;
	RestaurantsFactory.async().then(function(data){
		$scope.restaurants = data.data.response.data;
		console.log($scope.restaurants)
		var find = function(id, restArray) {
		var i;
		var selected;
		for(i=0; i<restArray.length; i++){
			if(id === restArray[i].factual_id){
				selected = restArray[i];
			}
		}
		return selected;
		}
		var id=$routeParams;
		$scope.restaurant=RestaurantsFactory.find(id, $scope.restraurants)
		});	
})



		// $scope.restaurant = RestaurantsFactory.find({ id: $routeParams.id })
		// var find = function(id, restArray) {
		// 	var selected;
		// 	for(var i=0; i<restArray.length; i++) {
		// 		if(id === restArray[i].factual_id) {
		// 			selected = restArray[i];
		// 		}
		// 	}
		// 	return selected;

		// }
	