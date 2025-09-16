const http = require('http');
const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

const contacts = [
    {
        id: uuidv4(), // Changed from contactId to id as per openapi.yaml
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '0400111222',
        address: '123 Main St, Sydney NSW',
        organisationId: uuidv4(), // Assuming contacts can be linked to organisations
        profiles: [
            {
                id: uuidv4(),
                type: 'student',
                startedAt: '2023-01-01T09:00:00Z',
                isActive: true,
                profileInformation: {
                    course: 'Software Engineering',
                    studentId: 'S12345'
                }
            },
            {
                id: uuidv4(),
                type: 'employer contact',
                startedAt: '2022-05-10T09:00:00Z',
                isActive: true,
                profileInformation: {
                    company: 'Tech Solutions Inc.',
                    position: 'Hiring Manager'
                }
            }
        ]
    },
    {
        id: uuidv4(),
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '0400333444',
        address: '456 High St, Melbourne VIC',
        organisationId: uuidv4(),
        profiles: [
            {
                id: uuidv4(),
                type: 'parent/guardian',
                startedAt: '2021-03-15T09:00:00Z',
                isActive: true,
                profileInformation: {
                    childName: 'Billy Smith',
                    childDOB: '2015-07-20'
                }
            },
            {
                id: uuidv4(),
                type: 'volunteer',
                startedAt: '2023-09-01T09:00:00Z',
                isActive: true,
                profileInformation: {
                    area: 'Community Outreach'
                }
            }
        ]
    },
    {
        id: uuidv4(),
        firstName: 'Peter',
        lastName: 'Jones',
        email: 'peter.jones@example.com',
        phone: '0400555666',
        address: '789 Low St, Brisbane QLD',
        organisationId: uuidv4(),
        profiles: [
            {
                id: uuidv4(),
                type: 'student',
                startedAt: '2024-02-01T09:00:00Z',
                isActive: true,
                profileInformation: {
                    course: 'Data Science',
                    studentId: 'S67890'
                }
            },
            {
                id: uuidv4(),
                type: 'alumni',
                startedAt: '2018-01-01T09:00:00Z',
                completedAt: '2020-12-31T17:00:00Z',
                isActive: false,
                profileInformation: {
                    graduationYear: '2020'
                }
            }
        ]
    },
    {
        id: uuidv4(),
        firstName: 'Alice',
        lastName: 'Williams',
        email: 'alice.williams@example.com',
        phone: '0400777888',
        address: '10 Downing St, Canberra ACT',
        organisationId: uuidv4(),
        profiles: [
            {
                id: uuidv4(),
                type: 'jobseeker',
                startedAt: '2024-01-15T09:00:00Z',
                isActive: true,
                profileInformation: {
                    desiredRole: 'Project Manager',
                    experience: '5 years'
                }
            },
            {
                id: uuidv4(),
                type: 'mentor',
                startedAt: '2023-04-01T09:00:00Z',
                isActive: true,
                profileInformation: {
                    expertise: 'Leadership, Software Development'
                }
            }
        ]
    }
];

function postContact(contact) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(contact);
        const options = {
            hostname: 'localhost',
            port: 8080,
            path: '/api/v1/contacts',
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
                    logger.info(`Successfully created contact: ${contact.firstName} ${contact.lastName}`);
                    resolve(body);
                } else {
                    logger.error(`Failed to create contact: ${contact.firstName} ${contact.lastName}. Status: ${res.statusCode}, Body: ${body}`);
                    reject(new Error(`Failed to create contact: ${contact.firstName} ${contact.lastName}. Status: ${res.statusCode}`));
                }
            });
        });

        req.on('error', (error) => {
            logger.error(`Error creating contact ${contact.firstName} ${contact.lastName}:`, error);
            reject(error);
        });

        req.write(data);
        req.end();
    });
}

async function loadContacts() {
    logger.info('Checking if contacts need to be loaded...');

    const getOptions = {
        hostname: 'localhost',
        port: 8080,
        path: '/api/v1/contacts',
        method: 'GET'
    };

    const req = http.request(getOptions, async (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', async () => {
            if (res.statusCode === 200) {
                const existingContacts = JSON.parse(body);
                if (existingContacts.entries && existingContacts.entries.length > 0) {
                    logger.info('Contacts already exist. Skipping data loading.');
                } else {
                    logger.info('No contacts found. Loading sample data...');
                    for (const contact of contacts) {
                        try {
                            await postContact(contact);
                        } catch (error) {
                            // error is already logged in postContact
                        }
                    }
                }
            } else {
                 logger.error(`Failed to get contacts. Status: ${res.statusCode}, Body: ${body}`);
            }
        });
    });

    req.on('error', (error) => {
        logger.error('Error checking for existing contacts:', error);
    });

    req.end();
}

module.exports = { loadContacts };