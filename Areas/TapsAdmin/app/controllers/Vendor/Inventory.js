function InventoryCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, filterFilter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
        };
        //$scope.predicate = 'ComponentName';
        $scope.GetVendorInventory(1);
    };

    $scope.GetVendorInventory = function (page) {
        var params = {
            page: page
        };

        $http.get(routeTapsAdmin.TapsAdmin.FetchInventoryProducts, { params: params }).success(function (data) {
            if (data != false) {
                $scope.model.TotalInventory = data.total;
                console.log
                for (i = 0; i < data.list.length ; i++) {
                    if (data.list[i].ModifiedDate != null) {
                        data.list[i].ModifiedDate = $filter('date')(data.list[i].ModifiedDate.substr(6, 13), "dd/MM/yyyy hh:mm a");
                    }
                    if (data.list[i].CreatedDate != null) {
                        data.list[i].CreatedDate = $filter('date')(data.list[i].CreatedDate.substr(6, 13), "dd MMM yyyy hh:mm a");
                    }
                }
                $scope.pager = data.pager;
                $scope.ProductInventoryList = data.list;
            }
        })
    }

    $scope.toggleSeleted = function () {
        $scope.allSelected = !$scope.allSelected;
        angular.forEach($scope.ProductInventoryList, function (o) {
            o.checked = $scope.allSelected;
        });
    };

    $scope.ProductStatusChange = function (status) {
        $scope.ids1 = [];
        $scope.ids = $filter('filter')($scope.ProductInventoryList, { checked: true });

        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {
            $scope.ids1.push($scope.ids[i].idProduct);
        }
        console.log($scope.ids1);

        var params = {
            updateIds: $scope.ids1,
            Status: status
        };

        $http.get(routeTapsAdmin.TapsAdmin.ProductStatusChange, { params: params }).success(function (data) {
            $scope.GetVendorInventory();
        })
    }
    $scope.ShowMore = function (o) {
        o.no = o.ProductVehicle.length;
    };
    $scope.DeleteInventoryProduct = function () {
        $scope.ids1 = [];
        $scope.ids = $filter('filter')($scope.ProductInventoryList, { checked: true });

        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {
            $scope.ids1.push($scope.ids[i].idProduct);
        }
        console.log($scope.ids1);

        var params = {
            idProducts: $scope.ids1,
        };

        $http.get(routeTapsAdmin.TapsAdmin.DeleteInventoryProduct, { params: params }).success(function (data) {
            $scope.GetVendorInventory();
        })
    }

    $scope.ExportExcel = function () {
        $scope.ids1 = [];
        $scope.ids = $filter('filter')($scope.ProductInventoryList, { checked: true });
        console.log($scope.ids.length);

        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {
            $scope.ids1.push($scope.ids[i].idProduct);
        }

        window.location = routeTapsAdmin.TapsAdmin.GetVendorExcel + '?updateIds=' + $scope.ids1;
    }

    $scope.SearchText = '';


    $scope.init();
}