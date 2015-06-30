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
                     
                     		//$scope.listOfNames=data;
                            console.log(data);
                             //alert(data);
                            if(data!='Unsuccessful Login'){
                                console.log(data[0].companyname);
                               console.log(data[0].pnumber);
                                 
						$http({
    					url: 'http://nexmorecruiter.mybluemix.net//setCompany', 
    					method: "GET",
    					params:{companyName:data[0].companyname}
 						}).success(function(data, status, headers, config) {
 						
 						

 						$http({
    					url: 'http://nexmorecruiter.mybluemix.net//setPhone', 
    					method: "GET",
    					params:{phone:data[0].pnumber}
 						}).success(function(data, status, headers, config) {

 							console.log(data);
                            window.location.replace('./employerPostLogin.html');
						});   
                        console.log(data);
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