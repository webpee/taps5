function AddItemCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter, $rootScope, localStorageService) {

    $scope.init = function () {
        setTimeout(function () {
            $('#AlertErrorMessage').fadeOut('fast');
        }, 5000);

        setTimeout(function () {
            $('#AlertSuccessMessage').fadeOut('fast');
        }, 5000);
        $scope.initModel();
    };

    $scope.initModel = function () {

        $scope.model = {
            id: '',
            Name: '',
            idCategory: '',
            Component: '',
            id: '',
            Vehicle: '',
            Model: '',
            YearFrom: '',
            YearTo: '',
            Trim: '',
            Make: '',
            IdFilter: false,
            idmodel: '',
            VehicleDetails: '',
            SelectedVehicle: '',
            ItemPrice: '',
            DeliveryPrice: '',
            Criterion: '',
            SelectedCriterion: '',
            Condition: '',
            Warranty: '',
            Quantity: '',
            ProductNo: '',
            ItemAge: '',
            ImageUrl: '',
            RecommendComponent: '',
            ComponentRemark: '',
            idModelTrimTransmission: ''
        };

        $scope.FilterVehicle = '';

        $scope.modelVehicle = {
            Make: '',
            Model: '',
            FromYear: '',
            ToYear: '',
            Trim: '',
            Remark: ''
        }
        $rootScope.flag = false;
        $scope.Component = '';
        $scope.FilterCategoryByBodyGroup();
        $scope.FilterCategoryByElectricalGroup();
        $scope.FilterCategoryByEngine();
        $scope.FilterCategoryByPowerTrain();
        $scope.SelectedVehicleList = '';

        $http.get(routeTapsAdmin.TapsAdmin.GetAllMake).success(function (data) {
            $scope.lstGetAllMake = data;
        });
        $scope.showFilter();

        $scope.FetchSaveProcessByVendorId();

    };

    //Check For Recommended Component


    //Get Vendor Product List Which is Saved
    $scope.FetchSaveProcessByVendorId = function () {
        $scope.lstSaveProcessList = '';
        $http.get(routeTapsAdmin.TapsAdmin.FetchSaveProcessByVendorId).success(function (data) {
            for (var i = 0; i < data.length; i++) {
                $scope.GetMakeItem(data[i]);
                $scope.GetAllYearList(data[i]);
                $scope.FillModelDataByMake(data[i], data[i].Make);
                $scope.GetAllTrimByModelIdList(data[i], data[i].Model);
                $scope.FilterVehicleListForVendor(data[i], data[i].Model, data[i].YearFrom, data[i].YearTo, data[i].Trim);
            }
            $scope.lstSaveProcessList = data;
        });
    }

    $scope.GetMakeItem = function (item) {
        $http.get(routeTapsAdmin.TapsAdmin.GetAllMake).success(function (data) {
            item.lstGetAllMake = data;
        });
    }


    $scope.SaveProcessUpdate = function (objVendorProduct, Flag) {
        objVendorProduct.IsPosted = Flag;

        $http.post(routeTapsAdmin.TapsAdmin.UpdateVendorProduct, objVendorProduct).success(function (data) {
            if (data == 'true') {
                if (Flag == true) {
                    toastr.success("Product Posted Successfully");
                    $scope.init();
                }
                else {
                    toastr.success("Product Saved Successfully");
                    $scope.init();
                }
            }
            else if (data == 'false') {
                toastr.error(data);
            }
            else {
                toastr.error(data);
            }
        });
    }

    $scope.SelectedVehicleName = function (item, ids) {
        var list = _.where(item.FilterVehicle, { id: parseInt(ids) });
        item.VehicleName = list[0].Make + " " + list[0].ModelName + " " + list[0].TrimName + " " + list[0].EngineName + " " + item.YearFrom + " - " + item.YearTo;
    }

    //Filter DropDown List Make
    $scope.GetAllTrimByModelIdList = function (item, idModel) {
        item.lstTrimData = '';
        $scope.model.Trim = '';
        if (idModel == null) {
            return;
        }
        if (idModel != 0) {
            var params = {
                id: idModel
            }
            $http.get(routeTapsAdmin.TapsAdmin.GetAllTrimByModelId, { params: params }).success(function (data) {
                if (data.length > 0) {
                    item.lstTrimData = data;
                }
            });
        }
    }

    $scope.FilterVehicleListForVendor = function (item, Model, FromYear, ToYear, Trim) {

        //if (Trim == '' || Trim == null) {
        //    item.FilterVehicle = '';
        //    return;
        //}
        item.FilterVehicle = '';
        var params = {
            idModel: Model,
            FromYear: FromYear,
            ToYear: ToYear,
            //idTrim: Trim
        }
        $http.get(routeTapsAdmin.TapsAdmin.FilterVehicleList, { params: params }).success(function (data) {
            if (data.length > 0) {
                item.FilterVehicle = data;
           
            }
        });
    }

    $scope.FillModelDataByMake = function (item, Make) {
        if (Make == '' || Make == null) {
            return;
        }
        item.lstGetModel = '';
        item.lstTrimData = '';
        var params = {
            id: Make
        };
        $http.get(routeTapsAdmin.TapsAdmin.GetModelData, { params: params }).success(function (data) {
            if (data.length > 0) {
                item.lstGetModel = data;
            }

        });
    }

    $scope.GetAllYearList = function (item) {
        $http.get(routeTapsAdmin.TapsAdmin.GetAllYear).success(function (data) {
            if (data.length > 0) {
                item.lstYearData = data;
            }
        });
    }

    //Send Component
    $scope.SendComponent = function () {

        if ($scope.model.RecommendComponent == '' && $scope.model.ComponentRemark == '') {
            toastr.error("Please Insert Values.");
            return;
        }

        var params = {
            RecommendComponent: $scope.model.RecommendComponent,
            ComponentRemark: $scope.model.ComponentRemark
        }

        $http.get(routeTapsAdmin.TapsAdmin.AddRecommandComponent, { params: params }).success(function (data) {
            if (data == 'true') {
                toastr.success("Recommandation For Component sent successfully");
            }
            else if (data == 'false') {
                toastr.error("Please Contact Administrator");
            }
            else {
                toastr.error(data);
            }
            $scope.init();
        });
    }

    $scope.SendRecommendVehicle = function (objRecommandVehicle) {

        if (objRecommandVehicle.Make == '' && objRecommandVehicle.Model == '' && objRecommandVehicle.FromYear == '' && objRecommandVehicle.ToYear == '' && objRecommandVehicle.Trim == '') {
            toastr.error("Please Insert Values.");
            return;
        }

        $http.post(routeTapsAdmin.TapsAdmin.AddRecommandVehicle, objRecommandVehicle).success(function (data) {
            if (data == 'true') {
                toastr.success("Recommandation For Vehicle sent successfully");
            }
            else if (data == 'false') {
                toastr.error("Please Contact Administrator");
            }
            else {
                toastr.error(data);
            }
            $scope.init();
        });
    }

    //Component List
    $scope.openComponent = function (i) {
        $('#selectpart-frst-' + i).off("click").on("click", function () {
            var ele = $(this);
            if (ele.hasClass('open')) {
                ele.parent('.selectcar-first').find('.selectpart-box').hide();
                ele.removeClass('open');
            } else {
                ele.parent('.selectcar-first').find('.selectpart-box').show();
                ele.addClass('open');
            }
        });
    }

    //Save Process
    $scope.SaveProcess = function (objVendorProduct, Flag, form) {
        if (form.$valid) {
            //$scope.model.idModelTrimTransmission = 5;
            console.log($scope.model.idModelTrimTransmission);
            console.log($scope.lstYearData);
            console.log(objVendorProduct);
            objVendorProduct.IsPosted = Flag;
            objVendorProduct.Quantity = $scope.model.Quantity.substr($scope.model.Quantity.lastIndexOf(':') + 1, $scope.model.Quantity.length);

            $http.post(routeTapsAdmin.TapsAdmin.AddVendorProduct, objVendorProduct, $scope.ImageUrls).success(function (data) {
                if (data == 'true') {
                    if (Flag == true) {
                        toastr.success("Product Posted Successfully");
                        $scope.init();
                    }
                    else {
                        toastr.success("Product Saved Successfully");
                        $scope.init();
                    }
                }
                else if (data == 'false') {
                    toastr.error("Please Contact Administrator");
                }
                else {
                    toastr.error(data);
                }
            });
        }
        else {
            toastr.error("Please Insert Values to Post Product");
        }
    }

    //ChangeEgg
    $scope.ChaneEgg = function (item) {
        var bln = true;
        if (item.Criterion == 'Quantity') {
            item.Quantity = item.CriterionValue;
            bln = false;
        }
        else {
            for (var i = 0; i < item.ProductMetaMgmt.length; i++) {
                if (item.Criterion == item.ProductMetaMgmt[i].MetaKey) {
                    item.ProductMetaMgmt[i].MetaValue = item.CriterionValue;
                    bln = false;
                }
            }
        }
        if (bln == true) {
            if (item.Criterion != 'Quantity') {
                var meta = {
                    MetaKey: item.Criterion,
                    MetaValue: item.CriterionValue,
                }
                item.ProductMetaMgmt.push(meta);
            }
        }

    };

    //Select Part
    $scope.FillComponent = function () {
        $scope.model.idComponent = $scope.model.Component.substr(0, $scope.model.Component.lastIndexOf('-'));
        $scope.Component = $scope.model.Component.substr($scope.model.Component.lastIndexOf('-') + 1, $scope.model.Component.length);
    }


    $scope.FilterCategoryByBodyGroup = function () {
        if (localStorageService.get('BodyGroupList') != null) {
            $scope.BodyGroup = localStorageService.get('BodyGroupList');
            //$scope.UpdatedDate1 = $filter('date')($scope.BodyGroup[0].UpdatedDate.substr(6, 13), "MM dd yyyy HH:mm:ss");
        }

        var params = {
            UpdatedDate: $scope.UpdatedDate1
        }

        $http.get(routeTapsAdmin.TapsAdmin.FilterCategoryByBodyGroup, { params: params }).success(function (data) {
            if (data.length > 0) {
                localStorageService.set('BodyGroupList', data);
                $rootScope.list1 = data;
            }
            else {
                $rootScope.list1 = $scope.BodyGroup;
            }
        });
    }


    $scope.FilterCategoryByElectricalGroup = function () {
        if (localStorageService.get('ElectricalGroupList') != null) {
            $scope.ElectricalGroup = localStorageService.get('ElectricalGroupList');
            $scope.UpdatedDate2 = $filter('date')($scope.ElectricalGroup[0].UpdatedDate.substr(6, 13), "MM dd yyyy HH:mm:ss");
        }

        var params = {
            UpdatedDate: $scope.UpdatedDate2
        }

        $http.get(routeTapsAdmin.TapsAdmin.FilterCategoryByElectricalGroup, { params: params }).success(function (data) {
            if (data.length > 0) {
                localStorageService.set('ElectricalGroupList', data);
                $rootScope.list2 = data;
            }
            else {
                $rootScope.list2 = $scope.ElectricalGroup;
            }
        });
    }

    $scope.FilterCategoryByEngine = function () {
        if (localStorageService.get('EngineList') != null) {
            $scope.Engine = localStorageService.get('EngineList');
            $scope.UpdatedDate3 = $filter('date')($scope.Engine[0].UpdatedDate.substr(6, 13), "MM dd yyyy HH:mm:ss");
        }

        var params = {
            UpdatedDate: $scope.UpdatedDate3
        }

        $http.get(routeTapsAdmin.TapsAdmin.FilterCategoryByEngine, { params: params }).success(function (data) {
            if (data.length > 0) {
                localStorageService.set('EngineList', data);
                $rootScope.list3 = data;
            }
            else {
                $rootScope.list3 = $scope.Engine;
            }
        });
    }

    $scope.FilterCategoryByPowerTrain = function () {
        if (localStorageService.get('PowerTrainList') != null) {
            $scope.PowerTrain = localStorageService.get('PowerTrainList');
            $scope.UpdatedDate4 = $filter('date')($scope.PowerTrain[0].UpdatedDate.substr(6, 13), "MM dd yyyy HH:mm:ss");
        }

        var params = {
            UpdatedDate: $scope.UpdatedDate4
        }

        $http.get(routeTapsAdmin.TapsAdmin.FilterCategoryByPowerTrain, { params: params }).success(function (data) {
            if (data.length > 0) {
                localStorageService.set('PowerTrainList', data);
                $rootScope.list4 = data;
            }
            else {
                $rootScope.list4 = $scope.PowerTrain;
            }
        });
    }

    $scope.ParentList1 = function (id) {
        var list = _.where($scope.list1, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }

    $scope.ParentList1 = function (id) {
        var list = _.where($scope.list1, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }
    $scope.ParentList2 = function (id) {
        var list = _.where($scope.list2, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }
    $scope.ParentList3 = function (id) {
        var list = _.where($scope.list3, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }
    $scope.ParentList4 = function (id) {
        var list = _.where($scope.list4, { idParent: id });
        if (list.length == 0) {
            return false;
        }
        else {
            return true;
        }

    }

    $scope.ClearComponent = function () {
        $scope.model.Component = '';
        $scope.Component = '';
    }

    //Filter Make Model

    $scope.GetVehicles = function () {
        $rootScope.idModel = $scope.model.Model;
        $scope.model.VehicleDetails = '';
        $scope.model.YearName = '';
        $scope.model.Year = '';
        $scope.model.VehicleDetails = '';
        if ($scope.model.Model.length > 0) {
            var params = {
                id: $scope.model.Model
            }
            $http.get(routeTapsAdmin.TapsAdmin.GetVehicles, { params: params }).success(function (data) {
                if (data.length > 0) {
                    $scope.lstVehicle = data;
                }
            });
        }

    }

    $scope.SelectedVehicle = function (o) {
        var list = _.where($scope.FilterVehicle, { id: parseInt(o) });
        $scope.SelectedVehicleList = list[0].Make + " " + list[0].ModelName + " " + list[0].TrimName + " " + list[0].EngineName + " " + list[0].TransmissionName + " - " + list[0].Year;
        $scope.model.idModelTrimTransmission = o;
    }
    
    $scope.ClearModelFilter = function () {
        $scope.SelectedVehicleList = '';
        $scope.model.SelectedVehicle = '';

        $scope.lstVehicle = '';
        $scope.model.YearName = '';

        //$scope.model.Make = '';
        //$scope.model.Model = '';
        //$scope.model.YearFrom = '';
        //$scope.model.YearTo = '';
        //$scope.model.Trim = '';
    }

    $scope.FilterCriterion = function () {
        if ($scope.model.Criterion == "Quantity") {
            $scope.model.Quantity = $scope.model.Criterion + ": " + $scope.model.SelectedCriterion;
        }
        else if ($scope.model.Criterion == "ProductNo") {
            $scope.model.ProductNo = $scope.model.Criterion + ": " + $scope.model.SelectedCriterion;
        }
        else {
            $scope.model.ItemAge = $scope.model.Criterion + ": " + $scope.model.SelectedCriterion;
        }

    }

    $scope.ClearFilterQauntity = function () {
        $scope.model.Quantity = '';
        $scope.model.Criterion = '';
        $scope.model.SelectedCriterion = '';
    }

    $scope.ClearFilterProductNo = function () {
        $scope.model.ProductNo = '';
        $scope.model.Criterion = '';
        $scope.model.SelectedCriterion = '';
    }

    $scope.ClearItemAge = function () {
        $scope.model.ItemAge = '';
        $scope.model.Criterion = '';
        $scope.model.SelectedCriterion = '';
    }

    $scope.FillModelData = function () {
        $rootScope.idMake = $scope.model.Make;
        $scope.model.Model = '';
        $scope.lstVehicle = '';
        $scope.lstYearData = '';
        $scope.model.YearName = '';
        $scope.model.Year = '';
        $scope.model.VehicleDetails = '';
        if ($scope.model.Make.length > 0) {
            var params = {
                id: $scope.model.Make
            };
            $http.get(routeTapsAdmin.TapsAdmin.GetModelData, { params: params }).success(function (data) {
                if (data.length > 0) {
                    $scope.lstGetModel = data;
                }

            });
        }
    }

    $scope.GetTrimId = function () {
        $rootScope.idTrim = $scope.model.Trim;
    }

    //show another filter AnyYear and AnyTrim
    $scope.showFilter = function () {
        //$http.get(routeTapsAdmin.TapsAdmin.GetAllYear).success(function (data) {
        //    if (data.length > 0) {
        //        $scope.lstYearData = data;
        //    }
        //});

        $scope.model.YearName = '';
        $scope.model.Year = '';
        if ($scope.model.VehicleDetails != '' && $scope.model.VehicleDetails != null) {
            var params = {
                id: $scope.model.VehicleDetails
            }
            $http.get(routeTapsAdmin.TapsAdmin.FetchTransmissionYearLst, { params: params }).success(function (data) {
                $scope.lstYearData = data;
            });
        }
    }

    $scope.SetYear = function (id) {
        //var params = {
        //    id: $scope.model.VehicleDetails
        //}
        //$http.get(routeTapsAdmin.TapsAdmin.FetchTransmissionYearLst, { params: params }).success(function (data) {
        //    $scope.lstYearData = data;
        
        var lst = _.where($scope.lstYearData, { idYear: parseInt(id) });
        $scope.model.YearName = lst[0].Year;
        $scope.idYear = id;
        $scope.idModel = $scope.model.Model;
    }

    $scope.GetAllTrimByModelId = function (idModel) {
        $scope.lstTrimData = '';
        $scope.model.Trim = '';
        if (idModel != 0 || idModel != null) {
            var params = {
                id: idModel
            }
            $http.get(routeTapsAdmin.TapsAdmin.GetAllTrimByModelId, { params: params }).success(function (data) {
                if (data.length > 0) {
                    $scope.lstTrimData = data;
                }
            });
        }
    }

    $scope.FilterVehicleList = function () {
        //if ($scope.model.Trim == undefined) {
        //    $scope.FilterVehicle = '';
        //    return;
        //}

        $scope.FilterVehicle = '';
        $scope.model.SelectedVehicle = '';

        var params = {
            idModel: $scope.model.Model,
            FromYear: parseInt($scope.model.YearFrom),
            ToYear: parseInt($scope.model.YearTo),
            idTrim: $scope.model.Trim,
        }
        $http.get(routeTapsAdmin.TapsAdmin.FilterVehicleList, { params: params }).success(function (data) {
            if (data.length > 0) {
                $scope.FilterVehicle = data;
            }
        });
    }


    //fetch Trim list by idYear   
    $scope.GetAllTrimByYearId = function (idm) {
        $rootScope.idYear = idm;
        $scope.model.Trim = '';
        if (idm.length > 0) {
            var params = {
                id: idm
            }
            $http.get(routeTapsAdmin.TapsAdmin.GetAllTrimByYearId, { params: params }).success(function (data) {
                if (data.length > 0) {
                    $scope.lstTrimData = data;
                }
            });
        }
    }


    $scope.Reset = function () {
        $scope.init();
        $rootScope.idMake = "";
        $rootScope.idModel = "";
        $rootScope.idYear = "";
        $rootScope.idTrim = "";

        var url = window.location.pathname;
        if (url == "/FrontTaps/Parts/Parts") {
            $rootScope.FilterLeftMenu();
        }
    }
    $scope.ClearData = function () {
        $scope.model.Year = '';
        $scope.model.Trim = '';
    }

    $scope.VerifyCaptcha = function () {
        $.ajax({
            url: '/TapsAdmin/Vendor/ValidateCaptcha?str=' + grecaptcha.getResponse(),
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: {
            },
            success: function (result) {
                if (result.data == 2) {
                    toastr.error(result.Message);
                }
            },
            error: function (result) {

            }
        });
    }

    $scope.AddImage = function (item) {
        $scope.Items = item;
    }



    var filenames;
    Dropzone.options.dropzoneForm = {
        acceptedFiles: 'image/*',
        maxFiles: 1,
        accept: function (file, done) {
            $scope.model.ImageUrl = file.name;
            done();
        },
        init: function () {
            this.on("maxfilesexceeded", function (data) {
                var res = eval('(' + data.xhr.responseText + ')');
                toastr.success(res.Message);
            });

            this.on("complete", function (data) {
                var res = eval('(' + data.xhr.responseText + ')');
                if (res.Count == '1') {
                    toastr.success(res.Message);
                    $scope.$apply();
                }
                else {
                    this.removeFile(data);
                    $scope.model.ImageUrl = '';
                    toastr.error(res.Message);
                    $scope.$apply();
                }
                //$scope.GetAllMedia();
            });

            this.on("addedfile", function (file) {
                // Create the remove button
                var removeButton = Dropzone.createElement("<a class=dz-remove data-dz-remove>Remove file</a>");

                // Capture the Dropzone instance as closure.
                var _this = this;

                // Listen to the click event
                removeButton.addEventListener("click", function (e) {
                    var name = file.name;
                    $.ajax({
                        type: 'POST',
                        url: 'RemoveFile?name=' + name,
                        data: name,
                        dataType: 'html'
                    });
                    $scope.model.ImageUrl = '';
                    // Make sure the button click doesn't submit the form:
                    //e.preventDefault();
                    //e.stopPropagation();
                    // Remove the file preview.
                    _this.removeFile(file);
                    //$scope.GetAllMedia();
                    // If you want to the delete the file on the server as well,
                    // you can do the AJAX request here.
                    $scope.$apply();
                });
                //$scope.GetAllMedia();
                // Add the button to the file preview element.
                file.previewElement.appendChild(removeButton);
                $scope.$apply();
            });

        }
    };

    var filenames;
    Dropzone.options.dropzoneForm1 = {
        acceptedFiles: 'image/*',
        maxFiles: 1,
        accept: function (file, done) {
            $scope.Items.ImageUrl = file.name;
            done();
        },
        init: function () {
            this.on("maxfilesexceeded", function (data) {
                var res = eval('(' + data.xhr.responseText + ')');
                toastr.success(res.Message);
            });

            this.on("complete", function (data) {
                var res = eval('(' + data.xhr.responseText + ')');
                if (res.Count == '1') {
                    toastr.success(res.Message);
                    $scope.$apply();
                }
                else {
                    this.removeFile(data);
                    $scope.Items.ImageUrl = '';
                    toastr.error(res.Message);
                    $scope.$apply();
                }
                //$scope.GetAllMedia();
            });

            this.on("addedfile", function (file) {
                // Create the remove button
                var removeButton = Dropzone.createElement("<a class=dz-remove data-dz-remove>Remove file</a>");

                // Capture the Dropzone instance as closure.
                var _this = this;

                // Listen to the click event
                removeButton.addEventListener("click", function (e) {
                    var name = file.name;
                    $.ajax({
                        type: 'POST',
                        url: 'RemoveFile?name=' + name,
                        data: name,
                        dataType: 'html'
                    });
                    $scope.model.ImageUrl = '';
                    // Make sure the button click doesn't submit the form:
                    //e.preventDefault();
                    //e.stopPropagation();
                    // Remove the file preview.
                    _this.removeFile(file);
                    //$scope.GetAllMedia();
                    // If you want to the delete the file on the server as well,
                    // you can do the AJAX request here.
                    $scope.$apply();
                });
                //$scope.GetAllMedia();
                // Add the button to the file preview element.
                file.previewElement.appendChild(removeButton);
                $scope.$apply();
            });

        }
    };

    $scope.RemoveFile = function (name) {
        var name = name;
        $.ajax({
            type: 'POST',
            url: '/TapsAdmin/Vendor/RemoveFile?name=' + name,
            data: name,
            dataType: 'html'
        });
        $scope.model.ImageUrl = '';
    }

    $scope.RemoveFileItem = function (item) {
        var name = item.name;
        $.ajax({
            type: 'POST',
            url: '/TapsAdmin/Vendor/RemoveFile?name=' + name,
            data: name,
            dataType: 'html'
        });
        item.ImageUrl = '';
    }

    $scope.init();
}