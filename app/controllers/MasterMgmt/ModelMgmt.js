function ModelMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idMake: '',
            Name: '',
            Seq: '',
            CreatedBy: '',
            CreatedDate: '',
        };
        $scope.GetModels();

        $http.get(route.Lookup.GetAllMake).success(function (data) {
            $scope.Make = data;
        });
    };
    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.Make) || re.test(obj.Name) || re.test(obj.Seq);
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

    $scope.GetModels = function () {
        $http.get(route.Lookup.GetAllModels).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
        });
    }

    $scope.FetchModelMgmtById = function (o) {
        $scope.model.id = o.id;
        $scope.model.idMake = o.idMake;
        $scope.model.Seq = o.Seq;
        $scope.model.Name = o.Name;
        $scope.model.CreatedBy = o.CreatedBy;
        $scope.model.CreatedDate = o.CreatedDate;
    }

    $scope.DeleteModelMgmt = function (o) {
        var params = {
            id: o.id
        };
        $http.get(route.Lookup.DeleteModelMgmt, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetModels();
            $scope.Reset();
        });
    }

    $scope.CreateModelMgmt = function (o) {
      
        o.id = $scope.model.id;
        if ($scope.model.CreatedDate != null) {
            o.CreatedDate = $filter('date')($scope.model.CreatedDate.substr(6, 13), "MM/dd/yyyy HH:mm:ss");
        }
        $http.post(route.Lookup.CreateModelMgmt, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetModels();
            $scope.model.id = '';
            $scope.model.Seq = '';
            $scope.model.Name = '';
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}