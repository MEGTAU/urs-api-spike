/* eslint-disable no-unused-vars */
const Service = require('./Service');

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
  relationshipsBulkPUT,
  relationshipsGET,
  relationshipsPOST,
  relationshipsRelationshipIdDELETE,
  relationshipsRelationshipIdGET,
  relationshipsRelationshipIdPUT,
};