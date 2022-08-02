const { Ok, usecase, step, ifElse, Err } = require("@herbsjs/herbs");
const TaxRepository = require("../../infra/repository/db/TaxRepository");
const PlanRepository = require("../../infra/repository/db/PlanRepository");
const Call = require("../entities/Call");

const dependency = {
  TaxRepository,
  PlanRepository,
};

const getValueCall = (injection) =>
  usecase("Get call cost per plan and area code", {
    request: {
      origin: String,
      destination: String,
      duration: Number,
      plan: String,
    },

    response: Call,

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    "validating request": step(async (ctx) => {
      const request = new Call();
      request.origin = ctx.req.origin;
      request.destination = ctx.req.destination;
      request.duration = ctx.req.duration;
      request.plan = ctx.req.plan;

      if (!request.isValid()) {
        console.log(request.errors);
        return Err(request.errors);
      }
    }),

    "Get tax by origin and destination": step(async (ctx) => {
      const taxRepo = new ctx.di.TaxRepository(ctx.di);
      ctx.ret.tax = await taxRepo.getTax(ctx.req);
    }),

    "Get plan by name": step(async (ctx) => {
      const planRepo = new ctx.di.PlanRepository(ctx.di);
      ctx.ret.plan = await planRepo.getPlan(ctx.req);
    }),

    "Verify origin and destination": ifElse({
      "Verify if origin and destination are valid": step(async (ctx) => {
        const { tax } = ctx.ret;
        const taxValid = tax.valuePerMinute > 0;
        return Ok(taxValid);
      }),

      "If tax found": step(async (ctx) => {
        const { tax, plan } = ctx.ret;
        const { duration } = ctx.req;

        const spareTime = duration - plan.time;
        const costWithoutPlan = duration * tax.valuePerMinute;

        let costWithPlan;
        spareTime > 0
          ? (costWithPlan =
              spareTime * tax.valuePerMinute +
              spareTime * tax.valuePerMinute * 0.1)
          : (costWithPlan = 0);

        ctx.ret.cost = {
          origin: ctx.req.origin,
          destination: ctx.req.destination,
          duration: ctx.req.duration,
          plan: ctx.req.plan,
          costWithPlan,
          costWithoutPlan,
        };

        return Ok();
      }),

      "If tax not found": step(async (ctx) => {
        ctx.ret.cost = {
          origin: ctx.req.origin,
          destination: ctx.req.destination,
          duration: ctx.req.duration,
          plan: ctx.req.plan,
          costWithPlan: "-",
          costWithoutPlan: "-",
        };
        return Ok();
      }),
    }),
  });

module.exports = getValueCall;
