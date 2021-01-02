function CompanyVendorAppCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, $cookieStore) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            FullName: '',
            PreferredName: '',
            HandPhoneNo: '',
            CompanyName: '',
            CompanyNumber: '',
            Address: '',
            OfficeNumber1: '',
            OfficeNumber2: '',
            OfficeH_PNo: '',
            Email: '',
            //VendorType: '',
            FaxNo: '',

            //Vebndor Details 
            idVendor: '',
            Name: '',
            IC_PassportNo: '',
            PhoneNo: '',
            EmailAddress: '',
            VendorAddress: '',

            //Company
            idCompany: '',
            CompanyFullName: '',
            CompanyPreferredName: '',
            CompanyHandPhoneNo: '',
            CompanyCompanyName: '',
            CompanyNo: '',
            CompanyAddress: '',
            CompanyAddress1: '',
            OfficeNo1: '',
            OfficeNo2: '',
            OfficeHPNo: '',
            Fax: '',
            CompanyEmail: '',
            OpeningHour: '',
            ClosingHour: '',
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false,

            form: 'Workshop',
        };
        $scope.idValue = $('#idValue').val();
        $scope.model.form = $scope.idValue;

    };

    $scope.GoBackToProfile = function () {
        window.location.href = "/Account/Profile";
    }

    $scope.CreateAuthorisedCompany = function (obj) {

        obj.PreferredName = $scope.model.CompanyPreferredName;
        obj.HandPhoneNo = $scope.model.CompanyHandPhoneNo;
        obj.FullName = $scope.model.CompanyFullName;
        obj.Email = $scope.model.CompanyEmail;
        obj.CompanyName = $scope.model.CompanyCompanyName;
        obj.Address = $scope.model.CompanyAddress + " " + $scope.model.CompanyAddress1;

        $http.post(route.FrontLookup.CreateAuthorisedCompany, obj).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
        });
        $scope.initModel();
    }

    $scope.CreateNewVendor = function (obj) {
        obj.Address = $scope.model.Address + " " + $scope.model.Address1;
        $http.post(route.FrontLookup.CreateNewVendor, obj).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.Reset();
        });
    }

    // Seller Details
    $scope.CreateSellerVendor = function (obj) {
        obj.Address = $scope.model.VendorAddress + " " + $scope.model.VendorAddress1;
        console.log(obj);
        $http.post(route.FrontLookup.CreateSellerVendor, obj).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.Reset();
        });
    }
    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}