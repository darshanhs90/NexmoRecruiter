var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {

$scope.email='';
$scope.recorder=false;
$scope.answerer=false;
$scope.txtarea="Enter your response with atleast a minimum of 150 words....";
$scope.recordVoice=function(){
$scope.recorder=true;
$scope.answerer=false;
};

$scope.answerText=function(){
$scope.recorder=false;
$scope.answerer=true;
};


$scope.submitfn=function(){
alert('submit');
$http.post('http://techrecruit.site40.net/updateval.php',{
			'email':$scope.email,
			'rec_data':$scope.txtarea
		})
                    .success(function(data, status, headers, config) {
                      //alert(data);
                     	alert('Successful Update');	
                    }).error(function(data, status) { 
                        alert("Error While Logging In ,Try Again Later");
                    });  
                }
});