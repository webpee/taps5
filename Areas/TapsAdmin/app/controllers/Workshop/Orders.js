function WorkshopOrderCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {
    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            TotalOrder:0
        };
        $http.get(routeTapsAdmin.TapsAdmin.GetAllOrderByUser).success(function (data) {
            if (data.length > 0) {
                $scope.model.TotalOrder = data.length;
                for (i = 0; i < data.length ; i++) {
                    if (data[i].OrderDateTime != null) {
                        data[i].OrderDateTime = $filter('date')(data[i].OrderDateTime.substr(6, 13), "dd MMM yyyy hh:mm a");
                    }
                }
                $scope.lstOrders = data;
                //$scope.currentPage = 1;
                //$scope.totalItems = $scope.OrderList.length;
                //$scope.entryLimit = 4; // items per page
                //$scope.noOfPages = 5;
            }
        });
    };
    $scope.SearchText = '';

    $scope.init();
}