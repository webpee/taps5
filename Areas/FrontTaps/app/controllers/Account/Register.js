function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            UserName: '',
            Password: '',
            Email: '',
            Name:'',

            //CheckBox
            Email1: false,
            Email2: false,
        };

        $http.get(route.FrontLookup.GetAllMake).success(function (data) {           
            $scope.lstGetAllMake = data;
        });

        $http.get(route.FrontLookup.GetAllModel).success(function (data) {
            $scope.lstGetAllModel = data;
        });
       
    };

    $scope.Register = function (o) {
        $http.post(route.FrontLookup.RegisterUser, o).success(function (data) {
            if (data == 'true') {
                toastr.success("User Register Successfully");
                setTimeout(1000);
                window.location.href = "/Account/Login";
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