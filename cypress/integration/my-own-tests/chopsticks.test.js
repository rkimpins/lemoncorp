import React from "react";

<reference types="cypress" />

describe('Chopsticks', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/chopsticks');
	});
	const offset = 1; // accoutns for image in nav bar
	it('True is True test', () => {
		//throw new Error("Oops");
		expect(true).to.equal(true);
		//expect(true).to.equal(false);
	});
	it('Reset Game', () => {
		cy.contains(">>1>>").click();
		cy.get('[id=reset_game]').click();
		cy.get("img").eq(0 + offset).should("have.attr", "id", "1");
		cy.get("img").eq(1 + offset).should("have.attr", "id", "1");
		cy.get("img").eq(2 + offset).should("have.attr", "id", "1");
		cy.get("img").eq(3 + offset).should("have.attr", "id", "1");
	});
	it('Hands start with all 1s', () => {
		cy.get("img").eq(0 + offset).should("have.attr", "id", "1");
		cy.get("img").eq(1 + offset).should("have.attr", "id", "1");
		cy.get("img").eq(2 + offset).should("have.attr", "id", "1");
		cy.get("img").eq(3 + offset).should("have.attr", "id", "1");
	});
	it('Swap player 1 hand', () => {
		cy.contains(">>1>>").click();
		//cy.get("img").eq(1).should("have.attr", "src", "http://localhost:3000/images/counting_hands/2.png");
		cy.get("img").eq(0 + offset).should("have.attr", "id", "0");
		cy.get("img").eq(1 + offset).should("have.attr", "id", "2");
	});
	it('Swap player 2 hand', () => {
		cy.contains(">>1>>").click();
		cy.contains(">>1>>").click();
		cy.get("img").eq(2 + offset).should("have.attr", "id", "0");
		cy.get("img").eq(3 + offset).should("have.attr", "id", "2");
	});
	it('Select player 1 hand', () => {
		cy.get("img").eq(0 + offset).click();
		cy.get('[class^=Hand_Selected]')
	});
	it('Strike player 2 hand', () => {
		cy.get("img").eq(0 + offset).click();
		cy.get("img").eq(2 + offset).click();
		cy.get("img").eq(0 + offset).should("have.attr", "id", "1");
		cy.get("img").eq(1 + offset).should("have.attr", "id", "1");
		cy.get("img").eq(2 + offset).should("have.attr", "id", "2");
		cy.get("img").eq(3 + offset).should("have.attr", "id", "1");
	});
	const player2WinsMsg = "Player 2 wins!";
	const player1WinsMsg = "Player 1 wins!";
	it('Play until player 2 wins game over', () => {
		//strike, combine to 3, combine to 2, end game
		cy.get("img").eq(0 + offset).click();
		cy.get("img").eq(3 + offset).click();
		cy.contains(">>1>>").click();
		cy.contains(">>1>>").click();
		cy.get("img").eq(3 + offset).click();
		cy.get("img").eq(1 + offset).click();
		cy.contains(player2WinsMsg);
	});
	it('Play until player 1 wins game over', () => {
		//combine to 2, combine to 2, strike to 4, strike to 1, end game
		cy.contains("<<1<<").click();
		cy.contains("<<1<<").click();
		cy.get("img").eq(0 + offset).click();
		cy.get("img").eq(2 + offset).click();
		cy.get("img").eq(2 + offset).click();
		cy.get("img").eq(0 + offset).click();
		cy.get("img").eq(0 + offset).click();
		cy.get("img").eq(2 + offset).click();
		cy.contains(player1WinsMsg);
	});
})