erDiagram
    Contact {
        string id PK
        string firstName
        string middleName
        string lastName
        datetime createdAt
        datetime lastSeenAt
        string USI
        string LUI
        string TFN
        string VSN
        string WorkReadyParticipantNumber
        string SACEStudentID
    }

    Organisation {
        string id PK
        string name
        string type
        string description
    }

    Interaction {
        string id PK
        string contactId FK
        string profileId FK
        string interactionType
        datetime createdAt
        string description
    }

    Relationship {
        string id PK
        string type
        datetime createdAt
        datetime lastConfirmAt
        datetime endedAt
    }

    ContactInformation {
        string id PK
        string contactId FK
        string type
        string value
        boolean validated
        datetime createdAt
        datetime lastConfirmAt
    }

    Profile {
        string id PK
        string contactId FK
        string type
        datetime startedAt
        datetime completedAt
        boolean isActive
        json profileInformation
        array organisations
    }

    Document {
        string id PK
        string contactId FK
        string type
        string link
        datetime createdAt
    }

    Analysis {
        string id PK
        string contactId FK
        string type
        json results
        datetime createdAt
    }

    SystemLink {
        string id PK
        string contactId FK
        string system
        string type
        string systemId
        string link
    }

    CommunicationPreference {
        string id PK
        string contactId FK
        string channel
        boolean allowed
        boolean preferred
    }

    RelationshipParty {
        string relationshipId PK, FK
        string contactId PK, FK
        string role
    }

    ProfileOrganisation {
        string profileId PK, FK
        string organisationId PK, FK
    }

    Contact ||--o{ ContactInformation : "has"
    Contact ||--o{ Profile : "has"
    Contact ||--o{ Document : "has"
    Contact ||--o{ Analysis : "has"
    Contact ||--o{ SystemLink : "has"
    Contact ||--o{ CommunicationPreference : "has"
    Contact ||--o{ Interaction : "has"

    Interaction }o--|| Profile : "relates to"

    Relationship ||--o{ RelationshipParty : "involves"
    RelationshipParty }o--|| Contact : "party"

    Profile ||--o{ ProfileOrganisation : "has"
    Organisation ||--o{ ProfileOrganisation : "belongs to"
