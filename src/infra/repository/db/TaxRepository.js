const database = require("../../config/database");

const Tax = require("../../../domain/entities/Tax");

class TaxRepository {
  async getTax(data) {
    try {
      const taxDb = database.taxes.find(
        (tax) =>
          tax.origin === data.origin && tax.destination === data.destination
      );
      if (!taxDb) {
        return Tax.fromJSON({
          origin: data.origin,
          destination: data.destination,
          valuePerMinute: "-",
        });
      }
      return Tax.fromJSON(taxDb);
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = TaxRepository;
