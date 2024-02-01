myApp.controller("formController", function ($rootScope, $scope, $http) {
  $scope.curbColors = ["RED", "YELLOW", "BLUE", "WHITE"];
  $scope.streetDirections = ["NORTH", "EAST", "WEST", "SOUTH"];
  $scope.streetTypes = [
    "AVENUE",
    "BOULEVARD",
    "COURT",
    "DRIVE",
    "PLACE",
    "STREET",
  ];

  $scope.submit = () => {
    let newReport = {
      curbColor: $scope.curbColor,
      streetNum: $scope.streetNum,
      streetDirection: $scope.streetDirection,
      streetName: $scope.streetName.toUpperCase(),
      streetType: $scope.streetType,
      city: $scope.city.toUpperCase(),
      zipCode: parseFloat($scope.zipCode),
      longitude: parseFloat($scope.longitude),
      latitude: parseFloat($scope.latitude),
      createdBy: $rootScope.email,
    };

    console.log(newReport);

    $http
      .post("/api/reports/form", newReport)
      .then(function (result) {
        window.id = result.data._id;
        window.location = "#!/confirmation";
      })
      .catch(function (result) {
        $scope.status = result.data;
      });
  };
});
