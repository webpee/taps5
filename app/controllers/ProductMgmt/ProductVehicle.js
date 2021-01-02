function ProductVehicleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idProduct: '',
            idMake: '',
            idMakeModel: '',
            idModelTrimTransmission: '',
            idModelYear: '',
            SearchText: ''
        };

        $http.get(route.Lookup.GetAllProductDrop).success(function (data) {
            $scope.Product = data;
        });

        $http.get(route.Lookup.GetAllMakesProduct).success(function (data) {
            $scope.Make = data;
        });

        $http.get(route.Lookup.GetAllModels).success(function (data) {
            $scope.Model = data;
        });

        $http.get(route.Lookup.GetAllModelTransmission).success(function (data) {
            $scope.Transmission = data;
        });

        $http.get(route.Lookup.GetAllYearMgmtByTrim).success(function (data) {
            $scope.Year = data;
        });

        $scope.GetAllProductVehicle(1);
    };

    $scope.CheckSearchText = function () {
        if ($scope.model.SearchText != '') {
            return;
        }
        else {
            $scope.GetAllProductVehicle(1);
        }
    }

    $scope.GetAllProductVehicle = function (page) {

        var params = {
            page: page,
            SearchText: $scope.model.SearchText
        };

        $http.get(route.Lookup.GetAllProductVehicle, { params: params }).success(function (data) {
            $scope.list1 = data.list;
            $scope.pager = data.pager;
        });
    }

    $scope.FetchProductVehicleById = function (o) {
        console.log(o);
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.FetchProductVehicleById, { params: params }).success(function (data) {

            $scope.model.id = data.id;
            $scope.model.idProduct = data.idProduct;
            $scope.model.idMake = data.idMake;
            $scope.model.idMakeModel = data.idMakeModel;
            $scope.model.idModelTrimTransmission = data.idModelTrimTransmission;
            $scope.model.idModelYear = data.idModelYear;
        });
    }

    $scope.DeleteProductVehicle = function (o) {
        var params = {
            Id: o.id,
        };
        $http.get(route.Lookup.DeleteProductVehicle, { params: params }).success(function (data) {
            if (data.success == 1)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            $scope.GetAllProductVehicle();
            $scope.Reset();
        });
    }

    $scope.CreateProductVehicle = function (obj) {
        var pId = $("#ProductId").val().length;
        if (pId > 0) {
            obj.id = $scope.model.id;
            obj.idProduct = $("#ProductId").val();
            console.log(obj);
            $http.post(route.Lookup.CreateProductVehicle,obj).success(function (data) {

                if (data.success == 1) {
                    toastr.success(data.message);
                    $scope.GetAllProductVehicle();
                    $scope.Reset();
                    $("#ProductId").val('');
                    $("#Product").val('');
                }
                else {
                    toastr.error(data.message);
                }               
            });
        }
        else {
            toastr.error("Product Name is required");
            return;
        }
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}