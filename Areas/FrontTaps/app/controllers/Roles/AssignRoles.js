function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Roles: '',
            Users: ''
        };
        $http.get(route.Lookup.getAllRoles).success(function (data) {
            $scope.Roles = data.list1;
        });

        $http.get(route.Lookup.GetAllUsers).success(function (data) {
            $scope.Users = data.list1;
        });
    };
       
    
    $scope.openPrint = function () {

        var params = {
            roleName: $scope.model.Roles,
            userName: $scope.model.Users
        };
        $http.get(route.Lookup.AddUserInRole, { params: params }).success(function (data) {
            if (data == 'true')
                toastr.error("This user already has the role specified");
            else
                toastr.success("Username added to the role succesfully");            
        });
    }
    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}