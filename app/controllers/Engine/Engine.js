function EngineCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

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
        $scope.GetAllEngine();
    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.Name);
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

    $scope.GetAllEngine = function () {
        $http.get(route.Lookup.GetAllEngine).success(function (data) {
            if (data.length > 0) {
                $scope.list1 = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.list1.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 10; //num of page displayed
            }
        });
    }

    $scope.FetchEngineById = function (o) {  
      
            $scope.model.Name = o.Name;
            $scope.model.id = o.id;
            $scope.model.CreatedBy = o.CreatedBy;
            $scope.model.CreatedDate = o.CreatedDate;

    }

    $scope.DeleteEngineData = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteEngineData, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllEngine();
            $scope.Reset();
        });
    }

    $scope.AddNewEngine = function (o) {
        o.id = $scope.model.id;       
        if (o.CreatedBy != null) {
            o.CreatedBy = $scope.model.CreatedBy;
        }
        if (o.CreatedDate != null) {
            o.CreatedDate = $filter('date')($scope.model.CreatedDate.substr(6, 13), "MM/dd/yyyy HH:mm:ss");
        }
        $http.post(route.Lookup.AddNewEngine, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetAllEngine();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}