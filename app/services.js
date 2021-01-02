'use strict';

// http://stackoverflow.com/questions/15033195/showing-spinner-gif-during-http-request-in-angular

angular.module('SharedServices', [])

.config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('tcmsHttpInterceptor');
    var spinnerFunction = function (data, headersGetter) {
        // todo start the spinner here
        //alert('start spinner');
        utils.blockUI();
        return data;
    };
    $httpProvider.defaults.transformRequest.push(spinnerFunction);
})

.factory('tcmsHttpInterceptor', function ($q, $window) {
    return function (promise) {
        return promise.then(function (response) {
            // do something on success
            // todo hide the spinner
            //alert('stop spinner');
            utils.unblockUI();
            return response;

        }, function (response) {
            // do something on error
            // todo hide the spinner
            //alert('stop spinner');
            utils.unblockUI();
            return $q.reject(response);
        });
    };
})

.directive('money', function () {
    'use strict';

    var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

    function link(scope, el, attrs, ngModelCtrl) {
        var min = parseFloat(attrs.min || 0);
        var precision = parseFloat(attrs.precision || 2);
        var lastValidValue;

        function round(num) {
            var d = Math.pow(10, precision);
            return Math.round(num * d) / d;
        }

        function formatPrecision(value) {
            return parseFloat(value).toFixed(precision);
        }

        function formatViewValue(value) {
            return ngModelCtrl.$isEmpty(value) ? '' : '' + value;
        }


        ngModelCtrl.$parsers.push(function (value) {
            if (angular.isUndefined(value)) {
                value = '';
            }

            // Handle leading decimal point, like ".5"
            if (value.indexOf('.') === 0) {
                value = '0' + value;
            }

            // Allow "-" inputs only when min < 0
            if (value.indexOf('-') === 0) {
                if (min >= 0) {
                    value = null;
                    ngModelCtrl.$setViewValue('');
                    ngModelCtrl.$render();
                } else if (value === '-') {
                    value = '';
                }
            }

            var empty = ngModelCtrl.$isEmpty(value);
            if (empty || NUMBER_REGEXP.test(value)) {
                lastValidValue = (value === '')
                  ? null
                  : (empty ? value : parseFloat(value));
            } else {
                // Render the last valid input in the field
                ngModelCtrl.$setViewValue(formatViewValue(lastValidValue));
                ngModelCtrl.$render();
            }

            ngModelCtrl.$setValidity('number', true);
            return lastValidValue;
        });
        ngModelCtrl.$formatters.push(formatViewValue);

        var minValidator = function (value) {
            if (!ngModelCtrl.$isEmpty(value) && value < min) {
                ngModelCtrl.$setValidity('min', false);
                return undefined;
            } else {
                ngModelCtrl.$setValidity('min', true);
                return value;
            }
        };
        ngModelCtrl.$parsers.push(minValidator);
        ngModelCtrl.$formatters.push(minValidator);

        if (attrs.max) {
            var max = parseFloat(attrs.max);
            var maxValidator = function (value) {
                if (!ngModelCtrl.$isEmpty(value) && value > max) {
                    ngModelCtrl.$setValidity('max', false);
                    return undefined;
                } else {
                    ngModelCtrl.$setValidity('max', true);
                    return value;
                }
            };

            ngModelCtrl.$parsers.push(maxValidator);
            ngModelCtrl.$formatters.push(maxValidator);
        }

        // Round off
        if (precision > -1) {
            ngModelCtrl.$parsers.push(function (value) {
                return value ? round(value) : value;
            });
            ngModelCtrl.$formatters.push(function (value) {
                return value ? formatPrecision(value) : value;
            });
        }

        el.bind('blur', function () {
            var value = ngModelCtrl.$modelValue;
            if (value) {
                ngModelCtrl.$viewValue = formatPrecision(value);
                ngModelCtrl.$render();
            }
        });
    }

    return {
        restrict: 'A',
        require: 'ngModel',
        link: link
    };
})

    .directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == undefined) return ''
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }

                    return transformedInput;
                });
            }
        };
    })

//.directive('numbersOnly', function () {
//    return {
//        require: 'ngModel',
//        link: function (scope, element, attr, ngModelCtrl) {
//            function fromUser(text) {
//                if (text) {
//                    var transformedInput = text.replace(/[^0-9]/g, '');

