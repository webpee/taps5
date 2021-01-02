function OrderCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Flage: false,
            SerialNumber: '',
            TotalOrder: ''
        };
        $scope.predicate = 'ProductName';
        $scope.GetOrderByVendorId();
    };

    $scope.toggleSeleted = function () {
        $scope.allSelected = !$scope.allSelected;
        angular.forEach($scope.lstVendorOrder, function (o) {
            o.checked = $scope.allSelected;
        });
    };

    $scope.GetOrderByVendorId = function () {
        $http.get(routeTapsAdmin.TapsAdmin.GetOrderByVendorId).success(function (data) {
            if (data.length > 0) {
                $scope.model.TotalOrder = data.length;
                for (i = 0; i < data.length ; i++) {
                    if (data[i].CreatedOnUtc != null) {
                        data[i].CreatedOnUtc = $filter('date')(data[i].CreatedOnUtc.substr(6, 13), "dd MMM yyyy hh:mm a");
                    }
                }
                $scope.lstVendorOrder = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.lstVendorOrder.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 5;
            }
        });
    }

    $scope.openComponent = function (i) {
        $('#serial-num-edit-' + i).off('click').on('click', function () {
            $(this).parent('.edit-serail-part').find('.serail-edit-btn-space').stop(true, true).slideToggle();
        });
    }



    $scope.UpdateVendorOrderStatus = function (id) {
        $scope.ids1 = [];
        $scope.ids = $filter('filter')($scope.lstVendorOrder, { checked: true });
        console.log($scope.ids.length);
        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {
            $scope.ids1.push($scope.ids[i].id);
        }
        console.log($scope.ids1);

        var params = {
            id: id,
            updateIds: $scope.ids1
        };

        $http.get(routeTapsAdmin.TapsAdmin.UpdateVendorOrderStatus, { params: params }).success(function (data) {
            //console.log(data);
            $scope.init();
        })
    }

    $scope.AddSerialNumber = function (id, SerialNumber) {
        var params = {
            id: id,
            SerialNumber: SerialNumber
        };

        $http.get(routeTapsAdmin.TapsAdmin.UpdateVendorOrderSerialNumber, { params: params }).success(function (data) {
            $scope.init();
        })
    }

    $scope.DeleteVendorOrderSerialNumber = function (id, SerialNumber) {
        var params = {
            id: id,
            SerialNumber: SerialNumber
        };

        $http.get(routeTapsAdmin.TapsAdmin.DeleteVendorOrderSerialNumber, { params: params }).success(function (data) {
            $scope.init();
        })
    }

    $scope.ExportExcel = function () {
        $scope.ids1 = [];
        $scope.ids = $filter('filter')($scope.lstVendorOrder, { checked: true });
        console.log($scope.ids.length);

        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {
            $scope.ids1.push($scope.ids[i].id);
        }

        window.location = routeTapsAdmin.TapsAdmin.GetOrderExcel + '?updateIds=' + $scope.ids1;
    }


    $scope.SearchText = '';


    $scope.init();
}