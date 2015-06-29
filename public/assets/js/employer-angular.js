var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {



$scope.email='';
$scope.pwd='';

$scope.login=function(){
	//alert('asd');
	
if($scope.email!='' && $scope.pwd!=''){
$http.post('http://techrecruit.site40.net/login.php',{
			'email':$scope.email,
			'pwd':$scope.pwd
		})
                    .success(function(data, status, headers, config) {
                      alert(data);
                     		//$scope.listOfNames=data;
                            console.log(data);
                            if(data=='Login Successful')
	                             window.location.replace('./employerPostLogin.html');
	                         else
	                         	alert('Bad Credentials');
                    }).error(function(data, status) { 
                        alert("Error While Logging In ,Try Again Later");
                    });  
}
else{
	alert('Fields are Mandatory');
}
}


});