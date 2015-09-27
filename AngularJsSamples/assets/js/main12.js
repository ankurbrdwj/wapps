var app = angular.module("behaviorApp", []);


var app = angular.module("behaviorApp", []);
 app.directive("enter" , function () {
 return function (scope , element ) {
     element.bind("mouseenter", function () {
                  console.log('I Am inside of You');
 })
 }
 })
app.directive("leave", function(){
    return function(scope, element){
    element.bind("mouseleave",function(){
    console.log("I am leaving on a jet!");
    })
    }
})
