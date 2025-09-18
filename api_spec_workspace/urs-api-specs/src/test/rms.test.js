const loadNdjsonAndLog = require('./loadNdjson');
const path = require('path');

// TODO: Based on the sample RMS data file provided by Glen:
// * Massage the data into a format that matches the contacts+profile API calls.
// * Call the API to load new contacts and profiles. The profile type will be "jobseeker

describe('RMS Data Loading', () => {
    it.skip('should load and log the contents of f_rms_master.jsonl', async () => {
        const filePath = path.join(__dirname, '../sample_data/rms/f_rms_master.jsonl');
        await loadNdjsonAndLog(filePath);
    }).timeout(5000);
});
