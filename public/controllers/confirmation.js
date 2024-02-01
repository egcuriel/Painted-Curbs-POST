myApp.controller("confirmationController", function ($scope, $http) {
  $scope.load = () => {
    $scope.id = window.id;
  };
});
