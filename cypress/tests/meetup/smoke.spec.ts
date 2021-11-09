import { isMobile } from "../../support/utils";

describe("smoke tests", () => {
  it("should pass all the steps", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/signin");
    cy.get("#username").type("Katharina_Bernier");
    cy.get("#password").type("s3cret{enter}");

    cy.location("pathname").should("eq", "/");
    if (isMobile()) {
      cy.get("[data-test=sidenav-toggle").click();
    }
    cy.get("[data-test=sidenav-home] ").should("be.visible");
    cy.get("[data-test=sidenav-user-settings] ").should("be.visible");
    cy.get("[data-test=sidenav-bankaccounts] ").should("be.visible");
    cy.get("[data-test=sidenav-notifications]").should("be.visible");
    cy.get("[data-test*=transaction-sender]").should("have.length.gt", 0);

    if (isMobile()) {
      cy.get("[data-test=sidenav-home] ").click();
    }
    cy.get("[data-test=nav-contacts-tab]").click();
    cy.get("[data-test*=transaction-sender]").should("have.length.gt", 0);

    cy.get("[data-test=nav-personal-tab]").click();
    cy.get("[data-test*=transaction-sender]").should("have.length.gt", 0);

    if (isMobile()) {
      cy.get("[data-test=sidenav-toggle").click();
    }
    cy.get("[data-test=sidenav-user-settings] ").click();
    cy.get("[data-test=user-settings-firstName-input]").should("not.have.value", "");
    cy.get("[data-test=user-settings-lastName-input]").should("not.have.value", "");
    cy.get("[data-test=user-settings-email-input]").should("not.have.value", "");
    cy.get("[data-test=user-settings-phoneNumber-input]").should("not.have.value", "");

    if (isMobile()) {
      cy.get("[data-test=sidenav-toggle").click();
    }
    cy.get("[data-test=sidenav-signout]").click();
    cy.location("pathname").should("eq", "/signin");
  });
});
