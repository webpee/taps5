function AuthorisedWorkshopCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, $cookieStore, localStorageService) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idCountry: '',
            idState: '',
            idCity: '',
            City: '',
            stateId: '',
            cityId: '',
            idWorkshope: '',
            State: '',
            Name: '',
            ContactNumber: '',
            PersonInCharge: '',
            Email: '',
            SearchWorkshope: ''
        };

        $scope.markers = [];

        $http.get(route.FrontLookup.GetTapsAuthorizedWorkShop).success(function (data) {
            $scope.markers = data;
            $scope.initialize();
        });

        $http.get(route.FrontLookup.GetAllCountry).success(function (data) {
            $scope.lstCountry = data;
        });
        $http.get(route.FrontLookup.GetAllCountryState).success(function (data) {
            $scope.Statelst = data;
        });

        $scope.GetAllWorkshops();

    };

    $scope.GetCityByStateId = function (id) {
        $scope.model.idCity = '';
        $scope.model.City = '';
        $scope.lstCity = '';
        var params = {
            id: id
        };
        $http.get(route.FrontLookup.GetCityByStateId, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.lstCity = data;
            }
        });
    }
    $scope.GetAllWorkshops = function () {
        $http.get(route.FrontLookup.GetAllWorkshops).success(function (data) {
            if (data.length > 0) {
                $scope.workshopeList = data;
            }
        });
    }

    $scope.GetAllWorkshopsByName = function () {
        $scope.workshopeList = '';
        $scope.model.idWorkshope = '';
        $scope.model.State = '';
        $scope.model.City = '';
        var params = {
            Wname: $scope.model.SearchWorkshope
        }
        $http.get(route.FrontLookup.GetAllWorkshopsByName, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.workshopeList = data;
                $scope.ListOfWorkshopForDropDown = data;

                //Set pagination for result of workshop by name
                $scope.currentPage = 1;
                $scope.totalItems = $scope.ListOfWorkshopForDropDown.length;
                $scope.entryLimit = 5; // items per page
                $scope.noOfPages = 5;

                $scope.ViewNoData = 0;

            }
            else {
                $scope.ListOfWorkshopForDropDown = [];
                //Set pagination for result of workshop by name
                $scope.currentPage = 1;
                $scope.totalItems = $scope.ListOfWorkshopForDropDown.length;
                $scope.entryLimit = 5; // items per page
                $scope.noOfPages = 5;

                //Set Flag For Display Error
                $scope.ViewNoData = 1;
            }
        });
    }

    $scope.FilterWorkshopeList = function () {
        $scope.workshopeList = '';
        $scope.model.idWorkshope = '';
        var params = {
            stateId: $scope.model.State,
            cityId: $scope.model.City
        }
        $http.get(route.FrontLookup.FilterWorkshopeList, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.workshopeList = data;
            }
        });
    }

    $scope.SubmitWorkshope = function (obj) {
        $http.post(route.FrontLookup.SubmitWorkshope, obj).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
        });
        $scope.Reset();
    }

    var map;

    $scope.initialize = function () {
        var infoWindow;

        var mapOptions = {
            center: { lat: 3.037092, lng: 101.448344 },
            zoom: 13,
            disableDefaultUI: true
        };

        var map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);

        var input = (document.getElementById('pac-input'));
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
                    $scope.GetCityByStateId($scope.model.State);
                    $scope.model.City = data.idCity;
                    $scope.model.idWorkshope = data.id;
                    //$scope.FilterWorkshopeList($scope.model.City, $scope.model.State);
                    var params = {
                        stateId: $scope.model.State,
                        cityId: $scope.model.City
                    }
                    $http.get(route.FrontLookup.FilterWorkshopeList, { params: params }).success(function (data) {
                        $scope.workshopdata = data;
                        $scope.WorkshopDataList = _.where($scope.workshopdata, { "id": parseInt($scope.model.idWorkshope) });
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

    //Set Authorised Worjshop dropdown 
    $scope.SelectTapsAuthWorkshop = function (o) {
        if (o.id != null && o.id != '') {
            $scope.model.idWorkshope = o.id;
            $scope.model.State = o.idState;
            $scope.GetCityByStateId(o.idState);
            $scope.model.City = o.idCity;
            $scope.model.idCountry = o.idCountry;
        }
        else {
            $scope.model.idWorkshope = '';
            $scope.model.State = '';
            $scope.model.City = '';
        }
    }

    $scope.Reset = function () {
        $scope.ListOfWorkshopForDropDown = [];
        $scope.ViewNoData = 0;
        $scope.init();
    }

    $scope.init();
}