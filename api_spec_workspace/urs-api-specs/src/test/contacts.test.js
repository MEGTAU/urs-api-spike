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
});
