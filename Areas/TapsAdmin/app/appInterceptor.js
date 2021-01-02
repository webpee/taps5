'use strict';

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('noCacheInterceptor');
}]).factory('noCacheInterceptor', function () {
    return {
        request: function (config) {
            //            console.log(config.method);
            //            console.log(config.url);
            if (config.method == 'GET') {
                if (config.url.indexOf('ngview/') < 0 && config.url.indexOf('.html') < 0) {
                    var sep = config.url.indexOf('?') === -1 ? '?' : '&';
                    config.url = config.url + sep + 'noCache=' + new Date().getTime();
                }
                //                if ((config.url != "template/pagination/pagination.html") && (config.url != "template/tabs/tabset.html") && (config.url != "template/tabs/tab.html")
                //                    && (config.url != "/ngview/ProgramStructure/core.html") && (config.url != "template/modal/window.html") && (config.url != "template/modal/backdrop.html")
                //                    && (config.url != "ngview/shared/alert.html") && (config.url != "ngview/shared/dialog.html")) {
                //                    //if () {
                //                    var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                //                    config.url = config.url + separator + 'cacheSlayer=' + new Date().getTime();
                //                    //}
                //
                //                }
            }
            //            console.log(config.method);
            //            console.log(config.url);
            return config;
        }
    };
});
