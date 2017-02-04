angular.module('app')
    .controller('dialogController',function($scope, $state,$rootScope,$uibModal) {
        $scope.update=function (users){

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

    })