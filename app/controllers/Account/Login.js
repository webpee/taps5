function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Username: '',
            Password: '',
            Active: '',
        };
    };
   
    $scope.init();
}