//                    if (transformedInput !== text) {
//                        ngModelCtrl.$setViewValue(transformedInput);
//                        ngModelCtrl.$render();
//                    }
//                    return transformedInput;
//                }
//                return undefined;
//            }
//            ngModelCtrl.$parsers.push(fromUser);
//        }
//    };
//})
 .directive('numbersOnly1', function () {
     return {
         require: 'ngModel',
         link: function (scope, element, attrs, modelCtrl) {
             modelCtrl.$parsers.push(function (inputValue) {
                 var str = inputValue;
                 var a = isNaN(str);
                 if (a == true) {
                     if (str.length == 2) {
                         return str.substring(0, str.length - 2);
                     }
                     else {
                         var transformedInput = inputValue.replace(/[^0-9{1,7}\.\^0-9{1,2}]/, '');
                         if (transformedInput != inputValue) {
                             modelCtrl.$setViewValue(transformedInput);
                             modelCtrl.$render();
                         }
                         return transformedInput;
                     }
                 }
                 if (inputValue == undefined) return;
                 if (str.length == 8 && str.indexOf('.') < 0) {
                     inputValue = str.substring(0, 7);
                     modelCtrl.$setViewValue(inputValue);
                     modelCtrl.$render();
                     return inputValue;
                 }
                 if (str.indexOf('.') > 7) {
                     inputValue = str.substring(0, 7);
                     modelCtrl.$setViewValue(inputValue);
                     modelCtrl.$render();

                     return inputValue;
                 }
                 if (str.indexOf('.') > 0) {
                     if (str.length > 10) {
                         inputValue = str.substring(0, 10);
                         modelCtrl.$setViewValue(inputValue);
                         modelCtrl.$render();
                         return inputValue;
                     }
                     var i;
                     i = str.length - str.indexOf('.');
                     if (i == 4 || str.indexOf('.') != str.lastIndexOf('.')) {
                         inputValue = str.substring(0, str.length - 1);
                         modelCtrl.$setViewValue(inputValue);
                         modelCtrl.$render();
                         return inputValue;
                     }
                     else {
                         return inputValue;
                     }
                 }
                 if (str.length > 10) {
                     inputValue = str.substring(0, 10);
                     modelCtrl.$setViewValue(inputValue);
                     modelCtrl.$render();
                     return inputValue;
                 }
                 var transformedInput = inputValue.replace(/[^0-9{1,7}\.\^0-9{1,2}]/, '');
                 if (transformedInput != inputValue) {
                     modelCtrl.$setViewValue(transformedInput);
                     modelCtrl.$render();
                 }
                 return transformedInput;
             });
         }
     }
 })

.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                var str = inputValue;
                var a = isNaN(str);
                if (a == true) {
                    if (str.length == 2) {
                        return str.substring(0, str.length - 2);
                    }
                    else {
                        var transformedInput = inputValue.replace(/[^0-9{1,7}\.\^0-9{1,2}]/, '');
                        if (transformedInput != inputValue) {
                            modelCtrl.$setViewValue(transformedInput);
                            modelCtrl.$render();
                        }
                        return transformedInput;
                    }
                }
                if (inputValue == undefined) return;
                if (str.length == 17 && str.indexOf('.') < 0) {
                    inputValue = str.substring(0, 16);
                    modelCtrl.$setViewValue(inputValue);
                    modelCtrl.$render();
                    return inputValue;
                }
                if (str.indexOf('.') > 16) {
                    inputValue = str.substring(0, 16);
                    modelCtrl.$setViewValue(inputValue);
                    modelCtrl.$render();
                    return inputValue;
                }
                if (str.indexOf('.') > 0) {
                    if (str.length > 18) {
                        inputValue = str.substring(0, 18);
                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                        return inputValue;
                    }
                    var i;
                    i = str.length - str.indexOf('.');
                    if (i == 4 || str.indexOf('.') != str.lastIndexOf('.')) {
                        inputValue = str.substring(0, str.length - 1);
                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                        return inputValue;
                    }
                    else {
                        return inputValue;
                    }
                }
                if (str.length > 18) {
                    inputValue = str.substring(0, 18);
                    modelCtrl.$setViewValue(inputValue);
                    modelCtrl.$render();
                    return inputValue;
                }
                var transformedInput = inputValue.replace(/[^0-9{1,7}\.\^0-9{1,2}]/, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    }
})
    .directive('numbersOnly100', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    var str = inputValue;
                    var a = isNaN(str);
                    if (a == true) {
                        if (str.length == 2) {
                            return str.substring(0, 2);
                        }
                        else {
                            var transformedInput = inputValue.replace(/[^0-9{1,7}\.\^0-9{1,2}]/, '');
                            if (transformedInput != inputValue) {
                                modelCtrl.$setViewValue(transformedInput);
                                modelCtrl.$render();
                            }
                            return transformedInput;
                        }
                    }
                    if (inputValue == undefined) return;
                    if (str.length > 4) {
                        return str.substring(0, 3);
                        modelCtrl.$setViewValue(inputValue);
                        modelCtrl.$render();
                        return inputValue;
                    }
                    var transformedInput = inputValue.replace(/[^0-9]/g, '');
                    if (transformedInput != inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
                    return transformedInput;
                });
            }
        }
    })

