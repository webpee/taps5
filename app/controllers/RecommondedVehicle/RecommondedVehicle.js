function RecommondedVehicleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idVendor: '',
            Flag: ''
        };
        $http.get(route.Lookup.GetAllVendor).success(function (data) {
            $scope.lstVendor = data;
        });
    };
    $scope.SearchText = '';

    $scope.Search = function () {
        var params = {
            Vendor: $scope.model.idVendor,
            Flag: $scope.model.Flag
        };

        $http.get(route.Lookup.GetRecommendedVehicleBySearch, { params: params }).success(function (data) {
            if (data.length > 0) {
                for (i = 0; i < data.length ; i++) {
   
                    if (data[i].Flag == false) {
                        data[i].Flag = "Not Approved";
                    }
                    if (data[i].Flag == true) {
                        data[i].Flag = "Approved";
                    }
                }
            }
            $scope.lstRecommondedVehicle = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.lstRecommondedVehicle.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10; //num of page displayed
        });
    }


    $scope.ApproveRecommendedVehicle = function (o) {
        $http.post(route.Lookup.ApproveRecommendedVehicle, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                $scope.Search();
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}