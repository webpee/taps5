var utils = (function () {
    var alertTimeout = 5000;

    function getUrl(a) {
        var app = '';
        return app + a;
    }

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function getDefaultSelect(x) {
        if (x == null || x == '')
            return '0';

        else
            return x;
    }

    function blockUI() {
        $.blockUI({ message: '<h3>Loading...</h3>' });
    }

    function unblockUI() {
        $.unblockUI();
    }

    function validateNumber(x) {
        if (x == null || x == '')
            return false;

        var k = x * 1;
        var v = parseInt(k);
        if (isNaN(v)) {
            return true;
        }

        return false;
    }

    function initToastr() {
        toastr.options = {
            closeButton: true,
            positionClass: 'toast-top-full-width',
            timeout: alertTimeout
        };
    }

    function getQueryStringValue(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }


    return {
        alertTimeout: alertTimeout,
        getUrl: getUrl,
        isNumeric: isNumeric,
        getDefaultSelect: getDefaultSelect,
        blockUI: blockUI,
        unblockUI: unblockUI,
        validateNumber: validateNumber,
        initToastr: initToastr,
        getQueryStringValue: getQueryStringValue
    };
}());