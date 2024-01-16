// create.spec.js
describe('Create operation', () => {
  it('should update a new item', () => {
    cy.visit('http://127.0.0.1:8000/'); // Adjust the URL as per your application
    
    // Add your Cypress commands to interact with your application
    cy.get('#edit-0').click();
    cy.get('#name-input').type('New Item edit');
    cy.get('#desc-input').type('New Item');
    cy.get('input[type=file]').selectFile('./cypress/fixtures/BionicERD.png');
    cy.get('#save-button').click();
  });
});
