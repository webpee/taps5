function VendorCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            VendorCode: '',
            CompanyName: '',
            RegistrationNo: '',
            BillingAddress1: '',
            BillingAddress2: '',
            BillingAddress3: '',
            BillingAddress4: '',
            PostCode: '',
            Phone1: '',
            Phone2: '',
            Fax1: '',
            Fax2: '',
            Area: '',
            Email: '',
            VendorWebsite: '',
            Attension: '',
            BusinessNature: '',
            Agent: '',
            Currency: '',
            BranchWarehouseLocation: '',
            BranchCode: '',
            BranchName: '',
            BranchAddress1: '',
            BranchAddress2: '',
            BranchAddress3: '',
            BranchAddress4: '',
            BranchPostCode: '',
            BranchAttension: '',
            BranchPhone1: '',
            BranchPhone2: '',
            BranchFax1: '',
            BranchFax2: '',
            BranchAgent: '',
            BranchArea: '',
            BranchEmail: '',
            UserName: '',
            Password: '',
            show: false,
            idUser: ''
        };
        $scope.GetAllVendor();
    };
    $scope.SearchText = '';

    $scope.GetAllVendor = function () {
        $http.get(route.Lookup.GetAllVendor).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10; //num of page displayed
        });
    }

    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.VendorCode) || re.test(obj.CompanyName) || re.test(obj.RegistrationNo) || re.test(obj.BillingAddress1) || re.test(obj.PostCode) || re.test(obj.Phone1) || re.test(obj.Phone2) || re.test(obj.Fax1) || re.test(obj.Fax2) || re.test(obj.Area) || re.test(obj.Email);
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

    $scope.CheckUserName = function () {
        if ($scope.model.UserName != null) {
            var params = {
                UserName: $scope.model.UserName
            };
            $http.get(route.Lookup.CheckUserName, { params: params }).success(function (data) {
                if (data == 'true') {
                    toastr.error("UserName is Already Exist.Please Select Another one");
                }
            });
        }
        else
            return;
    }

    $scope.FetchVendorById = function (o) {       
            $scope.model.id = o.id;
            $scope.model.idUser = o.idUser;
            $scope.model.UserName = o.UserName;
            $scope.model.Password = o.Password;
            $scope.model.VendorCode = o.VendorCode;
            $scope.model.CompanyName = o.CompanyName;
            $scope.model.RegistrationNo = o.RegistrationNo;
            $scope.model.BillingAddress1 = o.BillingAddress1;
            $scope.model.BillingAddress2 = o.BillingAddress2;
            $scope.model.BillingAddress3 = o.BillingAddress3;
            $scope.model.BillingAddress4 = o.BillingAddress4;
            $scope.model.PostCode = o.PostCode;
            $scope.model.Phone1 = o.Phone1;
            $scope.model.Phone2 = o.Phone2;
            $scope.model.Fax1 = o.Fax1;
            $scope.model.Fax2 = o.Fax2;
            $scope.model.Area = o.Area;
            $scope.model.Email = o.Email;
            $scope.model.VendorWebsite = o.VendorWebsite;
            $scope.model.Attension = o.Attension;
            $scope.model.BusinessNature = o.BusinessNature;
            $scope.model.Agent = o.Agent;
            $scope.model.Currency = o.Currency;
            $scope.model.BranchWarehouseLocation = o.BranchWarehouseLocation;
            $scope.model.BranchCode = o.BranchCode;
            $scope.model.BranchName = o.BranchName;
            $scope.model.BranchAddress1 = o.BranchAddress1;
            $scope.model.BranchAddress2 = o.BranchAddress2;
            $scope.model.BranchAddress3 = o.BranchAddress3;
            $scope.model.BranchAddress4 = o.BranchAddress4;
            $scope.model.BranchPostCode = o.BranchPostCode;
            $scope.model.BranchAttension = o.BranchAttension;
            $scope.model.BranchPhone1 = o.BranchPhone1;
            $scope.model.BranchPhone2 = o.BranchPhone2;
            $scope.model.BranchFax1 = o.BranchFax1;
            $scope.model.BranchFax2 = o.BranchFax2;
            $scope.model.BranchAgent = o.BranchAgent;
            $scope.model.BranchArea = o.BranchArea;
            $scope.model.BranchEmail = o.BranchEmail;
       
        $scope.model.show = true;
    }

    $scope.DeleteVendor = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteVendor, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllVendor();
            $scope.Reset();
        });
    }

    $scope.CreateVendor = function (o) {
        o.id = $scope.model.id;
        o.idUser = $scope.model.idUser;
        var params = {
            UserName: $scope.model.UserName,
        };

        $http.post(route.Lookup.CreateVendor, o, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
                $scope.init();
            }
            else {
                toastr.error(data.message);
            }

        });
    }

    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}