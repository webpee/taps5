function SampleCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Name: '',
            idState: '',
            idCountry: '',
            State: '',
            ShortName: '',
            Seq: '',
            CountryData: '',
            CreatedBy: '',
            CreatedDate: '',
        };

        $http.get(route.Lookup.GetAllCountry).success(function (data) {
            $scope.Country = data;
        })
        $http.get(route.Lookup.GetAllCountryState).success(function (data) {
            $scope.lstState = data;
        });
        $scope.GetStateCities();
    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.StateName) || re.test(obj.Name) || re.test(obj.Seq);
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

    $scope.GetAllStateByCountry = function (idCountry) {
        $scope.model.idState = '';
        $scope.lstState = '';
        var params = {
            idCountry: idCountry
        };
        $http.get(route.Lookup.GetAllStateByCountry, { params: params }).success(function (data) {
            $scope.lstState = data;
        });
    }

    $scope.GetStateCities = function () {
        $http.get(route.Lookup.GetAllStateCity).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
        });
    }

    $scope.FetchStateCityMgmtById = function (o) {

        $scope.model.idState = o.idState;
        $scope.model.Name = o.Name;
        $scope.model.ShortName = o.ShortName;
        $scope.model.Seq = o.Seq;
        $scope.model.id = o.id;
        $scope.model.CreatedBy = o.CreatedBy;
        $scope.model.CreatedDate = o.CreatedDate;

        $scope.FetchCountryByStateId();
    }
    $scope.FetchCountryByStateId = function () {
        $scope.model.idCountry = '';
        var params={
            id: $scope.model.idState
        }        
        $http.get(route.Lookup.FetchCountryByStateId, { params: params }).success(function (data) {
            $scope.model.idCountry =data.idCountry;
        });
    }
    $scope.DeleteStateCity = function (id) {
        var params = {
            id: id
        };

        $http.get(route.Lookup.DeleteStateCity, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.GetStateCities();
            $scope.Reset();
        });
    }

    $scope.Create = function (o) {
        o.id = $scope.model.id;
        if (o.CreatedBy != null){
            o.CreatedBy = $scope.model.CreatedBy;
            
        }
        if (o.CreatedDate != null)
        {
            o.CreatedDate = $filter('date')($scope.model.CreatedDate.substr(6, 13), "MM/dd/yyyy HH:mm:ss");
        }
        $http.post(route.Lookup.CreateStateCityMgmt, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetStateCities();
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