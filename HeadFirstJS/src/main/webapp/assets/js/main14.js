/**
 * 
 */
var app=angular.module("twitterApp",[])

app.controller("AppCtrl",function($scope){
	$scope.loadMoreTweets=function(){
		alert("Loading tweets ! . . .");
	}
	
})
app.directive("enter",function(){
	return function(scope,element,attrs) {
		element.bind("mouseenter",function(){
			scope.$apply(attrs.enter);
		})
	}
	}) ;



//app.directive("leave",function(){
//	return function(scope,element) {
//		element.bind("mouseleave",function(){
//			element.removeClass("panel");
//		})
//	}
//	}) ;