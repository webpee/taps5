function TransmissionCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Name: '',
            id: '',
            CreatedBy: '',
            CreatedDate: '',
        };
        $scope.GetAllTransmission();
    };
    $scope.SearchText = '';

    $scope.GetAllTransmission = function () {
        $http.get(route.Lookup.GetAllTransmission).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10; //num of page displayed
        });
    }

    $scope.FetchDataById = function (o) {

            $scope.model.Name = o.Name;
            $scope.model.id = o.id;
            $scope.model.CreatedBy = o.CreatedBy;
            $scope.model.CreatedDate = o.CreatedDate;

    }

    $scope.DeleteTransmission = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteTransmission, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllTransmission();
            $scope.Reset();
        });
    }

    $scope.CreateTransmission = function (o) {
        o.id = $scope.model.id;
        if (o.CreatedBy != null && o.CreatedDate != null) {
            o.CreatedBy = $scope.model.CreatedBy;
            o.CreatedDate = $filter('date')($scope.model.CreatedDate.substr(6, 13), "MM/dd/yyyy HH:mm:ss");
        }
        $http.post(route.Lookup.CreateTransmission, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetAllTransmission();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}