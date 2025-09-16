const http = require('http');
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const interactions = [
    {
        contactId: uuidv4(),
        profileId: uuidv4(),
        interactionType: 'EMAIL',
        payload: {
            subject: 'Meeting Reminder',
            body: 'Just a friendly reminder about our meeting tomorrow.'
        },
        createdAt: getRandomDate('2025-07-01T00:00:00Z', '2025-09-10T23:59:59Z'),
    },
    {
        contactId: uuidv4(),
        profileId: uuidv4(),
        interactionType: 'SMS',
        payload: {
            message: 'Your appointment is confirmed for 2 PM today.'
        },
        createdAt: getRandomDate('2025-07-01T00:00:00Z', '2025-09-10T23:59:59Z'),
    },
    {
        contactId: uuidv4(),
        profileId: uuidv4(),
        interactionType: 'CALL',
        payload: {
            duration: '10 minutes',
            notes: 'Discussed project progress and next steps.'
        },
        createdAt: getRandomDate('2025-07-01T00:00:00Z', '2025-09-10T23:59:59Z'),
    },
    {
        contactId: uuidv4(),
        profileId: uuidv4(),
        interactionType: 'REGISTER_INTEREST',
        payload: {
            course: 'Responsible Service of Alcohol',
            level: 'Vocational Training'
        },
        createdAt: getRandomDate('2025-07-01T00:00:00Z', '2025-09-10T23:59:59Z'),
    },
    {
        contactId: uuidv4(),
        profileId: uuidv4(),
        interactionType: 'REGISTER_INTEREST',
        payload: {
            course: 'First Aid Certificate',
            level: 'Vocational Training'
        },
        createdAt: getRandomDate('2025-07-01T00:00:00Z', '2025-09-10T23:59:59Z'),
    },
    {
        contactId: uuidv4(),
        profileId: uuidv4(),
        interactionType: 'REGISTER_INTEREST',
        payload: {
            course: 'Food Handling Certificate',
            level: 'Vocational Training'
        },
        createdAt: getRandomDate('2025-07-01T00:00:00Z', '2025-09-10T23:59:59Z'),
    }
];

function getRandomDate(start, end) {
    const startDate = new Date(start).getTime();
    const endDate = new Date(end).getTime();
    const randomTime = startDate + Math.random() * (endDate - startDate);
    return new Date(randomTime).toISOString();
}

function postInteraction(interaction) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(interaction);
        const options = {
            hostname: 'localhost',
            port: 8080,
            path: '/api/v1/interactions',
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
                    logger.info(`Successfully created interaction for contactId: ${interaction.contactId}`);
                    resolve(body);
                } else {
                    logger.error(`Failed to create interaction for contactId: ${interaction.contactId}. Status: ${res.statusCode}, Body: ${body}`);
                    reject(new Error(`Failed to create interaction for contactId: ${interaction.contactId}. Status: ${res.statusCode}`));
                }
            });
        });

        req.on('error', (error) => {
            logger.error(`Error creating interaction for contactId ${interaction.contactId}:`, error);
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

async function loadInteractions() {
    logger.info('Checking if interactions need to be loaded...');
    
    const getOptions = {
        hostname: 'localhost',
        port: 8080,
        path: '/api/v1/interactions',
        method: 'GET'
    };

    const req = http.request(getOptions, async (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', async () => {
            if (res.statusCode === 200) {
                const existingInteractions = JSON.parse(body);
                if (existingInteractions.entries && existingInteractions.entries.length > 0) {
                    logger.info('Interactions already exist. Skipping data loading.');
                } else {
                    logger.info('No interactions found. Loading sample data...');
                    for (const interaction of interactions) {
                        try {
                            await postInteraction(interaction);
                        } catch (error) {
                            // error is already logged in postInteraction
                        }
                    }
                }
            } else {
                 logger.error(`Failed to get interactions. Status: ${res.statusCode}, Body: ${body}`);
            }
        });
    });

    req.on('error', (error) => {
        logger.error('Error checking for existing interactions:', error);
    });

    req.end();
}

module.exports = { loadInteractions };