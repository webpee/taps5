function FaqHelpCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            Type: '',
            id: '',
            Description: '',
            Seq: '',
        };
        $scope.GetAllFaq();
    };
    $scope.SearchText = '';

    $scope.GetAllFaq = function () {
        $http.get(route.FrontLookup.GetAllFaqBySeq).success(function (data) {
            $scope.list1 = data;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.list1.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = 10;
        });
    }
    
  $scope.init();
}