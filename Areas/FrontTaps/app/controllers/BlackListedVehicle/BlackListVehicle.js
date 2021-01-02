function BlacklistCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            EngineNo: '',
            ChassisNo: '',
            RegistrationNo: '',
            // DateofLoss: '',
            Remarks: '',
            //Date: '',
        };
        //var date = new Date();
        //$scope.model.DateofLoss = $filter('date')(date, "MM/dd/yyyy");

        $scope.GetAllBlackListedVehicle();
    };
    $scope.SearchText = '';

    //$('#date01').change(function () {
    //    var date = new Date();
    //    date = $('#date01').val();
    //    $scope.model.DateofLoss = date;
    //});

    $scope.GetAllBlackListedVehicle = function () {
        $http.get(route.FrontLookup.GetAllBlackListedVehicle).success(function (data) {
            if (data.length > 0) {
                for (i = 0; i < data.length ; i++) {
                    if (data[i].DateofLoss != null) {
                        data[i].DateofLoss = $filter('date')(data[i].DateofLoss.substr(6, 13), "MM/dd/yyyy");
                    }
                }
            }
            $scope.list1 = data;
            $scope.ListFinal = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10; //num of page displayed
        });
    }

    $scope.FilterBlackListedVehicle = function (obj) {
        if (obj.EngineNo != "" || obj.RegistrationNo != "" || obj.ChassisNo != "") {
            var params = {
                EngineNo: obj.EngineNo,
                RegistrationNo: obj.RegistrationNo,
                ChassisNo: obj.ChassisNo
            }

            $http.get(route.FrontLookup.FilterBlackListedVehicle, { params: params }).success(function (data) {
                if (data.length > 0) {
                    for (i = 0; i < data.length ; i++) {
                        if (data[i].DateofLoss != null) {
                            data[i].DateofLoss = $filter('date')(data[i].DateofLoss.substr(6, 13), "MM/dd/yyyy");
                        }
                    }
                }
                $scope.list1 = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.list1.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 10; //num of page displayed
            });
        }
        else {
            $scope.GetAllBlackListedVehicle();
        }
    }

    $scope.BlankSearch = function (check) {
        if (check == 1) {
            $scope.model.RegistrationNo = '';
            $scope.model.ChassisNo = '';
        }
        else if (check == 2) {
            $scope.model.EngineNo = '';
            $scope.model.ChassisNo = '';
        }
        else {
            $scope.model.EngineNo = '';
            $scope.model.RegistrationNo = '';
        }
        if ($scope.model.EngineNo == '' && $scope.model.RegistrationNo == '' && $scope.model.ChassisNo == '') {
            $scope.list1 = $scope.ListFinal;
        }

    }


    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}