'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'ProductsService', '$state',
  function ($scope, Authentication, product, $state) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    // $scope.products = product.query();
    // Some example string

    // $scope.helloText = 'โครงการยักษ์จับมือโจน ส่งถึงบ้าน';
    $scope.helloText = 'Welcome';
    
    // $scope.descriptionText = 'แหล่งรวมสินค้า อาหาร ธรรมชาติ';
    if (!$scope.authentication.user) {
      $state.go('authentication.signin');
    }

  }
]);
