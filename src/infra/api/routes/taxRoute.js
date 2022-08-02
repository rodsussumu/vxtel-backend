const { Router } = require("express");
const TaxController = require("../controllers/TaxController");

const routes = new Router();
/**
 * @swagger
 * /tarifa:
 *  post:
 *    tags: [tarifa]
 *    description:
 *    responses:
 *      '200':
 *        description: Obtém custo de chamada da api falemais
 *    parameters:
 *         - name: origin
 *           in: body
 *           description:
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               duration:
 *                 type: number
 *               plan:
 *                 type: string
 *
 */
routes.post("/tarifa", TaxController.getValueCall);

module.exports = routes;
