// create.spec.js
describe('Create operation', () => {
  it('should create a new item', () => {
    cy.visit('http://127.0.0.1:8000/'); // Adjust the URL as per your application
    
    // Add your Cypress commands to interact with your application
    cy.get('#create-button').click();
    cy.get('#name-input').type('New Item');
    cy.get('#desc-input').type('New Item');
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('file contents'),
      fileName: 'BionicERD.png',
      lastModified: Date.now(),
    });
    cy.get('#save-button').click();
  });
});
