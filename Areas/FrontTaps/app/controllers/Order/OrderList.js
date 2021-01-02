function OrderCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
        };
        $http.get(route.FrontLookup.GetAllOrederList).success(function (data) {
            if (data.length > 0) {
                for (i = 0; i < data.length ; i++) {
                    if (data[i].PaidDateUtc != null) {
                        data[i].PaidDateUtc = $filter('date')(data[i].PaidDateUtc.substr(6, 13), "dd MMM yyyy hh:mm a");
                    }
                }
                $scope.OrderList = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.OrderList.length;
                $scope.entryLimit = 4; // items per page
                $scope.noOfPages = 5;
            }
        });
    };
    $scope.SearchText = '';


    $scope.init();
}