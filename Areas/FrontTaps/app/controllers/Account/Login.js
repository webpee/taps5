function LoginCTRL($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Username: '',
            Password: '',
            Email: '',
            Active: '',
        };

        $http.get(route.FrontLookup.GetAllMake).success(function (data) {
            $scope.lstGetAllMake = data;
        });

        $http.get(route.FrontLookup.GetAllModel).success(function (data) {
            $scope.lstGetAllModel = data;
        });
    };
    $scope.init();
}

function PointsCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $rootScope, localStorageService) {
    $http.get(route.FrontLookup.GetuserPoint).success(function (data) {
        $scope.Points = data.Points;
    });

    $http.get(route.FrontLookup.GetBanner).success(function (data) {
        $scope.BannerList = data;
        for (var i = 0; i < $scope.BannerList.length; i++) {
            if ($scope.BannerList[i].BannerName == 'Top_Banner') {
                $scope.TopBanner = $scope.BannerList[i].ImageUrl;
                $('#TopBanner').css('background-image', 'url(/MediaUploads/' + $scope.TopBanner + ')');
                break;
            }
        }
        for (var i = 0; i < $scope.BannerList.length; i++) {
            if ($scope.BannerList[i].BannerName == "Right_Banner") {
                $rootScope.RightBanner = '/MediaUploads/' + $scope.BannerList[i].ImageUrl;
                break;
            }
        }
    });

    $scope.Logout = function () {
        localStorageService.add('filteredData', null);
        localStorageService.add('conditions', null);
        localStorageService.add('others', null);
        localStorageService.add('RM', null);
        localStorageService.add('To', null);
        window.location.href = '/Account/Logout';
    }
}
