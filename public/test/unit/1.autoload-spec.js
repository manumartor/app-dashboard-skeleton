describe('MaioCloud - Maioman UnitTest', function() {
  beforeEach(function(){
    module('app');
  });

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('loginLayerController UnitTest', function() {
    it('sets the strength to "strong" if the password length is >8 chars', function() {
      var $scope = {};
      var controller = $controller('loginLayerController', { $scope: $scope });
      $scope.password = 'longerthaneightchars';
      $scope.login();
      expect($scope.error).not.toEqual('');
    });
  });
});