function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            RoleName: '',
            Description: '',
            RoleId:''
        };
        $scope.GetRoles();
    };
       
    $scope.GetRoles = function () {   
        $http.get(route.Lookup.getAllRoles).success(function (data) {
            $scope.list1 = data.list1;            
        });
    }

    $scope.EditRole = function (o) {
        var params = {
            roleName: o.RoleName
        };

        $http.get(route.Lookup.UpdateRole, { params: params }).success(function (data) {

            if (data.length > 0) {
                $scope.model.RoleName = data[0].RoleName;
                $scope.model.Description = data[0].Description;
                $scope.model.RoleId = data[0].RoleId;
            }
            else {
                toastr.error("oops! No Record Found");
            }
        });
    }

    $scope.DeleteRole = function (o) {
        var params = {
            RoleName: o.RoleName
        };
        $http.get(route.Lookup.DeleteRole, { params: params }).success(function (data) {
            if (data == 'true')
                toastr.success("Role Deleted Successfully");                
            else
                toastr.error("User is Present in current Role.");            
            $scope.GetRoles();
        });
    }

    $scope.Create = function (o) {
        o.RoleId = $scope.model.RoleId;

        $http.post(route.Lookup.CreateRoleList, o).success(function (data) {
               
        if (data.success == 1) {
            toastr.success(data.message);
        }
        else if(data.error == 2) {
            toastr.error(data.message);
        } 
        else {
            toastr.error("Role is already Exist");
        }
        $scope.GetRoles();
        $scope.Reset();
        });
    }
    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}