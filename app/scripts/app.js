'use strict';

angular
  .module('chsdashboardApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'chsdashboardApp.controllers',
    'chsdashboardApp.services',
    'ui.utils'
    ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/restaurant-detail/:factual_id', {
        templateUrl: 'views/restaurant-detail.html',
        controller: 'RestaurantsCtrl'
      })
      .when('/event-detail/:id',{
        templateUrl: 'views/event-detail.html',
        controller: 'EventsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
