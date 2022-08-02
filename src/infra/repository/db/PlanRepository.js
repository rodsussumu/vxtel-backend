const database = require("../../config/database");

const Plan = require("../../../domain/entities/Plan");

class PlanRepository {
  async getPlan(data) {
    try {
      return Plan.fromJSON(
        database.plans.find((plan) => plan.name == data.plan)
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PlanRepository;
