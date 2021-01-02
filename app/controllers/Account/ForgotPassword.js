function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Email: ''
        };
    };


    $scope.ResetPassword = function () {
        $.blockUI('<h1>Loading... </h1>');
        var params = {
            Email: $scope.model.Email
        };
        $http.get(route.Lookup.ResetPassword, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else {
                toastr.error(data.message);
            }
            $scope.Reset();
        });
        $.unblockUI();
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}