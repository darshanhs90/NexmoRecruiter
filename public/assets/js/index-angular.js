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

console.log($scope.slct);
	$scope.submit=function(){
if($scope.slct==''){
	alert('All Fields mandatory for Registering');
}
else if($scope.slct=='Student')
{
	if($scope.univ!='' && $scope.fname!='' && $scope.lname!='' && $scope.email!='' && $scope.pwd!='' && $scope.phone!='')
	{
		//post request here	
		alert('here');
		alert($scope.email);
		alert($scope.pwd);
		
		$http.post('http://techrecruit.site40.net/registeribm.php',{
			'fname':$scope.fname,
			'lname':$scope.lname,
			'pnumber':$scope.phone,
			'univname':$scope.univ,
			'stud_rec':'1',
			'email':$scope.email,
			'pwd':$scope.pwd,
			'companyname':''	
		})
                    .success(function(data, status, headers, config) {
                      alert(data);
                     		//$scope.listOfNames=data;
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
		$http.post('http://techrecruit.site40.net/registeribm.php',{
			'fname':$scope.fname,
			'lname':$scope.lname,
			'pnumber':$scope.phone,
			'univname':$scope.univ,
			'stud_rec':'0',
			'email':$scope.email,
			'pwd':$scope.pwd,
			'companyname':''	
		})
                    .success(function(data, status, headers, config) {
                      alert(data);
                     		//$scope.listOfNames=data;
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




	};

});