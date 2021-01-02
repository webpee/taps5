function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Password: '',
            ConfirmPassword: '',
        };
        $scope.GetBanks();
    };

    $scope.GetBanks = function () {
        $http.get(route.Lookup.getAllBanks).success(function (data) {
            $scope.list1 = data;
        });
    }


    $scope.EditBank = function (o) {

        $http.post(route.Lookup.UpdateBank, o).success(function (data) {
            if (data.success == 1)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            $scope.GetBanks();
        });
    }

    $scope.DeleteBank = function (o) {
        console.log(o.BankCode);
        var params = {
            bankCode: o.BankCode
        };
        $http.get(route.Lookup.DeleteBank, { params: params }).success(function (data) {
            if (data == 'true')
                toastr.success("Some Error Occured...");
            else
                toastr.error("Bank Deleted Successfully...");
            $scope.GetBanks();
        });
    }

    $scope.Create = function () {

        if ($scope.model.Active == '')
            $scope.model.Active = false;

        var params = {
            BankCode: $scope.model.BankCode,
            BankName: $scope.model.BankName,
            IsActive: $scope.model.Active
        };
        $http.get(route.Lookup.CreateBank, { params: params }).success(function (data) {
            if (data == 'true')
                toastr.success("Bank Created Successfully");
            else
                toastr.error("Some Error Occured ...");
            $scope.GetBanks();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}