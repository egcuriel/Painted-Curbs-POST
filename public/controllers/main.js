myApp.controller(
  "mainController",
  function ($rootScope, $scope, $http, $location) {
    $scope.load = function () {
      $scope.home = () => {
        if (!$rootScope.email) {
          window.location = "/";
        } else {
          window.location = "#!/userhome";
        }
      };

      $scope.logout = () => {
        sessionStorage.removeItem("jwt");
        window.location = "#!/";

        $rootScope.role = false;
        $rootScope.admin = false;
        $rootScope.email = "";
      };
    };
  },
);
