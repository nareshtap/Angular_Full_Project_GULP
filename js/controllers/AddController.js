angular.module("app")
    .controller('AddController',function($scope, AddService, $state,Upload,$timeout) {
        $scope.reg = {};
        $scope.registration = function(reg) {
            debugger
            alert(reg.image.name);
            var file=reg.image;
            if(typeof (reg.status)== 'undefined' || reg.status== false) {
                reg.status = false;
            }
            else{
                reg.status = true;
            }

           //file.upload = Upload.upload({url: 'http://192.168.200.12:8000/register', data: {'file': file}});


            AddService.savereg(reg).then(function(resolve){
                //$state.go('app');
            });
        }

}).factory('AddService',function($http,$q) {
        return {
            savereg: function (registers) {
                debugger
                var deferred = $q.defer();
                return $http.post('http://192.168.200.12:8000/register', registers, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                })
            }

        }
    })