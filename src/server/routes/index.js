const Router = require("express");

const router = new Router();
const userRouter = require("./userRouter");
const animalRouter = require("./animalRouter");

router.use("/user", userRouter);
router.use("/animal", animalRouter);

module.exports = router;
