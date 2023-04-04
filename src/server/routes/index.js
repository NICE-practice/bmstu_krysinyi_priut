const Router = require("express");

const router = new Router();
const userRouter = require("./userRouter");
const animalRouter = require("./animalRouter");
const donationRouter = require("./donationRouter");
const infoShelterRouter = require("./infoShelterRouter");

router.use("/user", userRouter);
router.use("/animal", animalRouter);
router.use("/donation", donationRouter);
router.use("/infoShelter", infoShelterRouter);

module.exports = router;
