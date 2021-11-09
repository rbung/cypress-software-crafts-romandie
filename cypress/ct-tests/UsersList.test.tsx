/// <reference types="@testing-library/cypress" />
import { mount } from "@cypress/react";
import UsersList from "../../src/components/UsersList";
import { DefaultPrivacyLevel } from "../../src/models";

it("renders learn react link", () => {
  const user1 = {
    id: "id1",
    uuid: "uuid1",
    firstName: "John",
    lastName: "Doe",
    username: "johnny",
    password: "an awesomoe password",
    email: "john.doe@email.com",
    phoneNumber: "phoneNumber",
    balance: 1234,
    avatar: "https://gravatar.com/avatar/ce3dd702e9d24e1bc1f4a869894fa0be?s=400&d=robohash&r=x",
    defaultPrivacyLevel: DefaultPrivacyLevel.public,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  const user2 = {
    id: "id2",
    uuid: "uuid2",
    firstName: "Jane",
    lastName: "Doe",
    username: "jane",
    password: "an awesomoe password",
    email: "jane.doe@email.com",
    phoneNumber: "phoneNumber",
    balance: 1234,
    avatar: "https://gravatar.com/avatar/ce3dd702e9d24e1bc1f4a869894fa0be?s=400&d=monsterid&r=x",
    defaultPrivacyLevel: DefaultPrivacyLevel.public,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };
  mount(<UsersList users={[user1, user2]} setReceiver={() => {}} />);

  cy.contains("John Doe").should("be.visible");
  cy.contains("Jane Doe").should("be.visible");
  cy.findAllByRole("listitem").should("have.length", 2);
});
