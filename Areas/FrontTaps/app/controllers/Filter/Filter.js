function FilterCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, $cookieStore, localStorageService) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $rootScope.model = {
            id: '',
            Vehicle: '',
            Model: '',
            Year: '',
            Trim: '',
            Make: '',
            IdFilter: false,
            idmodel: '',
            VehicleDetails: '',
            YearName: '',
            RegistrationNumber: ''
        };

        //Set Filtered Data
        $scope.filterData = localStorageService.get('filteredData');
        if ($scope.filterData != null) {
            $scope.model.Make = $scope.filterData.Make;
            $scope.FillModelData($scope.model.Make);
            $scope.model.Model = $scope.filterData.Model;
            $scope.GetVehicles($scope.model.Model);
            $scope.model.VehicleDetails = $scope.filterData.VehicleDetails;
            $scope.showFilter();
            $rootScope.idTrim = $scope.model.VehicleDetails;
            var params = {
                id: $scope.model.VehicleDetails
            }
            $http.get(route.FrontLookup.FetchTransmissionYearLst, { params: params }).success(function (data) {
                if (data.length > 0) {
                    $rootScope.lstYearData = data;
                    $rootScope.model.Year = $scope.filterData.Year;
                    $scope.SetYear($scope.filterData.Year);
                }
            });

            $scope.model.Year = $scope.filterData.Year;
        }
        //End of Set Filtered Data

        $http.get(route.FrontLookup.GetAllMake).success(function (data) {
            $scope.lstGetAllMake = data;
        });
    };

    $scope.GetVehicles = function () {
        $rootScope.idModel = $rootScope.model.Model;
        $rootScope.model.VehicleDetails = '';
        $rootScope.lstYearData = '';
        $rootScope.model.Year = '';
        if ($rootScope.model.Model > 0) {
            var params = {
                id: $rootScope.model.Model
            }
            $http.get(route.FrontLookup.GetVehicles, { params: params }).success(function (data) {
                console.log(data);
                if (data.length > 0) {
                    $rootScope.lstVehicle = data;
                }
            });
        }
        else {
            $rootScope.model.VehicleDetails = '';
            $rootScope.lstYearData = '';
            $rootScope.model.Year = '';
            $rootScope.lstVehicle = '';
        }
    }

    $scope.selectedvehicle = function (vl) {
        $scope.selectedv = vl.make + " " + vl.modelname + " " + vl.trimname + " " + vl.enginename;
    }

    $scope.FillModelData = function () {
        $rootScope.idMake = $rootScope.model.Make;
        $rootScope.model.Model = '';
        $rootScope.model.VehicleDetails = '';
        $rootScope.lstYearData = '';
        $rootScope.lstVehicle = '';
        $rootScope.model.Year = '';
        if ($rootScope.model.Make > 0) {
            var params = {
                id: $rootScope.model.Make
            };
            $http.get(route.FrontLookup.GetModelData, { params: params }).success(function (data) {
                if (data.length > 0) {
                    //$scope.lstGetModel = data;
                    $rootScope.lstGetModel = data;
                    console.log($rootScope.lstGetModel);
                }
            });
        }
        else {
            $rootScope.model.Model = '';
            $rootScope.model.VehicleDetails = '';
            $rootScope.lstYearData = '';
            $rootScope.lstVehicle = '';
            $rootScope.model.Year = '';
        }
    }

    $scope.GetTrimId = function () {
        $rootScope.idTrim = $rootScope.model.Trim;
    }

    //show another filter AnyYear and AnyTrim
    $scope.showFilter = function () {
        $rootScope.idTrim = $rootScope.model.VehicleDetails;

        if ($rootScope.model.VehicleDetails.length > 0) {
            var params = {
                id: $rootScope.model.VehicleDetails
            }
            $http.get(route.FrontLookup.FetchTransmissionYearLst, { params: params }).success(function (data) {
                if (data.length > 0) {
                    $rootScope.lstYearData = data;
                }
            });
        }
        else {
            $rootScope.lstYearData = '';
            $rootScope.model.Year = '';
        }
    }

    $scope.SetYear = function (id) {
        var lst = _.where($rootScope.lstYearData, { idYear: parseInt(id) });
        $rootScope.model.YearName = lst[0].Year;
        $rootScope.idYear = id;

        //Set filter data
        $scope.filteredData = {
            Make: $scope.model.Make,
            Model: $scope.model.Model,
            VehicleDetails: $scope.model.VehicleDetails,
            Year: $scope.model.Year,
        };
        localStorageService.add('filteredData', $scope.filteredData);
        //End of Set filter data
    }

    //fetch Trim list by idYear   
    $scope.GetAllTrimByYearId = function (idm) {
        $rootScope.idYear = idm;
        $rootScope.model.Trim = '';
        if (idm.length > 0) {
            var params = {
                id: idm
            }
            $http.get(route.FrontLookup.GetAllTrimByYearId, { params: params }).success(function (data) {
                if (data.length > 0) {
                    $scope.lstTrimData = data;
                    $rootScope.idTrim = "";
                }
            });
        }
    }

    $rootScope.FillModelDataByMake = function (idMake, idModel) {
        $rootScope.idMake = idMake;
        var params = {
            id: idMake
        };
        $http.get(route.FrontLookup.GetModelData, { params: params }).success(function (data) {
            if (data.length > 0) {
                $rootScope.lstGetModel = data;
                $rootScope.model.Model = idModel;
                $rootScope.idModel = idModel;
            }
        });
    }

    $rootScope.GetVehiclesByModel = function (idModel, idVehicleDetail) {
        var params = {
            id: idModel
        }
        $http.get(route.FrontLookup.GetVehicles, { params: params }).success(function (data) {
            if (data.length > 0) {
                $rootScope.lstVehicle = data;
                
                $rootScope.model.VehicleDetails = idVehicleDetail;
            }
        });
    }

    $rootScope.showFilterByVehicle = function (idVehicleDetail, idYear) {
        $rootScope.idTrim = idVehicleDetail;
        var params = {
            id: idVehicleDetail
        }
        $http.get(route.FrontLookup.FetchTransmissionYearLst, { params: params }).success(function (data) {
            if (data.length > 0) {
                $rootScope.lstYearData = data;
                $rootScope.model.Year = idYear;
                $scope.SetYear(idYear);
            }
        });
    }

    $rootScope.ClearBeforeSelect = function () {
        $rootScope.model.Make = '';
        $rootScope.model.Model = '';
        $rootScope.model.Year = '';
        $rootScope.model.Trim = '';
        $rootScope.model.YearName = '';
        $rootScope.model.VehicleDetails = '';
        $rootScope.lstVehicle = '';
        $rootScope.lstYearData = '';
        $rootScope.idMake = "";
        $rootScope.idModel = "";
        $rootScope.idYear = "";
        $rootScope.idTrim = "";
    }

    $rootScope.SelectVehicle = function () {
        $rootScope.ClearBeforeSelect();
        var params = {
            RegistrationNumber: $scope.model.RegistrationNumber,
        };

        $http.get(route.FrontLookup.SelectVehicle, { params: params }).success(function (data) {
            if (data.Error == undefined) {
                $rootScope.model.Make = data.idMake;
                $scope.FillModelData(data.idMake);
                $rootScope.model.Model = data.idModel;
                $rootScope.idModel = data.idModel;
                $rootScope.GetVehiclesByModel(data.idModel, data.idVehicleDetail);
                $rootScope.showFilterByVehicle(data.idVehicleDetail, data.idYear);
                if (data.idYear != null) {
                    $rootScope.idYear = data.idYear;
                }
                else {
                    $rootScope.lstYearData = '';
                    $rootScope.model.Year = '';
                    $rootScope.model.YearName = '';
                }
            }
            else {
                $rootScope.ClearBeforeSelect();
                toastr.error("No Vehicle Model Found.");
            }
        });
    }

    $scope.Reset = function () {
        localStorageService.add('filteredData', null);
        $scope.init();
        $rootScope.idMake = "";
        $rootScope.idModel = "";
        $rootScope.idYear = "";
        $rootScope.idTrim = "";

        var url = window.location.pathname;
        //if (url == "/Parts/Parts") {
        $rootScope.FilterLeftMenu();
        //}
    }
    $scope.ClearData = function () {
        $rootScope.model.Make = '';
        $rootScope.model.Model = '';
        $rootScope.model.Year = '';
        $rootScope.model.Trim = '';
        $rootScope.model.YearName = '';
        $rootScope.model.VehicleDetails = '';
        $rootScope.lstVehicle = '';
        $rootScope.lstYearData = '';
    }

    $scope.init();
}