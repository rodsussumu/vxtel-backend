const { entity, field } = require("@herbsjs/herbs");

const Tax = entity("Tax", {
  origin: field(String, {
    validation: { presence: true, length: { minimum: 3 } },
  }),
  destination: field(String, {
    validation: { presence: true, length: { minimum: 3 } },
  }),
  valuePerMinute: field(String, {
    validation: { presence: true },
  }),
});

module.exports = Tax;
