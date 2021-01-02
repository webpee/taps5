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
            idModelTrim: '',
            idModelYear: '',
        };
        $http.get(route.Lookup.GetAllProduct).success(function (data) {
            $scope.Product = data;
        });

        $http.get(route.Lookup.GetAllMake).success(function (data) {
            $scope.Make = data;
        });
        $http.get(route.Lookup.GetAllModels).success(function (data) {
            $scope.Model = data;
        });

        $http.get(route.Lookup.getAllTrim).success(function (data) {
            $scope.Trim = data;
        });

        $http.get(route.Lookup.GetAllYear).success(function (data) {
            $scope.Year = data;
        });

        $scope.GetAllProductVehicle();
    };
    $scope.SearchText = '';

    $scope.GetAllProductVehicle = function () {
        $http.get(route.Lookup.GetAllProductVehicle).success(function (data) {
            $scope.list1 = data;
        });
    }

    $scope.FetchProductVehicleById = function (o) {
 
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.FetchProductVehicleById, { params: params }).success(function (data) {

            $scope.model.id = data.id;
            $scope.model.idProduct = data.idProduct;
            $scope.model.idMake = data.idMake;
            $scope.model.idMakeModel = data.idMakeModel;
            $scope.model.idModelTrim = data.idModelTrim;
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
        });
    }

    $scope.CreateProductVehicle = function (obj) {
        console.log(obj);
        obj.id = $scope.model.id;
        $http.post(route.Lookup.CreateProductVehicle, obj).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }

            $scope.GetAllProductVehicle();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}