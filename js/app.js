var app = angular.module('app', ['leaflet-directive']);

app.controller('MapController', [ '$scope', function($scope) {
    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        }
    });
}]);