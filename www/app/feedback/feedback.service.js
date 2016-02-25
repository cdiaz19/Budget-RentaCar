(function() {
  'use strict';

  angular
    .module('budgetrentacar.feedback')
    .service('FeedbackService', FeedbackService);

    FeedbackService.$inject = ['$firebaseObject','CarInfoFirebaseService'];
    
    function FeedbackService($firebaseObject,CarInfoFirebaseService){
      this.pushFeedback = pushFeedback;
      var rootRef  = new Firebase('https://budget-cr.firebaseio.com/');

      function pushFeedback(feedback){
        var reference = rootRef.child('revisions').child(CarInfoFirebaseService.currentRevisionId).child("feedback");
        reference.update(feedback);
      }   
  }
})();
