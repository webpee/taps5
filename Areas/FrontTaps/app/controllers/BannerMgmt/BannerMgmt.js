function BannerMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            idBanner: '',
            BannerId:'',
            id: '',
            Description: '',
            ImageUrl: '',
            alt: '',
            UrlLink:'',
            MetaKey: '',
            MetaValue: '',
        };

        $scope.GetBanner();
        $http.get(route.Lookup.GetAllBanner).success(function (data) {
            $scope.BannerList1 = data;
        });
    };

    $scope.FetchMedia = function () {

        $http.get(route.Lookup.GetAllMedia).success(function (data) {
            $scope.ImageList = data;
            $('#Banner').modal('show');
        });
    }

    $scope.SelectImage = function (Name) {
        $scope.model.ImageUrl = Name;
    }

    $scope.GetBanner = function () {
        $http.get(route.Lookup.GetBanner).success(function (data) {
            $scope.list1 = data;
        });
    }

    $scope.FetchBanners = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.FetchBanners, { params: params }).success(function (data) {
           
            $scope.model.id = data.id;
            $scope.model.BannerId = data.BannerId;
            $scope.model.ImageUrl = data.ImageUrl;
            $scope.model.alt = data.alt;
            $scope.model.UrlLink = data.UrlLink;
            $scope.model.Description = data.Description;
            

            $scope.GetAllBannerMetaList();
        });
    }

    $scope.DeleteBannerMgmt = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteBannerMgmt, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetBanner();
        });
    }

    $scope.CreateBannerMgmt = function (o) {
        o.id = $scope.model.id;
        $http.post(route.Lookup.CreateBannerMgmt, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetBanner();
            $scope.Reset();
        });
    }




    //Banner meta Management

    $scope.GetAllBannerMetaList = function () {
        var params = {
            id: $scope.model.id
        };
        $http.get(route.Lookup.GetAllBannerMetaList, { params: params }).success(function (data) {
            $scope.BannerMetaList = data;
        });
    }

    $scope.UpdateBannerMeta = function (o) {
        o.idBanner = $scope.model.id;
        $http.post(route.Lookup.UpdateBannerMeta, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllMenuMetaList();

        });
    }

    $scope.DeleteBannerMeta = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteBannerMeta, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.GetAllBannerMetaList();
        });
    }

    $scope.CreateBannerMeta = function (o) {
        o.idBanner = $scope.model.id;
        $http.post(route.Lookup.CreateBannerMeta, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }           
            o.MetaKey = '';
            o.MetaValue = '';
            if ($scope.model.id != '') {
                $scope.GetAllBannerMetaList();
            }          
        });
    }
    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}