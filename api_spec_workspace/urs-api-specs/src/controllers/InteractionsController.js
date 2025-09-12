const Controller = require('./Controller');
const service = require('../services/InteractionsService');

const interactionsBulkPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.interactionsBulkPOST);
};

const interactionsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.interactionsPOST);
};

module.exports = {
  interactionsBulkPOST,
  interactionsPOST,
};