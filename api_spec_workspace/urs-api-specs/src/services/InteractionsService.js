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
const interactionsGET = ({ profileId, contactId, interactionType, createdAt_gt, createdAt_lt, limit, offset }) => new Promise(
  async (resolve, reject) => {
    try {
      let filteredInteractions = interactions;

      if (profileId) {
        filteredInteractions = filteredInteractions.filter(interaction => interaction.profileId === profileId);
      }
      if (contactId) {
        filteredInteractions = filteredInteractions.filter(interaction => interaction.contactId === contactId);
      }
      if (interactionType) {
        filteredInteractions = filteredInteractions.filter(interaction => interaction.interactionType === interactionType);
      }
      if (createdAt_gt) {
        filteredInteractions = filteredInteractions.filter(interaction => new Date(interaction.createdAt) > new Date(createdAt_gt));
      }
      if (createdAt_lt) {
        filteredInteractions = filteredInteractions.filter(interaction => new Date(interaction.createdAt) < new Date(createdAt_lt));
      }

      const total_count = filteredInteractions.length;
      const startIndex = offset || 0;
      const endIndex = (limit !== undefined && limit !== null) ? startIndex + limit : filteredInteractions.length;
      const paginatedInteractions = filteredInteractions.slice(startIndex, endIndex);

      resolve(Service.successResponse({
        entries: paginatedInteractions,
        offset: startIndex,
        limit: limit !== undefined && limit !== null ? limit : total_count,
        total_count: total_count,
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