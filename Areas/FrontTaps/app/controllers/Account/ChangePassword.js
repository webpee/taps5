function ChangePasswordCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            OldPassword: '',
            NewPassword: '',
            ConfirmPassword: '',
        };
    };

    $scope.ChangePassword = function (o) {
        $.blockUI('<h1>Loading... </h1>');

        $http.post(route.FrontLookup.ChangePassword,o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
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