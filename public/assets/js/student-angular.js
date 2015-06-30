var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {

$scope.email='';
$scope.pwd='';

$scope.login=function(){
	//alert('asd');
	
if($scope.email!='' && $scope.pwd!=''){
$http.post('http://nexruiter.webuda.com/login.php',{
			'email':$scope.email,
			'pwd':$scope.pwd
		})
                    .success(function(data, status, headers, config) {
                      //alert(data);
                     		//$scope.listOfNames=data;
                            console.log(data);
                            if(data!='Unsuccessful Login'){

						$http({
    					url: 'http://nexmorecruiter.mybluemix.net/setCompany', 
    					method: "GET",
    					params:{companyName:data[0].companyname}
 						}).success(function(data, status, headers, config) {
 						
 							console.log(data);
						

 						$http({
    					url: 'http://nexmorecruiter.mybluemix.net/setPhone', 
    					method: "GET",
    					params:{phone:data[0].pnumber}
 						}).success(function(data, status, headers, config) {

 							console.log(data);
                             window.location.replace('./studentPostLogin.html');
						});

                        });






	                            
	                             }
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