var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {


// $http.post('./php/employerDashboard.php')
//                     .success(function(data, status, headers, config) {
//                      // alert(data);
//                             $scope.dashboardData=data;
//                     }).error(function(data, status) { 
//                         alert("Error While Fetching Data,Try Again");
//                     });  

$http({
    url: 'http://smarttechruiter.mybluemix.net/getCompInfo', 
    method: "GET",
    params:{companyName:'Google'}
 }).success(function(data, status, headers, config) {

		console.log(data);  
		if(data!='Invalid Tickr Symbol')
			$scope.stockData=data.query.results.quote;  
		else{
			console.log('The company you have regsitered for is invalid');	
			$scope.stockData='';
		}

		});


});