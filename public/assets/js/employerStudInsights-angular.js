var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {
$scope.insights='';
$scope.verified=false;
$scope.verifyshow=false;
$scope.pnum='';
$scope.selectVal=-1;
$scope.globalPhoneNumber='';
$scope.requestId='';
//php request to get data from "listOfNames"
$scope.listOfNames='';
$http.get('http://nexruiter.webuda.com/retrieve.php')
                    .success(function(data, status, headers, config) {
                            $scope.listOfNames=data;
                            console.log(data);
                            $http.get('http://nexmorecruiter.mybluemix.net/getPhone')
                                .success(function(data, status, headers, config) {
                            $scope.globalPhoneNumber=data;
                            console.log(data);
                             }).error(function(data, status) { 
                                 //alert("Error While Fetching Data,Try Again");
                            });  
                    }).error(function(data, status) { 
                        //alert("Error While Fetching Data,Try Again");
                    });  


$scope.verify=function(){
$http({
    url: 'http://nexmorecruiter.mybluemix.net/verifycheck', 
    method: "GET",
    params:{requestId:$scope.requestId,code:$scope.verfncode}
 }).success(function(data, status, headers, config) {
        if(data.status==0){
          $scope.verified=true;
          $scope.offer($scope.selectVal);

            }
        else
            alert('Verification Failed');
});
}




$scope.getInsights=function($val){
	//get text corresponding to the val and pass the val  
    var val=$val;
   


 $http({
    url: 'http://nexmorecruiter.mybluemix.net/personalityInsights', 
    method: "GET",
    params:{val:val}
 }).success(function(data, status, headers, config) {
    //alert(data);
    $scope.insights=data.tree.children;
    console.log($scope.insights);
    $scope.personality=($scope.insights[0].children[0].children);
    $scope.needs=($scope.insights[1].children[0].children);
    $scope.values=($scope.insights[2].children[0].children);
    console.log($scope.personality);
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
    var textval='short';
    
$http({
    url: 'http://nexmorecruiter.mybluemix.net/message', 
    method: "GET",
    params:{number:number,textval:textval}
 }).success(function(data, status, headers, config) {
    alert('Message Sent successfully');
    console.log(data);




 var email=$scope.listOfNames[$val].email;
 var subject='Job Shortlist';
$http({
    url: 'http://nexmorecruiter.mybluemix.net/sendMail', 
    method: "GET",
    params:{email:email,textval:textval,subject:subject}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);
 });
 });


};
$scope.offer=function($val){
    $scope.selectVal=$val;

  

if($scope.verified==true){
 var number=$scope.listOfNames[$val].pnumber;
    var textval='offer';
    
$http({
    url: 'http://nexmorecruiter.mybluemix.net/message', 
    method: "GET",
    params:{number:number,textval:textval}
 }).success(function(data, status, headers, config) {
    alert('Message Sent successfully');
    console.log(data);



 


 var toPhone=$scope.listOfNames[$val].pnumber;
$http({
    url: 'http://nexmorecruiter.mybluemix.net/call', 
    method: "GET",
    params:{number:toPhone,text:textval}
 }).success(function(data, status, headers, config) {
    alert('Student has been successfully Informed by Call');
    console.log(data);
    $scope.verified=false;
 var email=$scope.listOfNames[$val].email;
 var subject='Job Offer';
$http({
    url: 'http://nexmorecruiter.mybluemix.net/sendMail', 
    method: "GET",
    params:{email:email,textval:textval,subject:subject}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);
 });
 });
 });

}
else{
    $http({
    url: 'http://nexmorecruiter.mybluemix.net/verifycode', 
    method: "GET",
    params:{number:$scope.globalPhoneNumber}
 }).success(function(data, status, headers, config) {
    if(data.status==0){
        alert('Verification code on the way,Please verify your identity');
        $scope.requestId=data.request_id;
        $scope.verifyshow=true;
    }
    else
        alert('Couldnot send verification code,Contact the Admin');
 });
}
};






$scope.reject=function($val){
//send job reject email
var email=$scope.listOfNames[$val].email;
 var subject='Job Reject';
$http({
    url: 'http://nexmorecruiter.mybluemix.net/sendMail', 
    method: "GET",
    params:{number:number,textval:textval,subject:subject}
 }).success(function(data, status, headers, config) {
    alert(data);
    console.log(data);
 });


}




});