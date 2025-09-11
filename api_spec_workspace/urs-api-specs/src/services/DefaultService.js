/* eslint-disable no-unused-vars */
const Service = require('./Service');
const { v4: uuidv4 } = require('uuid');

let organisations = [];

/**
* Bulk create contacts
* Represents an individual. Note that specifying meaning included fields may require multiple joins so consider performance implications.
* 
* contact List 
* no response value expected for this operation
* */
const contactsBulkPOST = ({ contact }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contact,
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
* Delete an analysis for a contact
* Contains the results for an analysis (e.g vibrancy index classification) of the contact
* 
* contactId UUID 
* analysisId UUID 
* no response value expected for this operation
* */
const contactsContactIdAnalysesAnalysisIdDELETE = ({ contactId, analysisId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        analysisId,
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
* Update (or create) an analysis for a contact
* Contains the results for an analysis (e.g vibrancy index classification) of the contact
* 
* contactId UUID 
* analysisId UUID 
* analysis Analysis 
* no response value expected for this operation
* */
const contactsContactIdAnalysesAnalysisIdPUT = ({ contactId, analysisId, analysis }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        analysisId,
        analysis,
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
* Bulk create analyses for a contact
* Contains the results for an analysis (e.g vibrancy index classification) of the contact
* 
* contactId UUID 
* analysis List 
* no response value expected for this operation
* */
const contactsContactIdAnalysesBulkPOST = ({ contactId, analysis }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        analysis,
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
* Get analyses for a contact
* Contains the results for an analysis (e.g vibrancy index classification) of the contact
* 
* contactId UUID 
* returns AnalysisList
* */
const contactsContactIdAnalysesGET = ({ contactId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
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
* Add an analysis for a contact
* Contains the results for an analysis (e.g vibrancy index classification) of the contact
* 
* contactId UUID 
* analysis Analysis 
* no response value expected for this operation
* */
const contactsContactIdAnalysesPOST = ({ contactId, analysis }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        analysis,
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
* Get communication preferences for a contact
* Includes per-channel (e.g. SMS, email, etc) in an extensible format that can support any channel
* 
* contactId UUID 
* returns CommunicationPreferenceList
* */
const contactsContactIdCommunicationPreferencesGET = ({ contactId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
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
* Create a communication preference for a contact
* Includes per-channel (e.g. SMS, email, etc) in an extensible format that can support any channel
* 
* contactId UUID 
* communicationPreference CommunicationPreference 
* no response value expected for this operation
* */
const contactsContactIdCommunicationPreferencesPOST = ({ contactId, communicationPreference }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        communicationPreference,
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
* Update a communication preference for a contact
* Includes per-channel (e.g. SMS, email, etc) in an extensible format that can support any channel
* 
* contactId UUID 
* preferenceId UUID 
* communicationPreference CommunicationPreference 
* no response value expected for this operation
* */
const contactsContactIdCommunicationPreferencesPreferenceIdPUT = ({ contactId, preferenceId, communicationPreference }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        preferenceId,
        communicationPreference,
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
* Get contact information for a contact
* Contains information about how the contact may be contacted.
* 
* contactId UUID 
* returns ContactInformationList
* */
const contactsContactIdContactInformationGET = ({ contactId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
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
* Delete contact information
* Contains information about how the contact may be contacted.
* 
* contactId UUID 
* infoId UUID 
* no response value expected for this operation
* */
const contactsContactIdContactInformationInfoIdDELETE = ({ contactId, infoId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        infoId,
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
* Update (or create) contact information
* Contains information about how the contact may be contacted.
* 
* contactId UUID 
* infoId UUID 
* contactInformation ContactInformation 
* no response value expected for this operation
* */
const contactsContactIdContactInformationInfoIdPUT = ({ contactId, infoId, contactInformation }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        infoId,
        contactInformation,
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
* Add contact information to a contact
* Contains information about how the contact may be contacted.
* 
* contactId UUID 
* contactInformation ContactInformation 
* no response value expected for this operation
* */
const contactsContactIdContactInformationPOST = ({ contactId, contactInformation }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        contactInformation,
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
* Delete a contact
* Represents an individual. Note that specifying meaning included fields may require multiple joins so consider performance implications.
* 
* contactId UUID 
* no response value expected for this operation
* */
const contactsContactIdDELETE = ({ contactId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
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
* Get disclosure settings for a contact
* Information disclosure settings for a contact.
* 
* contactId UUID 
* no response value expected for this operation
* */
const contactsContactIdDisclosureSettingsGET = ({ contactId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
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
* Update disclosure settings for a contact
* Information disclosure settings for a contact.
* 
* contactId UUID 
* no response value expected for this operation
* */
const contactsContactIdDisclosureSettingsPUT = ({ contactId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
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
* Bulk create documents for a contact
* Each document object represents a document about the user, such as a resume or cover letter.
* 
* contactId UUID 
* document List 
* no response value expected for this operation
* */
const contactsContactIdDocumentsBulkPOST = ({ contactId, document }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        document,
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
* Delete a document for a contact
* Each document object represents a document about the user, such as a resume or cover letter.
* 
* contactId UUID 
* documentId UUID 
* no response value expected for this operation
* */
const contactsContactIdDocumentsDocumentIdDELETE = ({ contactId, documentId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        documentId,
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
* Update a document for a contact
* Each document object represents a document about the user, such as a resume or cover letter.
* 
* contactId UUID 
* documentId UUID 
* document Document 
* no response value expected for this operation
* */
const contactsContactIdDocumentsDocumentIdPUT = ({ contactId, documentId, document }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        documentId,
        document,
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
* Get documents for a contact
* Each document object represents a document about the user, such as a resume or cover letter.
* 
* contactId UUID 
* returns DocumentList
* */
const contactsContactIdDocumentsGET = ({ contactId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
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
* Add a document for a contact
* Each document object represents a document about the user, such as a resume or cover letter.
* 
* contactId UUID 
* document Document 
* no response value expected for this operation
* */
const contactsContactIdDocumentsPOST = ({ contactId, document }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        document,
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
* Get a contact by ID
* Represents an individual. Note that specifying meaning included fields may require multiple joins so consider performance implications.
* 
* contactId UUID 
* includedFields List A list that may have the values "disclosure-settings", "contact-information", "communication-preferences", "analysis", "system-links", "relationships" (optional)
* returns Contact
* */
const contactsContactIdGET = ({ contactId, includedFields }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        includedFields,
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
* Update a contact
* Represents an individual. Note that specifying meaning included fields may require multiple joins so consider performance implications.
* 
* contactId UUID 
* contact Contact 
* no response value expected for this operation
* */
const contactsContactIdPUT = ({ contactId, contact }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        contact,
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
* Get profiles for a contact
* Contains information about the profiles the contact has held at present and in the past
* 
* contactId UUID 
* activeProfiles Boolean Only return active profiles. (optional)
* returns ProfileList
* */
const contactsContactIdProfilesGET = ({ contactId, activeProfiles }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        activeProfiles,
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
* Add a profile to a contact
* Contains information about the profiles the contact has held at present and in the past
* 
* contactId UUID 
* profile Profile 
* no response value expected for this operation
* */
const contactsContactIdProfilesPOST = ({ contactId, profile }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        profile,
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
* Delete a profile for a contact
* Contains information about the profiles the contact has held at present and in the past
* 
* contactId UUID 
* profileId UUID 
* no response value expected for this operation
* */
const contactsContactIdProfilesProfileIdDELETE = ({ contactId, profileId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        profileId,
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
* Update a profile for a contact
* Contains information about the profiles the contact has held at present and in the past
* 
* contactId UUID 
* profileId UUID 
* profile Profile 
* no response value expected for this operation
* */
const contactsContactIdProfilesProfileIdPUT = ({ contactId, profileId, profile }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        profileId,
        profile,
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
* Bulk create system links for a contact
* Each link describes a reference to the record for the contact in another ssytem, such as an SMS or LMS.
* 
* contactId UUID 
* systemLink List 
* no response value expected for this operation
* */
const contactsContactIdSystemLinksBulkPOST = ({ contactId, systemLink }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        systemLink,
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
* Get system links for a contact
* Each link describes a reference to the record for the contact in another ssytem, such as an SMS or LMS.
* 
* contactId UUID 
* returns SystemLinkList
* */
const contactsContactIdSystemLinksGET = ({ contactId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
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
* Delete a system link for a contact
* Each link describes a reference to the record for the contact in another ssytem, such as an SMS or LMS.
* 
* contactId UUID 
* linkId UUID 
* no response value expected for this operation
* */
const contactsContactIdSystemLinksLinkIdDELETE = ({ contactId, linkId }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        linkId,
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
* Update (or create) a system link for a contact
* Each link describes a reference to the record for the contact in another ssytem, such as an SMS or LMS.
* 
* contactId UUID 
* linkId UUID 
* systemLink SystemLink 
* no response value expected for this operation
* */
const contactsContactIdSystemLinksLinkIdPUT = ({ contactId, linkId, systemLink }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        linkId,
        systemLink,
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
* Add a system link for a contact
* Each link describes a reference to the record for the contact in another ssytem, such as an SMS or LMS.
* 
* contactId UUID 
* systemLink SystemLink 
* no response value expected for this operation
* */
const contactsContactIdSystemLinksPOST = ({ contactId, systemLink }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contactId,
        systemLink,
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
* Search for contacts
* General contact search to facilitate the "do i know you" use case.
* 
* includedFields List A list that may have the values "disclosure-settings", "contact-information", "communication-preferences", "analysis", "system-links", "relationships" (optional)
* limit Integer The number of items to return. (optional)
* offset Integer The number of items to skip before starting to collect the result set. (optional)
* returns ContactList
* */
const contactsGET = ({ includedFields, limit, offset }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        includedFields,
        limit,
        offset,
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
* Merge contacts
* Manually merges data from the secondary record(s) into the primary record. Data from the primary record takes precedence. Data in list is appended unless the entries are duplicates.
* 
* mergeContactsRequest MergeContactsRequest 
* no response value expected for this operation
* */
const contactsMergePUT = ({ mergeContactsRequest }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        mergeContactsRequest,
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
* Create a contact
* Represents an individual. Note that specifying meaning included fields may require multiple joins so consider performance implications.
* 
* contact Contact 
* no response value expected for this operation
* */
const contactsPOST = ({ contact }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        contact,
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
* Bulk create organisations
* Organisation resource
* 
* organisation List 
* no response value expected for this operation
* */
const organisationsBulkPOST = ({ organisation }) => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
        organisation,
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
  contactsBulkPOST,
  contactsContactIdAnalysesAnalysisIdDELETE,
  contactsContactIdAnalysesAnalysisIdPUT,
  contactsContactIdAnalysesBulkPOST,
  contactsContactIdAnalysesGET,
  contactsContactIdAnalysesPOST,
  contactsContactIdCommunicationPreferencesGET,
  contactsContactIdCommunicationPreferencesPOST,
  contactsContactIdCommunicationPreferencesPreferenceIdPUT,
  contactsContactIdContactInformationGET,
  contactsContactIdContactInformationInfoIdDELETE,
  contactsContactIdContactInformationInfoIdPUT,
  contactsContactIdContactInformationPOST,
  contactsContactIdDELETE,
  contactsContactIdDisclosureSettingsGET,
  contactsContactIdDisclosureSettingsPUT,
  contactsContactIdDocumentsBulkPOST,
  contactsContactIdDocumentsDocumentIdDELETE,
  contactsContactIdDocumentsDocumentIdPUT,
  contactsContactIdDocumentsGET,
  contactsContactIdDocumentsPOST,
  contactsContactIdGET,
  contactsContactIdPUT,
  contactsContactIdProfilesGET,
  contactsContactIdProfilesPOST,
  contactsContactIdProfilesProfileIdDELETE,
  contactsContactIdProfilesProfileIdPUT,
  contactsContactIdSystemLinksBulkPOST,
  contactsContactIdSystemLinksGET,
  contactsContactIdSystemLinksLinkIdDELETE,
  contactsContactIdSystemLinksLinkIdPUT,
  contactsContactIdSystemLinksPOST,
  contactsGET,
  contactsMergePUT,
  contactsPOST,
  interactionsBulkPOST,
  interactionsPOST,
  organisationsBulkPOST,
  organisationsGET,
  organisationsOrganisationIdDELETE,
  organisationsOrganisationIdGET,
  organisationsOrganisationIdPUT,
  organisationsPOST,
  relationshipsBulkPUT,
  relationshipsGET,
  relationshipsPOST,
  relationshipsRelationshipIdDELETE,
  relationshipsRelationshipIdGET,
  relationshipsRelationshipIdPUT,
};