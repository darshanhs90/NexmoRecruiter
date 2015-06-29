var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {


$scope.stockData='';
//get listOfNames from table
$scope.showInsights=false;
$scope.srchr=function(){
var companyName=$scope.srch;


$http({
    url: 'http://smarttechruiter.mybluemix.net/getCompInfo', 
    method: "GET",
    params:{companyName:companyName}
 }).success(function(data, status, headers, config) {

		console.log(data);  
		if(data!='Invalid Tickr Symbol'){
			$scope.stockData=data.query.results.quote;  

		$http({
    url: 'http://localhost:1337/twitterCompanySentiment', 
    method: "GET",
    params:{companyName:companyName}
 }).success(function(data, status, headers, config) {
 	console.log(data);
 			$scope.total=data;
 			if($scope.total<0)
 				$scope.total=Math.Random();
		});
}
		else{
			$scope.showInsights=true;
			alert('The company you have registered for is invalid');	
			$scope.stockData='';
		}




});




	//	});



};

});