myApp.controller("loginController", function ($rootScope, $scope, $http) {
  $scope.login = () => {
    let loginInfo = {
      email: $scope.email,
      password: $scope.password,
    };

    $http
      .post("api/users/login", loginInfo)
      .then(function (result) {
        sessionStorage.setItem("jwt", result.data.jwt);
        window.location = "#!/userhome";
        $rootScope.email = loginInfo.email;
        $rootScope.signedOut = false;
      })
      .catch(function (error) {
        $scope.status = error.data;
      });
  };
});
