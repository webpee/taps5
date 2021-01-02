var route = (function () {
    var Lookup = {
        //ProductGenerator
        // /FrontTaps/Lookup/
        GetAllPaymentTransaction: utils.getUrl('/FrontTaps/PaymentTransaction/GetAllPaymentTransaction'),

        GetAllMakesProductGenerator: utils.getUrl('/FrontTaps/LookupMethods/GetAllMakes'),
        GetAllTrimsProductGenerator: utils.getUrl('/FrontTaps/LookupMethods/GetAllTrims'),
        GetAllModelsProductGenerator: utils.getUrl('/FrontTaps/LookupMethods/GetAllModels'),
        GetAllYearProductGenerator: utils.getUrl('/FrontTaps/LookupMethods/GetAllYear'),
        CreateProductGenerator: utils.getUrl('/FrontTaps/ProductGenerator/CreateProductGenerator'),

        //Manage Account 
        ResetPassword: utils.getUrl('/FrontTaps/Account/ResetPassword'),
        ChangeUserPassword: utils.getUrl('/FrontTaps/Account/ChangeUserPassword'),

        //Manage Role
        CreateRoleList: utils.getUrl('/FrontTaps/Admin/CreateRoleList'),
        getAllRoles: utils.getUrl('/FrontTaps/Admin/getAllRoles'),
        DeleteRole: utils.getUrl('/FrontTaps/Admin/DeleteRole'),
        UpdateRole: utils.getUrl('/FrontTaps/Admin/UpdateRole'),

        //Manage User
        GetAllUsers: utils.getUrl('/FrontTaps/Admin/GetAllUsers'),
        AddUserInRole: utils.getUrl('/FrontTaps/Admin/AddUserInRole'),
        FetchUserByRole: utils.getUrl('/FrontTaps/Admin/FetchUserByRole'),
        RemoveUserFromRole: utils.getUrl('/FrontTaps/Admin/RemoveUserFromRole'),

        //Register User
        RegisterUser: utils.getUrl('/FrontTaps/Account/RegisterUser'),
        GenerateLink: utils.getUrl('/FrontTaps/Account/GenerateLink'),
        CheckUserName: utils.getUrl('/FrontTaps/Account/CheckUserName'),

        //Trim Management
        getAllTrim: utils.getUrl('/FrontTaps/MasterMgmt/GetAllTrims'),
        GetAllTrimByModel: utils.getUrl('/FrontTaps/MasterMgmt/GetAllTrims'),
        FetchTrimById: utils.getUrl('/FrontTaps/MasterMgmt/FetchTrimById'),
        DeleteTrim: utils.getUrl('/FrontTaps/MasterMgmt/DeleteTrim'),
        CreateTrim: utils.getUrl('/FrontTaps/MasterMgmt/CreateTrim'),

        //Model Trim Management
        GetAllModelTrims: utils.getUrl('/FrontTaps/MasterMgmt/GetAllModelTrims'),
        DeleteModelTrim: utils.getUrl('/FrontTaps/MasterMgmt/DeleteModelTrim'),
        CreateModelTrim: utils.getUrl('/FrontTaps/MasterMgmt/CreateModelTrim'),

        //Make Mgmt
        GetAllMakes: utils.getUrl('/FrontTaps/MasterMgmt/GetAllMakes'),
        GetAllMakesProduct: utils.getUrl('/FrontTaps/MasterMgmt/GetAllMakes'),
        CreateMakeMgmt: utils.getUrl('/FrontTaps/MasterMgmt/CreateMakeMgmt'),

        //Model Mgmt
        GetAllModels: utils.getUrl('/FrontTaps/MasterMgmt/GetAllModels'),
        CreateModelMgmt: utils.getUrl('/FrontTaps/MasterMgmt/CreateModelMgmt'),
        DeleteModelMgmt: utils.getUrl('/FrontTaps/MasterMgmt/DeleteModelMgmt'),

        //Model Year Mgmt
        GetAllModelYear: utils.getUrl('/FrontTaps/MasterMgmt/GetAllModelYear'),
        CreateModelYear: utils.getUrl('/FrontTaps/MasterMgmt/CreateModelYear'),
        DeleteModelYear: utils.getUrl('/FrontTaps/MasterMgmt/DeleteModelYear'),

        //Year Mgmt
        GetAllYearMgmt: utils.getUrl('/FrontTaps/MasterMgmt/GetAllYear'),
        GetAllYearMgmtByTrim: utils.getUrl('/FrontTaps/MasterMgmt/GetAllYear'),

        //Category Mgmt
        GetAllCategory: utils.getUrl('/FrontTaps/MasterMgmt/GetAllCategory'),
        CreateCategory: utils.getUrl('/FrontTaps/MasterMgmt/CreateCategory'),
        DeleteCategory: utils.getUrl('/FrontTaps/MasterMgmt/DeleteCategory'),
        DeleteMake: utils.getUrl('/FrontTaps/MasterMgmt/DeleteMake'),

        //Country Mgmt
        GetAllCountry: utils.getUrl('/FrontTaps/MasterMgmt/GetAllCountry'),
        CreateCountryMgmt: utils.getUrl('/FrontTaps/MasterMgmt/CreateCountryMgmt'),
        DeleteCountry: utils.getUrl('/FrontTaps/MasterMgmt/DeleteCountry'),

        //Country State Mgmt
        GetAllCountryState: utils.getUrl('/FrontTaps/MasterMgmt/GetAllCountryState'),
        CreateCountryStateMgmt: utils.getUrl('/FrontTaps/MasterMgmt/CreateCountryStateMgmt'),
        DeleteCountryState: utils.getUrl('/FrontTaps/MasterMgmt/DeleteCountryState'),

        //State City        
        GetAllStateCity: utils.getUrl('/FrontTaps/MasterMgmt/GetAllStateCity'),
        FetchCountryByStateId: utils.getUrl('/FrontTaps/MasterMgmt/FetchCountryByStateId'),
        CreateStateCityMgmt: utils.getUrl('/FrontTaps/MasterMgmt/CreateStateCityMgmt'),
        DeleteStateCity: utils.getUrl('/FrontTaps/MasterMgmt/DeleteStateCity'),
        GetAllStateByCountry: utils.getUrl('/FrontTaps/MasterMgmt/GetAllStateByCountry'),

        // Component Category Management
        GetAllComponentCategory: utils.getUrl('/FrontTaps/MasterMgmt/GetAllComponentCategory'),
        CreateComponentCategory: utils.getUrl('/FrontTaps/MasterMgmt/CreateComponentCategory'),
        DeleteComponentCategory: utils.getUrl('/FrontTaps/MasterMgmt/DeleteComponentCategory'),
        FetchComponentByCategory: utils.getUrl('/FrontTaps/MasterMgmt/FetchComponentByCategory'),

        //Banner
        GetAllBanner: utils.getUrl('/FrontTaps/MasterMgmt/GetAllBanner'),
        CreateBanner: utils.getUrl('/FrontTaps/MasterMgmt/CreateBanner'),
        DeleteBanner: utils.getUrl('/FrontTaps/MasterMgmt/DeleteBanner'),


        // Product Management
        GetAllProduct: utils.getUrl('/FrontTaps/Product/GetAllProduct'),
        GetAllProductDrop: utils.getUrl('/FrontTaps/Product/GetAllProductDrop'),
        FetchProductById: utils.getUrl('/FrontTaps/Product/FetchProductById'),
        CreateProduct: utils.getUrl('/FrontTaps/Product/CreateProduct'),
        DeleteProduct: utils.getUrl('/FrontTaps/Product/DeleteProduct'),
        UpdateProduct: utils.getUrl('/FrontTaps/Product/UpdateProduct'),
        CalculateMovingAvgPrice: utils.getUrl('/FrontTaps/Product/CalculateMovingAvgPrice'),

        //Product Meta
        GetAllProductMetaList: utils.getUrl('/FrontTaps/Product/GetAllProductMetaList'),
        CreateProductMeta: utils.getUrl('/FrontTaps/Product/CreateProductMeta'),
        UpdateProductMeta: utils.getUrl('/FrontTaps/Product/UpdateProductMeta'),
        DeleteProductMeta: utils.getUrl('/FrontTaps/Product/DeleteProductMeta'),

        // Product Vehicle
        GetAllProductVehicle: utils.getUrl('/FrontTaps/Product/GetAllProductVehicle'),
        FetchProductVehicleById: utils.getUrl('/FrontTaps/Product/FetchProductVehicleById'),
        CreateProductVehicle: utils.getUrl('/FrontTaps/Product/CreateProductVehicle'),
        DeleteProductVehicle: utils.getUrl('/FrontTaps/Product/DeleteProductVehicle'),


        //Product Image
        GetProductImage: utils.getUrl('/FrontTaps/Product/GetProductImage'),
        AddImage: utils.getUrl('/FrontTaps/Product/AddImage'),
        DeleteProductImage: utils.getUrl('/FrontTaps/Product/DeleteProductImage'),

        // Page Management
        GetAllPageMgmt: utils.getUrl('/FrontTaps/PageMgmt/GetAllPageMgmt'),
        CreatePageMgmt: utils.getUrl('/FrontTaps/PageMgmt/CreatePageMgmt'),
        DeletePageMgmt: utils.getUrl('/FrontTaps/PageMgmt/DeletePageMgmt'),

        //Page Meta Management
        GetAllPageMetaList: utils.getUrl('/FrontTaps/PageMgmt/GetAllPageMetaList'),
        CreatePageMeta: utils.getUrl('/FrontTaps/PageMgmt/CreatePageMeta'),
        UpdatePageMeta: utils.getUrl('/FrontTaps/PageMgmt/UpdatePageMeta'),
        DeletePageMeta: utils.getUrl('/FrontTaps/PageMgmt/DeletePageMeta'),

        //Menu Management
        GetMenuList: utils.getUrl('/FrontTaps/MenuMgmt/GetMenuList'),
        CreateMenu: utils.getUrl('/FrontTaps/MenuMgmt/CreateMenu'),
        DeleteMenu: utils.getUrl('/FrontTaps/MenuMgmt/DeleteMenu'),

        //Menu Structure
        CreateMenuStructure: utils.getUrl('/FrontTaps/MenuMgmt/CreateMenuStructure'),
        FetchMenuStructureById: utils.getUrl('/FrontTaps/MenuMgmt/FetchMenuStructureById'),
        GetAllMenuStructure: utils.getUrl('/FrontTaps/MenuMgmt/GetAllMenuStructure'),
        UpdateMenuStructure: utils.getUrl('/FrontTaps/MenuMgmt/UpdateMenuStructure'),
        DeleteMenuStructure: utils.getUrl('/FrontTaps/MenuMgmt/DeleteMenuStructure'),

        //Menu Meta Management
        GetAllMenuMetaList: utils.getUrl('/FrontTaps/MenuMgmt/GetAllMenuMetaList'),
        UpdateMenuMeta: utils.getUrl('/FrontTaps/MenuMgmt/UpdateMenuMeta'),
        CreateMenuMeta: utils.getUrl('/FrontTaps/MenuMgmt/CreateMenuMeta'),
        DeleteMenuMeta: utils.getUrl('/FrontTaps/MenuMgmt/DeleteMenuMeta'),

        //MediaMgmt
        GetAllMedia: utils.getUrl('/FrontTaps/MediaMgmt/GetAllMedia'),
        EditMedia: utils.getUrl('/FrontTaps/MediaMgmt/EditMedia'),
        UpdateMedia: utils.getUrl('/FrontTaps/MediaMgmt/UpdateMedia'),
        DeleteMedia: utils.getUrl('/FrontTaps/MediaMgmt/DeleteMedia'),

        //Banner
        GetBanner: utils.getUrl('/FrontTaps/BannerMgmt/GetBanner'),
        CreateBannerMgmt: utils.getUrl('/FrontTaps/BannerMgmt/CreateBannerMgmt'),
        DeleteBannerMgmt: utils.getUrl('/FrontTaps/BannerMgmt/DeleteBannerMgmt'),

        //Banner Meta Management
        GetAllBannerMetaList: utils.getUrl('/FrontTaps/BannerMgmt/GetAllBannerMetaList'),
        UpdateBannerMeta: utils.getUrl('/FrontTaps/BannerMgmt/UpdateBannerMeta'),
        CreateBannerMeta: utils.getUrl('/FrontTaps/BannerMgmt/CreateBannerMeta'),
        DeleteBannerMeta: utils.getUrl('/FrontTaps/BannerMgmt/DeleteBannerMeta'),

        //BlackListed Vehicle
        GetAllBlackListedVehicle: utils.getUrl('/FrontTaps/BlacklistedVehicle/GetAllBlackListedVehicle'),
        CreateBlackListedVehicle: utils.getUrl('/FrontTaps/BlacklistedVehicle/CreateBlackListedVehicle'),
        DeleteBlackListedVehicle: utils.getUrl('/FrontTaps/BlacklistedVehicle/DeleteBlackListedVehicle'),

        //Vendor
        GetAllVendor: utils.getUrl('/FrontTaps/Vendor/GetAllVendor'),
        CreateVendor: utils.getUrl('/FrontTaps/Vendor/CreateVendor'),
        DeleteVendor: utils.getUrl('/FrontTaps/Vendor/DeleteVendor'),

        //Workshop Management
        GetAllWorkshoplist: utils.getUrl('/FrontTaps/WorkshopMgmt/GetAllWorkshoplist'),
        AddNewWorkshope: utils.getUrl('/FrontTaps/WorkshopMgmt/AddNewWorkshope'),
        DeleteWorkshop: utils.getUrl('/FrontTaps/WorkshopMgmt/DeleteWorkshop'),
        GetCityByStateId: utils.getUrl('/FrontTaps/WorkshopMgmt/GetCityByStateId'),

        //Workshop margin
        GetAllWorkshopMargin: utils.getUrl('/FrontTaps/WorkshopMgmt/GetAllWorkshopMargin'),
               

        //Front Taps Routes

        //Manage Role
        CreateRoleList: utils.getUrl('/FrontTaps/Admin/CreateRoleList'),
        getAllRoles: utils.getUrl('/FrontTaps/Admin/getAllRoles'),
        DeleteRole: utils.getUrl('/FrontTaps/Admin/DeleteRole'),
        UpdateRole: utils.getUrl('/FrontTaps/Admin/UpdateRole'),

        //Manage User
        GetAllUsers: utils.getUrl('/FrontTaps/Admin/GetAllUsers'),
        AddUserInRole: utils.getUrl('/FrontTaps/Admin/AddUserInRole'),
        FetchUserByRole: utils.getUrl('/FrontTaps/Admin/FetchUserByRole'),
        RemoveUserFromRole: utils.getUrl('/FrontTaps/Admin/RemoveUserFromRole'),

        RegisterUser: utils.getUrl('/FrontTaps/Account/RegisterUser'),
        GenerateLink: utils.getUrl('/FrontTaps/Account/GenerateLink'),

        //Lookup 
        GetAllMake: utils.getUrl('/Lookup/GetAllMake'),
        GetAllModel: utils.getUrl('/Lookup/GetAllModel'),
        GetAllTrim: utils.getUrl('/Lookup/GetAllTrim'),
        GetAllYear: utils.getUrl('/Lookup/GetAllYear'),

        //Engine 
        GetAllEngine: utils.getUrl('/FrontTaps/Engine/GetAllEngine'),
        AddNewEngine: utils.getUrl('/FrontTaps/Engine/AddNewEngine'),
        DeleteEngineData: utils.getUrl('/FrontTaps/Engine/DeleteEngineData'),

        //Transmission
        GetAllTransmission: utils.getUrl('/FrontTaps/Transmission/GetAllTransmission'),
        CreateTransmission: utils.getUrl('/FrontTaps/Transmission/CreateTransmission'),
        DeleteTransmission: utils.getUrl('/FrontTaps/Transmission/DeleteTransmission'),

        //ModelTrimEngineTransmission
        GetAllModelDataTrim: utils.getUrl('/FrontTaps/MasterMgmt/GetAllModelDataTrim'),
        CreateModelEngineTransmission: utils.getUrl('/FrontTaps/MasterMgmt/CreateModelEngineTransmission'),
        DeleteModelEngineTransimission: utils.getUrl('/FrontTaps/MasterMgmt/DeleteModelEngineTransimission'),
        GetAllModelTransmission: utils.getUrl('/FrontTaps/MasterMgmt/GetAllModelTransmission'),

        //Recommended Vehicle
        GetRecommendedVehicleBySearch: utils.getUrl('/FrontTaps/RecommendedVehicle/GetRecommendedVehicleBySearch'),
        ApproveRecommendedVehicle: utils.getUrl('/FrontTaps/RecommendedVehicle/ApproveRecommendedVehicle'),

        //Faq & Help
        GetAllFaq: utils.getUrl('/FrontTaps/Faq/GetAllFaq'),
        DeleteFaq: utils.getUrl('/FrontTaps/Faq/DeleteFaq'),
        CreateFaq: utils.getUrl('/FrontTaps/Faq/CreateFaq'),

        //Order
        //Order
        GetAllOrder: utils.getUrl('/FrontTaps/Order/GetAllOrder'),
        GetOrderDetailById: utils.getUrl('/FrontTaps/Order/GetOrderDetailById'),
        UpdateOrderStatus: utils.getUrl('/FrontTaps/Order/UpdateOrderStatus'),
        GetOrderExcel: utils.getUrl('/FrontTaps/Order/GetOrderExcel'),
        UpdateOrderStatusWithItem: utils.getUrl('/FrontTaps/Order/UpdateOrderStatusWithItem'),
        AddTrackingNumber: utils.getUrl('/FrontTaps/Order/AddTrackingNumber'),
        DeleteTrackingNumber: utils.getUrl('/FrontTaps/Order/DeleteTrackingNumber'),
        UpdateOrderInfo: utils.getUrl('/FrontTaps/Order/UpdateOrderInfo'),
        UpdateBillingInfo: utils.getUrl('/FrontTaps/Order/UpdateBillingInfo'),
        UpdateShippingInfo: utils.getUrl('/FrontTaps/Order/UpdateShippingInfo'),
        UpdateOrderDetailInfo: utils.getUrl('/FrontTaps/Order/UpdateOrderDetailInfo'),
    };

    var ReportPrint = {
        OrderReport: utils.getUrl('/FrontTaps/Order/OrderInvoiceReport'),
    };
    var RecommendedComponent = {
        GetRecommendedComponentList: utils.getUrl('/FrontTaps/RecommendedComponentMgmt/GetRecommendedComponentList'),
        ApprovedRecommendedComponentData: utils.getUrl('/FrontTaps/RecommendedComponentMgmt/ApprovedRecommendedComponentData'),
    };
    var ACL = {

    };

    return {
        ReportPrint: ReportPrint,
        Lookup: Lookup,
        ACL: ACL,
        RecommendedComponent: RecommendedComponent,
    };
}());