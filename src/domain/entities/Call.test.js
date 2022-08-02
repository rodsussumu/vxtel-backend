const Call = require("./Call");
const assert = require("assert");

describe("Test Call", () => {
  describe("Valid call", () => {
    it("Should have all parameters valid", async () => {
      const newCall = new Call();

      newCall.origin = "011";
      newCall.destination = "017";
      newCall.duration = 80;
      newCall.plan = "FaleMais 60";

      assert.ok(newCall.isValid());
    });
  });

  describe("Invalid Call", () => {
    it("Should have a invalid origin", async () => {
      const newCall = new Call();

      newCall.origin = "11";
      newCall.destination = "017";
      newCall.duration = 80;
      newCall.plan = "FaleMais 60";

      assert.ok(!newCall.isValid());
      assert.deepEqual(newCall.errors, { origin: [{ isTooShort: 3 }] });
    });

    it("Should have a invalid destination", async () => {
      const newCall = new Call();

      newCall.origin = "011";
      newCall.destination = "17";
      newCall.duration = 80;
      newCall.plan = "FaleMais 60";

      assert.ok(!newCall.isValid());
      assert.deepEqual(newCall.errors, { destination: [{ isTooShort: 3 }] });
    });

    it("Should have a negative duration", async () => {
      const newCall = new Call();

      newCall.origin = "011";
      newCall.destination = "017";
      newCall.duration = -1;
      newCall.plan = "FaleMais 60";

      assert.ok(!newCall.isValid());
      assert.deepEqual(newCall.errors, {
        duration: [{ notGreaterThan: false }],
      });
    });

    it("Should have a invalid plan name", async () => {
      const newCall = new Call();

      newCall.origin = "011";
      newCall.destination = "017";
      newCall.duration = 80;
      newCall.plan = "Plano";

      assert.ok(!newCall.isValid());
      assert.deepEqual(newCall.errors, { plan: [{ isTooShort: 6 }] });
    });
  });
});
