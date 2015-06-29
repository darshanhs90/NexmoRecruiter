var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {
$scope.insights='';

//php request to get data from "listOfNames"
$scope.listOfNames='';
$http.get('http://techrecruit.site40.net/retrieve.php')
                    .success(function(data, status, headers, config) {
                            $scope.listOfNames=data;
                            console.log(data);
                    }).error(function(data, status) { 
                        alert("Error While Fetching Data,Try Again");
                    });  
$scope.getInsights=function($val){
	//get text corresponding to the val and pass the val  
    var val=$val;
   


 $http({
    url: 'http://smarttechruiter.mybluemix.net/personalityInsights', 
    method: "GET",
    params:{val:val}
 }).success(function(data, status, headers, config) {
    //alert(data);
    $scope.insights=data.tree.children;
    $scope.personality=($scope.insights[0].children[0].children);
    $scope.needs=($scope.insights[0].children[0].children);
    $scope.values=($scope.insights[1].children[0].children);
    console.log($scope.needs);
    console.log($scope.values);
    //console.log(data);
});


};
$scope.shortlist=function($val){
	//send shortlist message and email
	//get phone num and email from array corresponding the the val and pass it with custom text
    var number=$scope.listOfNames[$val].pnumber;
    console.log(number);
    var textval='Congrats.You have been shortlisted for a job.';
    
$http({
    url: 'http://smarttechruiter.mybluemix.net/message', 
    method: "GET",
    params:{number:number,textval:textval}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);




 var email=$scope.listOfNames[$val].email;
 var subject='Job Shortlist';
$http({
    url: 'http://smarttechruiter.mybluemix.net/sendMail', 
    method: "GET",
    params:{email:email,textval:textval,subject:subject}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);
 });
 });


};
$scope.offer=function($val){
	//send job offer message,call and email
	//get phone num and email from array corresponding the the val and pass it with custom text

 var number=$scope.listOfNames[$val].pnumber;
    var textval='Congrats.You have been Offered for a job.';
    
$http({
    url: 'http://smarttechruiter.mybluemix.net/message', 
    method: "GET",
    params:{number:number,textval:textval}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);



 
 var email=$scope.listOfNames[$val].email;
 var subject='Job Offer';
$http({
    url: 'http://smarttechruiter.mybluemix.net/sendMail', 
    method: "GET",
    params:{email:email,textval:textval,subject:subject}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);


 var toPhone=$scope.listOfNames[$val].pnumber;
 var url='https://s3-us-west-2.amazonaws.com/hackathonutd/offer.xml';
$http({
    url: 'http://smarttechruiter.mybluemix.net/call', 
    method: "GET",
    params:{toPhone:toPhone,url:url}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);
 });
 });
 });


};






$scope.reject=function($val){
//send job reject email
var email=$scope.listOfNames[$val].email;
 var subject='Job Reject';
$http({
    url: 'http://localhost:1337/sendMail', 
    method: "GET",
    params:{number:number,textval:textval,subject:subject}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);
 });


}




});