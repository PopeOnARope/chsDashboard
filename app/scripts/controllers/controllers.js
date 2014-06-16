'use strict';

angular.module('chsdashboardApp.controllers', [])
.controller('AppCtrl', function($scope){
	$scope.name="module"
})

.controller('WeatherCtrl', function($scope, WeatherFactory){
	var locations='Folly+%20Beach'
	WeatherFactory.async(locations).then(function(data) {
		console.log(data);
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

.controller('RestaurantsCtrl', function($scope, RestaurantsFactory, $routeParams, $window){
	var cuisine;
	$scope.window=$window;
	RestaurantsFactory.async().then(function(data){
		$scope.restaurants = data.data.response.data;
		console.log($scope.restaurants)
		var id=({ id: $routeParams.factual_id }).id;
		console.log("id="+id)

		var find=function(id, arr){
			var i;
			var selected;
			for(i=0; i<arr.length; i++){
				if(id===arr[i].factual_id){
				selected=arr[i];
				}		
			}
			return selected;
			console.log("selected="+selected);
		}
		$scope.restaurant=find(id, $scope.restaurants);
		console.log($scope.restaurant);

		var score=function(n, star){
			var i;
			var markup;
			for(i=0;i<n;i++){
				markup+=star
			}
			return markup;
		};
		var stars='<span class="glyphicon glyphicon-star"></span>'
		var ResScore=score($scope.restaurant.rating, stars);
		console.log(ResScore);
		$("#rating").html(ResScore);

		});

		});	



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
	