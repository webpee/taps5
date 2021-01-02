function ProductMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {
    
    $scope.init = function () {
        $scope.initModel();
        console.log("op");
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idComponent: '',
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

            //Product Meta
            idProduct: '',
            MetaKey: '',
            MetaValue: '',

        };
        $scope.GetAllComponentCategory();

        var date = new Date();
        $scope.model.Date = $filter('date')(date, "dd-MM-yyyy") + ' - ' + $filter('date')(date, "dd-MM-yyyy");
                
        $scope.GetAllProduct();
    };
    $scope.SearchText = '';

    $scope.GetAllComponentCategory = function () {
        console.log('asd');
        $http.get(route.Lookup.GetAllComponentCategory).success(function (data) {
            $scope.list1 = data;
        });
    }
    

    //Date Ranger
    var d = new Date();
    $('input[name="dateranger"]').daterangepicker(
       {
           format: 'DD-MM-YYYY',
           startDate: d,
           endDate: d
       },
       function (start, end, label) {
           $scope.model.SalePriceDateFrom = start.format('MM/DD/YYYY');
           $scope.model.SalePriceDateTo = end.format('MM/DD/YYYY');
       });
    //End of Date Ranger

    //$scope.FetchMedia = function () {
    //    $http.get(route.Lookup.GetAllMedia).success(function (data) {
    //        $scope.ImageList = data;
    //        $('#Product').modal('show');
    //    });
    //}

    $scope.SelectImage = function (Name) {
        $scope.model.ImageUrl = Name;        
    }

    $scope.SelectImageSKU = function (Name) {
        $scope.model.SKUImageUrl = Name;
        $('#Product').modal('hide');
    }
    

    $scope.GetAllProduct = function () {
        $http.get(route.Lookup.GetAllProduct).success(function (data) {
            $scope.list1 = data;
        });
    }


    $scope.FetchProductById = function (o) {
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.FetchProductById, { params: params }).success(function (data) {
            $scope.model.id = data.id;
            $scope.model.idComponent = data.idComponent;
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
            $scope.model.AllowBackOrder = data.AllowBackOrder;
            $scope.model.SoldIndividually = data.SoldIndividually;
            $scope.model.Weight = data.Weight;
            $scope.model.VolumeL = data.VolumeL;
            $scope.model.VolumeW = data.VolumeW;
            $scope.model.VolumeH = data.VolumeH;
        });

        $http.get(route.Lookup.GetAllProductMetaList, { params: params }).success(function (data) {
            $scope.list2 = data;
        });
    }

    $scope.DeleteProduct = function (o) {
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.DeleteProduct, { params: params }).success(function (data) {
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

    $scope.CreateProduct = function (obj) {

        if ($('input[name="dateranger"]').val() === '') {
            $scope.model.SalePriceDateFrom = '';
            $scope.model.SalePriceDateTo = '';
            toastr.error('Please Select Date');
            return;
        }

        if ($scope.model.SalePriceDateFrom === '' && $scope.model.SalePriceDateTo === '') {
            $scope.model.SalePriceDateFrom = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + d.getFullYear();
            $scope.model.SalePriceDateTo = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + d.getFullYear();
        }

        obj.id = $scope.model.id;

        $http.post(route.Lookup.CreateProduct, obj).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }

            $scope.GetAllProduct();
            $scope.Reset();
        });
    }

    //Product Meta
    $scope.CreateProductMeta = function (o) {
        o.idProduct = $scope.model.id;

        if (o.idProduct == '') {
            toastr.error("Please Select the Product");
            return;
        }
        $http.post(route.Lookup.CreateProductMeta, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            o.idProduct = '';
            o.MetaKey = '';
            o.MetaValue = '';
            $scope.GetAllProductMetaList();
        });
    }

    $scope.UpdateProductMeta = function (o) {

        o.idProduct = $scope.model.id;

        $http.post(route.Lookup.UpdateProductMeta, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetAllProductMetaList();
        });
    }

    $scope.GetAllProductMetaList = function () {
        var params = {
            id: $scope.model.id
        };
        $http.get(route.Lookup.GetAllProductMetaList, { params: params }).success(function (data) {
            $scope.list2 = data;
        });
    }

    $scope.DeleteProductMeta = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteProductMeta, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }

            $scope.GetAllProductMetaList();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}