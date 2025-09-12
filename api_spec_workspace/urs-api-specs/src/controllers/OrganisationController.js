const Controller = require('./Controller');
const service = require('../services/OrganisationService');

const organisationsBulkPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.organisationsBulkPOST);
};

const organisationsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.organisationsGET);
};

const organisationsOrganisationIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.organisationsOrganisationIdDELETE);
};

const organisationsOrganisationIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.organisationsOrganisationIdGET);
};

const organisationsOrganisationIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.organisationsOrganisationIdPUT);
};

const organisationsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.organisationsPOST);
};

module.exports = {
  organisationsBulkPOST,
  organisationsGET,
  organisationsOrganisationIdDELETE,
  organisationsOrganisationIdGET,
  organisationsOrganisationIdPUT,
  organisationsPOST,
};
