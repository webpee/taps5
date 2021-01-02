function BlacklistedVehicleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            EngineNo: '',
            ChassisNo: '',
            RegistrationNo: '',
            DateofLoss: '',
            Remarks: '',
            //Date: '',
        };
        var date = new Date();
        $scope.model.DateofLoss = $filter('date')(date, "MM/dd/yyyy");

        $scope.GetAllBlackListedVehicle();
    };
    $scope.SearchText = '';

    $('#date01').change(function () {
        var date = new Date();
        date = $('#date01').val();
        $scope.model.DateofLoss = date;
    });

    $scope.GetAllBlackListedVehicle = function () {
        $http.get(route.Lookup.GetAllBlackListedVehicle).success(function (data) {
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

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.EngineNo) || re.test(obj.RegistrationNo) || re.test(obj.ChassisNo) || re.test(obj.DateofLoss) || re.test(obj.Remarks);
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

    $scope.FetchBlackListedVehicleById = function (o) {

            $scope.model.id = o.id;
            $scope.model.EngineNo = o.EngineNo;
            $scope.model.ChassisNo = o.ChassisNo;
            $scope.model.RegistrationNo = o.RegistrationNo;
            if (o.DateofLoss != null) {
                $scope.model.DateofLoss = o.DateofLoss;
            }
            $scope.model.Remarks = o.Remarks;
    }

    $scope.DeleteBlackListedVehicle = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteBlackListedVehicle, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.GetAllBlackListedVehicle();
            $scope.Reset();
        });
    }

    $scope.CreateBlackListedVehicle = function (o) {
        if ($scope.model.DateofLoss == null || $scope.model.DateofLoss == '') {
            toastr.error("Please Select Date");
            return;
        }
        o.id = $scope.model.id;       
        $http.post(route.Lookup.CreateBlackListedVehicle, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllBlackListedVehicle();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}