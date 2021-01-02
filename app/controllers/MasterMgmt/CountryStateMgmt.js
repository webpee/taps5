function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Name: '',
            idCountry: '',
            Country: '',
            ShortName: '',
            Seq: '',
            CountryData: '',
            CreatedBy: '',
            CreatedDate: '',
        };

        $http.get(route.Lookup.GetAllCountry).success(function (data) {
            $scope.Country = data;
        })
        $scope.GetCountryStates();
    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.CountryName) || re.test(obj.Name) || re.test(obj.ShortName) || re.test(obj.Seq);
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


    $scope.GetCountryStates = function () {
        $http.get(route.Lookup.GetAllCountryState).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
        });
    }

    $scope.FetchCountryStateMgmtById = function (o) {
        $scope.model.idCountry = o.idCountry;
        $scope.model.Name = o.Name;
        $scope.model.ShortName = o.ShortName;
        $scope.model.Seq = o.Seq;
        $scope.model.id = o.id;
        $scope.model.CreatedBy = o.CreatedBy;
        $scope.model.CreatedDate = o.CreatedDate;
    }

    $scope.DeleteCountryState = function (id) {
        var params = {
            id: id
        };

        $http.get(route.Lookup.DeleteCountryState, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetCountryStates();
            $scope.Reset();
        });
    }

    $scope.Create = function (o) {
        o.id = $scope.model.id;
        if ($scope.model.CreatedDate != null) {
            o.CreatedDate = $filter('date')($scope.model.CreatedDate.substr(6, 13), "MM/dd/yyyy HH:mm:ss");
        }
        $http.post(route.Lookup.CreateCountryStateMgmt, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetCountryStates();
            $scope.model.id = '';
            $scope.model.Name = '';
            $scope.model.ShortName = '';
            $scope.model.Seq = '';
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}