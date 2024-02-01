myApp.controller(
  "searchController",
  function ($scope, $http, $anchorScroll, $location, $rootScope) {
    $scope.load = () => {
      $scope.window = window;
      $scope.cities = ["NORTH HILLS", "PANORAMA CITY", "SYLMAR", "WEST HILLS"];
      $scope.streetDirections = ["NORTH", "EAST", "WEST", "SOUTH"];
      $scope.streetTypes = [
        "AVENUE",
        "BOULEVARD",
        "COURT",
        "DRIVE",
        "PLACE",
        "STREET",
      ];

      $scope.scrollTo = function (id) {
        $location.hash(id);
        $anchorScroll();
      };

      let filterObj;
      $scope.getCall = (filterObj) => {
        $http
          .get(`/api/reports?filter=${filterObj}`)
          .then(function (response) {
            $rootScope.scopes = true;
            $scope.reports = response.data;
          })
          .catch((response) => {
            console.log(response.data.message);
          });
      };
    };

    $scope.citySearch = (index) => {
      results = true;

      let filterObj = `{"city":"${$scope.cities[index]}"}`;

      $scope.getCall(filterObj);
      $scope.scrollTo("results");
      $("#collapseFour").show();
    };

    $scope.searchZipCode = () => {
      let filterObj = `{
      "zipCode":"${$scope.condition}"
      }`;

      $scope.getCall(filterObj);
    };

    $scope.searchAddress = () => {
      let streetName = $scope.streetName.toUpperCase();
      let city = $scope.city.toUpperCase();

      let filterObj = `{
    "streetNum":"${$scope.streetNum}",
    "streetName":"${streetName}",
    "city":"${city}",
    "zipCode":"${$scope.zipCode}"
    }`;

      $scope.getCall(filterObj);
    };

    $scope.searchCoordinates = () => {
      let filterObj = `{
    "latitude":"${$scope.latitude}", 
    "longitude":"${$scope.longitude}"
    }`;

      $scope.getCall(filterObj);
    };
  },
);
