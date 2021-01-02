function PartsCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, AddCart, filterFilter, localStorageService) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idParent: '',
            Name: '',
            Description: '',
            ImageUrl: '',
            SKU: '',
            SKUImageUrl: '',
            RegularPrice: '',
            SalePrice: '',
            Date: '',
            SalePriceDateFrom: '',
            SalePriceDateTo: '',
            ManageStock: '',
            StockQty: '',
            StockStatus: '',
            AllowBackOrder: '',
            SoldIndividually: '',
            Weight: '',
            VolumeL: '',
            VolumeW: '',
            VolumeH: '',
            SearchText: '',

            RegistrationNumber: '',

            //Product Meta
            idProduct: '',
            MetaKey: '',
            MetaValue: '',
            Warranty: '',
            Condition: '',
            ItemSize: 20,
            flgSort: false,
            log: '',
            NameAsc: 'NameDesc',
            ConditionAsc: 'ConditionDesc',
            SalePriceAsc: 'SalePriceDesc',
            OrderBy: ''
        };

        var SText = $('#SearchText').val();
        if (SText != undefined && SText != null && SText != "") {
            $scope.model.SearchText = SText;
        }

        $scope.predicate = 'Name';

        $scope.GetConditions();
        $scope.GetItem();
        $scope.GetOthers();

        if (localStorageService.get('RM') != null) {
            $scope.FiletrRM = localStorageService.get('RM');
        }

        if (localStorageService.get('To') != null) {
            $scope.FiletrTo = localStorageService.get('To');
        }

        //Category List
        $http.get(route.FrontLookup.GetAllCategory).success(function (data) {
            $scope.Categorylist = data;
        });
        $http.get(route.FrontLookup.GetAllComponentCategory).success(function (data) {
            $scope.CategoryComponentlist = data;
        });
        //End Category List

        $http.get(route.FrontLookup.GetAllYear).success(function (data) {
            $scope.lstGetYear = data;
        });

        $http.get(route.FrontLookup.GetAllTrim).success(function (data) {
            $scope.lstGetTrim = data;
        });

        $scope.model.ItemSize = 20;
        //$scope.GetAllItems();

        $scope.FilterLeftMenu(1, $scope.model.ItemSize);
    };

    $scope.DoSorting = function (Value) {
        if (Value == 'Name') {
            if ($scope.model.NameAsc == 'NameDesc') {
                $scope.model.OrderBy = 'NameAsc';
                $scope.model.NameAsc = 'NameAsc';
            }
            else {
                $scope.model.OrderBy = 'NameDesc';
                $scope.model.NameAsc = 'NameDesc';
            }
        }
        else if (Value == 'Condition') {
            if ($scope.model.ConditionAsc == 'ConditionDesc') {
                $scope.model.OrderBy = 'Condition';
                $scope.model.ConditionAsc = 'Condition';
            }
            else {
                $scope.model.OrderBy = 'ConditionDesc';
                $scope.model.ConditionAsc = 'ConditionDesc';
            }
        }
        else {
            if ($scope.model.SalePriceAsc == 'SalePriceDesc') {
                $scope.model.OrderBy = 'SalePrice';
                $scope.model.SalePriceAsc = 'SalePrice';
            }
            else {
                $scope.model.OrderBy = 'SalePriceDesc';
                $scope.model.SalePriceAsc = 'SalePriceDesc';
            }
        }
        $rootScope.FilterLeftMenu(1, 1);
    }

    $scope.GetAllItems = function () {
        $scope.currentPage = 1;
        $scope.totalItems = $scope.lstParts.length;
        $scope.entryLimit = $scope.model.ItemSize; // items per page
        $scope.noOfPages = 5;
        $scope.$watch('search', function (newVal, oldVal) {
            $scope.filtered = filterFilter($scope.lstParts, newVal);
            $scope.totalItems = $scope.lstParts.length;
            $scope.noOfPages = 5;
            $scope.currentPage = 1;
        }, true);
    }

    $scope.ChangePage = function (size) {
        if (size == 0) {
            $scope.model.ItemSize = $scope.pager.Total;
        }
        else {
            $scope.model.ItemSize = size;
        }
        $rootScope.FilterLeftMenu(1, $scope.model.ItemSize);
    }

    $scope.GetOthers = function () {
        $scope.oCondition = '';

        if (localStorageService.get('others') != null) {
            $scope.othercondition = localStorageService.get('others');
            for (var i = 0; i < $scope.othercondition.length; i++) {
                if ($scope.othercondition[i].value == true) {
                    if ($scope.othercondition == '') {
                        $scope.oCondition = $scope.othercondition[i].name;
                    }
                    else {
                        $scope.oCondition += ',' + $scope.othercondition[i].name;
                    }
                }
            }
        }
        else {
            $scope.oCondition = '';
        }
    }

    $scope.GetItem = function () {

        if (localStorageService.get('items') != null) {
            $scope.FiletrItem = localStorageService.get('items');
            $scope.ItemName = $scope.FiletrItem[0].value;
        }
        else {
            $scope.ItemName = false;
        }
    }

    $scope.GetConditions = function () {
        $scope.Fcondition = '';

        if (localStorageService.get('conditions') != null) {
            $scope.FilterCondition = localStorageService.get('conditions');
            for (var i = 0; i < $scope.FilterCondition.length; i++) {
                if ($scope.FilterCondition[i].value == true) {
                    if ($scope.FilterCondition == '') {
                        $scope.Fcondition = $scope.FilterCondition[i].name;
                    }
                    else {
                        $scope.Fcondition += ',' + $scope.FilterCondition[i].name;
                    }
                }
            }
        }
        else {
            $scope.Fcondition = '';
        }
        $scope.iteeeemm = $scope.Fcondition.split(',');
    }


    $rootScope.FilterLeftMenu = function (page, pageSizeNo) {
        $scope.filterData = localStorageService.get('filteredData');
        if ($scope.filterData != null) {
            $rootScope.idYear = $scope.filterData.Year;
        }
        $scope.compo_ids = localStorageService.get('Componentids');
        if ($scope.compo_ids != null && $scope.compo_ids != undefined) {
            $scope.Componentids = $scope.compo_ids;
        }

        $scope.compo_ID = localStorageService.get('componentID');
        if ($scope.compo_ID != null && $scope.compo_ID != undefined) {
            $scope.$watch('b', function () {
                $rootScope.componentID = $scope.compo_ID;
            }, true);
        }

        $scope.lstParts = '';
        $scope.pager = '';
        var params = {
            page: page,
            pageSizeNo: $scope.model.ItemSize,
            conditions: $scope.Fcondition,
            others: $scope.oCondition,
            items: $scope.ItemName,
            RM: $scope.FiletrRM,
            To: $scope.FiletrTo,
            ids: $scope.Componentids,
            idMake: $rootScope.idMake,
            idModel: $rootScope.idModel,
            idYear: $rootScope.idYear,
            idTrim: $rootScope.idTrim,
            SearchText: $scope.model.SearchText,
            OrderBy: $scope.model.OrderBy
        };

        $http.get(route.FrontLookup.FilterLeftMenu, { params: params }).success(function (data) {
            $scope.lstParts = data.list;
            $scope.pager = data.pager;
        });
    }

    $scope.AddComponent = function (id1, name1) {
        var So = {
            id: id1,
            name: name1
        };
        $rootScope.componentID.push(So);
    }

    $scope.GetName = function (id1) {
        var list1 = _.where($rootScope.list1, { id: parseInt(id1) });
        if (list1.length != 0) {
            return list1[0].Name;
        }

        var list2 = _.where($rootScope.list2, { id: parseInt(id1) });
        if (list2.length != 0) {
            return list2[0].Name;
        }

        var list3 = _.where($rootScope.list3, { id: parseInt(id1) });
        if (list3.length != 0) {
            return list3[0].Name;
        }

        var list4 = _.where($rootScope.list4, { id: parseInt(id1) });
        if (list4.length != 0) {
            return list4[0].Name;
        }
    }

    $("#pcontainer").mouseover(function () {
        $("#phello").css('visibility', 'visible');
    });
    $("#pcontainer").mouseleave(function () {
        $("#phello").css('visibilit', 'hidden');
        $scope.$window.onclick($window.event);

    });

    $("#ppcontainer").mouseover(function () {
        $("#phello").css('visibility', 'visible');
    });
    $("#ppcontainer").mouseleave(function () {
        $("#phello").css('visibility', 'hidden');
        $scope.$window.onclick($window.event);
    });

    //Component Filter data
    $scope.GetFilterData = function (page) {

        if ($rootScope.flag == false) {
            $rootScope.componentID = [];
            $scope.flg2 = 0;

            var sval = $('.form').serialize();

            if (sval == '' && localStorageService.get('componentID') != null) {
                $scope.flg2 = 1;
                $rootScope.componentID = localStorageService.get('componentID');
            }
            else if (sval != null && sval != '') {
                var qwe = "";
                if (sval == '' && $scope.flg2 == 0)
                { }
                else
                    qwe = sval.split('&');

                $scope.ids = null;

                for (i = 0; i < qwe.length; i++) {
                    if ($scope.ids == null) {
                        $scope.ids = qwe[i].split('=')[1];
                        $scope.AddComponent($scope.ids, $scope.GetName($scope.ids));

                    }
                    else {
                        $scope.ids = qwe[i].split('=')[1];
                        $scope.AddComponent($scope.ids, $scope.GetName($scope.ids));
                    }
                }
            }

            $scope.Componentids = [];
            for (var i = 0; i < $rootScope.componentID.length; i++) {
                if (!angular.isUndefined($rootScope.componentID[i].id) && $rootScope.componentID[i].id != null) {
                    $scope.Componentids.push($rootScope.componentID[i].id);
                }
            }
            localStorageService.set('Componentids', $scope.Componentids);
            localStorageService.set('componentID', null);
            localStorageService.set('componentID', $rootScope.componentID);

            $scope.lstParts = '';
            $scope.pager = '';

            var params = {
                page: page,
                pageSizeNo: $scope.model.ItemSize,
                conditions: $scope.Fcondition,
                others: $scope.oCondition,
                items: $scope.ItemName,
                RM: $scope.FiletrRM,
                To: $scope.FiletrTo,
                ids: $scope.Componentids,
                idMake: $rootScope.idMake,
                idModel: $rootScope.idModel,
                idYear: $rootScope.idYear,
                idTrim: $rootScope.idTrim,
                SearchText: $scope.model.SearchText
            }
            $http.get(route.FrontLookup.FilterLeftMenu, { params: params }).success(function (data) {
                $scope.lstParts = data.list;
                $scope.pager = data.pager;
            });
        }
    };

    $scope.GetPartsData = function (Text) {
        window.location.href = "/Parts/Parts?SearchText=" + Text;
    }

    //Clear Component Filter
    $scope.ClearFilter = function (o) {

        $scope.flg1 = 0;
        if (localStorageService.get('componentID') != null) {
            $scope.flg1 = 1;
        }

        $rootScope.componentID = [];
        //sval = $('.form').serialize();

        //var qwe;
        //if (sval == '' && $scope.flg1 == 0)
        //    return;
        //else
        //    qwe = sval.split('&');

        //$scope.ids = null;

        //for (i = 0; i < qwe.length; i++) {
        //    if ($scope.ids == null) {
        //        $scope.ids = qwe[i].split('=')[1];
        //        $scope.AddComponent($scope.ids, $scope.GetName($scope.ids));

        //    }
        //    else {
        //        $scope.ids = qwe[i].split('=')[1];
        //        $scope.AddComponent($scope.ids, $scope.GetName($scope.ids));
        //    }
        //}

        $scope.Componentids = [];

        if (localStorageService.get('componentID') != null) {
            $rootScope.componentID = localStorageService.get('componentID');
        }

        //localStorageService.set('componentID', null);
        for (var i = 0; i < $rootScope.componentID.length; i++) {
            if ($rootScope.componentID[i].id === o.id) {
                $rootScope.componentID.splice(i, 1);
                $('#Check' + o.id).attr('checked', false);

                for (var i = 0; i < $rootScope.componentID.length; i++) {
                    if (!angular.isUndefined($rootScope.componentID[i].id) && $rootScope.componentID[i].id != null) {
                        $scope.Componentids.push($rootScope.componentID[i].id);
                    }

                }
            }
        }

        localStorageService.set('componentID', $rootScope.componentID);
        $rootScope.componentID = localStorageService.get('componentID');

        if ($scope.Componentids != null) {
            $scope.lstParts = '';
            $scope.pager = '';
            var params = {
                page: $scope.pager.PageNum,
                pageSizeNo: $scope.model.ItemSize,
                conditions: $scope.Fcondition,
                others: $scope.oCondition,
                items: $scope.ItemName,
                RM: $scope.FiletrRM,
                To: $scope.FiletrTo,
                ids: $scope.Componentids,
                idMake: $rootScope.idMake,
                idModel: $rootScope.idModel,
                idYear: $rootScope.idYear,
                idTrim: $rootScope.idTrim,
                SearchText: $scope.model.SearchText
            }
            $http.get(route.FrontLookup.FilterLeftMenu, { params: params }).success(function (data) {
                $scope.lstParts = data.list;
                $scope.pager = data.pager;

                $rootScope.flag = true;
                $scope.$window.onclick($window.event);
            });
        }
        else {
            return;
        }
    }

    $scope.AddtoCookie = function (o) {
        $.blockUI({ message: '<h3>Loading...</h3>' });
        o.Qty = 1;
        $scope.yourcookie = localStorageService.get('CartItem');

        var blnFlag = true;
        if ($scope.yourcookie != null) {
            for (var i = 0; i < $scope.yourcookie.length; i++) {
                if ($scope.yourcookie[i].id == o.id) {
                    toastr.error("Item is Already in cart");
                    blnFlag = false;
                    $.unblockUI();
                    return;
                }

            }
        }
        else {
            blnFlag = true;
        }
        if (blnFlag == true) {
            AddCart.AddItemToCart(o);
            toastr.success("Product Added to Cart Successfully");
        }

        $.unblockUI();
    }

    $scope.AddtoCart = function (id) {
        var params = {
            id: id,
        };
        $http.get(route.FrontLookup.AddtoCart, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
        });
    }

    $scope.AddtoWishList = function (id) {
        var params = {
            id: id,
        };
        $http.get(route.FrontLookup.AddtoWishList, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                window.location.href = "/Account/Login";
            }
        });
    }

    $scope.GetAllProduct = function () {
        $http.get(route.FrontLookup.GetAllProduct).success(function (data) {
            $scope.list1 = data;
        });
    }

    $scope.FetchProductById = function (o) {
        var params = {
            id: o.id,
        };
        $http.get(route.FrontLookup.FetchProductById, { params: params }).success(function (data) {
            $scope.model.id = data.id;
            $scope.model.idParent = data.idParent;
            $scope.model.Name = data.Name;
            $scope.model.Description = data.Description;
            $scope.model.ImageUrl = data.ImageUrl;
            $scope.model.SKU = data.SKU;
            $scope.model.SKUImageUrl = data.SKUImageUrl;
            $scope.model.RegularPrice = data.RegularPrice;
            $scope.model.SalePrice = data.SalePrice;
            $scope.model.SalePriceDateFrom = data.SalePriceDateFrom;
            $scope.model.SalePriceDateTo = data.SalePriceDateTo;
            $scope.model.ManageStock = data.ManageStock;
            $scope.model.StockQty = data.StockQty;
            $scope.model.StockStatus = data.StockStatus;
            $scope.model.Warranty = data.Warranty;
            $scope.model.Condition = data.Condition;
            $scope.model.AllowBackOrder = data.AllowBackOrder;
            $scope.model.SoldIndividually = data.SoldIndividually;
            $scope.model.Weight = data.Weight;
            $scope.model.VolumeL = data.VolumeL;
            $scope.model.VolumeW = data.VolumeW;
            $scope.model.VolumeH = data.VolumeH;
        });

        $http.get(route.FrontLookup.GetAllProductMetaList, { params: params }).success(function (data) {
            $scope.list2 = data;
        });
    }

    $scope.DeleteProduct = function (o) {
        var params = {
            id: o.id,
        };
        $http.get(route.FrontLookup.DeleteProduct, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllProduct();
        });
    }

    $scope.GetAllProductMetaList = function () {
        var params = {
            id: $scope.model.id
        };
        $http.get(route.FrontLookup.GetAllProductMetaList, { params: params }).success(function (data) {
            $scope.list2 = data;
        });
    }

    $scope.Next = function () {
        window.location.href = "/Cart/ShoppingCart";
    }

    //Close popup at outside click
    $scope.$window = $window;
    $scope.$window.onclick = function (event) {
        if (!angular.isUndefined(event)) {
            if (event.target.id == "Parts") {
                $rootScope.flag = true;
                return;
            }
            if (event.target.id != undefined) {
                if (event.target.id.indexOf("Check") >= 0) {
                    $rootScope.flag = true;
                    return;
                }
            }
        }
        if ($rootScope.flag == true) {
            $rootScope.flag = false;
            $scope.GetFilterData(1);
        }
    };
    //end of outside click
    $scope.init();
}