var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {



//get listOfNames from table

$http.get('http://techrecruit.site40.net/rec_retrieve.php')
                    .success(function(data, status, headers, config) {
                            $scope.listOfNames=data;
                            console.log(data);
                    }).error(function(data, status) { 
                        alert("Error While Fetching Data,Try Again");
                    });  



/*$http({
    url: 'http://smarttechruiter.mybluemix.net/call', 
    method: "GET"
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);
 });



 $http({
    url: 'http://smarttechruiter.mybluemix.net/message', 
    method: "GET"
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);
 });*/

});