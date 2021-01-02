function RecommendedComponentCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id:'',
            idVendor: '',
            Flag:''
        };

       // $scope.GetBanner();
        $http.get(route.Lookup.GetAllVendor).success(function (data) {
            if (data.length > 0) {
                $scope.Venderlist = data;
            }
        });
    };
  

    $scope.GetRecommendedComponentList = function () {
        var params = {
            vendorid: $scope.model.idVendor,
            status:$scope.model.Flag
        };       
        $http.get(route.RecommendedComponent.GetRecommendedComponentList, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.list1 = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.list1.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 10;
            }
        });
    }
    $scope.Approve = function (obj) {
        $http.post(route.RecommendedComponent.ApprovedRecommendedComponentData, obj).success(function (data) {
            if (data.success == 1) {
                $scope.GetRecommendedComponentList();
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
        });

    }




    $scope.Reset = function () {
        $scope.init();
        $scope.BannerMetaList = null;
    }
    $scope.init();
}