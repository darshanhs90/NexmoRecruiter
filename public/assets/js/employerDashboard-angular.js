var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {
// var x=require("global.js");
// x.temp=100;

//php request to get data from "listOfNames"

$http.get('http://techrecruit.site40.net/retrieve.php')
                    .success(function(data, status, headers, config) {
                      //alert(data);
                     		$scope.listOfNames=data;
                            console.log(data);
                    }).error(function(data, status) { 
                        alert("Error While Fetching Data,Try Again");
                    });  

});