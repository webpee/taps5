function ModelYearMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idModel: '',
            idTrim: '',
            idEngine: '',
            idTransmission: '',
            idYear: '',
        };
        $scope.GetAllModelYear();

        $http.get(route.Lookup.GetAllModels).success(function (data) {
            $scope.Model = data;
        });
        $http.get(route.Lookup.getAllTrim).success(function (data) {
            $scope.Trim = data;
        });
        $http.get(route.Lookup.GetAllEngine).success(function (data) {
            $scope.EngineName = data;
        });
        $http.get(route.Lookup.GetAllTransmission).success(function (data) {
            $scope.TransmissionName = data;
        });
        $http.get(route.Lookup.GetAllYear).success(function (data) {
            $scope.Year = data;
        });
    };
    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.ModelName) || re.test(obj.TrimName) || re.test(obj.EngineName) || re.test(obj.TransmissionName) || re.test(obj.Year);
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

    $scope.GetAllModelYear = function () {
        $http.get(route.Lookup.GetAllModelYear).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10; //num of page displayed
        });
    }

    $scope.FetchModelYearById = function (o) {
        $scope.model.id = o.id;
        $scope.model.idModel = o.idModel;
        $scope.model.idTrim = o.idTrim;
        $scope.model.idEngine = o.idEngine;
        $scope.model.idTransmission = o.idTransmission;
        $scope.model.idYear = o.idYear;
    }

    $scope.DeleteModelYear = function (o) {
        var params = {
            id: o.id
        };
        $http.get(route.Lookup.DeleteModelYear, { params: params }).success(function (data) {
            if (data.success == 1)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            $scope.GetAllModelYear();
            $scope.Reset();
        });
    }

    $scope.CreateModelYear = function (o) {
        o.id = $scope.model.id;
        $http.post(route.Lookup.CreateModelYear, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetAllModelYear();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}