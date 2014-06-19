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

.controller('EventsCtrl', function($scope, EventsFactory, $routeParams){
	// $scope.window=$window;
	$scope.map={
		zoom: 8,
		draggable: true
		};

	EventsFactory.async().then(function(data){

		$scope.events = data.data;
		console.log($scope.events);
		var eventId = Number($routeParams.id);
		console.log($scope.events[0].id);

		var findEvent=function(id, arr){
			var i;
			var selected;
			for(i=0; i<arr.length; i++){
				
				if(eventId === arr[i].id){
				selected=arr[i];
				}		
			}
			return selected;
		}
		$scope.$watch('map', function(){
			console.log("$watch fired")
		})
		$scope.event= findEvent(eventId, $scope.events);
		$scope.map = {
			center:{
				latitude: $scope.event.venue.latitude,
				longitude: $scope.event.venue.longitude
			},
			marker:{
				latitude: $scope.event.venue.latitude,
				longitude: $scope.event.venue.longitude
			}
		}
		console.log("marker is ", $scope.map.marker)
		console.log($scope.event);
	});
})

.controller('RestaurantsCtrl', function($scope, RestaurantsFactory, $routeParams, geolocation, $window){
	var cuisine;
	$scope.window=$window;
	// $scope.currentPosition = {
	// lat: 0,
	// lon: 0
	// };

		// geolocation.getLocation().then(function(position){
		// 	$scope.currentPosition = {
		// 		lat: position.coords.latitude,
		// 		lon: position.coords.longitude
		// 		};
		// });

	// $scope.$watch('currentPosition', function() {
	// 	console.log($scope.currentPosition);
	// 	console.log('position changed!');

		// RestaurantsFactory.async($scope.currentPosition.lat, $scope.currentPosition.lon).then(function(data){
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
	//}
	// ); 
});	
