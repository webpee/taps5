
function SampleCtrl($scope, $http) {

    
    $scope.init = function() {
        $scope.initModel();
    };

    $scope.initModel = function() {
        $scope.model = {
            ProgramCode: '',
            MajorCode: '',
            Session: ''
        };        
        // load all the program into dropdownbox
        var params = {};
        $http.get(route.Lookup.programs, { params: params }).success(function (data) {
            $scope.ProgramCodes = data;
        });
    };

    $scope.changeProgramCode = function () {
        var params = {
            pcode : $scope.model.ProgramCode,
        };
        $http.get(route.Lookup.majors, { params: params }).success(function (data) {
            $scope.MajorCodes = data;
        });
        $http.get(route.Lookup.sessions, { params: params }).success(function (data) {
            $scope.Sessions = data;
        });
    };

    $scope.changeMajorCode = function() {
        var params = {
            pcode: $scope.model.ProgramCode,
            mcode: $scope.model.MajorCode,
        };
        $http.get(route.Lookup.sessions, { params: params }).success(function(data) {
            $scope.Sessions = data;
        });
    };

    $scope.init();
}