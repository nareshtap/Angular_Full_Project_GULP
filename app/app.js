angular.module("app")
    .controller('Dropdownctrl',function($http,$scope, Dropservice) {
        $scope.states = [];
        $scope.getStates = function () {
            Dropservice.getStates(function (response) {
                    $scope.states = response.data;
            });
        }
        $scope.getStates();

        $scope.cities=[];
        $scope.getcities=function(){
            Dropservice.getcity($scope.reg.state,function(response){
               $scope.cities=response.data;
            });
        }

    }).factory('Dropservice',function($http,$q) {
        var service={};
        service.getStates=function(callback){
             $http.get('http://192.168.200.12:8000/state').then(function(resp) {
                 debugger
              callback(resp);
            });

        };

    service.getcity=function(id,callback){
        $http.get('http://192.168.200.12:8000/city/'+id).then(function(resp) {
            callback(resp);
        });
    };
        return service;
});




