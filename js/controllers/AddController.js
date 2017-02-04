angular.module("app")
    .controller('AddController',function($scope, AddService, $state) {
        $scope.reg = {};
        $scope.registration = function(reg) {

            if(typeof (reg.status)== 'undefined' || reg.status== false) {
                reg.status = false;
            }
            else{
                reg.status = true;
            }
           // reg.status = typeof reg.status == ('undefined' || false)?false:true;

            AddService.savereg(reg).then(function(resolve){
                $state.go('app');
            });
        }
}).factory('AddService',function($http,$q) {
        return {
            savereg: function (registers) {
                var deferred = $q.defer();
                return $http.post('http://localhost:8000/register', registers, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
            },

        }
    })