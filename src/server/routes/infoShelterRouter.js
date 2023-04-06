const Router = require("express");

const router = new Router();
const infoShelterController = require("../controllers/infoShelterController");

router.get("/", infoShelterController.get);

module.exports = router;
