document.getElementById("defaultOpen").click();

    function openTab(evt, cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    let organisationData = []; // To store fetched organisations
    let interactionData = []; // To store fetched interactions
    let relationshipData = []; // To store fetched relationships
    let contactData = []; // To store fetched contacts

    function downloadCSV(data, filename) {
        const csvRows = [];
        // Get the headers
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Loop over the rows
        for (const row of data) {
            const values = headers.map(header => {
                let value = '' + row[header]; // Ensure value is a string
                const needsQuotes = value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r');
                value = value.replace(/"/g, '""'); // Escape double quotes
                if (needsQuotes) {
                    return `"${value}"`;
                } else {
                    return value;
                }
            });
            csvRows.push(values.join(','));
        }

        const blob = new Blob([csvRows.join('\n')], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function parseCSV(csv) {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g).map(h => h.trim().replace(/^"|"$/g, ''));

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i]) continue;
            const obj = {};
            // handle commas within quoted fields. TODO replace with a library
            const currentline = lines[i].match(/(?:^|,)(?:"((?:[^"]|"")*)"|([^",\r\n]*))/g);
            if (!currentline) continue;
            for (let j = 0; j < headers.length; j++) {
                // TODO this was just a quick fix to the incorrect regex provided by a quick search. Use a proper CSV parser library
                let s = currentline[j].trim().replace(/^"|"$/g, '').replace(/""/g, '"').replace(/^,/, '').replace(/^"/g, '');
                obj[headers[j]] = s;
            }
            result.push(obj);
        }
        return result;
    }


    function uploadCSV(file, onUpload) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            const data = parseCSV(text);
            onUpload(data);
        };
        reader.readAsText(file);
    }

    async function importOrganisations(file) {
        if (!file) return;

        uploadCSV(file, async (organisations) => {
            // The CSV data is flattened, we need to un-flatten it to match the API
            const unflattenedData = organisations.map(org => ({
                legalName: org.legalName,
                tradingName: org.tradingName,
                organisationType: org.organisationType,
                abn: org.abn,
                employer: org.employerId ? {employerId: org.employerId} : null,
                worksite: (org.worksiteAddress || org.worksiteState) ? {
                    address: org.worksiteAddress,
                    state: org.worksiteState
                } : null
            }));

            try {
                const response = await fetch('/api/v1/organisations/bulk', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(unflattenedData)
                });

                if (response.ok) {
                    alert('Organisations imported successfully!');
                    fetchOrganisations(); // Refresh the table
                } else {
                    const error = await response.json();
                    alert('Error importing organisations: ' + (error.message || 'Unknown error'));
                    console.error('Error importing organisations:', error);
                }
            } catch (error) {
                alert('Error importing organisations: ' + error.message);
                console.error('Error importing organisations:', error);
            }
        });
    }

    async function exportOrganisations() {
        // We can use the already fetched data. If not available, fetch it.
        if (organisationData.length === 0) {
            await fetchOrganisations();
        }

        // Flatten the data for CSV export
        const flattenedData = organisationData.map(org => ({
            id: org.id,
            legalName: org.legalName,
            tradingName: org.tradingName,
            organisationType: org.organisationType,
            abn: org.abn,
            employerId: org.employer ? org.employer.employerId : '',
            worksiteAddress: org.worksite ? org.worksite.address : '',
            worksiteState: org.worksite ? org.worksite.state : ''
        }));

        downloadCSV(flattenedData, 'organisations.csv');
    }

    async function fetchOrganisations() {
        const organisationsTable = document.querySelector('#organisations-table tbody');
        try {
            const response = await fetch('/api/v1/organisations');
            if (response.ok) {
                const organisationList = await response.json();
                organisationData = organisationList.entries; // Store the data

                // Clear existing rows
                organisationsTable.innerHTML = '';

                organisationData.forEach(org => {
                    const row = organisationsTable.insertRow();
                    row.insertCell().textContent = org.id;
                    row.insertCell().textContent = org.legalName;
                    row.insertCell().textContent = org.tradingName;
                    row.insertCell().textContent = org.organisationType;
                    row.insertCell().textContent = org.abn;
                    row.insertCell().textContent = org.employer ? org.employer.employerId : '';
                    row.insertCell().textContent = org.worksite ? org.worksite.address : '';
                    row.insertCell().textContent = org.worksite ? org.worksite.state : '';
                });
            }
        } catch (error) {
            console.error('Error fetching organisations:', error);
        }
    }

    async function importInteractions(file) {
        alert('Interactions!');
        if (!file) return;

        uploadCSV(file, async (interactions) => {
            const interactionsToImport = interactions.map(interaction => ({
                createdAt: interaction.createdAt,
                contactId: interaction.contactId,
                profileId: interaction.profileId,
                interactionType: interaction.interactionType,
                payload: JSON.parse(interaction.payload) // Assuming payload is a JSON string in the CSV
            }));

            try {
                const response = await fetch('/api/v1/interactions/bulk', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(interactionsToImport)
                });

                if (response.ok) {
                    alert('Interactions imported successfully!');
                    fetchInteractions(); // Refresh the table
                } else {
                    const error = await response.json();
                    alert('Error importing interactions: ' + (error.message || 'Unknown error'));
                    console.error('Error importing interactions:', error);
                }
            } catch (error) {
                alert('Error importing interactions: ' + error.message);
                console.error('Error importing interactions:', error);
            }
        });
    }

    async function exportInteractions() {
        if (interactionData.length === 0) {
            await fetchInteractions();
        }

        const dataToExport = interactionData.map(interaction => ({
            id: interaction.id,
            createdAt: interaction.createdAt,
            contactId: interaction.contactId,
            profileId: interaction.profileId,
            interactionType: interaction.interactionType,
            payload: JSON.stringify(interaction.payload)
        }));

        downloadCSV(dataToExport, 'interactions.csv');
    }

    async function fetchInteractions() {
        const interactionsTable = document.querySelector('#interactions-table tbody');
        try {
            const response = await fetch('/api/v1/interactions');
            if (response.ok) {
                const interactionList = await response.json();
                interactionData = interactionList.entries; // Store the data

                // Clear existing rows
                interactionsTable.innerHTML = '';

                interactionData.forEach(interaction => {
                    const row = interactionsTable.insertRow();
                    row.insertCell().textContent = interaction.id;
                    row.insertCell().textContent = interaction.createdAt;
                    row.insertCell().textContent = interaction.contactId;
                    row.insertCell().textContent = interaction.profileId;
                    row.insertCell().textContent = interaction.interactionType;
                    row.insertCell().textContent = JSON.stringify(interaction.payload);
                });
            }
        } catch (error) {
            console.error('Error fetching interactions:', error);
        }
    }

    async function importRelationships(file) {
        if (!file) return;

        uploadCSV(file, async (relationships) => {
            const relationshipsToImport = relationships.map(relationship => ({
                createdAt: relationship.createdAt,
                lastConfirmAt: relationship.lastConfirmAt,
                endedAt: relationship.endedAt,
                primaryParty: relationship.primaryParty,
                relatedParties: relationship.relatedParties.split('|'), // Assuming they are pipe-separated in the CSV
                type: relationship.type
            }));

            try {
                const response = await fetch('/api/v1/relationships/bulk', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(relationshipsToImport)
                });

                if (response.ok) {
                    alert('Relationships imported successfully!');
                    fetchRelationships(); // Refresh the table
                } else {
                    const error = await response.json();
                    alert('Error importing relationships: ' + (error.message || 'Unknown error'));
                    console.error('Error importing relationships:', error);
                }
            } catch (error) {
                alert('Error importing relationships: ' + error.message);
                console.error('Error importing relationships:', error);
            }
        });
    }

    async function exportRelationships() {
        if (relationshipData.length === 0) {
            await fetchRelationships();
        }

        const dataToExport = relationshipData.map(relationship => ({
            id: relationship.id,
            createdAt: relationship.createdAt,
            lastConfirmAt: relationship.lastConfirmAt,
            endedAt: relationship.endedAt,
            primaryParty: relationship.primaryParty,
            relatedParties: relationship.relatedParties.join('|'), // Pipe-separate for CSV
            type: relationship.type
        }));

        downloadCSV(dataToExport, 'relationships.csv');
    }

    async function fetchRelationships() {
        const relationshipsTable = document.querySelector('#relationships-table tbody');
        try {
            const response = await fetch('/api/v1/relationships');
            if (response.ok) {
                const relationshipList = await response.json();
                relationshipData = relationshipList.entries; // Store the data

                // Clear existing rows
                relationshipsTable.innerHTML = '';

                relationshipData.forEach(relationship => {
                    const row = relationshipsTable.insertRow();
                    row.insertCell().textContent = relationship.id;
                    row.insertCell().textContent = relationship.createdAt;
                    row.insertCell().textContent = relationship.lastConfirmAt;
                    row.insertCell().textContent = relationship.endedAt;
                    row.insertCell().textContent = relationship.primaryParty;
                    row.insertCell().textContent = relationship.relatedParties.join(', ');
                    row.insertCell().textContent = relationship.type;
                });
            }
        } catch (error) {
            console.error('Error fetching relationships:', error);
        }
    }

    async function exportContacts() {
        if (contactData.length === 0) {
            await fetchContacts();
        }

        const flattenedData = [];
        contactData.forEach(contact => {
            if (contact.profiles && contact.profiles.length > 0) {
                contact.profiles.forEach(profile => {
                    flattenedData.push({
                        contactId: contact.id,
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        email: contact.email,
                        phone: contact.phone,
                        createdAt: contact.createdAt,
                        lastSeenAt: contact.lastSeenAt,
                        USI: contact.USI,
                        LUI: contact.LUI,
                        TFN: contact.TFN,
                        VSN: contact.VSN,
                        WorkReadyParticipantNumber: contact.WorkReadyParticipantNumber,
                        SACEStudentId: contact.SACEStudentId,
                        profileId: profile.id,
                        profileType: profile.type,
                        startedAt: profile.startedAt,
                        completedAt: profile.completedAt,
                        isActive: profile.isActive,
                        profileInformation: JSON.stringify(profile.profileInformation)
                    });
                });
            } else {
                flattenedData.push({
                    contactId: contact.id,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    email: contact.email,
                    phone: contact.phone,
                    createdAt: contact.createdAt,
                    lastSeenAt: contact.lastSeenAt,
                    USI: contact.USI,
                    LUI: contact.LUI,
                    TFN: contact.TFN,
                    VSN: contact.VSN,
                    WorkReadyParticipantNumber: contact.WorkReadyParticipantNumber,
                    SACEStudentId: contact.SACEStudentId,
                    profileId: '',
                    profileType: '',
                    startedAt: '',
                    completedAt: '',
                    isActive: '',
                    profileInformation: ''
                });
            }
        });

        downloadCSV(flattenedData, 'contacts.csv');
    }

    async function exportAnalyses() {
        if (contactData.length === 0) {
            await fetchContacts();
        }

        const flattenedData = [];
        contactData.forEach(contact => {
            if (contact.analyses && contact.analyses.length > 0) {
                contact.analyses.forEach(analysis => {
                    flattenedData.push({
                        contactId: contact.id,
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        analysisId: analysis.id,
                        analysisType: analysis.type,
                        analysisDate: analysis.date,
                        analysisResult: JSON.stringify(analysis.result),
                        analysisNotes: analysis.notes
                    });
                });
            } else {
                // Include contacts with no analyses, but with empty analysis fields
                flattenedData.push({
                    contactId: contact.id,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    analysisId: '',
                    analysisType: '',
                    analysisDate: '',
                    analysisResult: '',
                    analysisNotes: ''
                });
            }
        });
        downloadCSV(flattenedData, 'analyses.csv');
    }

    async function fetchContacts() {
        const contactsTable = document.querySelector('#contacts-table tbody');
        try {
            const response = await fetch('/api/v1/contacts');
            if (response.ok) {
                const contactList = await response.json();
                contactData = contactList.entries; // Store the data

                // Clear existing rows
                contactsTable.innerHTML = '';

                contactData.forEach(contact => {
                    const numProfiles = contact.profiles ? contact.profiles.length : 0;

                    if (numProfiles === 0) {
                        const row = contactsTable.insertRow();
                        row.insertCell().textContent = contact.id;
                        row.insertCell().textContent = contact.firstName;
                        row.insertCell().textContent = contact.lastName;
                        row.insertCell().textContent = contact.email;
                        row.insertCell().textContent = contact.phone;
                        row.insertCell().textContent = contact.createdAt;
                        row.insertCell().textContent = contact.lastSeenAt;
                        row.insertCell().textContent = contact.USI;
                        row.insertCell().textContent = contact.LUI;
                        row.insertCell().textContent = contact.TFN;
                        row.insertCell().textContent = contact.VSN;
                        row.insertCell().textContent = contact.WorkReadyParticipantNumber;
                        row.insertCell().textContent = contact.SACEStudentId;
                        row.insertCell().textContent = ''; // No profile ID
                        row.insertCell().textContent = ''; // No profile Type
                        row.insertCell().textContent = ''; // No startedAt
                        row.insertCell().textContent = ''; // No completedAt
                        row.insertCell().textContent = ''; // No isActive
                        row.insertCell().textContent = ''; // No profileInformation
                        row.insertCell().textContent = ''; // No organisations
                    } else {
                        contact.profiles.forEach((profile, index) => {
                            const row = contactsTable.insertRow();
                            if (index === 0) {
                                // For the first profile, add contact details with rowspan
                                const idCell = row.insertCell();
                                idCell.textContent = contact.id;
                                idCell.rowSpan = numProfiles;

                                const firstNameCell = row.insertCell();
                                firstNameCell.textContent = contact.firstName;
                                firstNameCell.rowSpan = numProfiles;

                                const lastNameCell = row.insertCell();
                                lastNameCell.textContent = contact.lastName;
                                lastNameCell.rowSpan = numProfiles;

                                const emailCell = row.insertCell();
                                emailCell.textContent = contact.email;
                                emailCell.rowSpan = numProfiles;

                                const phoneCell = row.insertCell();
                                phoneCell.textContent = contact.phone;
                                phoneCell.rowSpan = numProfiles;

                                const createdAtCell = row.insertCell();
                                createdAtCell.textContent = contact.createdAt;
                                createdAtCell.rowSpan = numProfiles;

                                const lastSeenAtCell = row.insertCell();
                                lastSeenAtCell.textContent = contact.lastSeenAt;
                                lastSeenAtCell.rowSpan = numProfiles;

                                const USICell = row.insertCell();
                                USICell.textContent = contact.USI;
                                USICell.rowSpan = numProfiles;

                                const LUICell = row.insertCell();
                                LUICell.textContent = contact.LUI;
                                LUICell.rowSpan = numProfiles;

                                const TFNCell = row.insertCell();
                                TFNCell.textContent = contact.TFN;
                                TFNCell.rowSpan = numProfiles;

                                const VSNCell = row.insertCell();
                                VSNCell.textContent = contact.VSN;
                                VSNCell.rowSpan = numProfiles;

                                const WRPNCell = row.insertCell();
                                WRPNCell.textContent = contact.WorkReadyParticipantNumber;
                                WRPNCell.rowSpan = numProfiles;

                                const SACECell = row.insertCell();
                                SACECell.textContent = contact.SACEStudentId;
                                SACECell.rowSpan = numProfiles;
                            }
                            // Add profile details for every profile
                            row.insertCell().textContent = profile.id;
                            row.insertCell().textContent = profile.type;
                            row.insertCell().textContent = profile.startedAt;
                            row.insertCell().textContent = profile.completedAt;
                            row.insertCell().textContent = profile.isActive;
                            row.insertCell().textContent = JSON.stringify(profile.profileInformation);
                            row.insertCell().textContent = profile.organisations ? profile.organisations.join(', ') : '';
                        });
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    }

    async function fetchAnalyses() {
        const analysesTable = document.querySelector('#analyses-table tbody');
        analysesTable.innerHTML = ''; // Clear existing rows

        contactData.forEach(contact => {
            const numAnalyses = contact.analyses ? contact.analyses.length : 0;

            if (numAnalyses === 0) {
                // If no analyses, still show contact info with empty analysis fields
                const row = analysesTable.insertRow();
                row.insertCell().textContent = contact.id;
                row.insertCell().textContent = contact.firstName;
                row.insertCell().textContent = contact.lastName;
                row.insertCell().textContent = ''; // Analysis ID
                row.insertCell().textContent = ''; // Type
                row.insertCell().textContent = ''; // Date
                row.insertCell().textContent = ''; // Result
                row.insertCell().textContent = ''; // Notes
            } else {
                contact.analyses.forEach((analysis, index) => {
                    const row = analysesTable.insertRow();
                    if (index === 0) {
                        // For the first analysis, add contact details with rowspan
                        const idCell = row.insertCell();
                        idCell.textContent = contact.id;
                        idCell.rowSpan = numAnalyses;

                        const firstNameCell = row.insertCell();
                        firstNameCell.textContent = contact.firstName;
                        firstNameCell.rowSpan = numAnalyses;

                        const lastNameCell = row.insertCell();
                        lastNameCell.textContent = contact.lastName;
                        lastNameCell.rowSpan = numAnalyses;
                    }
                    // Add analysis details for every analysis
                    row.insertCell().textContent = analysis.id;
                    row.insertCell().textContent = analysis.type;
                    row.insertCell().textContent = analysis.date;
                    row.insertCell().textContent = JSON.stringify(analysis.result);
                    row.insertCell().textContent = analysis.notes;
                });
            }
        });
    }

    async function fetchSystemLinks() {
        const systemLinksTable = document.querySelector('#system-links-table tbody');
        systemLinksTable.innerHTML = ''; // Clear existing rows

        contactData.forEach(contact => {
            const numSystemLinks = contact.systemLinks ? contact.systemLinks.length : 0;

            if (numSystemLinks === 0) {
                // If no system links, still show contact info with empty system link fields
                const row = systemLinksTable.insertRow();
                row.insertCell().textContent = contact.id;
                row.insertCell().textContent = contact.firstName;
                row.insertCell().textContent = contact.lastName;
                row.insertCell().textContent = ''; // System Link ID
                row.insertCell().textContent = ''; // System Name
                row.insertCell().textContent = ''; // System ID
                row.insertCell().textContent = ''; // URL
            } else {
                contact.systemLinks.forEach((systemLink, index) => {
                    const row = systemLinksTable.insertRow();
                    if (index === 0) {
                        // For the first system link, add contact details with rowspan
                        const idCell = row.insertCell();
                        idCell.textContent = contact.id;
                        idCell.rowSpan = numSystemLinks;

                        const firstNameCell = row.insertCell();
                        firstNameCell.textContent = contact.firstName;
                        firstNameCell.rowSpan = numSystemLinks;

                        const lastNameCell = row.insertCell();
                        lastNameCell.textContent = contact.lastName;
                        lastNameCell.rowSpan = numSystemLinks;
                    }
                    // Add system link details for every system link
                    row.insertCell().textContent = systemLink.id;
                    row.insertCell().textContent = systemLink.systemName;
                    row.insertCell().textContent = systemLink.systemId;
                    row.insertCell().textContent = systemLink.url;
                });
            }
        });
    }

    async function exportSystemLinks() {
        if (contactData.length === 0) {
            await fetchContacts();
        }

        const flattenedData = [];
        contactData.forEach(contact => {
            if (contact.systemLinks && contact.systemLinks.length > 0) {
                contact.systemLinks.forEach(systemLink => {
                    flattenedData.push({
                        contactId: contact.id,
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        systemLinkId: systemLink.id,
                        systemName: systemLink.systemName,
                        systemId: systemLink.systemId,
                        url: systemLink.url
                    });
                });
            } else {
                // Include contacts with no system links, but with empty system link fields
                flattenedData.push({
                    contactId: contact.id,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    systemLinkId: '',
                    systemName: '',
                    systemId: '',
                    url: ''
                });
            }
        });
        downloadCSV(flattenedData, 'system_links.csv');
    }

    document.addEventListener('DOMContentLoaded', () => {
        fetchOrganisations();
        fetchInteractions();
        fetchRelationships();
        fetchContacts().then(() => {
            fetchAnalyses(); // Call fetchAnalyses after contacts are fetched
            fetchSystemLinks(); // Call fetchSystemLinks after contacts are fetched
        });
    });
