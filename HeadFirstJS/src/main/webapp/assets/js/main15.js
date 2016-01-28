/**
 * 
 */
var app = angular.module("superApp", [])

app.directive("superhero", function() {
	return {
		restrict : "E",
		controller : function($scope) {
			scope.abilities = []

			this.addStrength = function() {
				$scope.abilities.push("strength")
			}
			this.addSpeed = function() {
				$scope.abilities.push("speed")
			}

			this.addFlight = function() {
				$scope.abilities.push("flight")
			}
		},
		link : function(scope, element) {
			element.bind("mouseenter", function() {
				element.addClass("button")
					console.log(scope.abilities);
			})
		}
	}
	var rootEle = document.querySelector("html");
	var ele = angular.element(rootEle);
	console.log(ele);
	var scope=ele.scope();
	console.log(scope.id);
	
}); 	 	
app.directive("strength",function(){
	return{
		require:"superhero",
		link:function(scope,element,attrs,superheroCtrl){
		superheroCtrl.addStrength();
	}
	}
})
app.directive("speed",function(){
	return{
		require:"superhero",
		link:function(scope,element,attrs,superheroCtrl){
		superheroCtrl.addSpeed();
	}
	}
})
app.directive("flight",function(){
	return{
		require:"superhero",
		link:function(scope,element,attrs,superheroCtrl){
		superheroCtrl.addFlight();
	}
	}
})

// app.directive("leave",function(){
// return function(scope,element) {
// element.bind("mouseleave",function(){
// element.removeClass("panel");
//		})
//	}
//	}) ;