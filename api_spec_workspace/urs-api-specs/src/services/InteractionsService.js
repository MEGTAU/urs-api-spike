/* eslint-disable no-unused-vars */
const Service = require('./Service');
const {v4: uuidv4} = require('uuid');

const interactions = [];

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
            const createdInteractions = interaction.map(item => {
                const newInteraction = {...item, id: uuidv4(), profileId: item.profileId, interactionType: item.interactionType};
                interactions.push(newInteraction);
                return newInteraction;
            });
            resolve(Service.successResponse(createdInteractions, 201));
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
const interactionsPOST = ({interaction}) => new Promise(
    async (resolve, reject) => {
        try {
            const newInteraction = {...interaction, id: uuidv4(), profileId: interaction.profileId, interactionType: interaction.interactionType};
            interactions.push(newInteraction);
            resolve(Service.successResponse(newInteraction, 201));
        } catch (e) {
            reject(Service.rejectResponse(
                e.message || 'Invalid input',
                e.status || 405,
            ));
        }
    },
);

/**
* Get all interactions
* An API to record interactions for future reference.
*
* returns InteractionList
* */
const interactionsGET = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        entries: interactions,
        offset: 0,
        limit: interactions.length,
        total_count: interactions.length,
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
    interactionsGET,
};