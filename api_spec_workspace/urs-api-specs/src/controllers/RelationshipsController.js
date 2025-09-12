const Controller = require('./Controller');
const service = require('../services/RelationshipsService');

const relationshipsBulkPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.relationshipsBulkPUT);
};

const relationshipsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.relationshipsGET);
};

const relationshipsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.relationshipsPOST);
};

const relationshipsRelationshipIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.relationshipsRelationshipIdDELETE);
};

const relationshipsRelationshipIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.relationshipsRelationshipIdGET);
};

const relationshipsRelationshipIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.relationshipsRelationshipIdPUT);
};


module.exports = {
  relationshipsBulkPUT,
  relationshipsGET,
  relationshipsPOST,
  relationshipsRelationshipIdDELETE,
  relationshipsRelationshipIdGET,
  relationshipsRelationshipIdPUT,
};