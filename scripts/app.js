(function(){
  'ue strict';

  angular.module('LunchCheck', [])
         .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope)
  {
      $scope.lunchMenu = "";
      $scope.lunchMenuCheckResult = "";
      $scope.CheckLunchMenu = function() {
        var numberOfItems = 0;
        var lunchMenu = $scope.lunchMenu;
        var lunchItems = lunchMenu.split(",");
        for(i=0; i<lunchItems.length; i++) {
          if(lunchItems[i].trim().length > 0) {
            numberOfItems++;
          }
        }
        if(numberOfItems > 3) {
          $scope.lunchMenuCheckResult = "Too Much!";
        } else if(numberOfItems > 0) {
          $scope.lunchMenuCheckResult = "Enjoy!";
        } else {
          $scope.lunchMenuCheckResult = "";
        }
      };
  };
})();
