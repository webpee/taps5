function OrderSummaryCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, $cookieStore, localStorageService, transformRequestAsFormPost) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Total: '',
            PaymentMethod: '',
        };
        $scope.Total = '';
        $scope.GetOrderSummary();
        $scope.GetAddressById();

    };

    //iPay88 Payment Gateway
    $scope.SetiPay88Payment = function () {
        $http.get(route.FrontLookup.UserDetail).success(function (data) {
            $scope.UserDetail = data;
            $scope.PaymentId = "";
            $scope.Currency = "MYR";
            $scope.ProdDesc = "Taps Parts";
            $scope.UserName = $scope.UserDetail.UserName;
            $scope.UserEmail = $scope.UserDetail.UserEmail;
            $scope.UserContact = $scope.UserDetail.Contact;
            $scope.Remark = "Remark"
            $scope.Lang = "UTF-8";
            $scope.ResponseURL = "http://taps.com.my/OrderSummary/iPay88PaymentResponce";
            $scope.BackgroundURL = "http://taps.com.my/";

            //$scope.ResponseURL = "http://localhost:9898/OrderSummary/PaymentResponce";
            //$scope.BackgroundURL = "http://localhost:9898/";

            //$scope.ResponseURL = "http://taps.wbox1demo.bugzstudio.com/OrderSummary/iPay88PaymentResponce";
            //$scope.BackgroundURL = "http://taps.wbox1demo.bugzstudio.com/";
        });
    }

    $scope.iPay88PaymentGateway = function (BillNo, PaymentAmount) {
        $http.get(route.FrontLookup.UserDetail).success(function (data) {
            $scope.UserDetail = data;
            var MerchantKeyT = "hzDb3PvOze";
            var MerchantIdT = "M00570";
            var RefNoT = BillNo;
            var TxnAmtT = "1.00";//(PaymentAmount).toString();
            var TxnCurT = "MYR";
            var Fullstring = MerchantKeyT + MerchantIdT + RefNoT + TxnAmtT.replace(",", "").replace(".", "") + TxnCurT;
            Fullstring = sha1(Fullstring);

            var Convert = "";
            for (var i = 0; i < Fullstring.toString().length; i = i + 2) {
                Convert += chr(hexdec(Fullstring.toString().substr(i, 2)));
            }
            Fullstring = base64_encode(Convert);
            $scope.RefNo = BillNo;
            $scope.Amount = "1.00";//(PaymentAmount).toString();
            $scope.Signature = Fullstring;
            $scope.MerchantCode = MerchantIdT;

            //submit data to revpay
            $timeout(function () {
                $('#formiPay88Payment').trigger('submit');
            }, 200);
        });
    }

    //revPay Payment Gateway
    $scope.SetRevPayPayment = function () {
        $http.get(route.FrontLookup.UserDetail).success(function (data) {
            $scope.UserDetail = data;
            $scope.TxnModel = "01";
            $scope.PaymentId = "";
            $scope.Currency = "MYR";
            $scope.ProdDesc = "Taps Parts";
            $scope.UserName = $scope.UserDetail.UserName;
            $scope.UserEmail = $scope.UserDetail.UserEmail;
            $scope.UserContact = $scope.UserDetail.Contact;
            $scope.Remark = "Remark"
            $scope.Lang = "UTF-8";
            $scope.ResponseURL = "http://taps.com.my/OrderSummary/revPayPaymentResponce";
            $scope.BackgroundURL = "http://taps.com.my/";

            //$scope.ResponseURL = "http://taps.wbox1demo.bugzstudio.com/OrderSummary/revPayPaymentResponce";
            //$scope.BackgroundURL = "http://taps.wbox1demo.bugzstudio.com/";

        });
    }

    $scope.revPayPaymentGateway = function (BillNo, PaymentAmount) {
        //var MerchantKeyT = "WHlPRhZZE7"; // demo key
        var MerchantKeyT = "3MyaEZ8Dtr"; // live key
        var MerchantIdT = "RPM0000318";
        var RefNoT = BillNo;
        var TxnAmtT = (PaymentAmount).toString();
        var TxnCurT = "MYR";
        var Fullstring = MerchantKeyT + MerchantIdT + RefNoT + TxnAmtT.replace(",", "").replace(".", "") + TxnCurT;
        
        Fullstring = sha1(Fullstring);

        var Convert = "";
        for (var i = 0; i < Fullstring.toString().length; i = i + 2) {
            Convert += chr(hexdec(Fullstring.toString().substr(i, 2)));
        }
        Fullstring = base64_encode(Convert);
        $scope.RefNo = BillNo;
        $scope.Amount = (PaymentAmount).toString();
        $scope.Signature = Fullstring;
        $scope.MerchantCode = MerchantIdT;

        //submit data to revpay
        $timeout(function () {
            $('#formrevPayPayment').trigger('submit');
        }, 200);
    }
    console.log(sha1("56100908|1280204670187|344|10|N|gMAVIEGVpqHvxoNEqbrZRuBDFT1B0icW"));  
    $scope.paydollarGateway = function (BillNo, PaymentAmount) {
        //var MerchantKeyT = "WHlPRhZZE7"; // demo key
        var MerchantKeyT = "85114736"; // live key
        var MerchantIdT = "85114736";
        var RefNoT = BillNo;
        var TxnAmtT = (PaymentAmount).toString();
        var TxnCurT = "MYR";
        var Fullstring = MerchantKeyT + "|" + RefNoT + "|458|" + TxnAmtT + "|N|1DU8AWVQU56KNIGV8RPV21ogk2ww6Y5TVaMp0bJJdH92kQdz4";
        console.log(Fullstring);
        Fullstring = sha1(Fullstring);
        console.log(Fullstring);
        $scope.ResponseURL = "http://localhost:9898/OrderSummary/paydollarPaymentResponce";
        $scope.BackgroundURL = "http://localhost:9898/OrderSummary/paydollarPaymentResponcefailed";
        //var Convert = "";
        //for (var i = 0; i < Fullstring.toString().length; i = i + 2) {
        //    Convert += chr(hexdec(Fullstring.toString().substr(i, 2)));
        //}
        $scope.RefNo = BillNo;
        $scope.Amount = (PaymentAmount).toString();
        $scope.Signature = Fullstring;
        $scope.MerchantCode = MerchantIdT;

        //submit data to revpay
        $timeout(function () {
            $('#formpaydollar').trigger('submit');
        }, 200);
    }

    $scope.GetOrderSummary = function () {
        $scope.model.Total = 0;
        $http.get(route.FrontLookup.GetOrderSummary).success(function (data) {
            $scope.model.PaymentMethod = data.PaymentGateway;
            if (data.lstShoppingCart.length > 0) {
                $scope.lstOrderSummary = data.lstShoppingCart;
                for (var i = 0; i < $scope.lstOrderSummary.length; i++) {
                    $scope.model.Total = parseFloat($scope.model.Total) + parseFloat($scope.lstOrderSummary[i].StockQty) * parseFloat($scope.lstOrderSummary[i].SalePrice);
                }
                $scope.Total = $scope.model.Total;
            }
            else {
                window.location.href = "/Cart/ShoppingCart";
            }

            if ($scope.model.PaymentMethod == "revPay") {
                $scope.SetRevPayPayment();
            }
            else if ($scope.model.PaymentMethod == "iPay88") {
                $scope.SetiPay88Payment();
            }
        });
    }

    $scope.GetAddressById = function () {
        $scope.idAddress = localStorageService.get('idAddress');
        $scope.idWorkshop = localStorageService.get('idWorkshop');

        if ($scope.idAddress != null) {
            var params = {
                idAddress: $scope.idAddress
            }
            $http.get(route.FrontLookup.GetAddressById, { params: params }).success(function (data) {
                $scope.Name = data.Name;
                $scope.ContactNo = data.ContactNo;
                $scope.StateName = data.StateName;
                $scope.CityName = data.CityName;
                $scope.Address = data.Address;
            });
        }
        else if ($scope.idWorkshop != null) {
            var params = {
                id: $scope.idWorkshop
            }
            $http.get(route.FrontLookup.FetchWorkshopByIdShop, { params: params }).success(function (data) {
                $scope.Name = data.Name;
                $scope.ContactNo = data.ContactNo;
                $scope.StateName = data.StateName;
                $scope.CityName = data.CityName;
                $scope.Address = data.Address;
            });
        }
        if ($scope.idAddress == null && $scope.idWorkshop == null) {
            $("#btnSubmit").prop("disabled", true);
            toastr.error("Please select shipping address to place order");
        }
    }

    $scope.PlaceOrder = function (obj) {

        var CheckShippingAddress = localStorageService.get('idAddress');
        var CheckWorkshopAddress = localStorageService.get('idWorkshop');

        //console.log(CheckShippingAddress);
        //console.log(CheckWorkshopAddress);

        if ((angular.isUndefined(CheckShippingAddress) || CheckShippingAddress == null) && (angular.isUndefined(CheckWorkshopAddress) || CheckWorkshopAddress == null)) {
            toastr.error("Please select shipping address to place order");
            return;
        }
        var params = {
            PaymentMethod: $scope.model.PaymentMethod,
        };

        $http.get(route.FrontLookup.PlaceOrder, { params: params }).success(function (data) {
            if (data.error == 2) {
                toastr.error(data.message);
            }
            else {
                localStorageService.set('idAddress', null);
                if ($scope.model.PaymentMethod != 'revPay' && $scope.model.PaymentMethod != 'iPay88' && $scope.model.PaymentMethod != 'paydollar') {
                    window.open("/PaymentSummary/PaymentSummary/" + data.OrderId + "/Order", '_self');
                }
                else {
                    $scope.RefNo = data.BillNo;
                    var Amount = parseFloat(data.Amount);
                    if (Amount > 0) {
                        //Get Signature
                        if ($scope.model.PaymentMethod == 'revPay') {
                            $scope.revPayPaymentGateway($scope.RefNo, Amount);
                        }
                        else if ($scope.model.PaymentMethod == 'iPay88') {
                            $scope.iPay88PaymentGateway($scope.RefNo, Amount);
                        }
                        else if ($scope.model.PaymentMethod == 'paydollar') {
                            $scope.paydollarGateway($scope.RefNo, Amount);
                        }
                    }
                }
            }
        });
    }

    //var params = {
    //    MerchantCode: MerchantCode,
    //    PaymentId :PaymentId,
    //    RefNo: RefNo,
    //    Currency: Currency,
    //    Amount: Amount,
    //    ProdDesc: ProdDesc,
    //    UserName: UserName,
    //    UserEmail: UserEmail,
    //    UserContact: UserContact,
    //    Lang: Lang,
    //    Signature: Signature,
    //    ResponseURL: ResponseURL,
    //    BackgroundURL: BackgroundURL
    //}
    //console.log(params);
    //var querystring = "MerchantCode=" + params.MerchantCode + "&PaymentId=" + params.PaymentId + "&RefNo=" + params.RefNo
    //querystring += "&Amount=" + params.Amount + "&Currency=" + params.Currency + "&ProdDesc=" + params.ProdDesc
    //querystring += "&UserName=" + params.UserName + "&UserEmail=" + params.UserEmail + "&UserContact=" + params.UserContact
    //querystring += "&Remark=" + params.Remark + "&Lang=" + params.Lang + "&Signature=" + params.Signature
    //querystring += "&ResponseURL=" + params.ResponseURL + "&BackgroundURL=" + params.BackgroundURL
    //console.log('https://www.mobile88.com/ePayment/entry.asp?' + querystring);
    ////window.open('https://www.mobile88.com/ePayment/entry.asp?' + querystring);

    //var request = $http({
    //    method: "post",
    //    url: "https://www.mobile88.com/ePayment/entry.asp",
    //    transformRequest: transformRequestAsFormPost,
    //    data: {
    //        MerchantCode: MerchantCode,
    //        PaymentId: PaymentId,
    //        RefNo: RefNo,
    //        Currency: Currency,
    //        Amount: Amount,
    //        ProdDesc: ProdDesc,
    //        UserName: UserName,
    //        UserEmail: UserEmail,
    //        UserContact: UserContact,
    //        Lang: Lang,
    //        Signature: Signature,
    //        ResponseURL: ResponseURL,
    //        BackgroundURL: BackgroundURL
    //    }
    //});

    //// Store the data-dump of the FORM scope.
    //request.success(
    //    function (html) {
    //        console.log(html);
    //        $scope.cfdump = html;

    //    }
    //);

    //$http.post('https://www.mobile88.com/ePayment/entry.asp?', { params: params }).success(function (data) {
    //    if (data.success == 1) {
    //        toastr.success(data.message);
    //        localStorageService.set('idAddress', null);
    //    }
    //    else {
    //        toastr.error(data.message);
    //    }
    //});

    //var params = {
    //    idAddress: $scope.idAddress
    //}
    //$http.get(route.FrontLookup.PlaceOrder, { params: params }).success(function (data) {
    //    if (data.success == 1) {
    //        toastr.success(data.message);
    //        localStorageService.set('idAddress', null);
    //    }
    //    else {
    //        toastr.error(data.message);
    //    }
    //});

    $scope.init();
}