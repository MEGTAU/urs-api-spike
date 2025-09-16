const supertest = require('supertest');
const {expect} = require('chai');
const ExpressServer = require('../expressServer');
const path = require('path');
const {v4: uuidv4} = require('uuid');

// The openapi.yaml is in the api directory, so we need to construct the path to it.
const openApiYaml = path.join(__dirname, '../api/openapi.yaml');
const server = new ExpressServer(8081, openApiYaml);
const request = supertest(server.app);

describe('Interactions API', () => {



    it('should create a new interaction', async () => {
        const newInteraction = {
            contactId: uuidv4(),
            profileId: uuidv4(),
            interactionType: 'EMAIL',
            payload: {
                message: 'This is a single test interaction',
            },
        };

        const res = await request
            .post('/api/v1/interactions')
            .send(newInteraction)
            .expect(201);

        expect(res.body).to.be.an('object');
        expect(res.body.id).to.be.a('string');
        expect(res.body.contactId).to.equal(newInteraction.contactId);
        expect(res.body.profileId).to.equal(newInteraction.profileId);
        expect(res.body.interactionType).to.equal(newInteraction.interactionType);
        expect(res.body.payload.message).to.equal(newInteraction.payload.message);
    });


    it('should bulk create interactions', async () => {
        const interactionsToCreate = [
            {
                contactId: uuidv4(),
                profileId: uuidv4(),
                interactionType: 'SMS',
                payload: {
                    message: 'This is a test interaction 1',
                },
            },
            {
                contactId: uuidv4(),
                profileId: uuidv4(),
                interactionType: 'CALL',
                payload: {
                    message: 'This is a test interaction 2',
                },
            },
            {
                contactId: uuidv4(),
                profileId: uuidv4(),
                interactionType: 'EMAIL',
                payload: {
                    message: 'This is a test interaction 3',
                },
            },
        ];

        const res = await request
            .post('/api/v1/interactions/bulk')
            .send(interactionsToCreate)
            .expect(201);

        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(3);

        res.body.forEach((interaction, index) => {
            expect(interaction).to.be.an('object');
            expect(interaction.contactId).to.equal(interactionsToCreate[index].contactId);
            expect(interaction.profileId).to.equal(interactionsToCreate[index].profileId);
            expect(interaction.interactionType).to.equal(interactionsToCreate[index].interactionType);
            expect(interaction.payload.message).to.equal(interactionsToCreate[index].payload.message);
        });
    });

  it('should get all interactions', async () => {
    const res = await request
      .get('/api/v1/interactions')
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body.entries).to.be.an('array');
    expect(res.body.entries).to.have.lengthOf.at.least(1); // At least one interaction from previous tests
  });
});
