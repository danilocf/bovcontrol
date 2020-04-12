// https://docs.cypress.io/api/introduction/api.html

describe("everything", () => {
  it("add farm", () => {
    cy.visit("/");
    cy.contains("Settings").click();
    cy.get("#add").click();
    cy.get("#Name").type("test name");
    cy.get("#Owner").type("test owner");
    cy.get("#Address").type("test address");
    cy.get("#Latitude").type("test lat");
    cy.get("#Longitude").type("test long");
    cy.contains("Submit").click();
  });
});
