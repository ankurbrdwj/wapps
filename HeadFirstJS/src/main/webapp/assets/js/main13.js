/**
 * 
 */
var app=angular.module("behaviorApp",[])

app.directive("enter",function(){
	return function(scope,element) {
		element.bind("mouseenter",function(){
			element.addClass("panel");
		})
	}
	}) ;
app.directive("leave",function(){
	return function(scope,element) {
		element.bind("mouseleave",function(){
			element.removeClass("panel");
		})
	}
	}) ;