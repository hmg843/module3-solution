(function(){
  'ue strict';

  angular.module('NarrowItDownApp', [])
         .controller('NarrowItDownController', NarrowItDownController)
         .service('MenuSearchService', MenuSearchService)
         .constant('MenuBaseUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json')
         .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService)
  {
    var menu = this;
    menu.searchTerm = "";
    menu.findMenuItems = function() {
      if (menu.searchTerm === undefined || menu.searchTerm.length <= 0) {
        menu.found = [];
        return;
      } else {
        menu.found = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      }
    }
    menu.removeItem = function(index) {
      menu.found.splice(index, 1);
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

  MenuSearchService.$inject = ['$http', 'MenuBaseUrl'];
  function MenuSearchService($http, MenuBaseUrl)
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
