angular.module("app")
    .controller('GetController',function($scope, GetService, $state,$rootScope,$uibModal) {
        $scope.record=[];

    $scope.saves=function (users){

        $rootScope.userDetails = users;

        var modalInstance = $uibModal.open({
            templateUrl:'app/update.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                users: function () {
                    return users;
                }
            }
        });
       modalInstance.result.then(function(result){
           var match = _.find($scope.record, function(item) { return item._id == result._id })
           if (match) {
               match.name=result.name;
               match.state=result.state;
               match.city=result.city;
               match.gender=result.gender;
           }
       });

    };

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