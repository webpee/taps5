function ProductImageCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, filterFilter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            ImgList: '',
            idProduct: '',
            idMedia: '',
            idproduct: ''
        };
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;

        $scope.GetAllProduct();
    };

    $scope.FetchMedia = function (page) {
        var params = {
            page: page,
            SearchText: $scope.model.SearchText3
        };
        $http.get(route.Lookup.GetAllMedia, { params: params }).success(function (data) {
            $scope.pager = data.pager;
            $scope.ImageList = data.list;
            //$('#Product').modal('show');
        });
    }

    $scope.CheckSearchProduct = function () {
        if ($scope.model.SearchText3 == '') {
            $scope.FetchMedia(1);
        }
        else {
            return;
        }
    }
        
    $scope.FetchImages = function () {
        $scope.ImageArray = [];
        console.log($scope.ImageArray);
        console.log($scope.model.ImgList);
        if ($scope.model.ImgList.length > 0) {
            for (var i = 0; i < $scope.model.ImgList.length; i++) {
                $scope.ImageArray.push($scope.model.ImgList[i].id);
            }
        }
        else {
            $scope.ImageArray = null;
        }
    }

    //Get All Product's Name
    $scope.GetAllProduct = function () {
        $http.get(route.Lookup.GetAllProductDrop).success(function (data) {
            $scope.Product = data;
        });
    }

    //Get Imagelist By ProductId
    $scope.GetProductImage = function () {
        $scope.ProductImagelst = '';
        var params = {
            id: $scope.model.idProduct
        };
        $http.get(route.Lookup.GetProductImage, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.ProductImagelst = data;

                $scope.currentPage = 1;
                $scope.totalItems = $scope.ProductImagelst.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 10;
            }
        });
    }

    $scope.DeleteProductImage = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteProductImage, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetProductImage();
        });

    }

    //Save Images By ProductId
    $scope.AddImage = function () {
        var params = {
            idProduct: $scope.model.idProduct,
            idMedia: $scope.ImageArray
        };
        console.log(params.idMedia);
        if ($scope.ImageArray != undefined && $scope.ImageArray != null) {
            $http.get(route.Lookup.AddImage, { params: params }).success(function (data) {

                if (data.success == 1) {
                    toastr.success(data.message);
                }
                else if (data.error == -1) {
                    toastr.error(data.message);
                }
                else if (data.error == 2) {
                    toastr.error(data.message);
                }

                $scope.GetProductImage();

            });
        }
        else
        {
            toastr.error("Please Select at least one Image.");
        }
    }


    $scope.Reset = function () {
        $scope.init();
        $scope.ProductImagelst = null;
    }

    $scope.init();
}