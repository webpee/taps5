function PaymentTransactionMgmtCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Parent: '',
            Name: '',
            Title: '',
            Description: '',
            Seq: '0',
            CreatedBy: '',
            CreatedDate: '',
        };

        $scope.GetAllPaymentTransaction();
    };

    // Dynamic Search
    $scope.searchFilter1 = function (obj) {
        var re = new RegExp($scope.SearchText, 'i');
        return !$scope.SearchText || re.test(obj.TxnId) || re.test(obj.RefNo) || re.test(obj.TxnCur) || re.test(obj.TxnAmt) || re.test(obj.SettlementCur) || re.test(obj.SettlementAmt) || re.test(obj.TxnDesc) || re.test(obj.ErrDesc) || re.test(obj.OrderId) || re.test(obj.PaymentMethod);
    };
    $scope.filter = function (SearchText5) {
        $scope.SearchText = SearchText5;
        $timeout(function () {
            $scope.currentPage = 1;
            $scope.totalItems = $scope.filtered.length;
            $scope.noOfPages = 10;
        }, 10);
    };
    // End of Dynamic Search
    //$scope.SearchText = '';

    $scope.GetAllPaymentTransaction = function () {
        $http.get(route.Lookup.GetAllPaymentTransaction).success(function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].CreatedDate != null) {
                        data[i].CreatedDate = $filter('date')(data[i].CreatedDate.substr(6, 13), "dd-MM-yyyy hh:mm:ss a");
                    }
                }
                $scope.list1 = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.list1.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 10;
            }
        });
    }


    $scope.init();
}