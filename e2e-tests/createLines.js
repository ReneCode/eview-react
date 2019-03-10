describe("createLines", () => {
  it("one Line", () => {
    cy.visit("/");
    cy.get("svg").trigger("mousedown", 100, 50);
    cy.get("svg").trigger("mousemove", 200, 150);
    // rubberband should be blue
    cy.get("svg > line").should("have.attr", "stroke", "blue");

    cy.get("svg").trigger("mouseup", 210, 130);
    cy.get("svg > line").should("have.attr", "x1", "100");
    cy.get("svg > line").should("have.attr", "y1", "50");
    cy.get("svg > line").should("have.attr", "x2", "210");
    cy.get("svg > line").should("have.attr", "y2", "130");
    // final line should be black
    cy.get("svg > line").should("have.attr", "stroke", "black");
  });

  it("more Lines", () => {
    cy.visit("/");
    const svg = cy.get("svg");
    for (let i = 0; i < 10; i++) {
      svg.trigger("mousedown", getRandom(600), getRandom(400));
      svg.trigger("mousemove", getRandom(600), getRandom(400));
      svg.trigger("mouseup", getRandom(600), getRandom(400));
    }
    // there should be 10 lines
    cy.get("svg > line").should("have.length", 10);
  });
});

const getRandom = max => {
  return Math.floor(Math.random() * max);
};
