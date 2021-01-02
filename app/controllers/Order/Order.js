function OrderCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {

        //Today
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '-' + dd + '-' + yyyy;

        //Start Date
        var startday = new Date();
        startday.setDate(startday.getDate() - 730);
        var sdd = startday.getDate();
        var smm = startday.getMonth() + 1; //January is 0!
        var syyyy = startday.getFullYear();

        if (sdd < 10) {
            sdd = '0' + sdd
        }

        if (smm < 10) {
            smm = '0' + smm
        }
        startday = smm + '-' + sdd + '-' + syyyy;


        var SearchDate = sdd + '-' + smm + '-' + syyyy + ' - ' + dd + '-' + mm + '-' + yyyy;
        document.getElementById('daterange').value = SearchDate;

        $scope.OrderUpdate = 0;
        $scope.model = {
            StartDate: startday,
            EndDate: today,
            Date: SearchDate,
            SelectedValue: '1'
        };

        $scope.modelInfo = {
            id: '',
            Customer: '',
            CreatedOnUtc: '',
            Status: '',
            OrderSubtotalInclTax: '',
            OrderShippingInclTax: '',
            OrderTax: 0,
            OrderTotal: '',
        };

        $scope.modelBillingInfo = {
            id: '',
            FirstName: '',
            LastName: '',
            Address1: '',
            Address2: '',
            CompanyName: '',
            City: '',
            idState: '',
            StateName: '',
            idCountry: 1,
            CountryName: '',
            PostCode: '',
            Email: '',
            PhoneNo: '',
            idUser: '',
        };

        $scope.modelShippingInfo = {
            ShippFirstName: '',
            ShippLastName: '',
            ShippAddress1: '',
            ShippAddress2: '',
            ShippidCountry: 1,
            ShippidState: '',
            ShippidCity: '',
            ShippPostCode: '',
            ShippCompanyName: '',
        };

        $scope.modelOrderDetailInfo = {
            id: '',
            OrderId: '',
            ProductName: '',
            Quantity: '',
            UnitPriceInclTax: '',
            PriceInclTax: '',

        };



        $scope.GetAllOrder();
       // $scope.GetAllCourier();
       // $scope.GetAllStateByCountry();
    };

    $scope.GetAllCourier = function () {
        $http.get(route.Lookup.GetAllCourier).success(function (data) {
            $scope.CourierList = data;
        });
    }

    //Edit Order
    $scope.EditOrder = function (o) {
        $scope.OrderUpdate = 1;
        $('#OrderInfoTab').removeClass("active");
        $('#OrderEditTab').addClass("active");

        //Ortder info
        $scope.modelInfo.id = o.id;
        $scope.modelInfo.Customer = o.Customer;
        $scope.modelInfo.CreatedOnUtc = o.CreatedOnUtc;
        $scope.modelInfo.Status = o.Status;
        $scope.modelInfo.OrderSubtotalInclTax = o.OrderSubtotalInclTax;
        $scope.modelInfo.OrderShippingInclTax = o.OrderShippingInclTax;
        if (o.OrderTax != null) {
            $scope.modelInfo.OrderTax = o.OrderTax;
        }
        else {
            $scope.modelInfo.OrderTax = 0;
        }
        $scope.modelInfo.OrderTotal = o.OrderTotal;

        //Billing Info
        $scope.modelBillingInfo.id = o.BillingAddressId;
        $scope.modelBillingInfo.FirstName = o.FirstName;
        $scope.modelBillingInfo.LastName = o.LastName;
        $scope.modelBillingInfo.Address1 = o.Address1;
        $scope.modelBillingInfo.Address2 = o.Address2;
        $scope.modelBillingInfo.CompanyName = o.CompanyName;
        $scope.modelBillingInfo.City = o.City;
        $scope.modelBillingInfo.idState = o.idState;
        $scope.modelBillingInfo.idCountry = o.idCountry;
        $scope.modelBillingInfo.CountryName = o.Country;
        $scope.modelBillingInfo.PostCode = o.PostCode;
        $scope.modelBillingInfo.Email = o.Email;
        $scope.modelBillingInfo.PhoneNo = o.PhoneNo;
        $scope.modelBillingInfo.idUser = o.CustomerId;

        //shipping Info
        $scope.modelShippingInfo.id = o.id;
        $scope.modelShippingInfo.ShippFirstName = o.ShippFirstName;
        $scope.modelShippingInfo.ShippLastName = o.ShippLastName;
        $scope.modelShippingInfo.ShippAddress1 = o.ShippAddress1;
        $scope.modelShippingInfo.ShippAddress2 = o.ShippAddress2;
        $scope.modelShippingInfo.ShippidCountry = o.ShippidCountry;
        $scope.modelShippingInfo.ShippCountry = o.ShippCountry;
        $scope.modelShippingInfo.ShippidCity = o.ShippidCity;
        $scope.modelShippingInfo.ShippidState = o.ShippidState;
        $scope.modelShippingInfo.ShippPostCode = o.ShippPostCode;
        $scope.modelShippingInfo.ShippCompanyName = o.ShippCompanyName;


        //Get Order Detail
        var params = {
            id: o.id,
        };
        $http.get(route.Lookup.GetOrderDetailById, { params: params }).success(function (data) {
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Attribute != '' && data[i].AttributeValue != '' && data[i].Attribute != null && data[i].AttributeValue != null) {
                        var Attribute = data[i].Attribute.split(",");
                        var AttributeValue = data[i].AttributeValue.split(",");

                        var lstAttribute = [];
                        for (var j = 0; j < Attribute.length; j++) {
                            var obj = new Object();
                            obj["Name"] = Attribute[j];
                            obj["Value"] = AttributeValue[j];

                            lstAttribute.push(obj);
                        }
                        data[i]["lstAttribute"] = lstAttribute;
                    }
                }
            }
            $scope.lstUserOrderDetail = data;

        });
    }

    //Change Order Price
    $scope.setOrderPrice = function () {
        if ($scope.modelInfo.OrderSubtotalInclTax == null) {
            $scope.modelInfo.OrderSubtotalInclTax = 0;
        }
        if ($scope.modelInfo.OrderShippingInclTax == null) {
            $scope.modelInfo.OrderShippingInclTax = 0;
        }
        if ($scope.modelInfo.OrderTax == null) {
            $scope.modelInfo.OrderTax = 0;
        }
        $scope.modelInfo.OrderTotal = parseFloat($scope.modelInfo.OrderSubtotalInclTax) + parseFloat($scope.modelInfo.OrderShippingInclTax) + parseFloat($scope.modelInfo.OrderTax);

    }
    //update Order Info
    $scope.UpdateOrderInfo = function (o) {
        $http.post(route.Lookup.UpdateOrderInfo, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                $scope.GetAllOrder();
            }
            else {
                toastr.error(data.message);
            }
        });
    }

    //update Billing Info
    $scope.UpdateBillingInfo = function (o) {
        $http.post(route.Lookup.UpdateBillingInfo, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                $scope.GetAllOrder();
            }
            else {
                toastr.error(data.message);
            }
        });
    }

    //update Shipping Info
    $scope.UpdateShippingInfo = function (o) {
        $http.post(route.Lookup.UpdateShippingInfo, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                $scope.GetAllOrder();
            }
            else {
                toastr.error(data.message);
            }
        });
    }

    //Update OrderDetail info
    $scope.UpdateOrderDetailInfo = function (o) {
        $http.post(route.Lookup.UpdateOrderDetailInfo, o).success(function (data) {
            if (data.success == 1) {
                toastr.success(data.message);
                if (data.SubTotal != null) {
                    $scope.modelInfo.OrderSubtotalInclTax = data.SubTotal;
                }
                if (data.OrderTotal != null) {
                    $scope.modelInfo.OrderTotal = data.OrderTotal;
                }
                $('#OrderDetailEdit').modal('hide');
                //Get Order Detail
                var params = {
                    id: $scope.modelInfo.id,
                };
                $http.get(route.Lookup.GetOrderDetailById, { params: params }).success(function (data) {
                    $scope.lstUserOrderDetail = data;

                });
            }
            else {
                toastr.error(data.message);
            }
        });
    }

    //Change Order detail Price
    $scope.setOrderDetailPrice = function () {
        if ($scope.modelOrderDetailInfo.Quantity == null) {
            $scope.modelOrderDetailInfo.Quantity = 1;
        }
        if ($scope.modelOrderDetailInfo.UnitPriceInclTax == null) {
            $scope.modelOrderDetailInfo.UnitPriceInclTax = 0;
        }

        $scope.modelOrderDetailInfo.PriceInclTax = parseInt($scope.modelOrderDetailInfo.Quantity) * parseFloat($scope.modelOrderDetailInfo.UnitPriceInclTax);

    }

    //Fetch Order Detail Info
    $scope.FetchOrderDetailInfo = function (o) {
        $scope.modelOrderDetailInfo.id = o.id;
        $scope.modelOrderDetailInfo.OrderId = o.OrderId;
        $scope.modelOrderDetailInfo.ProductName = o.ProductName;
        $scope.modelOrderDetailInfo.Quantity = o.Quantity;
        $scope.modelOrderDetailInfo.UnitPriceInclTax = o.UnitPriceInclTax;
        $scope.modelOrderDetailInfo.PriceInclTax = o.PriceInclTax;
        $scope.modelOrderDetailInfo.lstAttribute = o.lstAttribute;
        $('#OrderDetailEdit').modal('show');
    }

    //Get State 
    $scope.GetAllStateByCountry = function () {
        var params = {
            idCountry: 1
        };
        $http.get(route.Lookup.GetAllStateByCountry, { params: params }).success(function (data) {
            $scope.lstState = data;
        });
    }
    //End State


    $scope.DataTable = function () {
        $('#datatable1').dataTable().fnClearTable();
        $('#datatable1').dataTable().fnDestroy();

        $timeout(function () {
            var d1tInstance1;
            if (!$.fn.dataTable) return;

            dt1Instance1 = $('#datatable1').dataTable({
                'paging': true,  // Table pagination
                'ordering': true,  // Column ordering 
                'info': true,  // Bottom left status text
                "bRetrieve": true,
                "bProcessing": true,
                "bDestroy": true,
                // Text translation options
                // Note the required keywords between underscores (e.g _MENU_)                
                // set columns options
                'aoColumns': [
                    { 'bSortable': false, 'bVisible': true },
                    { 'bSortable': false, 'bVisible': true },
                    { 'bVisible': true },
                    { 'bVisible': true },
                    { 'bVisible': true },
                    { 'bVisible': true },
                    { 'bVisible': true },
                    { 'bVisible': true },
                    { 'bVisible': true },
                    { 'bVisible': true },
                    { 'bSortable': false, 'bVisible': true },
                    { 'bSortable': false, 'bVisible': true },
                    { 'bSortable': false, 'bVisible': true }
                ],
            });
        });
    }

    $scope.toggleSeleted = function () {
        $scope.allSelected = !$scope.allSelected;
        angular.forEach($scope.lstOrder, function (o) {
            o.checked = $scope.allSelected;
        });
    };

    $scope.GetAllOrder = function (Status) {
        if (Status != undefined) {
            $scope.model.StartDate = '';
            $scope.model.EndDate = '';
            document.getElementById('daterange').value = '';
        }
        $scope.lstOrder = '';

        var params = {
            Status: Status,
            StartDate: $scope.model.StartDate,
            EndDate: $scope.model.EndDate
        }

        $http.get(route.Lookup.GetAllOrder, { params: params }).success(function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (data[i].CreatedOnUtc != null) {
                    data[i].CreatedOnUtc = $filter('date')(data[i].CreatedOnUtc.substr(6, 13), "dd MMM yyyy hh:mm:ss a");
                }
                //if (data[i].ModifiedDate != null) {
                //    data[i].ModifiedDate = $filter('date')(data[i].ModifiedDate.substr(6, 13), "dd MMM yyyy hh:mm:ss a");
                //}
                //if (data[i].ImageUrl != null) {
                //    var afterDot = data[i].ImageUrl.substr(data[i].ImageUrl.indexOf('.') + 1);
                //    if (afterDot == 'pdf') {
                //        data[i].flgFileType = 'pdf';
                //    }
                //    else {
                //        data[i].flgFileType = 'img';
                //    }
                //}
            }
            $scope.lstOrder = data;
            console.log($scope.lstOrder);
            //$scope.DataTable();
        });
    }

    $scope.ClearDate = function () {
        $scope.model.StartDate = '';
        $scope.model.EndDate = '';
        document.getElementById('daterange').value = '';
        $scope.GetAllOrder();
    }

    //$("#sometable").jExpand(); 

    var start_date = new Date();
    start_date.setDate(start_date.getDate() - 7);
    var d = new Date();
    $('input[name="dateranger"]').daterangepicker(
       {
           format: 'DD-MM-YYYY',
           startDate: start_date,
           endDate: d
       },
       function (start, end, label) {
           $scope.model.StartDate = start.format('MM-DD-YYYY');
           $scope.model.EndDate = end.format('MM-DD-YYYY');

           $scope.GetAllOrder();

       }

     );

    $scope.AddTrackNumber = function (id) {
        $scope.model.idProduct = id;
        $('#Track').modal('show');
    }

    $scope.DeleteTrackNumber = function (id) {
        var params = {
            OrderId: id,
        };
        $http.get(route.Lookup.DeleteTrackingNumber, { params: params }).success(function (data) {
            if (data == 'true') {
                toastr.success('Tracking Number Deleted Successfully.');
                $('#Track').modal('hide');
                $scope.GetAllOrder();
            }
            else {
                toastr.error(data);
            }
        });
    }



    $scope.SaveTrackNumber = function () {
        var params = {
            OrderId: $scope.model.idProduct,
            TrackingNumber: $scope.model.TrackingNumber,
            Courier: $scope.model.Courier,
        };
        $http.get(route.Lookup.AddTrackingNumber, { params: params }).success(function (data) {
            console.log(data);
            if (data.success == 1) {
                toastr.success(data.message);
                $('#Track').modal('hide');
                $scope.model.TrackingNumber = '';
                $scope.model.Courier = '';
                $scope.GetAllOrder();
            }
            else {
                toastr.error(data.message);
            }
        });
    }

    $scope.UpdateTrackNumber = function (id, TrackNo, Courier) {
        $scope.model.idProduct = id;
        $scope.model.TrackingNumber = TrackNo;
        $scope.model.Courier = Courier;
        $('#Track').modal('show');
    }

    //$(document).ready(function () {
    //    $(".ranges button.applyBtn").click(function () {
    //        alert('asd');
    //        var params = {
    //            StartDate: $scope.model.StartDate,
    //            EndDate: $scope.model.EndDate
    //        };
    //        console.log(params);
    //    });
    //});

    //$scope.ListProduct = function (o) {
    //    $scope.model.SendTo = o.SendTo;
    //    $scope.model.sku = o.sku
    //    $scope.model.ProductName = o.ProductName;
    //    $scope.model.Shipping = o.Shipping;
    //    $scope.model.Status = o.Status
    //    $scope.model.Printed = o.Printed;
    //    $('#Order').modal('show');
    //}

    $scope.ListProduct = function (id) {
        var params = {
            id: id,
        };
        $http.get(route.Lookup.GetOrderDetailById, { params: params }).success(function (data) {
            console.log(data);
            if (data != null) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Attribute != '' && data[i].AttributeValue != '' && data[i].Attribute != null && data[i].AttributeValue != null) {
                        var Attribute = data[i].Attribute.split(",");
                        var AttributeValue = data[i].AttributeValue.split(",");

                        var lstAttribute = [];
                        for (var j = 0; j < Attribute.length; j++) {
                            var obj = new Object();
                            obj["Name"] = Attribute[j];
                            obj["Value"] = AttributeValue[j];

                            lstAttribute.push(obj);
                        }
                        data[i]["lstAttribute"] = lstAttribute;
                    }
                }
            }
            $scope.lstUserOrderDetail = data;
            $('#Order').modal('show');
        });
    }
    $scope.GetImage = function (Image) {
        $scope.model.ImageUrl = Image;
    }


    $scope.UpdateVendorOrderStatus = function (idStatus, id) {
        $scope.ids1 = idStatus;

        var params = {
            id: $scope.ids1,
            updateIds: id
        };

        $http.get(route.Lookup.UpdateOrderStatus, { params: params }).success(function (data) {
            //$scope.DataTableListBind();
            if (data == 'true') {
                toastr.success('Status Updated Successfully.');
            }
            else {
                toastr.error(data);
            }
            $scope.init();
        })
    }

    $scope.GoOrder = function () {

        if ($scope.model.SelectedValue == 1) {
            $scope.PrintInvoiceForSelectedItems();
        }
        else if ($scope.model.SelectedValue == 2) {
            $scope.UpdateStatusToReadyToShip();
        }
        else if ($scope.model.SelectedValue == 3) {
            $scope.DeliveryNoteList();
        }
        else if ($scope.model.SelectedValue == 4) {
            $scope.PrintTaxInvoiceForSelectedItems();
        }

    }

    $scope.DeliveryNoteList = function () {
        $scope.ids1 = [];
        var count = 0;
        $scope.ids = $filter('filter')($scope.lstOrder, { checked: true });

        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {

            if ($scope.ids[i].Status == "Delivered") {
                $scope.ids1.push($scope.ids[i].id);
            }
            else {
                $scope.ids1.slice($scope.ids[i].id);
                count = count + 1
            }
        }
        if (count != 0) {
            toastr.error(count + " Record(s) status has not Delivered");
        }
        if ($scope.ids1.length != 0) {
            var params = {
                OrderId: $scope.ids1,
                ReportName: 'Picking List',
            };

            $window.open(route.ReportPrint.DeliveryListReport +
                '?OrderId=' + params.OrderId +
                '&ReportName=' + params.ReportName, '_blank');
        }
    }

    $scope.UpdateStatusToReadyToShip = function () {
        $scope.ids1 = [];
        $scope.ids = $filter('filter')($scope.lstOrder, { checked: true });

        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {
            $scope.ids1.push($scope.ids[i].id);
        }
        var params = {
            id: $scope.ids1,
            StatusId: 18
        };
        $http.get(route.Lookup.UpdateOrderStatusWithItem, { params: params }).success(function (data) {
            if (data == 'true') {
                toastr.success('Status Updated Successfully.');
            }
            else {
                toastr.error(data);
            }
            $scope.init();
        })
    }

    $scope.PrintInvoiceForSelectedItems = function () {
        $scope.ids1 = [];
        var count = 0;
        $scope.ids = $filter('filter')($scope.lstOrder, { checked: true });

        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {
            if ($scope.ids[i].Status == "Pending") {
                $scope.ids1.slice($scope.ids[i].id);
                count = count + 1;
            }
            else {
                $scope.ids1.push($scope.ids[i].id);
            }
        }
        if (count != 0) {
            toastr.error(count + " Record(s) status has Pending, it will not Print Invoice");
        }

        if ($scope.ids1.length != 0) {
            var params = {
                OrderId: $scope.ids1,
                ReportName: 'Selected Order Invoice',
            };

            $window.open(route.ReportPrint.PrintInvoiceForSelectedItems +
                '?OrderId=' + params.OrderId +
                '&ReportName=' + params.ReportName, '_blank');
        }
    }

    $scope.PrintTaxInvoiceForSelectedItems = function () {
        $scope.ids1 = [];
        var count = 0;
        $scope.ids = $filter('filter')($scope.lstOrder, { checked: true });

        if ($scope.ids.length == 0) {
            alert("Please Select At least one CheckBox");
            return;
        }

        for (var i = 0; i < $scope.ids.length; i++) {
            if ($scope.ids[i].Status == "Delivered") {
                $scope.ids1.push($scope.ids[i].id);
            }
            else {
                $scope.ids1.slice($scope.ids[i].id);
                count = count + 1;
            }
        }

        if (count != 0) {
            toastr.error(count + " Record(s) status has not Delivered");
        }
        if ($scope.ids1.length != 0) {
            var params = {
                OrderId: $scope.ids1,
                ReportName: 'Tax Invoice',
            };

            $window.open(route.ReportPrint.TaxInvoiceReport +
                '?OrderId=' + params.OrderId +
                '&ReportName=' + params.ReportName, '_blank');
        }
    }

    $scope.PrintReport = function (id) {
        var params = {
            ReportName: 'Invoice',
            OrderId: id
        };

        $window.open(route.ReportPrint.OrderReport +
            '?OrderId=' + params.OrderId +
            '&ReportName=' + params.ReportName, '_blank');
    }

    $scope.ExportExcel = function () {
        window.location = route.Lookup.GetOrderExcel;
        $scope.GetAllOrder();
    }

    $scope.ResetTrack = function () {
        $scope.model.TrackingNumber = '';
        $scope.model.Courier = '';
    }


    $scope.Reset = function () {
        $scope.init();
    }
    $scope.init();
}