# Universal Relationship Service API

API for the Universal Relationship Service, providing a unified view of contacts and their relationships.

Individual operations are provided for contact sub-resources to provide a simple mechanism to edit data without having to deal with the entire contact object.

Bulk operations have been included for contact sub-resources that may be generated using a batch extract or analysis process.

The API is structured to be implemented gradually. For example, external system integrations will be implemented after the first release. An HTTP 501 (Not implemented) response will be returned for API methods that are not yet implemented.

### **Multiple Roles per Contact**

This API supports the fact that an individual may act in different capacities through time. Therefore each contact has a number of `profiles`, such as `student`, `parent/guardian`, or `employer contact` associated with it.

The API supports well-known attributes used by multiple profile-types, as well as a generic JSON attributes that are used to store information that is specific to the profile type.

### **Usage of Upsert Approach**

The upsert approach is used to either create or update records like contacts or organisations. This pattern uses a single **PUT** request to either create a new resource or update an existing one.

*   **Creation or Update:**
    *   If the record does not exist, the server creates a new record. The response should be a `201 Created` status code.
    *   If the record does exist, the server updates the existing record with the new data. The response should be a `200 OK` or `204 No Content` status code.

**Advantages:**
*   Simpler Client Logic: The client doesn't need to perform a preliminary `GET` request to check for the resource's existence. It can simply use a single `PUT` request.
*   Idempotent: The `PUT` method is **idempotent**, meaning that multiple identical requests will have the same effect as a single request. This is a key principle of RESTful design.

## Getting Started

### Installation

To install the required dependencies, run the following command:

```bash
npm install
```

### Running the server

To start the server, run the following command:

```bash
npm start
```

The server will start on port 8080.

## API Documentation

The API documentation is available through Swagger UI at the following URL:

[http://localhost:8080/api-docs](http://localhost:8080/api-docs)

The OpenAPI specification can be found at:

[http://localhost:8080/openapi](http://localhost:8080/openapi)

## API Endpoints

The main API endpoints are:

*   `/contacts`: Manage contacts.
*   `/organisations`: Manage organisations.
*   `/relationships`: Manage relationships between contacts.
*   `/interactions`: Manage interactions with contacts.

For detailed information about the available endpoints and their usage, please refer to the API documentation.

## Running Tests

To run the test suite, use the following command:

```bash
npm test
```
