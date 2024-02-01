myApp.controller("reports2Controller", function ($rootScope, $scope, $http) {
  $scope.loadReports = () => {
    $http
      .get("/api/reports")
      .then(function (response) {
        $scope.reports = response.data;
      })
      .catch((response) => {
        console.log(response.data.message);
      });
  };

  $scope.deleteAll = () => {
    $http
      .delete("/api/reports", {
        headers: { authorization: "Bearer " + sessionStorage.getItem("jwt") },
      })
      .then(function (response) {
        $scope.reports = response.data;
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  $scope.deleteReport = (id) => {
    $http
      .delete(`/api/reports/${id}`, {
        headers: { authorization: "Bearer " + sessionStorage.getItem("jwt") },
      })
      .then((result) => {
        for (let i = 0; i < $scope.reports.length; i++) {
          if ($scope.reports[i]._id === result.data._id) {
            $scope.reports.splice(i, 1);
          }
          console.log(payLoad);
        }
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  $scope.updateReport = (id) => {
    let update = {
      status: prompt("Status of Report"),
      details: prompt("Details of Report"),
    };
    $http
      .patch(`/api/reports/${id}`, update, {
        headers: { authorization: "Bearer " + sessionStorage.getItem("jwt") },
      })
      .then((result) => {
        let foundReport = $scope.reports.find(
          (status) => status._id == result.data._id,
        );
        if (foundReport) {
          foundReport.status = result.data.status;
          foundReport.details = result.data.details;
        }
      })
      .catch((err) => {
        alert(err.data);
      });
  };
});
