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

module.exports = {
  interactionsBulkPOST,
  interactionsPOST,
};