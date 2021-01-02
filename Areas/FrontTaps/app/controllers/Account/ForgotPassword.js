function ForgotCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": 0,
            "extendedTimeOut": 0,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "tapToDismiss": true
        }
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
        $http.get(route.FrontLookup.ResetPassword, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr["success"](data.message + "<br /><br /><button type='button' class='btn clear'>Ok</button>");

            }
            else {
                toastr["error"](data.message + "<br /><br /><button type='button' class='btn clear'>Ok</button>");
                //toastr.error(data.message);
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

//toastr.options = {
//    "closeButton": true,
//    "debug": true,
//    "newestOnTop": true,
//    "progressBar": true,
//    "positionClass": "toast-top-center",
//    "preventDuplicates": true,
//    "showDuration": "300",
//    "hideDuration": "1000",
//    "timeOut": 0,
//    "extendedTimeOut": 0,
//    "showEasing": "swing",
//    "hideEasing": "linear",
//    "showMethod": "fadeIn",
//    "hideMethod": "fadeOut",
//    "tapToDismiss": false
//}