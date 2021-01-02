function ProfileCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            SortOrder: '',
            SortPointOrder: '',
            Sort: false,
            Offer: '',
            MoreOffer: false,
            SortPoint: false,
            Price: '',

        };
        $scope.GetAllOrderList();
        $scope.GetWishlistOfferById();
    };
    $scope.SearchText = '';

    $scope.GetAllOrderList = function (page) {
        $http.get(route.FrontLookup.GetAllOrderList).success(function (data) {
            if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.length > 0) {
                for (i = 0; i < data.length ; i++) {
                    if (data[i].CreatedOnUtc !== null) {
                        data[i].CreatedOnUtc = $filter('date')(data[i].CreatedOnUtc.substr(6, 13), "MMMM dd yyyy");
                    }
                }
                $scope.OrderList = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.OrderList.length;

                $scope.noOfPages = 5;
                if (page != null) {
                    $scope.entryLimit = page;  // items per page              
                }
                else {
                    $scope.entryLimit = 3; // items per page
                }

            }
        });
    }

    //Sort Order History
    $scope.SortOrderList = function (sortorder, page) {
        $scope.SortOrderlist = '';
        if ($scope.OrderList.length > 0) {
            $scope.model.Sort = true;
            if (sortorder == 'id') {
                $scope.SortOrderlist = _.sortBy($scope.OrderList, 'id');
            }
            else if (sortorder == 'Status') {
                $scope.SortOrderlist = _.sortBy($scope.OrderList, 'Status');
            }
            else if (sortorder == 'PaidDateUtc') {
                $scope.SortOrderlist = _.sortBy($scope.OrderList, 'PaidDateUtc');
            }
            else if (sortorder == 'None') {
                $scope.init();
            }
            $scope.currentPage = 1;
            $scope.totalItems = $scope.SortOrderlist.length;
            $scope.entryLimit = 3;
            $scope.noOfPages = 5;
        }
    }

    //Sort Point History
    $scope.SortPointOrder = function (sortorder) {
        $scope.SortPointOrderlist = '';
        if ($scope.OrderList.length > 0) {
            $scope.model.SortPoint = true;
            if (sortorder == 'id') {
                $scope.SortPointOrderlist = _.sortBy($scope.OrderList, 'id');
            }
            else if (sortorder == 'Status') {
                $scope.SortPointOrderlist = _.sortBy($scope.OrderList, 'Status');
            }
            else if (sortorder == 'PaidDateUtc') {
                $scope.SortPointOrderlist = _.sortBy($scope.OrderList, 'PaidDateUtc');
            }
            else if (sortorder == 'None') {
                $scope.init();
            }
            $scope.currentPage = 1;
            $scope.totalItems = $scope.SortPointOrderlist.length;
            $scope.entryLimit = 3;
            $scope.noOfPages = 5;

        }
    }

    //Wish List offer By User Id
    $scope.GetWishlistOfferById = function () {
        $http.get(route.FrontLookup.GetWishlistOfferById).success(function (data) {
            if (data.length > 0) {

                for (i = 0; i < data.length ; i++) {
                    if (data[i].CreatedDate !== null) {
                        data[i].CreatedDate = $filter('date')(data[i].CreatedDate.substr(6, 13), "dd MMM yyyy");
                    }
                }

                $scope.WishlistOffer = data;
                $scope.currentPage = 1;
                $scope.entryLimit = 3;
                for (var i = 0; i < $scope.WishlistOffer.length; i++) {
                    if ($scope.WishlistOffer[i].WishlistOffer.length > 3) {
                        $scope.model.MoreOffer = true;
                    }

                }
            }
            else {
                $scope.WishlistOffer = null;
            }
        });
    }
    $scope.LoadMore = function () {
        $scope.currentPage = 1;
        if ($scope.model.Offer == 'More') {
            for (var i = 0; i < $scope.WishlistOffer.length; i++) {
                if ($scope.WishlistOffer[i].WishlistOffer.length > 0) {
                    $scope.entryLimit = $scope.WishlistOffer[i].WishlistOffer.length;
                }
            }
            $scope.model.Offer = '';
        }
        else {
            $scope.entryLimit = 3;
            $scope.model.Offer = '';

        }

    }

    $scope.DeleteWishList = function (id) {
        var params = {
            id: id
        };
        $http.get(route.FrontLookup.DeleteWishList, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                $scope.initModel();
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
        });
    }

    $scope.AddtoCart = function (idProduct, idWishList) {
        var params = {
            idProduct: idProduct,
            idWishList: idWishList,
            UnitPrice: $scope.model.Price,
        };

        $http.get(route.FrontLookup.AddtoCartFromWishList, { params: params }).success(function (data) {
            if (data.success == 1) {
                $scope.initModel();
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
        });


    }

    $scope.PrintInvoice = function (OrderId) {
        var params = {
            OrderId: OrderId,
            ReportName: 'Invoice',
        };

        $window.open(route.ReportPrint.OrderReport +
            '?OrderId=' + params.OrderId +
            '&ReportName=' + params.ReportName, '_blank');
    }

    $scope.init();
}