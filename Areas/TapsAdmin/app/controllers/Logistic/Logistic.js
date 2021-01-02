function LogisticCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
        };

        $http.get(routeTapsAdmin.TapsAdmin.GetOrderItems).success(function (data) {
            if (data.length > 0) {
                for (i = 0; i < data.length ; i++) {
                    if (data[i].CreatedOnUtc != null) {
                        data[i].CreatedOnUtc = $filter('date')(data[i].CreatedOnUtc.substr(6, 13), "dd MMM yyyy hh:mm a");
                    }
                }
                console.log(data);
                $scope.lstLogistic = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.lstLogistic.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 5;
            }
        });
    };

    $scope.toggleSeleted = function () {
        $scope.allSelected = !$scope.allSelected;
        angular.forEach($scope.lstLogistic, function (o) {
            o.checked = $scope.allSelected;
        });
    };

    $scope.UpdateOrderStatus = function (id) {
        $scope.ids1 = [];
        $scope.ids = $filter('filter')($scope.lstLogistic, { checked: true });
        for (var i = 0; i < $scope.ids.length; i++) {
            $scope.ids1.push($scope.ids[i].id);
        }
        console.log($scope.ids1);

        var params = {
            id: id,
            updateIds: $scope.ids1
        };

        $http.get(routeTapsAdmin.TapsAdmin.UpdateOrderStatus, { params: params }).success(function (data) {
            console.log(data);
            $scope.init();
        })
    }

    $scope.SearchText = '';


    $scope.init();
}