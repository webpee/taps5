function ShoppingCartCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, AddCart, localStorageService) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Total: 0,
            CartFlag: false,
            CartCookieFlag: false,
        };

        //$scope.CheckListModel = [];
        $scope.lstCartItems = [];
        $scope.lstCartDetail = [];
        //localStorageService.set('CartItem',[])

        $scope.CheckUserLogin();

        $scope.allSelected = false;
    };

    $scope.CheckUserLogin = function () {
        $http.get(route.FrontLookup.CheckUserLogin).success(function (data) {
            if (data.success == 1) {
                $scope.lstCartItems = localStorageService.get('CartItem');
                if ($scope.lstCartItems != null) {
                    var objCart = $scope.lstCartItems;
                    $http.post(route.FrontLookup.SaveUsersCartItems, objCart).success(function (data) {
                        if (data.success == 1) {
                            localStorageService.set('CartItem', null);
                            $scope.init();
                            $scope.FetchCart();
                        }
                        else if (data.error == 2) {
                            toastr.error(data.message);
                        }
                    });
                }
                $scope.FetchCart();
            }
            else if (data.error == 2) {
                $scope.FetchCookieItems();
            }
        });
    }

    //Fetch Cart Items
    $scope.FetchCart = function () {
        $http.get(route.FrontLookup.FetchCart).success(function (data) {
            $scope.model.Total = 0;
            $scope.lstCartDetail = data;
            if ($scope.lstCartDetail.length == 0) {
                $scope.model.CartFlag = true;
            }
            for (var i = 0; i < $scope.lstCartDetail.length; i++) {
                $scope.model.Total = parseFloat($scope.model.Total) + parseFloat($scope.lstCartDetail[i].Qauntity) * parseFloat($scope.lstCartDetail[i].SalePrice);
            }
        });
    }

    $scope.FetchCookieItems = function () {
        $scope.model.TotalinCookie = 0;
        $scope.lstCartItems = localStorageService.get('CartItem');

        if ($scope.lstCartItems != null) {
            if ($scope.lstCartItems.length == 0) {
                $scope.model.CartCookieFlag = true;
            }
        }
        else {
            $scope.model.CartCookieFlag = true;
        }
        if ($scope.lstCartItems != null) {
            for (var i = 0; i < $scope.lstCartItems.length; i++) {
                $scope.model.TotalinCookie = parseFloat($scope.model.TotalinCookie) + parseFloat($scope.lstCartItems[i].Qauntity) * parseFloat($scope.lstCartItems[i].SalePrice);
            }
        }
    }
    ////end Fetch Cart

    //CheckAll Logic
    $scope.toggleSeleted = function () {
        $scope.allSelected = !$scope.allSelected;
        angular.forEach($scope.lstCartDetail, function (o) {
            o.checked = $scope.allSelected;
        });
    };

    $scope.toggleCartSeleted = function () {
        $scope.allSelected = !$scope.allSelected;
        angular.forEach($scope.lstCartItems, function (o) {
            o.checked = $scope.allSelected;
        });
    };
    ////end CheckAll


    //Remove Items From Cart            
    $scope.RemoveItemDb = function () {
        $scope.RemoveItems = $filter('filter')($scope.lstCartDetail, { checked: true });
        if ($scope.RemoveItems != null) {
            if ($scope.RemoveItems.length > 0) {
                $http.post(route.FrontLookup.DeleteCartItem, $scope.RemoveItems).success(function (data) {
                    if (data.success == 1) {
                        toastr.success(data.message);
                        $scope.FetchCart();
                        $scope.init();
                        $('#CheckDB').prop('checked', false);
                    }
                    else if (data.error == 2) {
                        toastr.error(data.message);
                        $scope.FetchCart();
                        $scope.init();
                    }
                });
            }
        }
    }

    $scope.RemoveItemCookie = function () {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        $scope.CheckListModel = $filter('filter')($scope.lstCartItems, { checked: true });

        if ($scope.CheckListModel.length > 0) {
            for (var i = 0; i < $scope.CheckListModel.length; i++) {
                AddCart.removeItem($scope.CheckListModel[i].id);
            }
            $scope.FetchCookieItems();
        }
        $.unblockUI();
    }
    ////end Remove Item

    //Qauntity Part
    $scope.PlusQuantity = function (objCart) {
        objCart.Qauntity = objCart.Qauntity + 1;
        objCart.UnitPrice = objCart.SalePrice;

        $http.post(route.FrontLookup.SaveQtyofItem, objCart).success(function (data) {
            if (data.success == 1) {
                //toastr.success(data.message);
                $scope.FetchCart();
            }
            else if (data.error == 2) {
                //toastr.error(data.message);
            }
        });
    }

    $scope.MinusQuantity = function (objCart) {
        if (objCart.Qauntity <= 1) {
            return;
        }
        objCart.Qauntity = objCart.Qauntity - 1;
        objCart.UnitPrice = objCart.SalePrice;
        $http.post(route.FrontLookup.SaveQtyofItem, objCart).success(function (data) {
            if (data.success == 1) {
                //toastr.success(data.message);
                $scope.FetchCart();
            }
            else if (data.error == 2) {
                //toastr.error(data.message);
            }
        });
    }

    $scope.IncrementQauntity = function (objCart) {
        $.blockUI({ message: '<h3>Loading...</h3>' });

        objCart.Qauntity = objCart.Qauntity + 1;

        if ($scope.lstCartDetail != null) {
            if ($scope.lstCartItems.length > 0) {
                localStorageService.set('CartItem', $scope.lstCartItems);
            }
        }

        $scope.FetchCookieItems();

        $.unblockUI();
    }

    $scope.DecrementQauntity = function (objCart) {
        if (objCart.Qauntity <= 1) {
            return;
        }

        $.blockUI({ message: '<h3>Loading...</h3>' });

        objCart.Qauntity = objCart.Qauntity - 1;

        if ($scope.lstCartItems != null) {
            if ($scope.lstCartItems.length > 0) {
                localStorageService.set('CartItem', $scope.lstCartItems);
            }
        }
        $scope.FetchCookieItems();

        $.unblockUI();
    }
    //end Qauntity


    $scope.Next = function () {
        window.location.href = "/Address/DeliveryAddress";
    }

    $scope.Back = function () {
        window.location.href = "/Parts/Parts";
    }

    $("#pcontainer").mouseover(function () {
        $("#phello").css('visibility', 'visible');
    });
    $("#pcontainer").mouseout(function () {
        $("#phello").css('visibility', 'hidden');
    });

    $("#ppcontainer").mouseover(function () {
        $("#phello").css('visibility', 'visible');
    });
    $("#ppcontainer").mouseout(function () {
        $("#phello").css('visibility', 'hidden');
    });

    $scope.init();
}