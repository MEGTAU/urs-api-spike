const supertest = require('supertest');
const { expect } = require('chai');
const ExpressServer = require('../expressServer');
const path = require('path');

// The openapi.yaml is in the api directory, so we need to construct the path to it.
const openApiYaml = path.join(__dirname, '../api/openapi.yaml');
const server = new ExpressServer(8081, openApiYaml);
const request = supertest(server.app);

describe('Organisations API', () => {
  let organisationId;

  it('should create a new organisation', async () => {
    const newOrganisation = {
      legalName: 'Test Corp',
      tradingName: 'Test Corp',
      abn: '12345678901',
    };

    const res = await request
      .post('/api/v1/organisations')
      .send(newOrganisation)
      .expect(201);

    expect(res.body).to.be.an('object');
    expect(res.body.legalName).to.equal(newOrganisation.legalName);
    expect(res.body.id).to.be.a('string');
    organisationId = res.body.id;
  });

  it('should get the newly created organisation', async () => {
    const res = await request
      .get(`/api/v1/organisations/${organisationId}`)
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(organisationId);
  });
});