.directive('numbersOnly18', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                var str = inputValue;
                var a = isNaN(str);
                if (a == true) {
                    if (str.length == 2) {
                        return str.substring(0, str.length - 2);
                    }
                    else {
                        var transformedInput = inputValue.replace(/[^0-9{1,7}\.\^0-9{1,2}]/, '');
                        if (transformedInput != inputValue) {
                            modelCtrl.$setViewValue(transformedInput);
                            modelCtrl.$render();
                        }
                        return transformedInput;
                    }
                }
                if (inputValue == undefined) return;
                if (str.length > 18) {
                    inputValue = str.substring(0, 18);
                    modelCtrl.$setViewValue(inputValue);
                    modelCtrl.$render();
                    return inputValue;
                }
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    }
})

.directive('numbersOnlyint', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            modelCtrl.$parsers.push(function (inputValue) {
                var str = inputValue;
                var a = isNaN(str);
                if (a == true) {
                    if (str.length == 2) {
                        return str.substring(0, str.length - 2);
                    }
                    else {
                        var transformedInput = inputValue.replace(/[^0-9{1,7}\.\^0-9{1,2}]/, '');
                        if (transformedInput != inputValue) {
                            modelCtrl.$setViewValue(transformedInput);
                            modelCtrl.$render();
                        }
                        return transformedInput;
                    }
                }
                if (inputValue == undefined) return;
                if (str.length > 8) {
                    inputValue = str.substring(0, 8);
                    modelCtrl.$setViewValue(inputValue);
                    modelCtrl.$render();
                    return inputValue;
                }
                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
        }
    }
})

.directive('checklistModel', function ($parse, $compile) {
    // contains
    function contains(arr, item) {
        if (angular.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                if (angular.equals(arr[i], item)) {
                    return true;
                }
            }
        }
        return false;
    }

    // add
    function add(arr, item) {
        arr = angular.isArray(arr) ? arr : [];
        for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], item)) {
                return arr;
            }
        }
        arr.push(item);
        return arr;
    }

    // remove
    function remove(arr, item) {
        if (angular.isArray(arr)) {
            for (var i = 0; i < arr.length; i++) {
                if (angular.equals(arr[i], item)) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }
        return arr;
    }

    // http://stackoverflow.com/a/19228302/1458162
    function postLinkFn(scope, elem, attrs) {
        // compile with `ng-model` pointing to `checked`
        $compile(elem)(scope);

        // getter / setter for original model
        var getter = $parse(attrs.checklistModel);
        var setter = getter.assign;

        // value added to list
        var value = $parse(attrs.checklistValue)(scope.$parent);

        // watch UI checked change
        scope.$watch('checked', function (newValue, oldValue) {
            if (newValue === oldValue) {
                return;
            }
            var current = getter(scope.$parent);
            if (newValue === true) {
                setter(scope.$parent, add(current, value));
            } else {
                setter(scope.$parent, remove(current, value));
            }
        });

        // watch original model change
        scope.$parent.$watch(attrs.checklistModel, function (newArr, oldArr) {
            scope.checked = contains(newArr, value);
        }, true);
    }

    return {
        restrict: 'A',
        priority: 1000,
        terminal: true,
        scope: true,
        compile: function (tElement, tAttrs) {
            if (tElement[0].tagName !== 'INPUT' || !tElement.attr('type', 'checkbox')) {
                throw 'checklist-model should be applied to `input[type="checkbox"]`.';
            }

            if (!tAttrs.checklistValue) {
                throw 'You should provide `checklist-value`.';
            }

            // exclude recursion
            tElement.removeAttr('checklist-model');

            // local scope var storing individual checkbox model
            tElement.attr('ng-model', 'checked');

            return postLinkFn;
        }
    };
})

