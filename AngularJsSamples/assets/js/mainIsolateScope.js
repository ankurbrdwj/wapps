var app = angular.module('choreApp', []);

app.controller("ChoreCtrl", function () {
    $scope.logChore = function (chore) {
        alert(chore + "  is Done !");
    }
});

app.directive("kid", function(){
return{
restrict: "E",
    scope:{
    done: "&"
    },
    template: '<input type="text" ng-model="chore">' +
    ' {{chore}}' +
    '<div class="button" ng-click="done({chore:chore})">I M Done!</div>'
}
});
