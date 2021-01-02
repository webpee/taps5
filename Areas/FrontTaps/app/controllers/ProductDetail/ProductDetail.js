function ProductDetailCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, AddCart, filterFilter, localStorageService) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Review: '',
            Rate: '',
            Qty: 1,
            idProduct: $('#idProduct').val()
        };

        var idProduct = $('#idProduct').val();
        $scope.model.idProduct = idProduct;

        $scope.GetProductReview();
        $scope.GetProductImages();
        $scope.GetAverageRating();
        $scope.FetchProductById();
        $scope.FetchVahicleList();
    };

    $scope.GetProductImages = function () {
        var idProduct = $('#idProduct').val();
        var params = {
            idProduct: idProduct
        }
        $http.get(route.FrontLookup.GetProductImages, { params: params }).success(function (data) {
            $scope.ImageList = data;
            $scope.PutProductImage();
        });
    }
    
    $scope.PutProductImage = function () {
        $('.SlideProduct').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            speed: 500,
            slidesToShow: 2
        });

        for (var i = 0; i < $scope.ImageList.length; i++) {
            $('.SlideProduct').slick('slickAdd', '<div><img class="gallery-cell" style="width:100px;height:100px" alt="" data-echo="/MediaUploads/' + $scope.ImageList[i].MediaImage + '" src="/MediaUploads/' + $scope.ImageList[i].MediaImage + '" /></div>');

        }
    }

    $scope.GetProductReview = function () {
        var idProduct = $('#idProduct').val();
        var params = {
            idProduct: idProduct
        }

        $http.get(route.FrontLookup.GetProductReview, { params: params }).success(function (data) {
            $scope.lstProductReview = data;
            for (var i = 0; i < data.length; i++) {

                if (data[i].CreatedDate !== null) {
                    data[i].CreatedDate = $filter('date')(data[i].CreatedDate.substr(6, 13), "dd MMMM yyyy");
                }

            }
            $scope.lstProductReview = data;
            $scope.getValue();
        });

    };

    $scope.GetAverageRating = function () {
        var idProduct = $('#idProduct').val();
        var params = {
            idProduct: idProduct
        }
        $http.get(route.FrontLookup.GetAverageRating, { params: params }).success(function (data) {
            $scope.$watch(function () {
                $('#ReviewRating').raty({
                    score: data,
                    readOnly: true
                });
            }, true);
        })
    }

    $scope.getValue = function () {
        $scope.$watch(function () {
            for (var i = 0; i < $scope.lstProductReview.length; i++) {
                $('#Ratting_' + $scope.lstProductReview[i].id).raty({
                    score: $scope.lstProductReview[i].Rate,
                    readOnly: true
                });
            }
        }, true);
    }


    //Rating For User
    $('#Ratting').raty({
        click: function (score, evt) {
            $scope.model.Rate = score;
        }
    });

    $scope.FetchProductById = function (o) {
        var idProduct = $('#idProduct').val();
        var params = {
            id: idProduct
        }
        $http.get(route.FrontLookup.FetchProductById, { params: params }).success(function (data) {
            $scope.lstProductDetail = data;
        });
    }

    $scope.FetchVahicleList = function () {
        var idProduct = $('#idProduct').val();
        $scope.model.idProduct = idProduct;
        var params = {
            idProduct: idProduct
        }
        $http.get(route.FrontLookup.GetVahicleListByProductId, { params: params }).success(function (data) {
            $scope.lstVehicleDetail = data;
        })
    }

    $scope.ProductReview = function (o) {
        $http.post(route.FrontLookup.SaveProductReview, o).success(function (data) {
            $scope.GetProductReview();
            $scope.init();
        })
    }

    $scope.DoLogin = function () {
        toastr.error("Please Login to Give Review on Product");
    }

    //Add To Cookie If User Not Login
    $scope.AddtoCookie = function (o) {
        $.blockUI({ message: '<h3>Loading...</h3>' });
        o.Qty = $scope.model.Qty;
        o.id = $scope.lstProductDetail.id,
        o.Name = $scope.lstProductDetail.Name,
        o.Condition = $scope.lstProductDetail.Condition,
        o.Warranty = $scope.lstProductDetail.Warranty,
        o.SalePrice = $scope.lstProductDetail.SalePrice
        $scope.yourcookie = localStorageService.get('CartItem');

        var blnFlag = true;
        if ($scope.yourcookie != null) {
            for (var i = 0; i < $scope.yourcookie.length; i++) {
                if ($scope.yourcookie[i].id == o.id) {
                    //alert("Item is Already in cart");
                    toastr.error("Item is Already in cart");
                    blnFlag = false;
                    $.unblockUI();
                    return;
                }
            }
        }
        else {
            blnFlag = true;
        }
        if (blnFlag == true) {
            AddCart.AddItemToCart(o);
            toastr.success("Product Added to Cart Successfully");
        }

        $.unblockUI();
    }

    //Add To Cookie If User Login
    $scope.AddtoCart = function (id) {
        var params = {
            id: id,
            Qty: $scope.model.Qty
        };
        $http.get(route.FrontLookup.AddtoCartFromDetail, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
        });
    }

    //Increment Qty
    $scope.PlusQuantity = function (objCart) {
        $scope.model.Qty = $scope.model.Qty + 1;
    }

    //Decrement Qty
    $scope.MinusQuantity = function (objCart) {
        if ($scope.model.Qty <= 1) {
            return;
        }
        $scope.model.Qty = $scope.model.Qty - 1;
    }

    $scope.Reset = function () {
        $scope.init();
    }

    $("#pcontainer").mouseover(function () {
        $("#phello").css('visibility', 'visible');
    });
    $("#pcontainer").mouseleave(function () {
        $("#phello").css('visibility', 'hidden');
        $scope.$window.onclick($window.event);

    });

    $("#ppcontainer").mouseover(function () {
        $("#phello").css('visibility', 'visible');
    });
    $("#ppcontainer").mouseleave(function () {
        $("#phello").css('visibility', 'hidden');
        $scope.$window.onclick($window.event);
    });


    //Close popup at outside click
    $scope.$window = $window;
    $scope.$window.onclick = function (event) {

        if ($rootScope.flag == true) {
            $rootScope.flag = false;
            //$scope.$apply();
            $scope.GetFilterData(1);
            //$scope.$apply();
        }
    };
    //end of outside click

    $scope.init();

}