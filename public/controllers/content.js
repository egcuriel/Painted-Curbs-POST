myApp.controller("contentController", function ($scope) {
  $scope.register = () => {
    window.location = "#!/register";
  };

  $scope.login = () => {
    window.location = "#!/login";
  };

  $scope.form = () => {
    window.location = "#!/form";
  };

  $scope.reports = () => {
    window.location = "#!/reports";
  };
});
