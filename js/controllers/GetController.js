angular.module("app")
    .controller('GetController',function($scope, GetService, $state,$rootScope,$uibModal) {
        $scope.record=[];

    $scope.getusers = function () {

        GetService.getData(function (response) {
            $scope.record = response.data;
        });
    }
    $scope.getusers();

}).factory('GetService',function($http,$q) {

    var reg=[];
    return {
        getuser:function(callback){
            callback(reg);
        },
        getData:function(callback){

            $http.get('http://192.168.200.12:8000/register').then(function(resp) {
                debugger
                callback(resp);
            });

        }
    }
})