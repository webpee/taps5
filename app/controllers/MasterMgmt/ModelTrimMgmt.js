function ModelTrimMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idModel: '',
            idTrim: '',
            Seq: '',
            CreatedBy: '',
            CreatedDate: '',
        };
        $http.get(route.Lookup.GetAllModels).success(function (data) {
            $scope.Model = data;
        });

        $http.get(route.Lookup.getAllTrim).success(function (data) {
            $scope.Trim = data;
        });

        $scope.GetAllModelTrims();
    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.ModelName) || re.test(obj.TrimName) || re.test(obj.Seq);
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

    $scope.GetAllModelTrims = function () {
        $http.get(route.Lookup.GetAllModelTrims).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
        });
    }

    $scope.FetchModelTrimById = function (o) {

        $scope.model.idModel = o.idModel;
        $scope.model.idTrim = o.idTrim;
        $scope.model.Seq = o.Seq;
        $scope.model.id = o.id;
        $scope.model.CreatedBy = o.CreatedBy;
        $scope.model.CreatedDate = o.CreatedDate;
    }

    $scope.DeleteModelTrim = function (o) {
        var params = {
            Id: o.id,
        };
        $http.get(route.Lookup.DeleteModelTrim, { params: params }).success(function (data) {
            if (data.success == 1)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            $scope.GetAllModelTrims();
            $scope.Reset();
        });
    }

    $scope.CreateModelMgmt = function (obj) {
        
        obj.id = $scope.model.id;
        if ($scope.model.CreatedDate != null) {
            obj.CreatedDate = $filter('date')($scope.model.CreatedDate.substr(6, 13), "MM/dd/yyyy HH:mm:ss");
        }
        $http.post(route.Lookup.CreateModelTrim, obj).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }

            $scope.GetAllModelTrims();
            $scope.model.id = '';
            $scope.model.idTrim = '';
            $scope.model.Seq = '';
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}