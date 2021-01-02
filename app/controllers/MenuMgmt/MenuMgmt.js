function MenuMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Pageid: '',
            MenuLabel: '',
            TitleAttribute: '',
            MenuURL: '',
            Parent: '',
            Location: '',
            Name: '',
            PageType: '',
            idMenu: '',
            MetaKey: '',
            MetaValue: '',
            Pageids: ''
        };
        $http.get(route.Lookup.GetAllPageMgmt).success(function (data) {
            $scope.Pagelist = data;
        });
        $http.get(route.Lookup.GetMenuList).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10; //num of page displayed
        });
    };
    $scope.SearchText = '';

    $scope.checkAll = function () {
        $scope.model.Pageids = $scope.Pageids.map(function (item) { return item.id; });
    };
    $scope.uncheckAll = function () {
        $scope.model.Pageids = [];
    };
    $scope.checkFirst = function () {
        $scope.model.Pageids.splice(0, $scope.user.roles.length);
        $scope.model.Pageids.push(1);
    };

    $scope.GetAllMenuStructure = function (id) {
        var params = {
            id: $scope.model.idMenu,
        };
        $http.get(route.Lookup.GetAllMenuStructure, { params: params }).success(function (data) {
            $scope.MenuStructureList = data;
        });
    }

    $scope.AddMenuStructure = function (o) {
        if (blnfalg == true) {
            var array = {
                item_id: o.id,
                parent_id: 0,
                title: o.Title,
                depth: '',
                left: '',
                right: ''
            };
            for (var i = 0; i < $scope.FinalData.length; i++) {
                if ($scope.FinalData[i].item_id == o.id) {
                    $scope.FinalData.splice(i, 1);
                    return;
                }
            }
            $scope.FinalData.push(array);
        }
    }

    $('.dd').on('change', function () {
        $scope.Hierarcy = $('.dd').nestable('serialize');
    });


    $('#toArray').click(function (e) {
        if ($scope.model.idMenu == '') {
            toastr.error("Please Select Menu");
            return;
        }

        $scope.MenuList = $('ol.sortable').nestedSortable('toArray', { startDepthCount: 0 });
        $scope.MenuList = JSON.stringify($scope.MenuList);

        var params = {
            id: $scope.model.idMenu,
            MenuList: $scope.MenuList
        };
        $http.get(route.Lookup.CreateMenuStructure, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                //$scope.GetAllMenuStructure();
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
        });
    })

    $scope.FinalData = [];
    var blnfalg = true;

    $scope.SelectMenuStructure = function () {
        if ($scope.model.idMenu == undefined) {
            window.location.reload();
            return;
        }

        var params = {
            id: $scope.model.idMenu
        };
        $http.get(route.Lookup.FetchMenuStructureById, { params: params }).success(function (data) {
            $scope.Data = data;
            $scope.FinalData = $scope.Data;
            for (var i = 0; i < $scope.Pagelist.length; i++) {
                if (document.getElementById($scope.Pagelist[i].id).checked == true) {
                    document.getElementById($scope.Pagelist[i].id).checked = false;
                    //$('#' + $scope.FinalData[i].item_id).click();
                }
            }
            for (var i = 0; i < $scope.FinalData.length; i++) {
                if (document.getElementById($scope.FinalData[i].item_id).checked == false) {
                    document.getElementById($scope.FinalData[i].item_id).checked = true;
                    //$('#' + $scope.FinalData[i].item_id).click();
                }
            }
            blnfalg = true;

        });
        $scope.GetAllMenuStructure();
        $scope.GetAllMenuMetaList();
    }

    $scope.UpdateMenuStructure = function (o) {
        console.log(o);
        var params = {
            id: o.MenuStructureId,
            NavigationLabel: o.NavigationLabel,
            TitleAttribute: o.TitleAttribute
        };
        $http.get(route.Lookup.UpdateMenuStructure, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllMenuStructure();
            //$scope.GetAllMenuMetaList();

        });
    }

    $scope.DeleteMenuStructure = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteMenuStructure, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.GetAllMenuStructure();
            $scope.SelectMenuStructure();
            //$scope.GetAllMenuMetaList();
        });
    }


    $scope.FetchMenuById = function (o) {       
            $scope.model.id = o.id;
            $scope.model.TitleAttribute = o.TitleAttribute;
            $scope.model.MenuURL = o.MenuURL;
            $scope.model.MenuLabel = o.MenuLabel;
            $scope.model.Location = o.Location;
            $scope.model.Name = o.Name;
            $scope.model.PageType = o.PageType;
            $scope.model.Parent = o.Parent;
            $scope.model.Pageid = o.Pageid;

            $scope.GetAllMenuMetaList();   

    }

    $scope.DeleteMenu = function () {

        var params = {
            Menuid: $scope.model.idMenu
        };
        $http.get(route.Lookup.DeleteMenu, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
                setTimeout("window.location.reload()", 1000);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.Reset();
        });
    }

    $scope.CreateMenu = function (o) {

        o.id = $scope.model.id;

        $http.post(route.Lookup.CreateMenu, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $('#CreateMenu').modal('hide');
            //setTimeout("window.location.reload()", 3000);
            $scope.Reset();
        });
    }


    //Menu meta Management

    $scope.GetAllMenuMetaList = function () {
        var params = {
            id: $scope.model.idMenu
        };
        $http.get(route.Lookup.GetAllMenuMetaList, { params: params }).success(function (data) {
            $scope.MenuMetaList = data;
        });
    }

    $scope.UpdateMenuMeta = function (o) {
        o.idMenu = $scope.model.idMenu;

        $http.post(route.Lookup.UpdateMenuMeta, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllMenuMetaList();

        });
    }

    $scope.DeleteMenuMeta = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteMenuMeta, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.GetAllMenuMetaList();
        });
    }

    $scope.CreateMenuMeta = function (o) {
        o.idMenu = $scope.model.idMenu;
        $http.post(route.Lookup.CreateMenuMeta, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.error == 0) {
                toastr.error(data.message);
            }
            o.MetaKey = '';
            o.MetaValue = '';
            $scope.GetAllMenuMetaList();
        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}