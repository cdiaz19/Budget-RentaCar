(function() {
  'use strict';

  angular
  .module('budgetrentacar.scanner')
  .controller('ScannerController', ScannerController);

  /* @ngInject */

  function ScannerController($state, $cordovaBarcodeScanner, ScannerService) {
    console.log('at scanner');
    $cordovaBarcodeScanner.scan()
      .then(
        function(codeData) {
          ScannerService.setCode(codeData.text);
          $state.go('carInfo');
        },
        function(error) {
          alert('Error, no se pudo leer el código');
          $state.go('scanner-error');
        });
  }
})();
