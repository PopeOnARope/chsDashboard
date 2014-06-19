'use strict';

angular.module('chsdashboardApp.controllers', [])
.controller('AppCtrl', function($scope){
	$scope.name="module"
})

.controller('WeatherCtrl', function($scope, WeatherFactory){
	var locations='Folly+%20Beach'
	WeatherFactory.async(locations).then(function(data) {
		// console.log(data);
		var temp = data.data.main.temp/10*9/5 + 32;
		$scope.temp = Math.floor(temp);
		// console.log($scope.temp)
		// console.log(data.data)
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
	$scope.styleSomeShit = function(styleBG) {
		var test = {'background-image': "url('http://www.bandsintown.com/" + styleBG.artists[0].name + "/photo/large.jpg')"}

		console.log(test);
		return test;
	}
	EventsFactory.async().then(function(data){

		$scope.events = data.data;

		console.log($scope.events);
		var eventId = Number($routeParams.id);
		// console.log($scope.events[0].id);

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
	});
})

.controller('RestaurantsCtrl', function($scope, $routeParams, $window, SafetyFactory){
	$scope.window=$window;
	$scope.restaurants=SafetyFactory.getAll();
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
	//}
	// ); 
});	
