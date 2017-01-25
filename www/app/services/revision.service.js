(function() {
  angular
    .module('app.services')
    .factory('revisionService', revisionService);

  /* @ngInject */
  function revisionService(sessionService,
                           canvasService) {

    var revision = {};
    var observationsList = [];
    var damagesList = {};
    var feedback = {};

    var service = {
      setRevision: setRevision,
      setUsername: setUsername,
      setCarMVA: setCarMVA,
      setNewType: setNewType,
      getType: getType,
      setTimestamp: setTimestamp,
      setCarDeliveryInfo: setCarDeliveryInfo,
      setCarTires: setCarTires,
      setDamages: setDamages,
      addObservation: addObservation,
      setObservations: setObservations,
      setOldObservations: setOldObservations,
      removeObservation: removeObservation,
      setCarAccesories: setCarParts,
      setFeedback: setFeedback,
      getFeedback: getFeedback,
      getRevision: getRevision,
      getDamages: getDamages,
      getObservations: getObservations,
      setCanvasImage: setCanvasImage,
      setLicensePlate: setLicensePlate,
      setContractNumber: setContractNumber,
      getContractNumber: getContractNumber,
      resetRevision: resetRevision,
      changeToOldDamages: changeToOldDamages
    };

    return service;

    function changeToOldDamages() {
      canvasService.changeDamagesColorToYellow(damagesList);
    }

    function setRevision(lastRevision) {
      revision = angular.extend(revision, lastRevision);
    }

    function removeContractNumber() {
      if(revision.type == 'check-out' && revision.contract_number) {
        delete revision.contract_number;
      }
    }

    function setCurrentUser() {
      setUsername(sessionService.getAuthData());
    }

    function setCarMVA(MVA) {
      revision.vehicle_ref = MVA;
    }

    function setNewType() {
      if(revision.type) {
        revision.type = (revision.type == 'check-in') ? 'check-out' : 'check-in';
      } else {
        revision.type = 'check-out';
      }
      setCurrentUser();
      removeContractNumber();
    }

    function getType() {
      return revision.type;
    }

    function setTimestamp(timestamp) {
      revision.timestamp = timestamp;
    }

    function setUsername(username) {
      revision.username = username;
    }

    function setCarDeliveryInfo(deliveryInfo) {
      revision.km = deliveryInfo.km;
      revision.delivery_place = deliveryInfo.delivery_place;
      revision.gas_level = deliveryInfo.gas_level;
    }

    function setCarTires(tires) {
      revision.tires = tires;
    }

    function setDamages(damages) {
      damagesList = damages;
    }

    function addObservation(observation) {
      observationsList.push(observation);
    }

    function setObservations(observations) {
      observationsList = (removeUnsedProperties(observations));
    }

    function setOldObservations(observations) {
      observationsList = setObservationsPropertyToOld(observations);
    }

    function setObservationsPropertyToOld(observations) {
      angular.forEach(observations, function(observation) {
        observation.is_new = false;
      });
      return observations;
    }

    function removeUnsedProperties(observations) {
      angular.forEach(observations, function(observation) {
        delete observation.$id;
        delete observation.$priority;
      });
      return observations;
    }

    function removeObservation(observation) {
      var observationIndex = observationsList.indexOf(observation);
      observationsList.splice(observationIndex, 1);
    }

    function setCarParts(carParts, countedCarParts) {
      revision.car_parts_present = carParts;
      revision.car_parts_present.emblems = countedCarParts.emblems;
      revision.car_parts_present.plates = countedCarParts.plates;
    }

    function setFeedback(userFeedback) {
      feedback = userFeedback;
    }

    function getFeedback() {
      return feedback;
    }

    function getRevision() {
      return revision;
    }

    function getDamages() {
      return damagesList;
    }

    function getObservations() {
      return observationsList;
    }

    function setCanvasImage(canvasImage) {
      revision.canvas_image = canvasImage;
    }

    function setLicensePlate(licensePlate) {
      revision.license_plate = licensePlate;
    }

    function setContractNumber(contractNumber) {
      revision.contract_number = contractNumber;
    }

    function getContractNumber() {
      return revision.contract_number;
    }

    function resetRevision() {
      revision = {};
      damagesList = {};
      observationsList = [];
    }
  }
})();
