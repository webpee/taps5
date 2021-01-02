function SubtabCountCtrl($scope) {
    $scope.labels = {
        Sales: $("#subtab-count-Sales li").length,
        Users: $("#subtab-count-Users li").length,
        Products: $("#subtab-count-Products li").length,
        Recommends: $("#subtab-count-Recommends li").length,
        CMS: $("#subtab-count-CMS li").length,
        Tool: $("#subtab-count-Tool li").length,
        Payment: $("#subtab-count-Payment li").length,
    };
}