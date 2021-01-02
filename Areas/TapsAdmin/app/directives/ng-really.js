/**
 * A generic confirmation for risky actions.
 * Usage: Add attributes: ng-really-message="Are you sure"? ng-really-click="takeAction()" function
 */
app.directive('ngReallyClick', [function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('click', function () {
                var message = attrs.ngReallyMessage;
                if (message) {
                    bootbox.confirm(message, function (result) {
                        if (result)
                            scope.$apply(attrs.ngReallyClick);
                    });
                }
                //if (message && confirm(message)) {
                //    scope.$apply(attrs.ngReallyClick);
                //}
            });
        }
    }
}]);

