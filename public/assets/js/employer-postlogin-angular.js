var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {


// $http.post('./php/employerDashboard.php')
//                     .success(function(data, status, headers, config) {
//                      // alert(data);
//                             $scope.dashboardData=data;
//                     }).error(function(data, status) { 
//                         alert("Error While Fetching Data,Try Again");
//                     });  
$scope.companyName='Google';
$http({
    url: 'http://nexmorecruiter.mybluemix.net/getCompany', 
    method: "GET"
 }).success(function(data, status, headers, config) {
console.log('company name is');
$scope.companyName=(data);
console.log(data);
if($scope.companyName=='')
	$scope.companyName='Google';



$http({
    url: 'http://nexmorecruiter.mybluemix.net/getCompInfo', 
    method: "GET",
    params:{companyName:$scope.companyName}
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

});