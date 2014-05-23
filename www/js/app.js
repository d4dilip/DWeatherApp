var weatherApp = angular.module("weatherApp", ["ionic"]);

weatherApp.controller("weatherCntrl", function ($scope, $http, $ionicPlatform) {
    var _this = this;


    $ionicPlatform.ready(function () {
        if (window.StatusBar) {
            Statusbar.hide();

        }
    });


    $scope.loadData = function () {
        var _data = {};
        try {
            _data = JSON.parse(window.localStorage['weatherdata']);
            $scope.CurrentWeather = _data;
            $scope.weatherLastUpdateOn = JSON.parse(window.localStorage['lastupdatedon']);

        } catch (e) {
        }
    };

    $scope.getCurrentWeather = function (locString) {
        locString = "Heidenheim";
        $scope.currentLocationString = locString;
        // get current location weather from an api.
        //var url="data/weatherdata.json";

        var url = "http://api.openweathermap.org/data/2.5/weather?q=" + locString + "&mode=json&units=metric";
        $http.get(url).success(function (data) {
            window.localStorage['weatherdata'] = JSON.stringify(data);
            $scope.CurrentWeather = data;
            var _date = new Date();
            var options = {
                weekday: "long", year: "numeric", month: "short",
                day: "numeric", hour: "2-digit", minute: "2-digit"
            };
            window.localStorage['lastupdatedon'] = JSON.stringify(_date.toLocaleTimeString("en-us", options));

            $scope.weatherLastUpdateOn = _date.toLocaleTimeString("en-us", options);
            $scope.CurrentWeatherIcon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

        });

    };

});