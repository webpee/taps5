function ChangePassCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            OldPassword: '',
            NewPassword: '',
            ConfirmPassword: ''
        };
    };


    $scope.ChangeUserPassword = function (o) {
        $.blockUI('<h1>Loading... </h1>');        
        $http.post(route.Lookup.ChangeUserPassword, o).success(function (data) {
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