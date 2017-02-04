// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
    .module('app', [
        'ui.router',
        'ui.bootstrap',
        'ngFileUpload',
        'ui.router.modal',
        'oc.lazyLoad',
        'pascalprecht.translate',
        'ncy-angular-breadcrumb',
        'angular-loading-bar',
        'ngSanitize',
        'ngAnimate'
    ])
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
    }])
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess',function(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.$state = $state;
        return $rootScope.$stateParams = $stateParams;
    }])


    .controller('ModalInstanceCtrl', function($scope,$rootScope,$uibModalInstance,Dropservice,UpdateService,users) {
        debugger
        $scope.reg=users? angular.copy(users):{} ;
        //$scope.reg=$rootScope.userDetails;
        $scope.reg.state= parseInt($rootScope.userDetails.state);

        $scope.getstatecity=function(){
                Dropservice.getcity($scope.reg.state,function(response){
                    debugger
                    $scope.city=response.data;
                });
        }
        $scope.getstatecity();
        $scope.reg.city=[];
        $scope.reg.city= parseInt($rootScope.userDetails.city);


        $scope.updateuser=function(reg) {
        UpdateService.updatereg(reg).then(function (resolve) {
        });
        $uibModalInstance.close(reg);
    }
        $scope.cancel=function(){
            $uibModalInstance.dismiss('cancel');
        };

}).controller('DeleteInstance', function($scope,$rootScope,$uibModalInstance,DeleteService,users) {

    $scope.reg=users? angular.copy(users):{} ;
    //$scope.reg=$rootScope.userDetails;
    $scope.deleteuser=function(reg) {

        DeleteService.deletereg(reg).then(function (resolve) {
        });
        $uibModalInstance.close(reg);
    }
    $scope.cancel=function(){
        $uibModalInstance.dismiss('cancel');
    };

}) .factory('DeleteService',function($http,$q) {
    return {
        deletereg: function (registers) {
            var deferred = $q.defer();
            return $http.delete('http://localhost:8000/register/'+registers._id, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }

            })
        }
    }
})
    .factory('UpdateService',function($http,$q) {
    return {
        updatereg: function (registers) {
            var deferred = $q.defer();
            return $http.put('http://localhost:8000/register', registers, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })
        }
    }
    })
    .controller('UpdateController',function($scope,UpdateService,$state){

});