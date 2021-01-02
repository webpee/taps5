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
        $http.get(route.Lookup.GetAllPageMgmt).success(function (data) {
            $scope.lstParent = data;
        });
        $scope.GetAllPageMgmt();        
    };
    $scope.SearchText = '';

    $scope.FetchMedia = function () {
        
        $http.get(route.Lookup.GetAllMedia).success(function (data) {            
            $scope.ImageList = data;           
            $('#Page').modal('show');
        });
    }

    $scope.SelectImage = function (Name) {
        $scope.model.PageImageUrl = Name;
    }

    $scope.GetAllPageMgmt = function () {
        $http.get(route.Lookup.GetAllPageMgmt).success(function (data) {
            $scope.list1 = data;
        });
    }

    $scope.FetchPageMgmtById = function (o) {
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.FetchPageMgmtById, { params: params }).success(function (data) {

            $scope.model.id = data.id;
            $scope.model.Title = data.Title;
            $scope.model.Description = data.Description;
            $scope.model.Parent = data.Parent;
            $scope.model.PageType = data.PageType;
            $scope.model.PageImageUrl = data.pageImageUrl;
            $scope.model.Slug = data.Slug;
        });

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
    }
    $scope.init();
}