const { entity, field } = require("@herbsjs/herbs");

const Call = entity("Call", {
  origin: field(String, {
    validation: { presence: true, length: { minimum: 3 } },
  }),
  destination: field(String, {
    validation: { presence: true, length: { minimum: 3 } },
  }),
  duration: field(Number, {
    validation: { presence: true, numericality: { greaterThan: 0 } },
  }),
  plan: field(String, {
    validation: { presence: true, length: { minimum: 6 } },
  }),
});

module.exports = Call;
