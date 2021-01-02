function PageMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Title: '',
            Description: '',
            Parent: '',
            PageType: '',
            PageImageUrl: '',
            Slug: '',            
            //Page Meta
            idPage: '',
            MetaKey: '',
            MetaValue: '',
            FileName: '',           
        };
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;

        $http.get(route.Lookup.GetAllPageMgmt).success(function (data) {
            $scope.lstParent = data;
        });
        $scope.GetAllPageMgmt();        
    };
    $scope.SearchText = '';

    $scope.FetchMedia = function (page) {
        var params = {
            page: page
        };
        $http.get(route.Lookup.GetAllMedia, { params: params }).success(function (data) {
            $scope.pager = data.pager;
            $scope.ImageList = data.list;
            //$scope.currentPage = 1;
            //$scope.totalItems = $scope.ImageList.length;
            //$scope.entryLimit = 10; // items per page
            //$scope.noOfPages =10;

            $('#Page').modal('show');
        });
    }

    $scope.SelectImage = function (Name) {
        $scope.model.PageImageUrl = Name;
    }

    $scope.GetAllPageMgmt = function () {
        $http.get(route.Lookup.GetAllPageMgmt).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
        });
    }

    $scope.FetchPageMgmtById = function (o) {
        var params = {
            id: o.id,
        };
            $scope.model.id = o.id;
            $scope.model.Title = o.Title;
            $scope.model.Description = o.Description;
            $scope.model.Parent = o.Parent;
            $scope.model.PageType = o.PageType;
            $scope.model.PageImageUrl = o.pageImageUrl;
            $scope.model.Slug = o.Slug;

         $http.get(route.Lookup.GetAllPageMetaList, { params: params }).success(function (data) {
             $scope.list2 = data;            
        });
    }

    $scope.DeletePageMgmt = function (o) {
        var params = {
            Id: o.id,
        };
        $http.get(route.Lookup.DeletePageMgmt, { params: params }).success(function (data) {
            if (data.success == 1)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            $scope.GetAllPageMgmt();
            $scope.Reset();
        });
    }

    $scope.CreatePageMgmt = function (obj) {
        obj.id = $scope.model.id;

        $http.post(route.Lookup.CreatePageMgmt, obj).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }

            $scope.GetAllPageMgmt();
            $scope.Reset();
            $scope.list2 = null;
        });
    }
    //Page Meta
    $scope.CreatePageMeta = function (o) {
        o.idPage = $scope.model.id;
        if (o.idPage == '') {
            toastr.error("Please Select the Page");
            return;
        }

        $http.post(route.Lookup.CreatePageMeta, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            o.idPage = '';
            o.MetaKey = '';
            o.MetaValue = '';
            $scope.GetAllPageMetaList();
        });
    }

    $scope.UpdatePageMeta = function (o) {
        o.idPage = $scope.model.id;
        $http.post(route.Lookup.UpdatePageMeta, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllPageMetaList();
        });
    }

    $scope.GetAllPageMetaList = function () {
        var params = {
            id: $scope.model.id
        };
        $http.get(route.Lookup.GetAllPageMetaList, { params: params }).success(function (data) {
            $scope.list2 = data;
        });
    }

    $scope.DeletePageMeta = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeletePageMeta, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.GetAllPageMetaList();
        });
    }

    $scope.Reset = function () {
        $scope.init();
        $scope.list2 = null;
    }
    $scope.init();
}