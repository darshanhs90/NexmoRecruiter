var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$location,$http) {



//get listOfNames from table
$scope.compData='';
var address=''
$scope.showInsights=false;
$scope.srchr=function(){
var companyName=$scope.srch;

$http({
    url: 'http://smarttechruiter.mybluemix.net/companyInfo', 
    method: "GET",
    params:{companyName:companyName}
 }).success(function(data, status, headers, config) {
    //alert(data);
    console.log(data);
    $scope.compData=data;
    $scope.profs=data.socialProfiles;

address=data.organization.contactInfo.addresses[0].addressLine1+' '+data.organization.contactInfo.addresses[0].locality+' '+data.organization.contactInfo.addresses[0].region.name;
address+=data.organization.contactInfo.addresses[0].country.name+' '+data.organization.contactInfo.addresses[0].postalCode;


 var map = new google.maps.Map(document.getElementById('map'), { 
       mapTypeId: google.maps.MapTypeId.TERRAIN,
       zoom: 12
   });

   var geocoder = new google.maps.Geocoder();

   geocoder.geocode({
      'address': address
   }, 
   function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
         new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
         });
         map.setCenter(results[0].geometry.location);
      }
      else {
         // Google couldn't geocode this request. Handle appropriately.
      }
   });
 });



};



});