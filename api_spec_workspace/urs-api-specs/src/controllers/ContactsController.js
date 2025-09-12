const Controller = require('./Controller');
const service = require('../services/ContactsService');

const contactsBulkPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsBulkPOST);
};

const contactsContactIdAnalysesAnalysisIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdAnalysesAnalysisIdDELETE);
};

const contactsContactIdAnalysesAnalysisIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdAnalysesAnalysisIdPUT);
};

const contactsContactIdAnalysesBulkPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdAnalysesBulkPOST);
};

const contactsContactIdAnalysesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdAnalysesGET);
};

const contactsContactIdAnalysesPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdAnalysesPOST);
};

const contactsContactIdCommunicationPreferencesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdCommunicationPreferencesGET);
};

const contactsContactIdCommunicationPreferencesPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdCommunicationPreferencesPOST);
};

const contactsContactIdCommunicationPreferencesPreferenceIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdCommunicationPreferencesPreferenceIdPUT);
};

const contactsContactIdContactInformationGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdContactInformationGET);
};

const contactsContactIdContactInformationInfoIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdContactInformationInfoIdDELETE);
};

const contactsContactIdContactInformationInfoIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdContactInformationInfoIdPUT);
};

const contactsContactIdContactInformationPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdContactInformationPOST);
};

const contactsContactIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdDELETE);
};

const contactsContactIdDisclosureSettingsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdDisclosureSettingsGET);
};

const contactsContactIdDisclosureSettingsPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdDisclosureSettingsPUT);
};

const contactsContactIdDocumentsBulkPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdDocumentsBulkPOST);
};

const contactsContactIdDocumentsDocumentIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdDocumentsDocumentIdDELETE);
};

const contactsContactIdDocumentsDocumentIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdDocumentsDocumentIdPUT);
};

const contactsContactIdDocumentsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdDocumentsGET);
};

const contactsContactIdDocumentsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdDocumentsPOST);
};

const contactsContactIdGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdGET);
};

const contactsContactIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdPUT);
};

const contactsContactIdProfilesGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdProfilesGET);
};

const contactsContactIdProfilesPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdProfilesPOST);
};

const contactsContactIdProfilesProfileIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdProfilesProfileIdDELETE);
};

const contactsContactIdProfilesProfileIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdProfilesProfileIdPUT);
};

const contactsContactIdSystemLinksBulkPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdSystemLinksBulkPOST);
};

const contactsContactIdSystemLinksGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdSystemLinksGET);
};

const contactsContactIdSystemLinksLinkIdDELETE = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdSystemLinksLinkIdDELETE);
};

const contactsContactIdSystemLinksLinkIdPUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdSystemLinksLinkIdPUT);
};

const contactsContactIdSystemLinksPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsContactIdSystemLinksPOST);
};

const contactsGET = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsGET);
};

const contactsMergePUT = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsMergePUT);
};

const contactsPOST = async (request, response) => {
  await Controller.handleRequest(request, response, service.contactsPOST);
};

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
};