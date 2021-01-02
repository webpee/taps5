var routeTapsAdmin = (function () {
    var TapsAdmin = {

        //Taps Manage
        ResetPassword: utils.getUrl('/TapsAdmin/TapsManage/ResetPassword'),

        // Workshop Orders
        GetAllOrderByUser: utils.getUrl('/TapsAdmin/WorkShop/GetAllOrderByUser'),

        //Vendor
        GetOrderByVendorId: utils.getUrl('/TapsAdmin/Vendor/GetOrderByVendorId'),
        UpdateVendorOrderStatus: utils.getUrl('/TapsAdmin/Vendor/UpdateVendorOrderStatus'),
        UpdateVendorOrderSerialNumber: utils.getUrl('/TapsAdmin/Vendor/UpdateVendorOrderSerialNumber'),
        DeleteVendorOrderSerialNumber: utils.getUrl('/TapsAdmin/Vendor/DeleteVendorOrderSerialNumber'),
        BestSellingProduct: utils.getUrl('/TapsAdmin/Vendor/BestSellingProduct'),
        SalesGraphData: utils.getUrl('/TapsAdmin/Vendor/SalesGraphData'),
        GraphData: utils.getUrl('/TapsAdmin/Vendor/GraphData'),

        //Add Item
        AddRecommandComponent: utils.getUrl('/TapsAdmin/Vendor/AddRecommandComponent'),
        AddRecommandVehicle: utils.getUrl('/TapsAdmin/Vendor/AddRecommandVehicle'),

        AddVendorProduct: utils.getUrl('/TapsAdmin/Vendor/AddVendorProduct'),

        //Inventory
        FetchInventoryProducts: utils.getUrl('/TapsAdmin/Vendor/FetchInventoryProducts'),
        DeleteInventoryProduct: utils.getUrl('/TapsAdmin/Vendor/DeleteInventoryProduct'),
        ProductStatusChange: utils.getUrl('/TapsAdmin/Vendor/ProductStatusChange'),

        //Update Vendor Product
        UpdateVendorProduct: utils.getUrl('/TapsAdmin/Vendor/UpdateVendorProduct'),

        //Fetch Vendor save Item
        FetchSaveProcessByVendorId: utils.getUrl('/TapsAdmin/Vendor/FetchSaveProcessByVendorId'),

        //Logistic
        GetOrderItems: utils.getUrl('/TapsAdmin/Logistic/GetOrderItems'),
        UpdateOrderStatus: utils.getUrl('/TapsAdmin/Logistic/UpdateOrderStatus'),

        //Filter
        FilterCategoryByBodyGroup: utils.getUrl('/TapsAdmin/Vendor/FilterCategoryByBodyGroup'),
        FilterCategoryByElectricalGroup: utils.getUrl('/TapsAdmin/Vendor/FilterCategoryByElectricalGroup'),
        FilterCategoryByEngine: utils.getUrl('/TapsAdmin/Vendor/FilterCategoryByEngine'),
        FilterCategoryByPowerTrain: utils.getUrl('/TapsAdmin/Vendor/FilterCategoryByPowerTrain'),

        //Lookup Make Model
        GetAllMake: utils.getUrl('/TapsAdmin/LookUp/GetAllMake'),
        GetAllModel: utils.getUrl('/TapsAdmin/LookUp/GetAllModel'),
        GetAllTrim: utils.getUrl('/TapsAdmin/LookUp/GetAllTrim'),
        GetAllYear: utils.getUrl('/TapsAdmin/LookUp/GetAllYear'),
        GetVehicles: utils.getUrl('/TapsAdmin/LookUp/GetVehicles'),
        GetModelData: utils.getUrl('/TapsAdmin/LookUp/GetModelDataByMakeId'),
        FetchTransmissionYearLst: utils.getUrl('/TapsAdmin/LookUp/FetchTransmissionYearLst'),
        GetAllTrimByYearId: utils.getUrl('/TapsAdmin/LookUp/GetAllTrimByYearId'),
        GetAllTrimByModelId: utils.getUrl('/TapsAdmin/LookUp/GetAllTrimByModelId'),
        FilterVehicleList: utils.getUrl('/TapsAdmin/LookUp/FilterVehicleList'),

        //Export Excel
        GetOrderExcel: utils.getUrl('/TapsAdmin/Vendor/GetOrderExcel'),
        GetVendorExcel: utils.getUrl('/TapsAdmin/Vendor/GetVendorExcel'),
    };
    return {
        TapsAdmin: TapsAdmin
    };
}());