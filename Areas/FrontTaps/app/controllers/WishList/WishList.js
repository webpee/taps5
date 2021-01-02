function WishListCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, $cookieStore) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Flag: false,
            MakeModel: '',
            Condition: 'REMAN',
            User: false,
            Component: '',
            idComponent: '',
            idMakeModel: '',
            CreatedDate: '',
            IsVendor: false,
            idProduct: '',
            flgPriceL: ''
        };

        $scope.CheckUser();

        $http.get(route.FrontLookup.GetAllMake).success(function (data) {
            $scope.lstMake = data;
        });

        $http.get(route.FrontLookup.GetAllModel).success(function (data) {
            $scope.lstModel = data;
        });
    };

    $scope.CheckUser = function () {
        $http.get(route.FrontLookup.CheckUser).success(function (data) {
            if (data == 'true') {
                $scope.FetchAllWishList();
                $scope.model.IsVendor = true;
                $scope.model.User = true;
            }
            else {
                $scope.FetchWishListById();
            }
        })
    }

    $scope.SendOffer = function (o) {        
        if (o.Price == 0) {
            toastr.error("Please Insert price");
            return;
        }

        if (o.idProduct == 0) {
            toastr.error("Please Select Product");
            return;
        }

        o.idWishlist = o.id;
        o.idProduct = o.idProduct;
        o.id = 0;

        $http.post(route.FrontLookup.SendOffer, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                $scope.FetchWishListById();
                $scope.model.User = false;
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.initModel();
        });
    }

    $scope.FetchAllWishList = function () {
        $http.get(route.FrontLookup.FetchAllWishList).success(function (data) {
            if (data.length > 0) {
                for (i = 0; i < data.length ; i++) {
                    if (data[i].CreatedDate != null) {
                        data[i].CreatedDate = $filter('date')(data[i].CreatedDate.substr(6, 13), "dd MMM yyyy hh:mm a");
                    }
                }
                $scope.lstWishList = data;
            }
            else {
                $scope.lstWishList = null;
            }
        });
    }



    $scope.FilterWishList = function () {
        if ($scope.model.MakeModel == '') {
            toastr.error("Please Select Make & Model")
            return;
        }
        if ($rootScope.Component == undefined) {
            toastr.error("Please Select Component")
            return;
        }

        $scope.model.MakeModelList = $scope.model.MakeModel.substr($scope.model.MakeModel.lastIndexOf('-') + 1, $scope.model.MakeModel.length);
        $scope.model.idMakeModel = $scope.model.MakeModel.substr(0, $scope.model.MakeModel.lastIndexOf('-'));

        $scope.model.idComponent = $rootScope.Component.substr(0, $rootScope.Component.lastIndexOf('-'));
        $scope.model.ComponentList = $rootScope.Component.substr($rootScope.Component.lastIndexOf('-') + 1, $rootScope.Component.length);

        $scope.model.ConditionList = $scope.model.Condition;

        $scope.model.CreatedDate = $filter('date')(new Date(), 'dd MMM yyyy hh:mm a');
        $scope.model.User = true;

    }

    $scope.AddToWishList = function (o) {

        $http.post(route.FrontLookup.AddtoWishList, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                $scope.FetchWishListById();
                $scope.model.User = false;
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
        });
    }


    $scope.ParentList1 = function (id) {
        var list = _.where($scope.lstModel, { idMake: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    $scope.FetchWishListById = function () {
        $http.get(route.FrontLookup.FetchWishListById).success(function (data) {
            if (data.length > 0) {
                for (i = 0; i < data.length ; i++) {
                    if (data[i].CreatedDate != null) {
                        data[i].CreatedDate = $filter('date')(data[i].CreatedDate.substr(6, 13), "dd MMM yyyy hh:mm a");
                    }
                }
                $scope.lstWishList = data;
            }
            else {
                $scope.lstWishList = null;
            }
        });
    }

    $scope.RemoveItem = function (id) {
        var params = {
            id: id,
        };
        $http.get(route.FrontLookup.DeleteWishListItem, { params: params }).success(function (data) {
            if (data.success == 1)
                toastr.success("Product Deleted From WishList Successfully");
            else
                toastr.error(data.message);

            $scope.FetchWishListById();
        });

    }

    $scope.ClearFilterData = function () {
        $scope.model.Condition = 'REMAN';
        $scope.model.MakeModel = '';
        delete $rootScope.Component;
        $scope.model.Component = '';
        $window.location.reload();
    }

    $scope.init();
}