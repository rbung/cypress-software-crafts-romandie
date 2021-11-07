describe("User Sign-up and Login", function () {
  it("should redirect unauthenticated user to signin page", function () {
    cy.visit("/personal");
    cy.location("pathname").should("equal", "/signin");
  });

  it("should redirect to the home page after login", function () {
    cy.visit("/signin");
    cy.location("pathname").should("eq", "/signin");
    cy.findByLabelText(/username/i).type("Katharina_Bernier");
    cy.findByLabelText(/password/i).type("s3cret{enter}");

    cy.location("pathname").should("equal", "/");
  });

  it("should display login errors", function () {
    cy.visit("/signin");

    cy.findByLabelText(/username/i).blur();
    cy.findByText(/username is required/i).should("be.visible");

    cy.findByLabelText(/password/i)
      .type("abc")
      .blur();
    cy.findByText(/password must contain at least 4 characters/i).should("be.visible");

    cy.findByRole("button", { name: /sign in/i }).should("be.disabled");
  });

  it("should error for an invalid user", function () {
    cy.visit("/signin");
    cy.location("pathname").should("eq", "/signin");
    cy.findByLabelText(/username/i).type("invalidUserName");
    cy.findByLabelText(/password/i).type("invalidPa$$word{enter}");

    cy.findByRole("alert").should("be.visible").and("have.text", "Username or password is invalid");
  });

  it("should error for an invalid password for existing user", function () {
    cy.visit("/signin");
    cy.location("pathname").should("eq", "/signin");
    cy.findByLabelText(/username/i).type("Katharina_Bernier");
    cy.findByLabelText(/password/i).type("INVALID{enter}");

    cy.findByRole("alert").should("be.visible").and("have.text", "Username or password is invalid");
  });
});
