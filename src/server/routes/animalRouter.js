const Router = require("express");

const router = new Router();
const animalController = require("../controllers/animalController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/", animalController.getList); // all
router.get("/:animalId", animalController.getById); // all
router.post("/", checkRole(3), animalController.add); // content-manager
router.delete("/:animalId", checkRole(3), animalController.deleteById); // content-manager
router.put("/:animalId", checkRole(3), animalController.updateById); // content-manager

module.exports = router;
