myApp.controller("reportsController", function ($rootScope, $scope, $http) {
  $scope.loadReports = () => {
    if (!window.email) {
      $http
        .get("/api/reports")
        .then(function (response) {
          $scope.reports = response.data;
        })
        .catch((response) => {
          console.log(response.data.message);
        });
    } else if (window.email) {
      let filterObj = `{"createdBy": "${$rootScope.email}"}`;

      $http
        .get(`/api/reports?filter=${filterObj}`)
        .then(function (response) {
          $scope.reports = response.data;
        })
        .catch((response) => {
          console.log(response.data.message);
        });
    }
  };

  $scope.deleteAll = () => {
    $http
      .delete("/api/reports", {
        headers: { authorization: "Bearer " + sessionStorage.getItem("jwt") },
      })
      .then(function (response) {
        $scope.reports = response.data;
        alert("All reports have been deleted");
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
            alert(`Report ${id} has been deleted`);
          }
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
      updated: Date.now(),
      updatedBy: $rootScope.email,
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
          foundReport.updatedBy = result.data.updatedBy;
          foundReport.updated = result.data.updated;

          alert(`Report ${id} has been updated`);
        }
      })
      .catch((err) => {
        alert(err.data);
      });
  };
});
