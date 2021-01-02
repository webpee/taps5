function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Role: '',
            User: '',
            VendorCode: '',
            Password: '',
        };
        $http.get(route.Lookup.getAllRoles).success(function (data) {
            $scope.Roles = data.list1;
        });

        $http.get(route.Lookup.GetAllUsers).success(function (data) {
            $scope.Users = data.list1;
        });

        $scope.FetchUserByRole();
    };

    $scope.FetchUserByRole = function () {
        $http.get(route.Lookup.FetchUserByRole).success(function (data) {
            if (data.list2.length > 0) {
                $scope.UserInRoleList = data.list2;

                $scope.currentPage = 1;
                $scope.totalItems = $scope.UserInRoleList.length;
                $scope.entryLimit = 5; // items per page
                $scope.noOfPages = 10;
            }
        });
    }

    $scope.Create = function () {
        var params = {
            roleName: $scope.model.Role,
            userName: $scope.model.User,
            VendorCode: $scope.model.VendorCode
        };
        $http.get(route.Lookup.AddUserInRole, { params: params }).success(function (data) {
            console.log(data);
            if (data.success == true)
                toastr.success(data.message);
            else
                toastr.error(data.message);
        });
        $scope.Reset();
    }

    $scope.DeleteRole = function (o) {
        if (o.roles[0] != null) {
            var params = {
                roleName: o.roles[0],
                userName: o.user.UserName
            };

            $http.get(route.Lookup.RemoveUserFromRole, { params: params }).success(function (data) {
                if (data == "true")
                    toastr.error("This user already has the role specified");
                else
                    toastr.success("Username removed from the Role succesfully");
            });
            $scope.Reset();
            $scope.FetchUserByRole();
        }
        else {
            toastr.error("This User is not in any Role, it cant't Delete");
        }
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}