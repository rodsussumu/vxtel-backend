const getValueCall = require("../../../domain/usecases/GetValueCall");

class TaxController {
  async getValueCall(req, res) {
    try {
      const ucgetValueCall = getValueCall();
      const parameters = {
        origin: req.body.origin,
        destination: req.body.destination,
        duration: req.body.duration,
        plan: req.body.plan,
      };

      const caseResponse = await ucgetValueCall.run(parameters);

      if (caseResponse.isErr) {
        logger.error(caseResponse);
        return res.status(400).json(caseResponse.err);
      }

      return res.json(caseResponse.ok.cost);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new TaxController();
