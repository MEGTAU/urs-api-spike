/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { v4: uuidv4 } = require('uuid');

const organisations = [];

/**
* Bulk create interactions
* An API to record interactions for future reference. Can initially implement writing to DB and then migrate to higher performance approach (e.g. using queues) if required
* 
* interaction List 
* no response value expected for this operation
* */
const interactionsBulkPOST = ({ interaction }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        interaction,
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
* Create an interaction
* An API to record interactions for future reference. Can initially implement writing to DB and then migrate to higher performance approach (e.g. using queues) if required
* 
* interaction Interaction 
* no response value expected for this operation
* */
const interactionsPOST = ({ interaction }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        interaction,
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
* Bulk update relationships
* Define a relationship between two contacts. The relationship will have a type (e.g. parent-child) and a profiles for each member in the relationship
* 
* relationship List 
* no response value expected for this operation
* */
const relationshipsBulkPUT = ({ relationship }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        relationship,
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
* Get all relationships
* Define a relationship between two contacts. The relationship will have a type (e.g. parent-child) and a profiles for each member in the relationship
* 
* returns RelationshipList
* */
const relationshipsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({}));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);
/**
* Create a relationship
* Define a relationship between two contacts. The relationship will have a type (e.g. parent-child) and a profiles for each member in the relationship
* 
* relationship Relationship 
* no response value expected for this operation
* */
const relationshipsPOST = ({ relationship }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        relationship,
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
* Delete a relationship
* Define a relationship between two contacts. The relationship will have a type (e.g. parent-child) and a profiles for each member in the relationship
* 
* relationshipId UUID 
* no response value expected for this operation
* */
const relationshipsRelationshipIdDELETE = ({ relationshipId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        relationshipId,
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
* Get a relationship by ID
* Define a relationship between two contacts. The relationship will have a type (e.g. parent-child) and a profiles for each member in the relationship
* 
* relationshipId UUID 
* returns Relationship
* */
const relationshipsRelationshipIdGET = ({ relationshipId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        relationshipId,
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
* Update a relationship
* Define a relationship between two contacts. The relationship will have a type (e.g. parent-child) and a profiles for each member in the relationship
* 
* relationshipId UUID 
* relationship Relationship 
* no response value expected for this operation
* */
const relationshipsRelationshipIdPUT = ({ relationshipId, relationship }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        relationshipId,
        relationship,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  interactionsBulkPOST,
  interactionsPOST,
  relationshipsBulkPUT,
  relationshipsGET,
  relationshipsPOST,
  relationshipsRelationshipIdDELETE,
  relationshipsRelationshipIdGET,
  relationshipsRelationshipIdPUT,
};