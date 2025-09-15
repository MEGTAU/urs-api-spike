const http = require('http');
const logger = require('../logger');

const organisations = [
    {
        "legalName": "MEGT (Australia) Ltd",
        "tradingName": "MEGT",
        "organisationType": "employer",
        "abn": "51004257182",
        "employer": {
            "employerId": "EMP001"
        },
        "worksite": {
            "address": "Level 3, 25-35 Allen St, Harris Park",
            "state": "NSW"
        }
    },
    {
        "legalName": "Bunnings Group Limited",
        "tradingName": "Bunnings Warehouse",
        "organisationType": "employer",
        "abn": "24008672179",
        "employer": {
            "employerId": "EMP002"
        },
        "worksite": {
            "address": "1 Market St, Sydney",
            "state": "NSW"
        }
    },
    {
        "legalName": "TAFE NSW",
        "tradingName": "TAFE NSW",
        "organisationType": "training",
        "abn": "85759348895",
        "employer": null,
        "worksite": {
            "address": "120-124 La Perouse St, Griffith",
            "state": "ACT"
        }
    },
    {
        "legalName": "Australian National University",
        "tradingName": "ANU",
        "organisationType": "training",
        "abn": "52234063906",
        "employer": null,
        "worksite": {
            "address": "Acton",
            "state": "ACT"
        }
    },
    {
        "legalName": "Atlassian Pty Ltd",
        "tradingName": "Atlassian",
        "organisationType": "employer",
        "abn": "53102443916",
        "employer": {
            "employerId": "EMP005"
        },
        "worksite": {
            "address": "363 George St, Sydney",
            "state": "NSW"
        }
    }
];

function postOrganisation(org) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(org);
        const options = {
            hostname: 'localhost',
            port: 8080,
            path: '/api/v1/organisations',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    logger.info(`Successfully created organisation: ${org.legalName}`);
                    resolve(body);
                } else {
                    logger.error(`Failed to create organisation: ${org.legalName}. Status: ${res.statusCode}, Body: ${body}`);
                    reject(new Error(`Failed to create organisation: ${org.legalName}. Status: ${res.statusCode}`));
                }
            });
        });

        req.on('error', (error) => {
            logger.error(`Error creating organisation ${org.legalName}:`, error);
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

async function loadOrganisations() {
    logger.info('Checking if organisations need to be loaded...');
    
    const getOptions = {
        hostname: 'localhost',
        port: 8080,
        path: '/api/v1/organisations',
        method: 'GET'
    };

    const req = http.request(getOptions, async (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', async () => {
            if (res.statusCode === 200) {
                const existingOrgs = JSON.parse(body);
                if (existingOrgs.entries && existingOrgs.entries.length > 0) {
                    logger.info('Organisations already exist. Skipping data loading.');
                } else {
                    logger.info('No organisations found. Loading sample data...');
                    for (const org of organisations) {
                        try {
                            await postOrganisation(org);
                        } catch (error) {
                            // error is already logged in postOrganisation
                        }
                    }
                }
            } else {
                 logger.error(`Failed to get organisations. Status: ${res.statusCode}, Body: ${body}`);
            }
        });
    });

    req.on('error', (error) => {
        logger.error('Error checking for existing organisations:', error);
    });

    req.end();
}

module.exports = { loadOrganisations };
