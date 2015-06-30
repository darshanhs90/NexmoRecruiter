var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {

$scope.email='';
$scope.recorder=false;
$scope.count==0;
$scope.answerer=false;

$scope.txtarea="Enter your response with atleast a minimum of 150 words....";
$scope.phoneNum='';



$scope.recordVoice=function(){
$scope.recorder=true;
$scope.answerer=false;
};

$scope.answerText=function(){
$scope.recorder=false;
$scope.answerer=true;
var val=Math.ceil(10*Math.random());
console.log(val);
$http({
    url: 'http://nexmorecruiter.mybluemix.net/call', 
    method: "GET",
    params:{number:$scope.phoneNum,qnnumber:val,text:'asd'}
 }).success(function(data, status, headers, config) {
    console.log(data);
    $scope.count=$scope.count+1;
    });




};



$http.get('http://nexmorecruiter.mybluemix.net/getPhone')
                    .success(function(data, status, headers, config) {
                      $scope.phoneNum=data;
                      console.log($scope.phoneNum);
                    }).error(function(data, status) { 
                        alert("Error While Logging In ,Try Again Later");
                    });  




$scope.submitfn=function(){
$scope.showqn=false;
var val=Math.ceil(10*Math.random());
console.log(val);
$http({
    url: 'http://nexmorecruiter.mybluemix.net/call', 
    method: "GET",
    params:{number:$scope.phoneNum,qnnumber:val,text:'asd'}
 }).success(function(data, status, headers, config) {
    console.log(data);
    $scope.count=$scope.count+1;
    if($scope.count==3)
      $scope.bnsubmit.disabled=true
    });
   
}


});