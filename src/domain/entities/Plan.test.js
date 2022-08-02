const Plan = require("./Plan");
const assert = require("assert");

describe("Test Plan", () => {
  describe("Valid plan", () => {
    it("Should have a valid name", async () => {
      const newPlan = new Plan();

      newPlan.name = "Meu novo plano 360";

      assert.ok(newPlan.isValid());
    });
  });

  describe("Invalid plan", () => {
    it("Should have a invalid name", async () => {
      const newPlan = new Plan();

      newPlan.name = "Plan";

      assert.ok(!newPlan.isValid());
      assert.deepEqual(newPlan.errors, { name: [{ isTooShort: 6 }] });
    });
  });
});
