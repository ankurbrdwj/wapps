var app = angular.module("app", [])


app.directive(
				"zippy",
				function() {
					return {
						restrict : "E",
						transclude:true,
						scope : {
							title : "@"
						},
						template:'<div>\n <h3 ng-click="toggleContent()">{{title}}</h3>\n'+
						'<div ng-show="isContentVisible" ng-transclude>Hello World </div>\n</div>',
						link:function(scope) {
							scope.isContentVisible=true;
							scope.toggleContent=function(){
							scope.isContentVisible=!scope.isContentVisible;
							}
						}
					}
				})
