(function() {
  'use strict';

  angular
    .module('budgetrentacar.extraParts')
    .service('ExtraPartsService', ExtraPartsService);

    ExtraPartsService.$inject = ['$firebaseObject','CarInfoFirebaseService'];
    
    function ExtraPartsService($firebaseObject,CarInfoFirebaseService){
      this.pushNewItems = pushNewItems;
      var rootRef  = new Firebase('https://budgetest.firebaseio.com/');
      
      return this;

      function pushNewItems(items){
        var reference = rootRef.child('revisions').child(CarInfoFirebaseService.currentRevisionId).child("additional-products");
        reference.set(items);
      }   
  }
})();
