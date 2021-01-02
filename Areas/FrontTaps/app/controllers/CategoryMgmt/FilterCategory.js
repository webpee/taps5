function FilterCategoryCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, localStorageService, $filter, $rootScope) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {

        $scope.model = {
            id: '',
            Name: '',
            idCategory: '',
            Component: ''
        };
        $rootScope.flag = false;

        $rootScope.componentID = [];

        $scope.FilterCategoryByBodyGroup();
        $scope.FilterCategoryByElectricalGroup();
        $scope.FilterCategoryByEngine();
        $scope.FilterCategoryByPowerTrain();
    };

    $scope.FillComponent = function () {
        $rootScope.Component = $scope.model.Component;
    }


    $scope.FilterCategoryByBodyGroup = function () {
        if (localStorageService.get('BodyGroupList') != null) {
            $scope.BodyGroup = localStorageService.get('BodyGroupList');
            $scope.UpdatedDate1 = $filter('date')($scope.BodyGroup[0].UpdatedDate.substr(6, 13), "MM dd yyyy HH:mm:ss");
        }

        var params = {
            UpdatedDate: $scope.UpdatedDate1
        }

        $http.get(route.FrontLookup.FilterCategoryByBodyGroup, { params: params }).success(function (data) {
            if (data.length > 0) {
                localStorageService.set('BodyGroupList', data);
                $rootScope.list1 = data;
            }
            else {
                $rootScope.list1 = $scope.BodyGroup;
            }
        });
    }


    $scope.FilterCategoryByElectricalGroup = function () {
        if (localStorageService.get('ElectricalGroupList') != null) {
            $scope.ElectricalGroup = localStorageService.get('ElectricalGroupList');
            $scope.UpdatedDate2 = $filter('date')($scope.ElectricalGroup[0].UpdatedDate.substr(6, 13), "MM dd yyyy HH:mm:ss");
        }

        var params = {
            UpdatedDate: $scope.UpdatedDate2
        }

        $http.get(route.FrontLookup.FilterCategoryByElectricalGroup, { params: params }).success(function (data) {
            if (data.length > 0) {
                localStorageService.set('ElectricalGroupList', data);
                $rootScope.list2 = data;
            }
            else {
                $rootScope.list2 = $scope.ElectricalGroup;
            }
        });
    }

    $scope.FilterCategoryByEngine = function () {
        
        if (localStorageService.get('EngineList') != null) {
            $scope.Engine = localStorageService.get('EngineList');
            $scope.UpdatedDate3 = $filter('date')($scope.Engine[0].UpdatedDate.substr(6, 13), "MM dd yyyy HH:mm:ss");
        }

        var params = {
            UpdatedDate: $scope.UpdatedDate3
        }
        $http.get(route.FrontLookup.FilterCategoryByEngine, { params: params }).success(function (data) {
            if (data.length > 0) {
                localStorageService.set('EngineList', data);
                $rootScope.list3 = data;
            }
            else {
                $rootScope.list3 = $scope.Engine;
            }
        });
    }

    $scope.FilterCategoryByPowerTrain = function () {
        if (localStorageService.get('PowerTrainList') != null) {
            $scope.PowerTrain = localStorageService.get('PowerTrainList');
            $scope.UpdatedDate4 = $filter('date')($scope.PowerTrain[0].UpdatedDate.substr(6, 13), "MM dd yyyy HH:mm:ss");
        }

        var params = {
            UpdatedDate: $scope.UpdatedDate4
        }

        $http.get(route.FrontLookup.FilterCategoryByPowerTrain, { params: params }).success(function (data) {
            if (data.length > 0) {
                localStorageService.set('PowerTrainList', data);
                $rootScope.list4 = data;
            }
            else {
                $rootScope.list4 = $scope.PowerTrain;
            }
        });
    }

    //$scope.ParentList1 = function (id) {
    //    var list = _.where($scope.list1, { idParent: id });
    //    if (list.length == 0) {
    //        return false;
    //    }
    //    else {
    //        return true;
    //    }

    //}

    $scope.ParentList1 = function (id) {
        var list = _.where($scope.list1, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }
    $scope.ParentList2 = function (id) {
        var list = _.where($scope.list2, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }
    $scope.ParentList3 = function (id) {
        var list = _.where($scope.list3, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }
    $scope.ParentList4 = function (id) {
        var list = _.where($scope.list4, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }

    $scope.ClearFilter = function (o) {
        for (var i = 0; i < $rootScope.componentID.length; i++) {
            if ($rootScope.componentID[i].id === o.id) {
                $rootScope.componentID.splice(i, 1);
                $('#Check' + o.id).attr('checked', false);
                return $rootScope.componentID;
            }
        }
    }

    $scope.asd = function (id1, name1) {
        var So =
                 {
                     id: id1,
                     name: name1
                 };
        $rootScope.componentID.push(So);
    }

    $scope.GetName = function (id1) {
        var list1 = _.where($scope.list1, { id: parseInt(id1) });
        if (list1.length != 0) {
            return list1[0].Name;
        }

        var list2 = _.where($scope.list2, { id: parseInt(id1) });
        if (list2.length != 0) {
            return list2[0].Name;
        }

        var list3 = _.where($scope.list3, { id: parseInt(id1) });
        if (list3.length != 0) {
            return list3[0].Name;
        }

        var list4 = _.where($scope.list4, { id: parseInt(id1) });
        if (list4.length != 0) {
            return list4[0].Name;
        }

    }

    $scope.GetFilterData = function () {        
        $rootScope.flag = !$rootScope.flag;
        if ($scope.model.flag == false) {


            $rootScope.componentID = [];
            sval = $('.form').serialize();

            var qwe;
            if (sval == '')
                return;
            else
                qwe = sval.split('&');

            $scope.ids = null;

            for (i = 0; i < qwe.length; i++) {
                if ($scope.ids == null) {
                    $scope.ids = qwe[i].split('=')[1];
                    $scope.asd($scope.ids, $scope.GetName($scope.ids));

                }
                else {
                    $scope.ids = qwe[i].split('=')[1];
                    $scope.asd($scope.ids, $scope.GetName($scope.ids));
                }
            }            

            $scope.Componentids = [];

            for (var i = 0; i < $rootScope.componentID.length; i++) {
                $scope.Componentids.push($rootScope.componentID[i].id);
            }

            if ($scope.Componentids != null) {
                var params = {
                    ids: $scope.Componentids
                }
                $http.get(route.FrontLookup.FilterComponent, { params: params }).success(function (data) {
                });
            }
            else {
                return;
            }
        }
    };
    $scope.init();
}