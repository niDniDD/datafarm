'use strict';

angular.module('users.admin').controller('UserListController', ['$scope', '$filter', 'Admin',
  function ($scope, $filter, Admin) {
    $scope.listuser = [];
    $scope.listtran = [];
    $scope.listdeli = [];
    $scope.setTabGreen = 'buttonGreenSet';
    // console.log($scope.listuser);
    Admin.query(function (data) {
      data.forEach(function (data) {
        if (data.roles[0] === 'user') {
          $scope.listuser.push(data);
        } else if (data.roles[0] === 'deliver') {
          $scope.listdeli.push(data);
        } else if (data.roles[0] === 'transporter') {
          $scope.listtran.push(data);
        }
      });
      $scope.users = data;
      $scope.buildPager();
    });

    $scope.menulist = 'ผู้ใช้';
    $scope.clearfilter = function () {
      $scope.topsearch = '';
      $scope.filterText = '';
    };

    $scope.filter = function (topsearch) {
      if (topsearch.length > 4) {
        $scope.filterText = topsearch;
      } else {
        $scope.filterText = '';
      }
    };

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
