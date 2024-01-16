// create.spec.js
describe('Create operation', () => {
  it('should delete a new item', () => {
    cy.visit('http://127.0.0.1:8000/'); // Adjust the URL as per your application
    
    // Add your Cypress commands to interact with your application
    cy.get('#delete-0').click();
    cy.get('.swal2-confirm').click();
    cy.get('.swal2-confirm').click();
  });
});
