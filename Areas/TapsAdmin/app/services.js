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

.filter('inSlicesOf', ['$rootScope',
    function ($rootScope) {
        function makeSlices(items, count) {
            if (!count)
                count = 3;

            if (!angular.isArray(items) && !angular.isString(items)) return items;

            var array = [];
            for (var i = 0; i < items.length; i++) {
                var chunkIndex = parseInt(i / count, 10);
                var isFirst = (i % count === 0);
                if (isFirst)
                    array[chunkIndex] = [];
                array[chunkIndex].push(items[i]);
            }

            if (angular.equals($rootScope.arrayinSliceOf, array))
                return $rootScope.arrayinSliceOf;
            else
                $rootScope.arrayinSliceOf = array;

            return array;
        };

        return makeSlices;
    }]
  )

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
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
})
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
                             console.log('true');
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
                     console.log('true');
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
                            console.log('true');
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
                    console.log('true');
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
                                console.log('true');
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
                            console.log('true');
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
                    console.log('true');
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
                            console.log('true');
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
                    console.log('true');
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

            var ck = CKEDITOR.replace(elm[0]);

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

.directive('nxEqualEx', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, model) {
            if (!attrs.nxEqualEx) {
                console.error('nxEqualEx expects a model as an argument!');
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
.controller('WorkshopCtrl', function ($scope) {

    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(3.0355869, 101.4436343),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (info) {

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

    }

    $scope.openInfoWindow = function (e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

})

.controller('Ctrl', function ($scope, $localStorage, localStorageService, $cookies) {
   
    $scope.init = function () {
        localStorageService.set('others', null);
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            RM: '',
            To: ''
        };
    };

    if (localStorageService.get('conditions') != null)
        $scope.conditions = localStorageService.get('conditions');
    else
        $scope.conditions = [{
            name: 'Quality Used Part (QUP)',
            value: ''
        }, {
            name: 'Used Part (UP)',
            value: ''
        }, {
            name: 'Original Equipment Manufacturer (OEM)',
            value: ''
        }];

    $scope.saveSetting = function (condition) {
        if (condition != undefined) {
            $scope.getConditions = localStorageService.get('conditions');
            for (var i = 0; i < $scope.getConditions.length; i++) {
                if (condition.name == $scope.getConditions[i].name) {
                    $scope.getConditions[i].value = false;
                }
            }
            localStorageService.add('conditions', $scope.getConditions);
            window.location.reload();
        }
        else {
            var json = angular.toJson($scope.conditions);
            localStorageService.add('conditions', json);
            $scope.$on('someEvent', function (event, args) {
            });
            window.location.reload();
        }
    };

    $scope.others = [
        {
            name: 'Half-cut',
            value: ''
        }, 
        {
            name: 'Battery',
            value: ''
        }, {
            name: 'Lubricant',
            value: ''
        }];

   

    if (localStorageService.get('others') != null)
        $scope.others = localStorageService.get('others');

    $scope.saveOthers = function (other) {
        if (other != undefined) {
            $scope.getothers = localStorageService.get('others');
            for (var i = 0; i < $scope.getothers.length; i++) {
                if (other.name == $scope.getothers[i].name) {
                    $scope.getothers[i].value = false;
                }
            }
            localStorageService.add('others', $scope.getothers);
            window.location.reload();
        }
        else {
            var json = angular.toJson($scope.others);
            localStorageService.add('others', json);
            window.location.reload();
        }
    };

    $scope.items = [{
        name: 'Items Sold by TAPS only',
        value: ''
    }];

    if (localStorageService.get('items') != null)
        $scope.items = localStorageService.get('items');

    $scope.saveItems = function (item) {
        if (item != null) {
            item[0].value = false;
            localStorageService.add('items', item);
            window.location.reload();
        }
        else {
            var json = angular.toJson($scope.items);
            localStorageService.add('items', json);
            window.location.reload();
        }
    };

    $scope.ClearRM = function () {
        localStorageService.set('RM', null);
        localStorageService.set('To', null);
        window.location.reload();
    }

    if (localStorageService.get('RM') != null)
        $scope.RM = localStorageService.get('RM');

    $scope.saveRM = function () {
        localStorageService.add('RM', $scope.RM);
    };

    if (localStorageService.get('To'))
        $scope.To = localStorageService.get('To');

    $scope.saveTo = function () {
        localStorageService.add('To', $scope.To);
        window.location.reload();
    };

    $scope.Reset = function () {
        localStorageService.add('To', null);
        localStorageService.add('RM', null);
        localStorageService.add('items', null);
        localStorageService.add('others', null);
        localStorageService.add('conditions', null);
    }
})

 .service('AddCart', ['localStorageService', function (localStorageService) {
     if (localStorageService.get('CartItem') == null || localStorageService.get('CartItem') == '') {
         localStorageService.set('CartItem', '');
     }


     this.removeItem = function (id) {
         try {
             var ItemList = localStorageService.get('CartItem');
             for (var i = 0; i < ItemList.length; i++) {
                 if (ItemList[i].id == id) {
                     ItemList.splice(i, 1);
                     localStorageService.set('CartItem', JSON.stringify(ItemList));
                     return;
                 }
             }
         }
         catch (Exception) {
             console.log(Exception);
         }

     };

     this.AddItemToCart = function (o) {

         var cartItemsm = [];
         var no;
         try {
             cartItemsm = localStorageService.get('CartItem');
         }

         catch (Exception) {

             cartItemsm = [];
             no = 1;
         }

         if (cartItemsm == null) {
             var cartItems =
                [{
                    RowNum: o.RowNum,
                    id: o.id,
                    Qauntity: o.Qty,
                    ProductName: o.Name,
                    Condition: o.Condition,
                    Warranty: o.Warranty,
                    RegularPrice: o.RegularPrice
                }];
             localStorageService.set('CartItem', cartItems);
         }
         else {
             var cartItems =
                {
                    RowNum: o.RowNum,
                    id: o.id,
                    Qauntity: o.Qty,
                    ProductName: o.Name,
                    Condition: o.Condition,
                    Warranty: o.Warranty,
                    RegularPrice: o.RegularPrice
                };
             cartItemsm.push(cartItems);
             localStorageService.set('CartItem', cartItemsm);
         }
     };

 }])


.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',
    function ($filter, $document, $compile, $parse) {

        return {
            restrict: 'AE',
            scope: {
                selectedModel: '=',
                options: '=',
                extraSettings: '=',
                events: '=',
                searchFilter: '=?',
                translationTexts: '=',
                groupBy: '@'
            },
            template: function (element, attrs) {
                var checkboxes = attrs.checkboxes ? true : false;
                var groups = attrs.groupBy ? true : false;
                var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
                template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
                //template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
                template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
                //template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
                template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
                template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
                template += '<li ng-show="settings.enableSearch" class="divider"></li>';

                if (groups) {
                    template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                    template += '<li ng-repeat-end role="presentation">';
                } else {
                    template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';

                }

                template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

                if (checkboxes) {
                    template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
                } else {
                    template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
                }

                template += '</li>';

                template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
                template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

                template += '</ul>';
                template += '</div>';

                element.html(template);
            },
            link: function ($scope, $element, $attrs) {
                var $dropdownTrigger = $element.children()[0];

                $scope.toggleDropdown = function () {
                    $scope.open = !$scope.open;
                };

                $scope.checkboxClick = function ($event, id) {
                    $scope.setSelectedItem(id);
                    $event.stopImmediatePropagation();
                };

                $scope.externalEvents = {
                    onItemSelect: angular.noop,
                    onItemDeselect: angular.noop,
                    onSelectAll: angular.noop,
                    onDeselectAll: angular.noop,
                    onInitDone: angular.noop,
                    onMaxSelectionReached: angular.noop
                };

                $scope.settings = {
                    dynamicTitle: true,
                    scrollable: false,
                    scrollableHeight: '300px',
                    closeOnBlur: true,
                    displayProp: 'label',
                    idProp: 'id',
                    externalIdProp: 'id',
                    enableSearch: true,
                    selectionLimit: 0,
                    showCheckAll: true,
                    showUncheckAll: true,
                    closeOnSelect: false,
                    buttonClasses: 'btn btn-default',
                    closeOnDeselect: false,
                    groupBy: $attrs.groupBy || undefined,
                    groupByTextProvider: null,
                    smartButtonMaxItems: 0,
                    smartButtonTextConverter: angular.noop
                };

                $scope.texts = {
                    checkAll: 'Check All',
                    uncheckAll: 'Uncheck All',
                    selectionCount: 'checked',
                    selectionOf: '/',
                    searchPlaceholder: 'Search...',
                    buttonDefaultText: 'Select',
                    dynamicButtonTextSuffix: 'checked'
                };

                $scope.searchFilter = $scope.searchFilter || '';

                if (angular.isDefined($scope.settings.groupBy)) {
                    $scope.$watch('options', function (newValue) {
                        if (angular.isDefined(newValue)) {
                            $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);

                        }
                    });
                }

                angular.extend($scope.settings, $scope.extraSettings || []);
                angular.extend($scope.externalEvents, $scope.events || []);
                angular.extend($scope.texts, $scope.translationTexts);

                $scope.singleSelection = $scope.settings.selectionLimit === 1;

                function getFindObj(id) {
                    var findObj = {};

                    if ($scope.settings.externalIdProp === '') {
                        findObj[$scope.settings.idProp] = id;
                    } else {
                        findObj[$scope.settings.externalIdProp] = id;
                    }

                    return findObj;
                }

                function clearObject(object) {
                    for (var prop in object) {
                        delete object[prop];
                    }
                }

                if ($scope.singleSelection) {
                    if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                        clearObject($scope.selectedModel);
                    }
                }

                if ($scope.settings.closeOnBlur) {
                    $document.on('click', function (e) {
                        var target = e.target.parentElement;
                        var parentFound = false;

                        while (angular.isDefined(target) && target !== null && !parentFound) {
                            if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                                if (target === $dropdownTrigger) {
                                    parentFound = true;
                                }
                            }
                            target = target.parentElement;
                        }

                        if (!parentFound) {
                            $scope.$apply(function () {
                                $scope.open = false;
                            });
                        }
                    });
                }

                $scope.getGroupTitle = function (groupValue) {
                    if ($scope.settings.groupByTextProvider !== null) {
                        return $scope.settings.groupByTextProvider(groupValue);
                    }

                    return groupValue;
                };

                $scope.getButtonText = function () {
                    if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                        if ($scope.settings.smartButtonMaxItems > 0) {
                            var itemsText = [];

                            angular.forEach($scope.options, function (optionItem) {
                                if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                    var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                    var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                    itemsText.push(converterResponse ? converterResponse : displayText);
                                }
                            });

                            if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                                itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                                itemsText.push('...');
                            }

                            return itemsText.join(', ');
                        } else {
                            var totalSelected;

                            if ($scope.singleSelection) {
                                totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                            } else {
                                totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                            }

                            if (totalSelected === 0) {
                                return $scope.texts.buttonDefaultText;
                            } else {
                                return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                            }
                        }
                    } else {
                        return $scope.texts.buttonDefaultText;
                    }
                };

                $scope.getPropertyForObject = function (object, property) {
                    if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                        return object[property];
                    }

                    return '';
                };

                $scope.selectAll = function () {
                    $scope.deselectAll(false);
                    $scope.externalEvents.onSelectAll();

                    angular.forEach($scope.options, function (value) {
                        $scope.setSelectedItem(value[$scope.settings.idProp], true);
                    });
                };

                $scope.deselectAll = function (sendEvent) {
                    sendEvent = sendEvent || true;

                    if (sendEvent) {
                        $scope.externalEvents.onDeselectAll();
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                    } else {
                        $scope.selectedModel.splice(0, $scope.selectedModel.length);
                    }
                };

                $scope.setSelectedItem = function (id, dontRemove) {
                    var findObj = getFindObj(id);
                    var finalObj = null;

                    if ($scope.settings.externalIdProp === '') {
                        finalObj = _.find($scope.options, findObj);
                    } else {
                        finalObj = findObj;
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                        angular.extend($scope.selectedModel, finalObj);
                        $scope.externalEvents.onItemSelect(finalObj);

                        return;
                    }

                    dontRemove = dontRemove || false;

                    var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                    if (!dontRemove && exists) {
                        $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                        $scope.externalEvents.onItemDeselect(findObj);
                    } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                        $scope.selectedModel.push(finalObj);
                        $scope.externalEvents.onItemSelect(finalObj);
                    }
                };

                $scope.isChecked = function (id) {
                    if ($scope.singleSelection) {
                        return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                    }

                    return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
                };

                $scope.externalEvents.onInitDone();
            }
        };
    }])

.directive("royalSlider", function () {
    return {
        restrict: 'C',
        link: function (scope, element, attributes) {
            var rsOptions = {
                // options go here
                // as an example, enable keyboard arrows nav
                keyboardNavEnabled: true,
                autoScaleSlider: true,
                controlNavigation: 'thumbnails',
                controlNavigationSpacing: 0,
                arrowsNavAutoHide: true,
                arrowsNavHideOnTouch: true,
                keyboardNavEnabled: true,
                imageScaleMode: 'fill',
                fullscreen: false,
                loop: true,
                thumbs: {
                    spacing: 1,
                    firstMargin: false,
                    paddingBottom: 0
                },              
                spacing: 0,
                navigateByClick: true,
                fadeinLoadedSlide: true,
                arrowsNav:false,               
            };
            return $(".royalSlider").royalSlider(rsOptions);
        }
    }
})
;

