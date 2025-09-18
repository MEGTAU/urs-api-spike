const loadNdjsonAndLog = require('./loadNdjson');
const path = require('path');

// TODO: Based on theses sample ACP data files provided by Glen:
// * Load each of these files
// * Massage the data into a format that matches the contacts+prpfile API calls
// * Call the API to load new contacts and profiles. There will be several types of profile, e.g. apprentice, employer contact, parent/guardian, etc.
// * Call the API to record the relationships between various individuals described by teh ACP data

// f_apprentice_address.jsonl
// f_apprentice_email.jsonl
// f_apprentice_phone.jsonl
// f_apprentices.jsonl
// f_employer.jsonl
// f_employer_address.jsonl
// f_employer_email.jsonl
// f_employer_phone.jsonl
// f_employercontact.jsonl
// f_employercontact_email.jsonl
// f_employercontact_phone.jsonl
// f_training_contract_master.jsonl
// f_training_contract_master_old.jsonl
describe('RMS Data Loading', () => {
    it.skip('should load and log the contents of f_employercontact.jsonl', async () => {
        const filePath = path.join(__dirname, '../sample_data/acp/f_employercontact.jsonl');
        await loadNdjsonAndLog(filePath);
    }).timeout(5000);
});