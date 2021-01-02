function ProductGeneratorCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, filterFilter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            idComponent: '',
            Name: '',
            Description: '',
            ImageUrl: '',
            SKU: '',
            SKUImageUrl: '',
            RegularPrice: 0,
            SalePrice: 0,
            MaxPrice: 0,
            MinPrice: 0,
            AvgPrice: 0,
            Date: '',
            SalePriceDateFrom: '',
            SalePriceDateTo: '',
            ManageStock: false,
            StockQty: '',
            StockStatus: '',
            AllowBackOrder: false,
            SoldIndividually: false,
            Weight: '',
            VolumeL: '',
            VolumeW: '',
            VolumeH: '',
            idVendor: '',
            MovingAvgPrice: '',

            //Product Meta
            idProduct: '',
            MetaKey: '',
            MetaValue: '',
            Warranty: '',
            Condition: '',
            SearchText: '',
            FlagBtn: true,
            SearchText3: '',
            SearchText2: ''
        };
        $scope.itemsPerPage = 5;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.flgEditSave = false;

        // DropDown of Document
        $http.get(route.Lookup.GetAllMakesProductGenerator).success(function (data) {
            $scope.lstMake = data;
            $('#ddMake').multiselect(
            {
                includeSelectAllOption: true,
                enableFiltering: true,
                maxHeight: 200,
                onChange: function (element, checked) {
                    var brands = $('#ddMake option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push($(this).val());
                    });
                    $scope.SelectedMake = [selected];
                    $scope.GetAllModelsProductGenerator();
                }
            });
            $('#ddMake').multiselect('dataprovider', JSON.parse(JSON.stringify($scope.lstMake).replace("DocumentNo", "label")));
        });
        //End of DropDown of Document
        $scope.GetAllModelsProductGenerator();
        $scope.GetAllTrimsProductGenerator();
        $scope.GetAllYearProductGenerator();

        var date = new Date();
        $scope.model.Date = $filter('date')(date, "dd-MM-yyyy") + ' - ' + $filter('date')(date, "dd-MM-yyyy");

        $scope.GetAllProduct(1);

        $http.get(route.Lookup.GetAllComponentCategory).success(function (data) {
            if (data.length > 0) {
                $scope.Categorylist = data;
            }
        });

        $http.get(route.Lookup.GetAllVendor).success(function (data) {
            if (data.length > 0) {
                $scope.lstVendor = data;
            }
        });
        //document.getElementById("myBtn").disabled = true;
    };

    $scope.GetAllModelsProductGenerator = function () {
        if ($scope.SelectedMake == undefined) {
            var params = {
                SelectedMake: null,
            }
            // DropDown of Document
            $http.get(route.Lookup.GetAllModelsProductGenerator, { params: params }).success(function (data) {
                $scope.lstModel = data;
                $('#ddModel').multiselect(
                {
                    includeSelectAllOption: true,
                    enableFiltering: true,
                    maxHeight: 200,
                    onChange: function (element, checked) {
                        var brands = $('#ddModel option:selected');
                        var selected = [];
                        $(brands).each(function (index, brand) {
                            selected.push($(this).val());
                        });
                        $scope.SelectedModel = [selected];
                        $scope.GetAllTrimsProductGenerator();
                    }
                });
                $('#ddModel').multiselect('dataprovider', JSON.parse(JSON.stringify($scope.lstModel).replace("lstModel", "label")));
            });
            //End of DropDown of Document
        }
        else {
            var params = {
                SelectedMake: $scope.SelectedMake[0],
            }
            // DropDown of Document
            $http.get(route.Lookup.GetAllModelsProductGenerator, { params: params }).success(function (data) {
                $scope.lstModel = data;
                $('#ddModel').multiselect(
                {
                    includeSelectAllOption: true,
                    enableFiltering: true,
                    maxHeight: 200,
                    onChange: function (element, checked) {
                        var brands = $('#ddModel option:selected');
                        var selected = [];
                        $(brands).each(function (index, brand) {
                            selected.push($(this).val());
                        });
                        $scope.SelectedModel = [selected];
                        $scope.GetAllTrimsProductGenerator();
                    }
                });
                $('#ddModel').multiselect('dataprovider', JSON.parse(JSON.stringify($scope.lstModel).replace("lstModel", "label")));
            });
            //End of DropDown of Document
        }
    }

    // DropDown of Document
    $scope.GetAllTrimsProductGenerator = function () {
        if ($scope.SelectedModel == undefined) {
            var params = {
                SelectedModel: null,
            }
            $http.get(route.Lookup.GetAllTrimsProductGenerator, { params: params }).success(function (data) {
                $scope.lstTrim = data;
                $('#ddTrim').multiselect(
                {
                    includeSelectAllOption: true,
                    maxHeight: 200,
                    enableFiltering: true,
                    onChange: function (element, checked) {
                        var brands = $('#ddTrim option:selected');
                        var selected = [];
                        $(brands).each(function (index, brand) {
                            selected.push($(this).val());
                        });
                        $scope.SelectedTrim = [selected];
                    }
                });
                $('#ddTrim').multiselect('dataprovider', JSON.parse(JSON.stringify($scope.lstTrim).replace("lstTrim", "label")));
            });
        }
        else {
            var params = {
                SelectedModel: $scope.SelectedModel[0],
            }
            $http.get(route.Lookup.GetAllTrimsProductGenerator, { params: params }).success(function (data) {
                $scope.lstTrim = data;
                $('#ddTrim').multiselect(
                {
                    includeSelectAllOption: true,
                    maxHeight: 200,
                    enableFiltering: true,
                    onChange: function (element, checked) {
                        var brands = $('#ddTrim option:selected');
                        var selected = [];
                        $(brands).each(function (index, brand) {
                            selected.push($(this).val());
                        });
                        $scope.SelectedTrim = [selected];
                    }
                });
                $('#ddTrim').multiselect('dataprovider', JSON.parse(JSON.stringify($scope.lstTrim).replace("lstTrim", "label")));
            });
        }
    }
    //End of DropDown of Document

    $scope.GetAllYearProductGenerator = function () {
        // DropDown of Document
        $http.get(route.Lookup.GetAllYearProductGenerator).success(function (data) {
            $scope.lstYear = data;
            $('#ddYear').multiselect(
            {
                includeSelectAllOption: true,
                maxHeight: 200,
                enableFiltering: true,
                onChange: function (element, checked) {
                    var brands = $('#ddYear option:selected');
                    var selected = [];
                    $(brands).each(function (index, brand) {
                        selected.push($(this).val());
                    });
                    $scope.SelectedYear = [selected];
                    console.log($scope.SelectedYear);
                }
            });
            $('#ddYear').multiselect('dataprovider', JSON.parse(JSON.stringify($scope.lstYear).replace("lstYear", "label")));
        });
        //End of DropDown of Document
    }

    //Date Ranger
    var d = new Date();
    $('input[name="dateranger"]').daterangepicker(
       {
           format: 'DD-MM-YYYY',
           startDate: d,
           endDate: d
       },
       function (start, end, label) {
           $scope.model.SalePriceDateFrom = start.format('MM/DD/YYYY');
           $scope.model.SalePriceDateTo = end.format('MM/DD/YYYY');
       });
    //End of Date Ranger

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


    $scope.FetchMediaSKU = function (page) {
        var params = {
            page: page,
            SearchText: $scope.model.SearchText2
        };
        $http.get(route.Lookup.GetAllMedia, { params: params }).success(function (data) {
            $scope.pager = data.pager;
            $scope.ImageList = data.list;

            // $('#SKUImage').modal('show');
        });
    }

    $scope.CheckSearchSKU = function () {
        if ($scope.model.SearchText2 == '') {
            $scope.FetchMedia(1);
        }
        else {
            return;
        }
    }

    $scope.SelectImage = function (Name) {
        $scope.model.ImageUrl = Name;
    }

    $scope.SelectImageSKU = function (Name) {
        $scope.model.SKUImageUrl = Name;
        $('#Product').modal('hide');
    }

    $scope.CheckSearchText = function () {
        if ($scope.model.SearchText != '') {
            return;
        }
        else {
            $scope.GetAllProduct(1);
        }
    }

    $scope.GetAllProduct = function (page) {

        var params = {
            page: page,
            SearchText: $scope.model.SearchText
        };

        $http.get(route.Lookup.GetAllProduct, { params: params }).success(function (data) {
            if (data.list.length > 0) {
                $scope.pager = data.pager;
                $scope.list1 = data.list;
            }
            else {
                $scope.pager = data.pager;
                $scope.list1 = data.list;
            }
        });
    }

    $scope.FetchProductById = function (o) {
        var params = {
            id: o.id,
        };

        if (o.SalePriceDateFrom != null && o.SalePriceDateTo != null) {
            $scope.model.Date = $filter('date')(o.SalePriceDateFrom.substr(6, 13), "dd-MM-yyyy") + " - " + $filter('date')(o.SalePriceDateTo.substr(6, 13), "dd-MM-yyyy");
        }
        $scope.model.id = o.id;
        $scope.model.Name = o.Name;
        $scope.model.Description = o.Description;
        $scope.model.ImageUrl = o.ImageUrl;
        $scope.model.idComponent = o.idComponent;
        $scope.model.SKU = o.SKU;
        $scope.model.SKUImageUrl = o.SKUImageUrl;
        $scope.model.RegularPrice = o.RegularPrice;
        $scope.model.SalePrice = o.SalePrice;
        $scope.model.MaxPrice = o.MaxPrice;
        $scope.model.MinPrice = o.MinPrice;
        $scope.model.AvgPrice = o.AvgPrice;
        $scope.model.ManageStock = o.ManageStock;
        $scope.model.StockQty = o.StockQty;
        $scope.model.StockStatus = o.StockStatus;
        $scope.model.Warranty = o.Warranty;
        $scope.model.Condition = o.Condition;
        $scope.model.AllowBackOrder = o.AllowBackOrder;
        $scope.model.SoldIndividually = o.SoldIndividually;
        $scope.model.Weight = o.Weight;
        $scope.model.VolumeL = o.VolumeL;
        $scope.model.VolumeW = o.VolumeW;
        $scope.model.VolumeH = o.VolumeH;
        $scope.model.idVendor = o.idVendor;
        $scope.model.MovingAvgPrice = o.MovingAvgPrice;

        $http.get(route.Lookup.GetAllProductMetaList, { params: params }).success(function (data) {
            $scope.list2 = data;
        });
        document.getElementById("myBtn").disabled = false;
        $scope.flgEditSave = true;
        $scope.idProductForVehicle = o.id;
        //document.getElementById("myBtnSave").disabled = true;
    }

    $scope.DeleteProduct = function (o) {
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.DeleteProduct, { params: params }).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }
            $scope.GetAllProduct();
        });
    }

    $scope.submitted = false;

    $scope.CreateProduct = function (form, obj) {
        if (form.$valid) {
            if ($('input[name="dateranger"]').val() === '') {
                $scope.model.SalePriceDateFrom = '';
                $scope.model.SalePriceDateTo = '';
                toastr.error('Please Select Date');
                return;
            }

            if ($scope.model.SalePriceDateFrom != null && $scope.model.SalePriceDateTo != null) {
                $scope.model.SalePriceDateFrom = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + d.getFullYear();
                $scope.model.SalePriceDateTo = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + d.getFullYear();
            }


            console.log($scope.SelectedMake);
            if ($scope.SelectedMake == undefined) {
                toastr.error("Please Select Make");
                return;
            }
            else if ($scope.SelectedMake[0].length == 0) {
                toastr.error('Please Select Make');
                return;
            }

            if ($scope.SelectedModel == undefined) {
                toastr.error('Please Select Model');
                return;
            }
            else if ($scope.SelectedModel[0].length == 0) {
                toastr.error('Please Select Model');
                return;
            }

            if ($scope.SelectedTrim == undefined) {
                toastr.error('Please Select Trim');
                return;
            }
            else if ($scope.SelectedTrim[0].length == 0) {
                toastr.error('Please Select Trim');
                return;
            }

            if ($scope.SelectedYear == undefined) {
                toastr.error('Please Select Year');
                return;
            }
            else if ($scope.SelectedYear[0].length == 0) {
                toastr.error('Please Select Year');
                return;
            }
            
            var params = {
                idForVehicleSave: 0,
                SelectedMake: $scope.SelectedMake[0],
                SelectedModel: $scope.SelectedModel[0],
                SelectedTrim: $scope.SelectedTrim[0],
                SelectedYear: $scope.SelectedYear[0]
            }

            obj.ImageUrl = $scope.model.ImageUrl;
            $http.post(route.Lookup.CreateProductGenerator, obj, { params: params }).success(function (data) {
                if (data.error == -1) {
                    toastr.error(data.message);
                }
                else if (data.success == 1) {
                    toastr.success(data.message);
                    $scope.init();
                }
                else if (data.error == 2) {
                    toastr.error(data.message);
                }
                $scope.Reset();
                $scope.list2 = null;
            });
        }
        else {
            console.log("adsasdasd");
            $scope.submitted = true;
        }
    }

    $scope.UpdateProduct = function (form, obj) {
        if (form.$valid) {
            if ($('input[name="dateranger"]').val() === '') {
                $scope.model.SalePriceDateFrom = '';
                $scope.model.SalePriceDateTo = '';
                toastr.error('Please Select Date');
                return;
            }

            if ($scope.model.SalePriceDateFrom != null && $scope.model.SalePriceDateTo != null) {
                $scope.model.SalePriceDateFrom = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + d.getFullYear();
                $scope.model.SalePriceDateTo = ((d.getMonth() + 1) < 10 ? '0' : '') + (d.getMonth() + 1) + '-' + (d.getDate() < 10 ? '0' : '') + d.getDate() + '-' + d.getFullYear();
            }

            obj.id = $scope.model.id;
            obj.ImageUrl = $scope.model.ImageUrl;
            console.log(obj);
            $http.post(route.Lookup.UpdateProduct, obj).success(function (data) {

                if (data.error == -1) {
                    toastr.error(data.message);
                }
                else if (data.success == 1) {
                    toastr.success(data.message);
                    $scope.init();
                }
                else if (data.error == 2) {
                    toastr.error(data.message);
                }
                $scope.Reset();
                $scope.list2 = null;
            });
        }
        else {
            $scope.submitted = true;
        }
    }



    //Product Meta
    $scope.CreateProductMeta = function (o) {
        o.idProduct = $scope.model.id;

        if (o.idProduct == '') {
            toastr.error("Please Select the Product");
            return;
        }
        $http.post(route.Lookup.CreateProductMeta, o).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            o.idProduct = '';
            o.MetaKey = '';
            o.MetaValue = '';
            $scope.GetAllProductMetaList();
        });
    }

    $scope.UpdateProductMeta = function (o) {
        o.idProduct = $scope.model.id;
        $http.post(route.Lookup.UpdateProductMeta, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
            else if (data.error == -1) {
                toastr.error(data.message);
            }

            $scope.GetAllProductMetaList();
        });
    }

    $scope.GetAllProductMetaList = function () {
        var params = {
            id: $scope.model.id
        };
        $http.get(route.Lookup.GetAllProductMetaList, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.list2 = data;
            }
        });
    }

    $scope.DeleteProductMeta = function (id) {
        var params = {
            id: id
        };
        $http.get(route.Lookup.DeleteProductMeta, { params: params }).success(function (data) {

            if (data.success == 1) {
                toastr.success(data.message);
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }

            $scope.GetAllProductMetaList();
        });
    }

    //Calculate Moving Avg Price

    $(document).ready(function () {
        $('#selecctall').click(function (event) {  //on click 
            if (this.checked) { // check select status
                $('.checkbox1').each(function () { //loop through each checkbox
                    this.checked = true;  //select all checkboxes with class "checkbox1"               
                });
            } else {
                $('.checkbox1').each(function () { //loop through each checkbox
                    this.checked = false; //deselect all checkboxes with class "checkbox1"                       
                });
            }
        });

    });

    $scope.CalculateMovingAvgPrice = function () {
        $scope.ColData = '';
        for (var j = 0; j < $scope.list1.length; j++) {
            var check = $('input:checkbox[name=colname' + j + ']').is(':checked');
            if (check == true) {

                if ($scope.ColData == '') {
                    $scope.ColData = $('input:checkbox[name=colname' + j + ']').val();
                }
                else {
                    $scope.ColData = $scope.ColData + "," + $('input:checkbox[name=colname' + j + ']').val();
                }
            }
        }
        console.log($scope.ColData);

        var params = {
            ProductIds: $scope.ColData
        };

        $http.get(route.Lookup.CalculateMovingAvgPrice, { params: params }).success(function (data) {

            if (data.error == -1) {
                toastr.error(data.message);
            }
            else if (data.success == 1) {
                toastr.success(data.message);
                $scope.Reset();
                $scope.list2 = null;
            }
            else if (data.error == 2) {
                toastr.error(data.message);
            }
        });
    }

    $scope.Reset = function () {
        $scope.init();
        $scope.list2 = null;
    }

    $scope.init();
}