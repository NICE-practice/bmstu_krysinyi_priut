const Router = require("express");

const router = new Router();
const donationController = require("../controllers/donationController");

router.post("/", donationController.add);

module.exports = router;
