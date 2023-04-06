const Router = require("express");

const router = new Router();
const messageController = require("../controllers/messageController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", messageController.add); // all
router.get("/", checkRole(2), messageController.getList); // operator
router.get("/:messageId", checkRole(2), messageController.getById); // operator
router.patch(
  "/:messageId",
  checkRole(2),
  messageController.changeAnswerFlagById
); // operator

module.exports = router;
