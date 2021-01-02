function TrimMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Trim: '',
            CreatedBy: '',
            CreatedDate: '',
        };
        $scope.GetTrimList();
    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.Trim);
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

    $scope.GetTrimList = function () {

        $http.get(route.Lookup.getAllTrim).success(function (data) {
            if (data.length > 0) {
                $scope.list1 = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.list1.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 10;
            }
            
        });
    }
   
    $scope.FetchTrimById = function (o) {   
    
            $scope.model.Trim = o.Trim;
            $scope.model.id = o.id;
            $scope.model.CreatedBy = o.CreatedBy;
            $scope.model.CreatedDate = o.CreatedDate;
    
    }

    $scope.DeleteTrim = function (o) {
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.DeleteTrim, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetTrimList();
            $scope.Reset();
        });
    }

    $scope.Create = function (obj) {
        obj.id = $scope.model.id;      
        if (obj.CreatedBy != null) {
            obj.CreatedBy = $scope.model.CreatedBy;
        }
        if (obj.CreatedDate != null) {
            obj.CreatedDate = $filter('date')($scope.model.CreatedDate.substr(6, 13), "MM/dd/yyyy HH:mm:ss");
        }
        $http.post(route.Lookup.CreateTrim, obj).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetTrimList();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}