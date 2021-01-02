function DeliverAddressCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, localStorageService) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Name: '',
            ContactNo: '',
            idState: '',
            idCity: '',
            Address: '',
            Address1: '',
            idUser: '',
            idCountry: '',
            idWorkshope: '',
            City: '',
            stateId: '',
            cityId: '',
            SearchWorkshope: '',
            AddWorkshop: false,
            State: '',

            form: 'Individual',
        };

        $scope.CheckUserLogin();
        $scope.workshopdata = [];
        $scope.markers = [];

        $http.get(route.FrontLookup.GetAllCountry).success(function (data) {
            $scope.lstCountry = data;
        });
        $http.get(route.FrontLookup.GetAllCountryState).success(function (data) {
            $scope.lstState = data;
        });

        $http.get(route.FrontLookup.GetTapsAuthorizedWorkShop).success(function (data) {            
            $scope.markers = data;
        });

        if (localStorageService.get('idWorkshop') != null) {         
            $scope.model.form = 'Workshop';
        }

        $http.get(route.FrontLookup.GetAllWorkshops).success(function (data) {
            $scope.workshopeList = '';
            $scope.model.idWorkshope = '';
            if (data.length > 0) {
                $scope.workshopeList = data;
                $scope.WorkData = data;
                if (localStorageService.get('idWorkshop') != null) {
                    id = localStorageService.get('idWorkshop');                    
                    $scope.FetchWorkshopById(id);
                    $scope.SearchWorkshopeById(id);
                }
                else {
                    localStorageService.set('idWorkshop', null)
                }
            }

        });
        $scope.GetAllDeliveryAddress();

        //localStorageService.set('idAddress', null);
    };

    $scope.CheckUserLogin = function () {
        $http.get(route.FrontLookup.CheckUserLogin).success(function (data) {
            if (data.success == 1) {
                $scope.lstCartItems = localStorageService.get('CartItem');
                if ($scope.lstCartItems != null) {
                    var objCart = $scope.lstCartItems;
                    $http.post(route.FrontLookup.SaveUsersCartItems, objCart).success(function (data) {
                        if (data.success == 1) {
                            localStorageService.set('CartItem', null);
                        }
                        else if (data.error == 2) {
                            toastr.error(data.message);
                        }
                    });
                }
            }
        });
    }


    $scope.BuyProduct = function (id) {
        localStorageService.set('idWorkshop', null);
        localStorageService.set('idAddress', id);
        var params = {
            id: id
        };
        $http.get(route.FrontLookup.SetDeliveryAddres, { params: params }).success(function (data) {
            console.log(JSON.stringify(data));
        });
        if (localStorageService.get('idAddress') != null) {
            window.location.href = "/OrderSummary/Index";
        }
    }

    $scope.SetSummaryValue = function (id) {
        localStorageService.set('idAddress', null);
        localStorageService.set('idWorkshop', id);
        var params = {
            id: id
        };
        $http.get(route.FrontLookup.SetAuthorizeWorkshop, { params: params }).success(function (data) {
            console.log(JSON.stringify(data));
        });
        if (localStorageService.get('idWorkshop') != null) {
            window.location.href = "/OrderSummary/Index";
        }
    }

    $scope.GetCityByStateId = function (id) {
        $scope.lstCity = '';
        $scope.model.idCity = '';
        $scope.model.City = '';
        $scope.WorkshopDataList = '';
        $scope.model.idWorkshope = '';
        var params = {
            id: id
        };
        $http.get(route.FrontLookup.GetCityByStateId, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.lstCity = data;
            }
        });

        $http.get(route.FrontLookup.GetAllWorkshopsByState, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.workshopdata = data;
                var params = {
                    id: $scope.workshopdata[0].id
                };
                $http.get(route.FrontLookup.GetTapsAuthorizedWorkShopById, { params: params }).success(function (data) {                    
                    $scope.MarkerPosition = data;
                    google.maps.event.addDomListener(window, "load", $scope.initialize());
                });
            }
        });
    }

    $scope.GetCityByStateIdForMarker = function (id) {
        $scope.lstCity = '';
        $scope.model.idCity = '';
        $scope.model.City = '';
        $scope.WorkshopDataList = '';
        $scope.model.idWorkshope = '';
        var params = {
            id: id
        };
        $http.get(route.FrontLookup.GetCityByStateId, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.lstCity = data;
            }
        });
    }

    //Workshop
    $scope.GetAllWorkshopsByName = function () {
        $scope.WorkshopDataList = '';
        $scope.model.idWorkshope = '';
        $scope.model.AddWorkshop = false;
        var params = {
            Wname: $scope.model.SearchWorkshope
        }
        $http.get(route.FrontLookup.GetAllWorkshopsByName, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.WorkshopDataList = data;

            }
        });
        $scope.model.State = '';
        $scope.model.City = '';
    }

    $scope.FilterWorkshopeList = function (cityId, stateId) {
        $scope.model.idWorkshope = '';
        $scope.model.AddWorkshop = false;
        var params = {
            stateId: stateId,
            cityId: cityId
        }
        $http.get(route.FrontLookup.FilterWorkshopeList, { params: params }).success(function (data) {
            $scope.workshopdata = data;
            if (data.length > 0) {
                var params = {
                    id: $scope.workshopdata[0].id
                };
                $http.get(route.FrontLookup.GetTapsAuthorizedWorkShopById, { params: params }).success(function (data) {
                    $scope.MarkerPosition = data;
                    google.maps.event.addDomListener(window, "load", $scope.initialize());
                });
            }
        });        
    }
    $scope.FetchWorkshopById = function (id) {
        $scope.model.AddWorkshop = false;
        $scope.WorkshopDataList = '';
        $scope.WorkshopDataList = _.where($scope.WorkData, { "id": parseInt(id) });
        var params = {
            id: id
        };
        $http.get(route.FrontLookup.GetTapsAuthorizedWorkShopById, { params: params }).success(function (data) {
            $scope.MarkerPosition = data;
            google.maps.event.addDomListener(window, "load", $scope.initialize());
        });        
    }

    $scope.SearchWorkshopeById = function (id) {
        localStorageService.set('idWorkshop', id);
        $scope.lstWorkshopData = '';
        $scope.lstWorkshopData = _.where($scope.WorkData, { "id": parseInt(id) });
        console.log($scope.lstWorkshopData);
        $scope.model.AddWorkshop = true;
    }

    $scope.Reset = function () {
        localStorageService.set('idWorkshop', null);
        $scope.lstWorkshopData = '';
        $scope.model.State = '';
        $scope.model.City = '';
        $scope.model.idWorkshope = '';
        $scope.model.SearchWorkshope = '';
        $scope.model.AddWorkshop = false;
    }
    //Address
    $scope.GetAllDeliveryAddress = function () {
        $http.get(route.FrontLookup.GetAllDeliveryAddress).success(function (data) {
            $scope.list1 = data;
        });
    }

    $scope.CreateAddress = function (obj) {
        obj.id = $scope.model.id;
        obj.Address = $scope.model.Address + " " + $scope.model.Address1;

        $http.post(route.FrontLookup.CreateDeliveryAddress, obj).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            $scope.init();
        });
    }

    $scope.FetchDeliveryAddressById = function (o) {
        $scope.model.id = o.id;
        $scope.model.Name = o.Name;
        $scope.model.ContactNo = o.ContactNo;
        $scope.model.idState = o.idState;
        $scope.model.idCity = o.idCity;
        $scope.model.Address = o.Address;

        var params = {
            id: o.idState
        };

        $http.get(route.FrontLookup.GetCityByStateId, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.lstCity = data;
                $scope.model.idCity = o.idCity;
            }
        });
    }

    $scope.DeleteDeliveryAddress = function (o) {
        var params = {
            Id: o.id,
        };
        $http.get(route.FrontLookup.DeleteDeliveryAddress, { params: params }).success(function (data) {
            if (data.success == 1)
                toastr.success(data.message);
            else
                toastr.error(data.message);
            $scope.init();
        });
    }
       
            
    //GoogleMap JS

    var map;

    $scope.initialize = function () {
        var infoWindow;

        var latitude = 3.037092;
        var longitude = 101.448344;
        
        if ($scope.MarkerPosition != null && $scope.MarkerPosition != undefined && $scope.MarkerPosition != '') {            
            latitude = $scope.MarkerPosition.Latitude;
            longitude = $scope.MarkerPosition.Longitude;            
        }

        var mapOptions = {
            center: { lat: latitude, lng: longitude },
            zoom: 13,
            disableDefaultUI: true
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
        
        var input;
        if (document.getElementById('pac-input') != null) {
            input = (document.getElementById('pac-input'));
        }
        else
        {
            var g = document.createElement('div');
            g.id = 'someId';
            input = document.createElement("input");
            input.type = "text";
            input.className = "controls";
            input.id = "pac-input";
        }
        
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var infowindow = new google.maps.InfoWindow();
        $scope.setMarker = function (map, position, title, content, id) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };
            marker = new google.maps.Marker(markerOptions);

            $scope.markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                $scope.MarkerPosition = null;
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                //var infoWindowOptions = {
                //    title: marker.title,
                //    content: content
                //};
                infoWindow = new google.maps.InfoWindow();
                infowindow.open(map, marker);
                infowindow.setContent('<div><strong>' + title + '</strong><br>' +
               '<strong>Address:</strong> ' + content + '<br>'
               );
                $scope.model.idWorkshope = id;
                var params = {
                    id: id,
                };

                $http.get(route.FrontLookup.GetWorkshopById, { params: params }).success(function (data) {
                    $scope.model.idCountry = data.idCountry;
                    $scope.model.State = data.idState;
                    $scope.GetCityByStateIdForMarker($scope.model.State);
                    $scope.model.City = data.idCity;
                    $scope.model.idWorkshope = data.id;
                    //$scope.FilterWorkshopeList($scope.model.City, $scope.model.State);
                    var params = {
                        stateId: $scope.model.State,
                        cityId: $scope.model.City
                    }
                    $http.get(route.FrontLookup.FilterWorkshopeList, { params: params }).success(function (data) {
                        $scope.workshopdata = data;
                    
                        if (data.length > 0) {
                            $scope.model.AddWorkshop = false;
                            $scope.WorkshopDataList = _.where($scope.workshopdata, { "id": parseInt($scope.model.idWorkshope) });
                        }
                    });
                });
            });
        }

        angular.forEach($scope.markers, function (item) {
            $scope.setMarker(map, new google.maps.LatLng(item.Latitude, item.Longitude), item.Title, item.Address, item.idAuthorizeWorkshop);
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
            infowindow.close();
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(13);
            }
            var marker = new google.maps.Marker({
                map: map,
            });
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });
            //Set the position of the marker using the place ID and location
            marker.setPlace({
                placeId: place.place_id,
                location: place.geometry.location
            });
            marker.setVisible(true);

            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                place.formatted_address);
            infowindow.open(map, marker);
        });
    }

    $scope.init();

}