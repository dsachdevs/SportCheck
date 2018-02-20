var weatherApp = angular.module('weatherApp', ['ngRoute','ngResource']);

// weatherApp.config(['$qProvider', function ($qProvider) {
//     $qProvider.errorOnUnhandledRejections(false);
// }]);


weatherApp.config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when('/football',{
		templateUrl: 'pages/football.html',
		controller: 'footballCntrl'
	})

	.when('/football/teams',{
		templateUrl: 'pages/football-teams.html',
		controller: 'footballTeamCntrl'
	})
	.when('/cricket',{
		templateUrl: 'pages/cricket.html',
		controller: 'cricketCntrl'

	})

	.when('/hockey', {
		templateUrl: 'pages/hockey.html',
		controller: 'hockeyCntrl'

	})
}]);

weatherApp.service('footballApiInfo', function(){
	this.api = 'http://api.football-data.org/v1/competitions';
	this.params = {'X-Response-Control': 'full', 'season': '2017'};
});

weatherApp.controller('footballCntrl', ['$scope', '$resource', 'footballApiInfo', function($scope, $resource, footballApiInfo) {
	
	// $scope.footballApi= $resource('http://api.football-data.org/v1/competitions', { 'X-Response-Control': 'full', 'season': '2017', 'X-Auth-Token':'808625d132fb4028bf844b2b242fda0c' } );

	$scope.footballApi= $resource('http://api.football-data.org/v1/competitions', { 'X-Response-Control': 'full', 'season': '2017'}, {
    get: {
        method: 'GET', isArray:true,
        headers: { 'X-Auth-Token': '808625d132fb4028bf844b2b242fda0c' }
    	}
	});
	// console.log($scope.footballApi);
	console.log('HEREEEEEEEEE');
	// $scope.footballJson = $scope.footballApi.get(function() { });
	var temp = $scope.footballApi.get(

			function(data) {
				$scope.footballJson = {'data': data };
				console.log($scope.footballJson);
			}, 

			function(response) {
	          $scope.data = response.data || 'Request failed';
	          $scope.status = response.status;
	          console.log($scope.data);
	          console.log(response);
      		}
        );

	$scope.setFootballApi =function(api, parms){
								footballApiInfo.api = api;
								footballApiInfo.parms = parms;
								console.log(footballApiInfo.api);
								console.log(footballApiInfo.parms);
							};

}]);


weatherApp.controller('footballTeamCntrl', ['$scope', '$resource', 'footballApiInfo', function($scope, $resource, footballApiInfo) {
	
console.log('Inside the foorlball team controller baby');
	
	$scope.footballApi= $resource(footballApiInfo.api, footballApiInfo.parms, {
    get: {
        method: 'GET', isArray:false,
        headers: { 'X-Auth-Token': '808625d132fb4028bf844b2b242fda0c' }
    	}
	});

	var temp = $scope.footballApi.get(

			function(data) {
				$scope.footballJson = {'data': data };
				console.log($scope.footballJson);
			}, 

			function(response) {
	          $scope.data = response.data || 'Request failed';
	          $scope.status = response.status;
	          console.log($scope.data);
	          console.log(response);
      		}
        );

}]);




