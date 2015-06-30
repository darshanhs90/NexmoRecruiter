var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http) {

$scope.fname='';
$scope.lname='';
$scope.email='';
$scope.pwd='';
$scope.phone='';
$scope.slct='';
$scope.univ='';
$scope.comp='';
$scope.verfn='';
$scope.verified=false;
$scope.requestId='';
$scope.subscribe='Subscribe to Employer Updates';

$scope.sender=function(){
//alert('sender');
$http({
    url: 'http://nexmorecruiter.mybluemix.net/verifycode', 
    method: "GET",
    params:{number:$scope.phone}
 }).success(function(data, status, headers, config) {
 	var res=(data);
 	console.log(res);
 	if(res.status==0)
 	{
 		alert('Verification code is on the way');
 		$scope.requestId=data.request_id;
 	}
 	else{
 		alert('Invalid Phone number');
 	}
	});

};








$scope.verify=function(){
	console.log($scope.requestId);
$http({
    url: 'http://nexmorecruiter.mybluemix.net/verifycheck', 
    method: "GET",
    params:{requestId:$scope.requestId,code:$scope.verfn}
 }).success(function(data, status, headers, config) {
 	var res=(data);
 	console.log(res);
 	if(res.status==0)
 	{
 		$scope.verified=true;
 		alert('Verification Successful')
 	}
 	else{
 		alert('Invalid Verification code');
 	}
	});
};


console.log($scope.slct);
	$scope.submit=function(){

if($scope.verified==true){

if($scope.slct==''){
	alert('All Fields mandatory for Registering');
}
else if($scope.slct=='Student')
{
	if($scope.univ!='' && $scope.fname!='' && $scope.lname!='' && $scope.email!='' && $scope.pwd!='' && $scope.phone!='')
	{
		//post request here	
		//alert('here');
		//alert($scope.email);
		//alert($scope.pwd);
		if($scope.subscribe=='Subscribe to Employer Updates')
			$scope.valSub='1';
		else
			$scope.valSub='0';
		
		$http.post('http://nexruiter.webuda.com/registeribm.php',{
			'fname':$scope.fname,
			'lname':$scope.lname,
			'pnumber':$scope.phone,
			'univname':$scope.univ,
			'stud_rec':'1',
			'email':$scope.email,
			'pwd':$scope.pwd,
			'companyname':'',
			'sub':$scope.valSub	
		})
                    .success(function(data, status, headers, config) {
                      alert(data);
                      //set emailId

                      $http({
    					url: 'http://nexmorecruiter.mybluemix.net/setEmail', 
    					method: "GET",
    					params:{email:$scope.email}
 						}).success(function(data, status, headers, config) {
 							console.log(data);
						});

                      //set phonenumber

                      $http({
    					url: 'http://nexmorecruiter.mybluemix.net/setPhone', 
    					method: "GET",
    					params:{phone:$scope.phone}
 						}).success(function(data, status, headers, config) {
 							console.log(data);
						});



                            console.log(data);
                    }).error(function(data, status) { 
                        alert("Error While Registering ,Try Again Later");
                    });  
	}
	else{
		alert('All Fields mandatory for Registering');
	}


}
else if($scope.slct=='Recruiter')
{
	if($scope.comp!='' && $scope.fname!='' && $scope.lname!='' && $scope.email!='' &&$scope.pwd!='' && $scope.phone!='')
	{
		$http.post('http://nexruiter.webuda.com/registeribm.php',{
			'fname':$scope.fname,
			'lname':$scope.lname,
			'pnumber':$scope.phone,
			'univname':$scope.univ,
			'stud_rec':'0',
			'email':$scope.email,
			'pwd':$scope.pwd,
			'companyname':$scope.comp	,
			'sub':'0'	
		})
                    .success(function(data, status, headers, config) {
                      alert(data);
                      $http({
    url: 'http://nexruiter.webuda.com/retrieve_sub.php', 
    method: "GET",
    }).success(function(data, status, headers, config) {
    	$scope.listOfSubscribers=data;
    	for (var i = 0; i <data.length; i++) {
    		
 						$http({
    					url: 'http://nexmorecruiter.mybluemix.net/message1', 
    					method: "GET",
    					params:{number:$scope.listOfSubscribers[i].pnumber,text:$scope.comp}
 						}).success(function(data, status, headers, config) {
 							console.log(data);
						});
 					}

 		});
                       //set emailId
                      $http({
    					url: 'http://nexmorecruiter.mybluemix.net/setEmail', 
    					method: "GET",
    					params:{email:$scope.email}
 						}).success(function(data, status, headers, config) {
 							console.log(data);
						});

                      //set phonenumber

                      $http({
    					url: 'http://nexmorecruiter.mybluemix.net/setPhone', 
    					method: "GET",
    					params:{phone:$scope.phone}
 						}).success(function(data, status, headers, config) {
 							console.log(data);
						});

 						//set companyname
 						$http({
    					url: 'http://nexmorecruiter.mybluemix.net/setCompany', 
    					method: "GET",
    					params:{companyName:$scope.comp}
 						}).success(function(data, status, headers, config) {
 							console.log(data);
						});

                            console.log(data);
                    }).error(function(data, status) { 
                        alert("Error While Registering ,Try Again Later");
                    }); 
	}
	else{
		alert('All Fields mandatory for Registering');
	}


}
else{
	alert('All Fields mandatory For registering');
}
}
else{
	alert('Phone number not verified');
}



	};

});