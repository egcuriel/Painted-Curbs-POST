myApp.controller("userhomeController", function ($rootScope, $scope, $http) {
  $scope.load = function () {
    window.email = false;
    let emailUpperCase = $rootScope.email.toUpperCase();
    let email = `{"email": "${emailUpperCase}"}`;

    $http
      .get(`/api/users?filter=${email}`)
      .then((response) => {
        let userData = response.data[0];
        $rootScope.name = userData.firstName;
        $rootScope.role = userData.role;

        if ($rootScope.role === "admin") {
          $rootScope.admin = true;
        }
      })
      .catch((response) => {
        alert(response.data.message);
      });

    $scope.myDatabase = () => {
      window.location = "#!/reports";
      window.email = $rootScope.email;
    };

    $scope.database = () => {
      window.location = "#!/reports";
      window.email = false;
    };
  };
});
