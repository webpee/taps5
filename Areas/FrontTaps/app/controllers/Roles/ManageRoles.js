function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Roles: '',
        };
        $http.get(route.Lookup.getAllRoles).success(function (data) {
            $scope.Roles = data.list1;
        });
    };
    $scope.FetchUserByRole = function () {
        var params = {
            roleName : $scope.model.Roles
        }
        $http.get(route.Lookup.FetchUserByRole,{ params: params}).success(function (data) {
            $scope.list2 = data.list2;
        });        
    }
    $scope.RemoveUserFromRole = function (o) {

        var params = {  
            roleName: $scope.model.Roles,
            userName: o
        };
        $http.get(route.Lookup.RemoveUserFromRole, { params: params }).success(function (data) {
            $scope.FetchUserByRole();
            toastr.success("User Remove from Role Successfully");
        });
    }
    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}