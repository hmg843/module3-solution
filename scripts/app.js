(function(){
  'ue strict';

  angular.module('NarrowItDownApp', [])
         .controller('NarrowItDownController', NarrowItDownController)
         .service('MenuSearchService', MenuSearchService)
         .constant('MenuBaseUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json')
         .directive('MenuItems', MenuItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService)
  {
    var menu = this;
    menu.searchTerm = "";
    menu.findMenuItems = function() {
      var promise = MenuSearchService.getMenuItems();
      promise.then(function(response) {
        menu.found = [];
        if (menu.searchTerm === undefined ||
            menu.searchTerm.length <= 0)
          return;
        var menuItems = response.data.menu_items;
        for (var i = 0; i < menuItems.length; i++) {
          var menuItem = menuItems[i];
          var itemDescription = menuItem.description;
          if (itemDescription.indexOf(menu.searchTerm) !== -1) {
            menu.found.push(menuItem);
          }
        }
        console.log(menu.found);
      }).catch(function(error) {
        console.log("error :" + error);
      })
    }
  };

  function MenuItemsDirective()
  {
    var ddo = {
      templateUrl : 'menu_items.html'
    };
    return ddo;
  }

  MenuSearchService.$inject = ['$http', 'MenuBaseUrl'];
  function MenuSearchService($http, MenuBaseUrl)
  {
    var service = this;
    service.getMenuItems = function()
    {
        var promise = $http({
          method : 'GET',
          url : MenuBaseUrl
        });
        return promise;
    }
  }
})();
