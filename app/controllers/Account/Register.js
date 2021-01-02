function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            UserName: '',            
            Password: '',            
            Email: '',            
        };        
    };

        
    $scope.Create = function (o) {
        $http.post(route.Lookup.RegisterUser, o).success(function (data) {
            if (data == 'true') {
                window.location.href = '/FrontTaps/Account/Index';
                toastr.success("User Register Successfully");                              
            }
            else
                toastr.error(data.message);

            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}