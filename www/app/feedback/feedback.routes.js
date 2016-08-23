(function() {
  'use strict';

  angular
    .module('budgetrentacar.feedback')
    .config(config);

  config.$inject = ['$stateProvider'];

  /* @ngInject */
  function config($stateProvider) {
    $stateProvider
      .state('feedback', {
        url: '/feedback',
        templateUrl: 'app/feedback/feedback.html',
        controller: 'FeedbackCtrl',
        controllerAs: 'vm',
        cache: false
      });
  }

})();
