(function(){
  'ue strict';

  angular.module('NarrowItDownApp', [])
         .controller('NarrowItDownController', NarrowItDownController)
         .service('MenuSearchService', MenuSearchService)
         .constant('MenuBaseUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json')
         .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
  function NarrowItDownController(MenuSearchService, $scope)
  {
    var menu = this;
    menu.searchTerm = "";
    menu.noSearchResultsExist = false;
    menu.deletedCount = 0;
    menu.findMenuItems = function() {
      menu.deletedCount = 0;
      if (menu.searchTerm !== undefined && menu.searchTerm.length > 0) {
        menu.found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      } else {
        menu.found = [];
      }
    }
    menu.removeItem = function(index) {
      menu.found.splice(index, 1);
      menu.deletedCount++;
    }
    menu.noSearchResultsExist = function() {
      return menu.found !== undefined && menu.found.length === 0 && menu.deletedCount === 0;
    }
  };

  function FoundItemsDirective()
  {
    var ddo = {
      restrict : 'E',
      templateUrl : 'foundItems.html',
      scope : {
        foundItems : '<',
        onRemove   : '&'
      }
    };
    return ddo;
  }

  MenuSearchService.$inject = ['$http', 'MenuBaseUrl', '$timeout'];
  function MenuSearchService($http, MenuBaseUrl, $timeout)
  {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
      var foundItems = [];
      $http({
          method : 'GET',
          url : MenuBaseUrl
      }).then(function(response) {
          var menuItems = response.data.menu_items;
          for (var i = 0; i < menuItems.length; i++) {
            var menuItem = menuItems[i];
            var itemDescription = menuItem.description;
            if (itemDescription.indexOf(searchTerm) !== -1) {
              foundItems.push(menuItem);
            }
          }
      }).catch(function(error) {
          console.log("error :" + error);
      });
      return foundItems;
    }
  }
})();
