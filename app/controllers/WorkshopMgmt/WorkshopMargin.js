function WorkshopMarginCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        var d = new Date();
        $scope.model = {
            id: '',
            SearchText2: '',
            month: (d.getMonth()) + 1,
            year: d.getFullYear(),
        };
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;

        //console.log($scope.model.month);
        //console.log($scope.model.year);

        $scope.GetAllWorkshopMargin();
    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.AuthorizeWorkshopName) || re.test(obj.TotalCommission);
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
    $scope.GetAllWorkshopMargin = function () {
        var params = {
            month: $scope.model.month,
            year: $scope.model.year,
        };
        $http.get(route.Lookup.GetAllWorkshopMargin, { params: params }).success(function (data) {
            //console.log(data);
            if (data != null) {
                $scope.list1 = data.lstWorkshopMargin;
                $scope.ThisMonthTotal = data.ThisMonthTotal;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.list1.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 10; //num of page displayed
            }
        });
    }

    $scope.CheckSearch = function () {
        if ($scope.model.SearchText2 == '') {
            $scope.FetchMedia(1);
        }
        else {
            return;
        }
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}
