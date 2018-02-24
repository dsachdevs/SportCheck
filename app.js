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

	.when('/football/fixtures', {
		templateUrl: 'pages/football-fixtures.html',
		controller: 'footballFixtureCntrl'
	})

	.when('/football/leagueTable', {
		templateUrl: 'pages/football-table.html',
		controller: 'footballTableCntrl'
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

weatherApp.service('footballApiInfo', ['$resource',function($resource){
	let apiobj = {
			'api': 'http://api.football-data.org/v1/competitions/448/fixtures', 
			'parms': {
					// 'X-Response-Control': 'full', 
					// 'season': '2017'
					}  
				}

	this.setFootballApi = function(api, parms){
								apiobj.api = api;
								apiobj.parms = parms;
							};

	this.getApi = function() {return apiobj.api;};
	this.getParms = function(){return apiobj.parms;};

	// this.api = 'http://api.football-data.org/v1/competitions';
	// this.params = {'X-Response-Control': 'full', 'season': '2017'};

	this.callApi = function(){

		let footballJson = {data:"",error:"",errSts:""};

		$resource(apiobj.api, apiobj.parms, {
		    get: {
		        method: 'GET', isArray:false,
		        headers: { 'X-Auth-Token': '808625d132fb4028bf844b2b242fda0c' }
		   		 }}).get(
							function(data) {
							footballJson.data = data;}, 
							function(response) {
	          				footballJson.error = response.data || ' Request failed ';
	          				footballJson.errSts = response.status;}	
        				);

        return footballJson;
		}
	
}]);


weatherApp.controller('footballCntrl', ['$scope', '$resource', 'footballApiInfo', function($scope, $resource, footballApiInfo) {
	
	$scope.footballApi= $resource('http://api.football-data.org/v1/competitions', { 'X-Response-Control': 'full', 'season': '2017'}, {
		    get: {
		        method: 'GET', isArray:true,
		        headers: { 'X-Auth-Token': '808625d132fb4028bf844b2b242fda0c' 
		    	}
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


	$scope.setFootballApi = footballApiInfo.setFootballApi;

	// $scope.setFootballApi =function(api, parms){
	// 							footballApiInfo.api = api;
	// 							footballApiInfo.parms = parms;
	// 							console.log(footballApiInfo.api);
	// 							console.log(footballApiInfo.parms);
	// 						};

}]);


weatherApp.controller('footballTeamCntrl', ['$scope', '$resource', 'footballApiInfo', function($scope, $resource, footballApiInfo) {
	
	
	// $scope.footballApi= $resource(footballApiInfo.getApi(), footballApiInfo.getParms(), {
 //    get: {
 //        method: 'GET', isArray:false,
 //        headers: { 'X-Auth-Token': '808625d132fb4028bf844b2b242fda0c' }
 //    	}
	// });

	// $scope.footballApi.get(

	// 		function(data) {
	// 			$scope.footballJson = {'data': data };
	// 			console.log($scope.footballJson);
	// 		}, 

	// 		function(response) {
	//           $scope.data = response.data || 'Request failed';
	//           $scope.status = response.status;
	//           console.log($scope.data);
	//           console.log(response);
 //      		}
 //        );

	// console.log("****************************************");

	$scope.footballJson = footballApiInfo.callApi();
	
	if ($scope.footballJson.error !== "") {
		console.log($scope.footballJson.error);
		console.log($scope.footballJson.errSts);
	}


}]);

weatherApp.controller('footballFixtureCntrl', ['$scope', '$resource', 'footballApiInfo', function($scope, $resource, footballApiInfo) {

	$scope.footballJson = footballApiInfo.callApi();
		console.log($scope.footballJson);
	
	if ($scope.footballJson.error !== "") {
		console.log($scope.footballJson.error);
		console.log($scope.footballJson.errSts);
	}

    $scope.accordion = {
      current: null
    };


}]);

weatherApp.controller('footballTableCntrl', ['$scope', '$resource', 'footballApiInfo', function($scope, $resource, footballApiInfo) {

	$scope.footballJson = footballApiInfo.callApi();

	
	if ($scope.footballJson.error !== "") {
		console.log($scope.footballJson.error);
		console.log($scope.footballJson.errSts);
	}


}]);


