const supertest = require('supertest');
const {expect} = require('chai');
const ExpressServer = require('../expressServer');
const path = require('path');
const {v4: uuidv4} = require('uuid');

// The openapi.yaml is in the api directory, so we need to construct the path to it.
const openApiYaml = path.join(__dirname, '../api/openapi.yaml');
const server = new ExpressServer(8081, openApiYaml);
const request = supertest(server.app);

describe('Contacts API', () => {
    before(async () => {
        // Create some contacts to test with
        const contact1 = {
            firstName: 'Test',
            lastName: 'One',
        };
        const contact2 = {
            firstName: 'Test',
            lastName: 'Two',
        };
        await request.post('/api/v1/contacts').send(contact1);
        await request.post('/api/v1/contacts').send(contact2);
    });

    it('should create a new contact', async () => {
        const newContact = {
            firstName: 'John',
            lastName: 'Doe',
        };

        const res = await request
            .post('/api/v1/contacts')
            .send(newContact)
            .expect(201);

        expect(res.body).to.be.an('object');
        let id = res.body.id;
        expect(id).to.be.a('string');
        expect(res.body.firstName).to.equal(newContact.firstName);
        expect(res.body.lastName).to.equal(newContact.lastName);
    });

    it('should get a contact by ID', async () => {
        // Create a new contact first
        const newContact = {
            firstName: 'Jane',
            lastName: 'Doe',
        };

        const createRes = await request
            .post('/api/v1/contacts')
            .send(newContact)
            .expect(201);

        const contactId = createRes.body.id;

        const getRes = await request
            .get(`/api/v1/contacts/${contactId}`)
            .expect(200);

        expect(getRes.body).to.be.an('object');
        expect(getRes.body.id).to.equal(contactId);
        expect(getRes.body.firstName).to.equal(newContact.firstName);
        expect(getRes.body.lastName).to.equal(newContact.lastName);
    });

    it('should get a list of contacts', async () => {
        const res = await request
            .get('/api/v1/contacts')
            .expect(200);

        expect(res.body).to.be.an('object');
        expect(res.body.entries).to.be.an('array');
        expect(res.body.entries.length).to.be.greaterThan(1);
        // check for the contacts created in the before() block
        expect(res.body.entries.some(c => c.lastName === 'One')).to.be.true;
        expect(res.body.entries.some(c => c.lastName === 'Two')).to.be.true;
    });
});