.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
})

.directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {
            //CKEDITOR.replace('Description', {
            //    "extraPlugins": 'imagebrowser',
            //    "imageBrowser_listUrl": "/Image.json",
            //});
            console.log(elm[0]);
            var ck = CKEDITOR.replace(elm[0], {
                "extraPlugins": 'imagebrowser',
                "imageBrowser_listUrl": "/Image.json",
            });


            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
})

.directive('errSrc', function () {
    return {
        link: function (scope, element, attrs) {
            element.bind('error', function () {
                if (attrs.src != attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                }
            });
        }
    }
})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})

.directive('nxEqualEx', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.nxEqualEx) {
                return;
            }
            scope.$watch(attrs.nxEqualEx, function (value) {
                // Only compare values if the second ctrl has a value.
                if (model.$viewValue !== undefined && model.$viewValue !== '') {
                    model.$setValidity('nxEqualEx', value === model.$viewValue);
                }
            });
            model.$parsers.push(function (value) {
                // Mute the nxEqual error if the second ctrl is empty.
                if (value === undefined || value === '') {
                    model.$setValidity('nxEqualEx', true);
                    return value;
                }
                var isValid = value === scope.$eval(attrs.nxEqualEx);
                model.$setValidity('nxEqualEx', isValid);
                return isValid ? value : undefined;
            });
        }
    };
})

.directive('dropdownMultiselect', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
            pre_selected: '=preSelected',
            dropdownTitle: '@'
        },
        template: "<div class='btn-group' data-ng-class='{open: open}'>" +
        "<button class='btn btn-small'>{{dropdownTitle}}</button>" +
            "<button class='btn btn-small dropdown-toggle' data-ng-click='open=!open;openDropDown()'><span class='caret'></span></button>" +
            "<ul class='dropdown-menu scrollable-menu' aria-labelledby='dropdownMenu'>" +
            "<li><input type='checkbox' data-ng-change='checkAllClicked()' data-ng-model=checkAll> Check All</li>" +
            "<li class='divider'></li>" +
            "<li data-ng-repeat='option in options'> <input type='checkbox' data-ng-change='setSelectedItem(option.id)' ng-model='selectedItems[option.id]'>{{option.name}}</li>" +
            "</ul>" +
            "</div>",
        controller: function ($scope) {
            $scope.selectedItems = {};
            $scope.checkAll = false;

            init();

            function init() {
                console.log('init function');
                for (var i = 0; i < $scope.pre_selected.length; i++) {
                    $scope.model.push($scope.pre_selected[i].id);
                    $scope.selectedItems[$scope.pre_selected[i].id] = true;
                }
                if ($scope.pre_selected.length == $scope.options.length) {
                    $scope.checkAll = true;
                }
            }

            $scope.openDropDown = function () {
                console.log('hi');
            }

            $scope.checkAllClicked = function () {
                if ($scope.checkAll) {
                    selectAll();
                } else {
                    deselectAll();
                }
            }

            function selectAll() {
                $scope.model = [];
                $scope.selectedItems = {};
                angular.forEach($scope.options, function (option) {
                    $scope.model.push(option.id);
                });
                angular.forEach($scope.model, function (id) {
                    $scope.selectedItems[id] = true;
                });
                console.log($scope.model);
            };

            function deselectAll() {
                $scope.model = [];
                $scope.selectedItems = {};
                console.log($scope.model);
            };

            $scope.setSelectedItem = function (id) {
                var filteredArray = [];
                if ($scope.selectedItems[id] == true) {
                    $scope.model.push(id);
                } else {
                    filteredArray = $scope.model.filter(function (value) {
                        return value != id;
                    });
                    $scope.model = filteredArray;
                    $scope.checkAll = false;
                }
                console.log(filteredArray);
                return false;
            };
        }
    }
})
;