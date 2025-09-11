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
      organisationType: 'School',
      abn: '12345678901',
    };

    const res = await request
      .post('/api/v1/organisations')
      .send(newOrganisation)
      .expect(201);

    expect(res.body).to.be.an('object');
    expect(res.body.legalName).to.equal(newOrganisation.legalName);
    expect(res.body.id).to.be.a('string');
    expect(res.body.organisationType).to.equal(newOrganisation.organisationType);
    organisationId = res.body.id;
  });

  it('should get the newly created organisation', async () => {
    const res = await request
      .get(`/api/v1/organisations/${organisationId}`)
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body.id).to.equal(organisationId);
  });

  it('should bulk create organisations', async () => {
    const organisationsToCreate = [
      {
        legalName: 'Bulk Org 1',
        tradingName: 'BO1',
        organisationType: 'University',
        abn: '11111111111',
      },
      {
        legalName: 'Bulk Org 2',
        tradingName: 'BO2',
        organisationType: 'College',
        abn: '22222222222',
      },
      {
        legalName: 'Bulk Org 3',
        tradingName: 'BO3',
        organisationType: 'School',
        abn: '33333333333',
      },
    ];

    const res = await request
      .post('/api/v1/organisations/bulk')
      .send(organisationsToCreate)
      .expect(201);

    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(3);

    const createdOrgIds = [];
    res.body.forEach((org, index) => {
      expect(org).to.be.an('object');
      expect(org.legalName).to.equal(organisationsToCreate[index].legalName);
      expect(org.tradingName).to.equal(organisationsToCreate[index].tradingName);
      expect(org.organisationType).to.equal(organisationsToCreate[index].organisationType);
      expect(org.abn).to.equal(organisationsToCreate[index].abn);
      expect(org.id).to.be.a('string');
      createdOrgIds.push(org.id);
    });

    const allExpectedOrgIds = [organisationId, ...createdOrgIds];

    const getRes = await request
      .get('/api/v1/organisations')
      .expect(200);

    expect(getRes.body.entries).to.be.an('array');
    expect(getRes.body.entries).to.have.lengthOf(allExpectedOrgIds.length);

    const retrievedOrgIds = getRes.body.entries.map(org => org.id);
    allExpectedOrgIds.forEach(id => {
      expect(retrievedOrgIds).to.include(id);
    });
  });
});
