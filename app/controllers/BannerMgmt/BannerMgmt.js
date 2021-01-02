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
            SearchText2:''
        };
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;

        $scope.GetBanner();
        $http.get(route.Lookup.GetAllBanner).success(function (data) {
         
            $scope.BannerList1 = data;            
        });
    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.BannerName) || re.test(obj.ImageUrl) || re.test(obj.Description) || re.test(obj.UrlLink);
    };

    $scope.filter = function (SearchText5) {
        $scope.SearchText = SearchText5;
        $timeout(function () { //wait for 'filtered' to be changed
            /* change pagination with $scope.filtered */
            $scope.currentPage = 1;
            $scope.totalItems = $scope.filtered.length;
            $scope.noOfPages = 10;

        }, 10);
    };

    $scope.BlankSearch = function (SearchText5) {
        if (SearchText5 == '') {
            $scope.SearchText = SearchText5;
            $timeout(function () { //wait for 'filtered' to be changed
                /* change pagination with $scope.filtered */
                $scope.currentPage = 1;
                $scope.totalItems = $scope.list1.length;
                $scope.noOfPages = 10;

            }, 10);
            return;
        }
    }

    //$scope.SearchText = '';
    $scope.FetchMedia = function (page) {
        var params = {
            page: page,
            SearchText: $scope.model.SearchText2
        };
        $http.get(route.Lookup.GetAllMedia, { params: params }).success(function (data) {
            $scope.pager = data.pager;
            $scope.ImageList = data.list;
            //$scope.currentPage = 1;
            //$scope.totalItems = $scope.ImageList.length;
            //$scope.entryLimit = 20; // items per page
            //$scope.noOfPages =5;
            
            $('#Banner').modal('show');
        });
    }

    $scope.CheckSearch = function () {
        if ($scope.model.SearchText2 == '') {
            $scope.FetchMedia(1);
        }
        else {
            return;
        }
    }

    $scope.SelectImage = function (Name) {
        $scope.model.ImageUrl = Name;
    }

    $scope.GetBanner = function () {
        $http.get(route.Lookup.GetBanner).success(function (data) {
            console.log(data);
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
        });
    }

    $scope.FetchBanners = function (o) {

            $scope.model.id = o.id;
            $scope.model.BannerId = o.BannerId;
            $scope.model.ImageUrl = o.ImageUrl;
            $scope.model.alt = o.alt;
            $scope.model.UrlLink = o.UrlLink;
            $scope.model.Description = o.Description;

            $scope.GetAllBannerMetaList();
      
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
            $scope.BannerMetaList = null;
            $scope.GetBanner();
            $scope.Reset();
            $scope.BannerMetaList = null;
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
        $scope.BannerMetaList = null;
    }
    $scope.init();
}