function ComponentCategoryMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idParent: '',
            Name: '',
            idCategory: '',
            Seq: '',
            CreatedBy: '',
            CreatedDate: '',
        };
        $scope.GetAllComponentCategory();

        $http.get(route.Lookup.GetAllCategory).success(function (data) {
            $scope.CategoryList = data;
        });
        $http.get(route.Lookup.GetAllComponentCategory).success(function (data) {
            $scope.Component = data;
        });
       
    };

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.CategoryName) || re.test(obj.Name) || re.test(obj.Seq);
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

    $scope.GetAllComponentCategory = function () {
        $http.get(route.Lookup.GetAllComponentCategory).success(function (data) {
            if(data.length>0){
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
            }
        });
    }

    $scope.FetchComponentByCategory = function () {
        $scope.Component = '';
        $scope.model.idParent = '';       
        var params = {
            id: $scope.model.idCategory
        };       
        $http.get(route.Lookup.FetchComponentByCategory, { params: params }).success(function (data) {            
            $scope.Component = data;
        });
    }

    $scope.FetchComponentCategoryById = function (o) {       
            $scope.model.id = o.id;
            $scope.model.idParent = o.idParent;
            $scope.model.idCategory = o.idCategory;
            $scope.model.Name = o.Name;
            $scope.model.Seq = o.Seq;
            $scope.model.CreatedBy = o.CreatedBy;
            $scope.model.CreatedDate = o.CreatedDate;
    }

    $scope.DeleteComponentCategory = function (o) {
        var params = {
            id: o.id
        };
        $http.get(route.Lookup.DeleteComponentCategory, { params: params }).success(function (data) {
            if (data.success == 1)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            $scope.GetAllComponentCategory();
            $scope.Reset();
        });
    }

    $scope.CreateComponentCategory = function (o) {
        o.id = $scope.model.id;
        if (o.CreatedBy != null) {
            o.CreatedBy = $scope.model.CreatedBy;
        }
        if (o.CreatedDate != null) {
            o.CreatedDate = $filter('date')($scope.model.CreatedDate.substr(6, 13), "MM/dd/yyyy HH:mm:ss");
        }
        $http.post(route.Lookup.CreateComponentCategory, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetAllComponentCategory();
            $scope.Reset();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}