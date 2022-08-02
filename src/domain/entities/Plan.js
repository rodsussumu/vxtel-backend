const { entity, field } = require("@herbsjs/herbs");

const Plan = entity("Plan", {
  name: field(String, {
    validation: { presence: true, length: { minimum: 6 } },
  }),
  time: field(Number),
});

module.exports = Plan;
