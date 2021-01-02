function ModelTrimEngineTransCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idModel: '',
            idTrim: '',
            idEngine: '',
            idTransmission: ''
        };
        $scope.GetAllModelDataTrim();

        $http.get(route.Lookup.GetAllModels).success(function (data) {
            $scope.Model = data;
        });
        $http.get(route.Lookup.getAllTrim).success(function (data) {
            $scope.Trim = data;
        });
        $http.get(route.Lookup.GetAllEngine).success(function (data) {
            $scope.Engine = data;
        });
        $http.get(route.Lookup.GetAllTransmission).success(function (data) {
            $scope.Transmission = data;
        });

    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.ModelName) || re.test(obj.EngineName) || re.test(obj.TrimName) || re.test(obj.TransmissionName);
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

    $scope.GetAllModelDataTrim = function () {
        $http.get(route.Lookup.GetAllModelDataTrim).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
        });
    }

    $scope.FetchModelDataById = function (o) {
        $scope.model.id = o.id;
        $scope.model.idModel = o.idModel;
        $scope.model.idTrim = o.idTrim;
        $scope.model.idEngine = o.idEngine;
        $scope.model.idTransmission = o.idTransmission;
    }

    $scope.DeleteModelEngineTransimission = function (o) {
        var params = {
            id: o.id
        };
        $http.get(route.Lookup.DeleteModelEngineTransimission, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetAllModelDataTrim();
            $scope.Reset();
        });
    }

    $scope.CreateModelEngineTransmission = function (o) {
        o.id = $scope.model.id;
        $http.post(route.Lookup.CreateModelEngineTransmission, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllModelDataTrim();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}