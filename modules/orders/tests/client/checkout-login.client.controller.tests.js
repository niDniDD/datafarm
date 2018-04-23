'use strict';

(function () {
  // Checkout login Controller Spec
  describe('Checkout login Controller Tests', function () {
    // Initialize global variables
    var CheckoutLoginController,
      $scope,
      $httpBackend,
      $stateParams,
      $location,
      mockOrder,
      PostcodesService,
      mockPostcode,
      OrdersService,
      mockPromotion,
      mockPromotion2,
      PromotionsService,
      mockProduct,
      ProductsService,
      Authentication,
      mockUser,
      Users;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _OrdersService_, _PostcodesService_, _PromotionsService_, _ProductsService_, _Authentication_, _Users_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      OrdersService = _OrdersService_;
      PostcodesService = _PostcodesService_;
      PromotionsService = _PromotionsService_;
      ProductsService = _ProductsService_;
      Authentication = _Authentication_;
      Users = _Users_;

      // mockPostcode = [new PostcodesService({
      //   _id: '525a8422f6d0f87f0e407a44',
      //   postcode: '1234'
      // })];
      mockUser = new Users({
        firstName: 'first Name',
        address: {}
      });
      mockPromotion = new PromotionsService({
        _id: '525a8422f6d0f87f0e407a66',
        product: mockProduct,
        condition: 3,
        description: 'test',
        discount: {
          fixBath: 50,
          percen: 0
        },
        freeitem: {}
      });
      mockPromotion2 = new PromotionsService({
        _id: '525a8422f6d0f87f0e407a88',
        product: mockProduct,
        condition: 1,
        description: 'test',
        discount: {
          fixBath: 20,
          percen: 0
        },
        freeitem: {}
      });

      mockProduct = new ProductsService({
        _id: '525a8422f6d0f87f0e407a77',
        name: 'Product name'
      });

      mockOrder = new OrdersService({
        _id: '525a8422f6d0f87f0e407a33',
        docno: '1234'
      });
      // Initialize the Checkout login controller.
      CheckoutLoginController = $controller('CheckoutLoginController as vm', {
        $scope: $scope,
        orderResolve: {}
      });
    }));



    describe('Signup', function () {
      it('should init', inject(function () {
        $httpBackend.expectGET('api/postcodes').respond(mockPostcode);
        $scope.init();
        $httpBackend.flush();
        // expect($scope.vm.order.docdate).toEqual(new Date());
        expect($scope.postcode.length).toEqual(0);
      }));
      it('Should be Step first', function () {
        expect($scope.step).toBe(1);
      });

      it('Should be Next Step not signin not tel', function () {
        $scope.step = 1;
        $scope.checkStep(false);
        expect($scope.step).toBe(1);
      });

      it('Should be Next Step signin has tel is username', function () {
        $scope.authentication.username = 'Fred';
        $httpBackend.when('POST', '/api/auth/signin').respond(200, 'Fred');

        $scope.step = 1;
        $scope.isMember = false;
        $scope.checkStep(true);
        $httpBackend.flush();
        expect($scope.step).toBe(2);
        // Test scope value
        expect($scope.authentication.username).toEqual('Fred');
      });

      it('Should be Next Step signin has tel is not username', function () {
        $scope.authentication.username = 'Fred';
        $httpBackend.when('POST', '/api/auth/signup').respond(200, 'Fred');

        $scope.step = 2;
        $scope.isMember = false;
        $scope.checkStep(true);
        $scope.signup(true);
        $httpBackend.flush();
        expect($scope.step).toBe(2);
        // Test scope value
        expect($scope.authentication.username).toEqual('Fred');
      });

      it('Should be Next Step not signin not first name last name and address', function () {
        $scope.step = 2;
        $scope.checkStep(false);
        expect($scope.step).toBe(2);
      });

      it('should register with correct data', function () {
        //   // Test expected GET request
        $scope.step = 2;
        $scope.authentication.username = 'Fred';
        $httpBackend.when('POST', '/api/auth/signup').respond(200, 'Fred');

        $scope.signup(true);
        $httpBackend.flush();
        expect($scope.step).toBe(2);
        // test scope value
        expect($scope.authentication.username).toBe('Fred');
        expect($scope.error).toEqual(null);
      });

      it('should login with a correct user and password', function () {
        // Test expected GET request
        $scope.step = 2;
        $httpBackend.when('POST', '/api/auth/signin').respond(200, 'Fred');

        $scope.signin(true);
        $httpBackend.flush();
        expect($scope.step).toBe(3);
        // Test scope value
        expect($scope.authentication.user).toEqual('Fred');
      });

    });

    // describe('vm.readPromotion() as read', function () {
    //   var mockPromotionList;

    //   beforeEach(function () {
    //     mockPromotionList = [mockPromotion, mockPromotion, mockPromotion];
    //   });

    //   it('should send a GET all Promotions', inject(function (PromotionsService) {
    //     // Set POST response
    //     $httpBackend.expectGET('api/promotions').respond(mockPromotionList);

    //     $scope.vm.Promotion();

    //     $httpBackend.flush();

    //     // Test form inputs are reset
    //     expect($scope.vm.promotions.length).toEqual(3);

    //   }));

    // });

    // describe('get response', function () {
    //   var mockPromotionList;
    //   var mockResDiscount;

    //   beforeEach(function () {
    //     mockPromotionList = [mockPromotion, mockPromotion2];
    //     mockResDiscount = { promotions: [], freeitemunit: 0, total: 110 };
    //   });

    //   it('should send a GET response Promotions', inject(function (PromotionsService) {
    //     $httpBackend.expectGET('api/promotions/productid/' + mockProduct._id + '/3').respond(mockResDiscount);
    //     $scope.vm.initPromotion();
    //     $scope.vm.checkPromotion(mockProduct, 3);
    //     $httpBackend.flush();
    //     expect($scope.vm.order.discountpromotion).toEqual(110);
    //   }));

    // });

    describe('updateUserProfile', function () {
      var user = {
        address: {}
      };
      beforeEach(function () {
        // Mock Order in $scope
        user.address.address = 'New address';
      });
      it('update User', inject(function () {
        $scope.authentication.user = {
          address: {}
        };
        $scope.shipping = {
          address: 'New address'
        };
        $scope.user = {
          address: { address: 'New address' }
        };
        // Set PUT response
        // $httpBackend.expectPUT(/api\/users\/([0-9a-fA-F]{24})$/).respond(user);
        $scope.updateUserProfile($scope.shipping);
        //  $httpBackend.flush();
        // Run controller functionality
        expect($scope.user.address.address).toEqual($scope.shipping.address);


      }));
    });

  });
} ());
