function SalesReportCtrl($scope, $http, $location, $anchorScroll, $window, $timeout, $filter) {

    $scope.init = function () {
        $scope.initModel();
    };

    $scope.initModel = function () {
        $scope.model = {
            id: '',
            Flag: false,
            StartDate: null,
            EndDate: null,
            SDate: null,
            EDate:null
        };
        $scope.predicate12 = 'ProductName';

        $http.get(routeTapsAdmin.TapsAdmin.GetOrderItems).success(function (data) {
            if (data.length > 0) {
                for (i = 0; i < data.length ; i++) {
                    if (data[i].CreatedOnUtc != null) {
                        data[i].CreatedOnUtc = $filter('date')(data[i].CreatedOnUtc.substr(6, 13), "dd MMM yyyy hh:mm a");
                    }
                }
                $scope.lstLogistic = data;
                $scope.currentPage = 1;
                $scope.totalItems = $scope.lstLogistic.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = 5;
            }
        });

        $scope.BestSellingProduct();

        $scope.SalesGraphData();
    };

    $scope.BestSellingProduct = function (DateFormat) {
        if (DateFormat != 0) {
            $scope.model.StartDate = null;
            $scope.model.EndDate = null;
        }

        var params = {
            DateFormat: DateFormat,
            StartDate: $scope.model.StartDate,
            EndDate: $scope.model.EndDate,
        };

        $http.get(routeTapsAdmin.TapsAdmin.BestSellingProduct, { params: params }).success(function (data) {
            $scope.lstBestSellingProduct = data;
        })
    }

    $scope.SalesGraphData = function (DateFormat) {
        if (DateFormat != 0) {
            $scope.model.SDate = null;
            $scope.model.EDate = null;
        }

        var params = {
            DateFormat: DateFormat,
            StartDate: $scope.model.SDate,
            EndDate: $scope.model.EDate,
        };

        $http.get(routeTapsAdmin.TapsAdmin.SalesGraphData, { params: params }).success(function (data) {
            $scope.TotalSalesinPeriod = data.TotalSales;
            $scope.TotalOrders = data.TotalOrders;
            $scope.ItemsPurchased = data.ItemsPurchased;
            $scope.AverageDailySales = data.AverageDailySales;

            $scope.loadChart(params);

        })
    }

    $scope.toggleSeleted = function () {
        $scope.allSelected = !$scope.allSelected;
        angular.forEach($scope.lstLogistic, function (o) {
            o.checked = $scope.allSelected;
        });
    };

    $scope.UpdateOrderStatus = function (id) {
        $scope.ids1 = [];
        $scope.ids = $filter('filter')($scope.lstLogistic, { checked: true });
        for (var i = 0; i < $scope.ids.length; i++) {
            $scope.ids1.push($scope.ids[i].id);
        }
        var params = {
            id: id,
            updateIds: $scope.ids1
        };

        $http.get(routeTapsAdmin.TapsAdmin.UpdateOrderStatus, { params: params }).success(function (data) {
            $scope.init();
        })
    }

    $scope.SearchText = '';


    var svg = dimple.newSvg("#chartContainer", 800, 400);

    $scope.loadChart = function (params) {

        d3.selectAll("svg > *").remove();
        // Data hack required to get revenue and profit on the same axis, units are
        // arbitrarily allocated to revenue but the values will be summed by date
        $http.get(routeTapsAdmin.TapsAdmin.GraphData, { params: params }).success(function (data) {
            if (data.length > 0) {

                var data = data;

                var chart = new dimple.chart(svg, data);
                chart.setBounds(60, 20, 680, 330);

                // Add your x axis - nothing unusual here
                var x = chart.addCategoryAxis("x", "DateMonth");
                // First y axis is the combination axis for revenue and profit
                var y1 = chart.addMeasureAxis("y", "Quantity");
                // Second is the units only
                var y2 = chart.addMeasureAxis("y", "PriceInclTax");

                // Plot the bars first - the order of series determines their dom position
                // from back to front, this means bars are at the back.  It's important
                // to note that the string here "Unit Sales" is NOT in the data.  Any string
                // not in the data is just used to apply a label which can be used for colouring
                // as it is here and will also appear in tool tips
                var bars = chart.addSeries("RevenueProfit", dimple.plot.bar, [x, y2]);
                // Use a simple line by metric for the other measures
                var lines = chart.addSeries("Metric", dimple.plot.line, [x, y1]);

                // Do a bit of styling to make it look nicer
                lines.lineMarkers = true;
                bars.barGap = 0.5;
                // Colour the bars manually so they don't overwhelm the lines
                chart.assignColor("RevenueProfit", "black", "black", 0.15);

                x.dateParseFormat = "%m/%Y";
                x.addOrderRule("Date");


                // Here's how you add a legend for just one series.  Excluding the last parameter
                // will include every series or an array of series can be passed to select more than
                // one
                //chart.addLegend(60, 5, 680, 10, "right", lines);

                chart.draw();

                // Once Draw is called, this just changes the number format in the tooltips which for these particular
                // numbers is a little too heavily rounded.  I assume your real data isn't like this
                // so you probably won't want this line, but it's a useful tip anyway!
                y1.tickFormat = ",d";
            }
        });
    }


    $scope.init();
}