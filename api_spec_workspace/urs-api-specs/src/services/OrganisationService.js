/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { v4: uuidv4 } = require('uuid');

let organisations = [];

/**
* Bulk create organisations
* Organisation resource
*
* organisation List
* no response value expected for this operation
* */
const organisationsBulkPOST = ({ organisation }) => new Promise(
  async (resolve, reject) => {
    try {
      const createdOrganisations = organisation.map(org => {
        const newOrg = { ...org, id: uuidv4() };
        organisations.push(newOrg);
        return newOrg;
      });
      resolve(Service.successResponse(createdOrganisations, 201));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get all organisations
* Organisation resource
*
* returns OrganisationList
* */
const organisationsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        entries: organisations,
        offset: 0,
        limit: organisations.length,
        total_count: organisations.length,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Delete an organisation
* Organisation resource
*
* organisationId UUID
* no response value expected for this operation
* */
const organisationsOrganisationIdDELETE = ({ organisationId }) => new Promise(
  async (resolve, reject) => {
    try {
      const index = organisations.findIndex(o => o.id === organisationId);
      if (index > -1) {
        organisations.splice(index, 1);
        resolve(Service.successResponse({}, 204));
      } else {
        reject(Service.rejectResponse('Organisation not found', 404));
      }
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Get an organisation by ID
* Organisation resource
*
* organisationId UUID
* returns Organisation
* */
const organisationsOrganisationIdGET = ({ organisationId }) => new Promise(
  async (resolve, reject) => {
    try {
      const organisation = organisations.find(o => o.id === organisationId);
      if (organisation) {
        resolve(Service.successResponse(organisation));
      } else {
        reject(Service.rejectResponse('Organisation not found', 404));
      }
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Update (or create) an organisation
* Organisation resource
*
* organisationId UUID
* organisation Organisation
* no response value expected for this operation
* */
const organisationsOrganisationIdPUT = ({ organisationId, organisation }) => new Promise(
  async (resolve, reject) => {
    try {
      const index = organisations.findIndex(o => o.id === organisationId);
      if (index > -1) {
        organisations[index] = { ...organisations[index], ...organisation };
        resolve(Service.successResponse(organisations[index]));
      } else {
        const newOrganisation = { ...organisation, id: organisationId };
        organisations.push(newOrganisation);
        resolve(Service.successResponse(newOrganisation, 201));
      }
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create an organisation
* Organisation resource
*
* organisation Organisation
* no response value expected for this operation
* */
const organisationsPOST = ({ organisation }) => new Promise(
  async (resolve, reject) => {
    try {
      const newOrganisation = { ...organisation, id: uuidv4() };
      organisations.push(newOrganisation);
      resolve(Service.successResponse(newOrganisation, 201));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);


module.exports = {
  organisationsBulkPOST,
  organisationsGET,
  organisationsOrganisationIdDELETE,
  organisationsOrganisationIdGET,
  organisationsOrganisationIdPUT,
  organisationsPOST,
};
