function WorkshopMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Name: '',
            idCountry: '',
            idState: '',
            idCity: '',
            Email: '',
            ContactNumber: '',
            CompanyNumber: '',
            Address: '',
            PersonInCharge: '',
            ImageUrl: '',
            Verified: false,
            SearchText2:''
        };
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;

        $scope.GetAllWorkshoplist();

        $http.get(route.Lookup.GetAllCountry).success(function (data) {           
            $scope.Countrylist = data;
        });
        $http.get(route.Lookup.GetAllCountryState).success(function (data) {
            $scope.lstState = data;
        });
        $http.get(route.Lookup.GetAllStateCity).success(function (data) {
            $scope.lstCity = data;
        });
    };

    $scope.GetAllStateByCountry = function () {
        $scope.lstState = '';
        $scope.model.idState = '';
        var params = {
            idCountry: $scope.model.idCountry
        };
        $http.get(route.Lookup.GetAllStateByCountry, { params: params }).success(function (data) {
            $scope.lstState = data;            
        });
    }

    $scope.GetCityByStateId = function () {
        $scope.model.idCity = '';
        $scope.lstCity = '';
        var params = {
            id: $scope.model.idState
        };
        $http.get(route.Lookup.GetCityByStateId, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.lstCity = data;
            }
        });
    }

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.Name) || re.test(obj.ContactNumber) || re.test(obj.Address) || re.test(obj.CountryName) || re.test(obj.StateName) || re.test(obj.CityName) || re.test(obj.Verified);
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
    $scope.GetAllWorkshoplist = function () {
        $http.get(route.Lookup.GetAllWorkshoplist).success(function (data) {
            if(data.length>0){
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10; //num of page displayed
            }
        });
    }

    $scope.FetchWorkshopById = function (o) {
            $scope.model.id = o.id;
            $scope.model.Name = o.Name;
            $scope.model.ImageUrl = o.ImageUrl;
            $scope.model.PersonInCharge = o.PersonInCharge;
            $scope.model.idCountry = o.idCountry;
            $scope.model.idState = o.idState;
            $scope.model.idCity = o.idCity;                  
            $scope.model.ContactNumber = o.ContactNumber;
            $scope.model.CompanyNumber = o.CompanyNumber;
            $scope.model.Email = o.Email;
            $scope.model.Address = o.Address;
            $scope.model.Verified = o.Verified;

            var params = {
                idCountry: o.idCountry
            };
            $http.get(route.Lookup.GetAllStateByCountry, { params: params }).success(function (data) {
                $scope.lstState = data;
                $scope.model.idState = o.idState;
            });

    }

    $scope.DeleteWorkshop = function (o) {
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.DeleteWorkshop, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.GetAllWorkshoplist();
            $scope.Reset();
        });
    }

    $scope.AddNewWorkshope = function (obj) {
        obj.ImageUrl = $scope.model.ImageUrl;

        obj.id = $scope.model.id;
        $http.post(route.Lookup.AddNewWorkshope, obj).success(function (data) {
            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.GetAllWorkshoplist();
            $scope.Reset();
        });
    }


    $scope.FetchMedia = function (page) {
        var params = {
            page: page,
            SearchText: $scope.model.SearchText2
        };
        $http.get(route.Lookup.GetAllMedia, { params: params }).success(function (data) {
            $scope.pager = data.pager;
            $scope.ImageList = data.list;
            //$scope.currentPage = 1;
            //$scope.totalItems = $scope.ImageList.length;
            //$scope.entryLimit = 20; // items per page
            //$scope.noOfPages =5;

            $('#Product').modal('show');
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
        
    $scope.SelectImage = function (Name) {
        $scope.model.ImageUrl = Name;
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}
