myApp.controller("registerController", function ($scope, $http) {
  $scope.register = () => {
    let regInfo = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email.toUpperCase(),
      password: $scope.password,
    };

    $http
      .post("/api/users/register", regInfo)
      .then(function (result) {
        window.location = "#!/login";
      })
      .catch(function (error) {
        $scope.status = error.data;
      });
  };
});
