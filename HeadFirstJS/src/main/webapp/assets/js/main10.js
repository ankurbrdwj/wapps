/**
 * 
 */
var app=angular.module("superhero",[]);

app.directive("superman",function(){
	
	return{
		
	restrict:"C",
//	template:"<div>Here I am to save the day</div>"
	link:function(){
		alert("I AM Working !")
	}
	}
	})