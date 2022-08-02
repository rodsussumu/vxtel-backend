const assert = require("assert");
const getValueCall = require("./GetValueCall");

describe("Test get value call", async () => {
  describe("Valid call", () => {
    it("Should return a value call with plan and without plan", async () => {
      const request = {
        origin: "011",
        destination: "017",
        duration: 60,
        plan: "FaleMais 30",
      };

      const planObject = { id: "1", name: "FaleMais 30", time: 30 };
      const taxObject = {
        id: "3",
        origin: "011",
        destination: "017",
        valuePerMinute: 1.7,
      };

      const injection = {
        TaxRepository: class {
          getTax(data) {
            return taxObject;
          }
        },
        PlanRepository: class {
          getPlan(data) {
            return planObject;
          }
        },
      };

      const uc = getValueCall(injection);
      const ret = await uc.run(request);

      const expectedResponse = {
        origin: "011",
        destination: "017",
        duration: 60,
        plan: "FaleMais 30",
        costWithPlan: 56.1,
        costWithoutPlan: 102,
      };

      assert.ok(ret.isOk);
      assert.deepEqual(expectedResponse, ret.ok.cost);
    });

    it("Should return a value call with plan 0", async () => {
      const request = {
        origin: "011",
        destination: "017",
        duration: 30,
        plan: "FaleMais 30",
      };

      const planObject = { id: "1", name: "FaleMais 30", time: 30 };
      const taxObject = {
        id: "3",
        origin: "011",
        destination: "017",
        valuePerMinute: 1.7,
      };

      const injection = {
        TaxRepository: class {
          getTax(data) {
            return taxObject;
          }
        },
        PlanRepository: class {
          getPlan(data) {
            return planObject;
          }
        },
      };

      const uc = getValueCall(injection);
      const ret = await uc.run(request);

      const expectedResponse = {
        origin: "011",
        destination: "017",
        duration: 30,
        plan: "FaleMais 30",
        costWithPlan: 0,
        costWithoutPlan: 51,
      };

      console.log(ret);
      assert.ok(ret.isOk);
      assert.deepEqual(expectedResponse, ret.ok.cost);
    });
  });

  describe("Invalid plan", () => {
    it("Should return - when plan is not found", async () => {
      const request = {
        origin: "018",
        destination: "017",
        duration: 60,
        plan: "FaleMais 30",
      };

      const planObject = { id: "1", name: "FaleMais 30", time: 30 };
      const taxObject = {
        origin: "018",
        destination: "017",
        valuePerMinute: "-",
      };

      const injection = {
        TaxRepository: class {
          getTax(data) {
            return taxObject;
          }
        },
        PlanRepository: class {
          getPlan(data) {
            return planObject;
          }
        },
      };

      const uc = getValueCall(injection);
      const ret = await uc.run(request);

      const expectedResponse = {
        origin: "018",
        destination: "017",
        duration: 60,
        plan: "FaleMais 30",
        costWithPlan: "-",
        costWithoutPlan: "-",
      };

      assert.ok(ret.isOk);
      assert.deepEqual(expectedResponse, ret.ok.cost);
    });

    it("Should return error on origin", async () => {
      const request = {
        origin: "01",
        destination: "017",
        duration: 60,
        plan: "FaleMais 30",
      };

      const injection = {
        TaxRepository: class {
          getTax(data) {
            return taxObject;
          }
        },
        PlanRepository: class {
          getPlan(data) {
            return planObject;
          }
        },
      };

      const uc = getValueCall(injection);
      const ret = await uc.run(request);

      assert.ok(ret.isErr);
      assert.deepStrictEqual(ret._error.origin[0], { isTooShort: 3 });
    });

    it("Should return error on destination", async () => {
      const request = {
        origin: "011",
        destination: "01",
        duration: 60,
        plan: "FaleMais 30",
      };

      const injection = {
        TaxRepository: class {
          getTax(data) {
            return taxObject;
          }
        },
        PlanRepository: class {
          getPlan(data) {
            return planObject;
          }
        },
      };

      const uc = getValueCall(injection);
      const ret = await uc.run(request);

      assert.ok(ret.isErr);
      assert.deepStrictEqual(ret._error.destination[0], { isTooShort: 3 });
    });

    it("Should return error on duration", async () => {
      const request = {
        origin: "011",
        destination: "017",
        duration: -1,
        plan: "FaleMais 30",
      };

      const injection = {
        TaxRepository: class {
          getTax(data) {
            return taxObject;
          }
        },
        PlanRepository: class {
          getPlan(data) {
            return planObject;
          }
        },
      };

      const uc = getValueCall(injection);
      const ret = await uc.run(request);

      assert.ok(ret.isErr);
      assert.deepStrictEqual(ret._error.duration[0], { notGreaterThan: 0 });
    });

    it("Should return error on plan", async () => {
      const request = {
        origin: "011",
        destination: "017",
        duration: 60,
        plan: "Plano",
      };

      const injection = {
        TaxRepository: class {
          getTax(data) {
            return taxObject;
          }
        },
        PlanRepository: class {
          getPlan(data) {
            return planObject;
          }
        },
      };

      const uc = getValueCall(injection);
      const ret = await uc.run(request);

      assert.ok(ret.isErr);
      assert.deepStrictEqual(ret._error.plan[0], { isTooShort: 6 });
    });
  });
});
