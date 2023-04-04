const Router = require("express");

const router = new Router();
const userRouter = require("./userRouter");
const animalRouter = require("./animalRouter");
const donationRouter = require("./donationRouter");

router.use("/user", userRouter);
router.use("/animal", animalRouter);
router.use("/donation", donationRouter);

module.exports = router;
