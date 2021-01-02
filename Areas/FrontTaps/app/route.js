var route = (function () {
    var FrontLookup = {

        //Account
        ResetPassword: utils.getUrl('/Account/ResetPassword'),
        ChangePassword: utils.getUrl('/Account/ChangePassword'),

        //Product Images
        GetProductImages: utils.getUrl('/ProductDetail/GetProductImages'),

        //Order
        PlaceOrder: utils.getUrl('/Order/PlaceOrder'),
        CheckUser: utils.getUrl('/Lookup/CheckUser'),
        GetAddressById: utils.getUrl('/Address/GetAddressById'),
        FetchWorkshopByIdShop: utils.getUrl('/Address/FetchWorkshopByIdShop'),

        //Order Summary
        UserDetail: utils.getUrl('/OrderSummary/UserDetail'),
        SetDeliveryAddres: utils.getUrl('/OrderSummary/SetDeliveryAddres'),
        GetOrderSummary: utils.getUrl('/OrderSummary/GetOrderSummary'),
        SetAuthorizeWorkshop: utils.getUrl('/OrderSummary/SetAuthorizeWorkshop'),

        //Filter
        FilterCategoryByBodyGroup: utils.getUrl('/ComponentCategory/FilterCategoryByBodyGroup'),
        FilterCategoryByElectricalGroup: utils.getUrl('/ComponentCategory/FilterCategoryByElectricalGroup'),
        FilterCategoryByEngine: utils.getUrl('/ComponentCategory/FilterCategoryByEngine'),
        FilterCategoryByPowerTrain: utils.getUrl('/ComponentCategory/FilterCategoryByPowerTrain'),
        FilterComponent: utils.getUrl('/Filter/FilterComponent'),
        FilterLeftMenu: utils.getUrl('/Filter/FilterLeftMenu'),
        FilterVehicleProduct: utils.getUrl('/Filter/FilterVehicleProduct'),

        //Manage Role
        CreateRoleList: utils.getUrl('/Admin/CreateRoleList'),
        getAllRoles: utils.getUrl('/Admin/getAllRoles'),
        DeleteRole: utils.getUrl('/Admin/DeleteRole'),
        UpdateRole: utils.getUrl('/Admin/UpdateRole'),

        //Manage User
        GetAllUsers: utils.getUrl('/Admin/GetAllUsers'),
        AddUserInRole: utils.getUrl('/Admin/AddUserInRole'),
        FetchUserByRole: utils.getUrl('/Admin/FetchUserByRole'),
        RemoveUserFromRole: utils.getUrl('/Admin/RemoveUserFromRole'),

        RegisterUser: utils.getUrl('/Account/RegisterUser'),
        GenerateLink: utils.getUrl('/Account/GenerateLink'),

        //Lookup 
        GetAllMake: utils.getUrl('/Lookup/GetAllMake'),
        GetAllModel: utils.getUrl('/Lookup/GetAllModel'),
        GetAllTrim: utils.getUrl('/Lookup/GetAllTrim'),
        GetAllYear: utils.getUrl('/Lookup/GetAllYear'),
        GetuserPoint: utils.getUrl('/Lookup/GetuserPoint'),

        //Buy Parts
        GetAllProduct: utils.getUrl('/Parts/GetAllProduct'),
        FetchProductById: utils.getUrl('/ProductDetail/FetchProductById'),
        GetVahicleListByProductId: utils.getUrl('/ProductDetail/GetVahicleListByProductId'),

        //Cart
        AddtoCart: utils.getUrl('/Cart/AddtoCart'),
        FetchCart: utils.getUrl('/Cart/FetchCart'),
        DeleteCartItem: utils.getUrl('/Cart/DeleteCartItem'),
        SaveQtyofItem: utils.getUrl('/Cart/SaveQtyofItem'),
        SaveUsersCartItems: utils.getUrl('/Cart/SaveUsersCartItems'),
        CheckUserLogin: utils.getUrl('/Cart/CheckUserLogin'),
        AddtoCartFromDetail: utils.getUrl('/Cart/AddtoCartFromDetail'),

        //WishList
        AddtoWishList: utils.getUrl('/WishList/AddtoWishList'),
        FetchWishListById: utils.getUrl('/WishList/FetchWishListById'),
        DeleteWishListItem: utils.getUrl('/WishList/DeleteWishListItem'),
        FetchAllWishList: utils.getUrl('/WishList/FetchAllWishList'),
        SendOffer: utils.getUrl('/WishList/SendOffer'),

        //Company Vendor Application
        CreateAuthorisedCompany: utils.getUrl('/CompanyVendorApplication/CreateAuthorisedCompany'),
        CreateNewVendor: utils.getUrl('/CompanyVendorApplication/CreateNewVendor'),
        CreateSellerVendor: utils.getUrl('/CompanyVendorApplication/CreateSellerVendor'),

        //Delivery Address
        GetAllCountryState: utils.getUrl('/Lookup/GetAllCountryState'),
        GetAllStateCity: utils.getUrl('/Lookup/GetAllStateCity'),
        GetCityByStateId: utils.getUrl('/Lookup/GetCityByStateId'),
        CreateDeliveryAddress: utils.getUrl('/Address/CreateDeliveryAddress'),
        GetAllDeliveryAddress: utils.getUrl('/Address/GetAllDeliveryAddress'),
        DeleteDeliveryAddress: utils.getUrl('/Address/DeleteDeliveryAddress'),
        ConfirmSelectedWorkshop: utils.getUrl('/Address/ConfirmSelectedWorkshop'),
        FetchWorkshopById: utils.getUrl('/Address/FetchWorkshopById'),        
        //Category
        GetAllCategory: utils.getUrl('/MasterMgmt/GetAllCategory'),
        GetAllComponentCategory: utils.getUrl('/MasterMgmt/GetAllComponentCategory'),

        //Filter Search
        GetVehicles: utils.getUrl('/Filter/GetVehicles'),
        GetModelData: utils.getUrl('/Filter/GetModelDataByMakeId'),

        FetchTransmissionYearLst: utils.getUrl('/Filter/FetchTransmissionYearLst'),
        GetAllTrimByYearId: utils.getUrl('/Filter/GetAllTrimByYearId'),

        //Order
        GetAllOrederList: utils.getUrl('/Order/GetAllOrederList'),

        //Authorised Workshop Management
        GetAllWorkshops: utils.getUrl('/AuthoriseWorkshop/GetAllWorkshops'),
        GetAllWorkshopsByName: utils.getUrl('/AuthoriseWorkshop/GetAllWorkshopsByName'),
        GetAllCountry: utils.getUrl('/Lookup/GetAllCountry'),
        FilterWorkshopeList: utils.getUrl('/AuthoriseWorkshop/FilterWorkshopeList'),
        SubmitWorkshope: utils.getUrl('/AuthoriseWorkshop/SubmitWorkshope'),
        GetWorkshopById: utils.getUrl('/AuthoriseWorkshop/GetWorkshopById'),

        GetTapsAuthorizedWorkShop: utils.getUrl('/Address/GetTapsAuthorizedWorkShop'),
        GetTapsAuthorizedWorkShopById: utils.getUrl('/Address/GetTapsAuthorizedWorkShopById'),


        //Profile
        AddtoCartFromWishList: utils.getUrl('/Cart/AddtoCartFromWishList'),
        DeleteWishList: utils.getUrl('/Account/DeleteWishList'),
        GetAllOrderList: utils.getUrl('/Account/GetAllOrderList'),
        GetWishlistOfferById: utils.getUrl('/Account/GetWishlistOfferById'),

        //Black Listed Vehicle
        GetAllBlackListedVehicle: utils.getUrl('/FrontBlackListVehicle/GetAllBlackListedVehicle'),
        FilterBlackListedVehicle: utils.getUrl('/FrontBlackListVehicle/FilterBlackListedVehicle'),

        //
        GetAllFaqBySeq: utils.getUrl('/FaqHelp/GetAllFaqBySeq'),
        //GetAllBanner: utils.getUrl('/FrontTaps/MasterMgmt/GetAllBanner'),
        GetBanner: utils.getUrl('/FrontTaps/BannerMgmt/GetBanner'),

        GetAllWorkshopsByState: utils.getUrl('/AuthoriseWorkshop/GetAllWorkshopsByState'),

        //Product Review
        SaveProductReview: utils.getUrl('/ProductDetail/SaveProductReview'),
        GetProductReview: utils.getUrl('/ProductDetail/GetProductReview'),
        GetAverageRating: utils.getUrl('/ProductDetail/GetAverageRating'),

        //Select Vehicle
        SelectVehicle: utils.getUrl('/Lookup/SelectVehicle'),
        //--------------------------------------------------------------------------//



    };

    var ReportPrint = {
        OrderReport: utils.getUrl('/Account/OrderInvoiceReport'),        
    };

    var ACL = {

    };

    return {
        ReportPrint: ReportPrint,
        FrontLookup: FrontLookup,
        ACL: ACL
    };
}());