const Tax = require("./Tax");
const assert = require("assert");

describe("Test Tax", () => {
  describe("Valid Tax", () => {
    it("Should have origin and destination valid", async () => {
      const newTax = new Tax();

      newTax.origin = "012";
      newTax.destination = "013";
      newTax.valuePerMinute = "2.3";

      assert.ok(newTax.isValid());
    });
  });

  describe("Invalid Tax", () => {
    it("Should have a invalid origin", async () => {
      const newTax = new Tax();

      newTax.origin = "12";
      newTax.destination = "013";
      newTax.valuePerMinute = "2.3";

      assert.ok(!newTax.isValid());
      assert.deepEqual(newTax.errors, { origin: [{ isTooShort: 3 }] });
    });

    it("Deve possuir um destino inválido", async () => {
      const newTax = new Tax();

      newTax.origin = "012";
      newTax.destination = "13";
      newTax.valuePerMinute = "2.3";

      assert.ok(!newTax.isValid());
      assert.deepEqual(newTax.errors, { destination: [{ isTooShort: 3 }] });
    });

    it("Deve possuir um valor obrigatorio", async () => {
      const newTax = new Tax();

      newTax.origin = "012";
      newTax.destination = "013";
      newTax.valuePerMinute = "";

      assert.ok(!newTax.isValid());
      assert.deepEqual(newTax.errors, {
        valuePerMinute: [{ cantBeEmpty: true }],
      });
    });
  });
});
