const router = require("express").Router();
const { auth } = require("../middleware/auth");
const { authAdmin } = require("../middleware/authAdmin");
const userCtrl = require("../controllers/userCtrl");
router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activeEmail);
router.post("/login", userCtrl.login);
router.get("/refresh_token", userCtrl.refeshToken);
router.post("/forgot", userCtrl.forgotPassword);
router.post("/reset", auth, userCtrl.resetPassword);
router.post("/update", auth, userCtrl.updateUser);
router.post("/update_role/:id", auth, authAdmin, userCtrl.updateUsersRole);
router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUser);
router.get("/infor", auth, userCtrl.getInforUser);
router.get("/logout", userCtrl.logout);
router.get("/all_infor", auth, authAdmin, userCtrl.getUserAllInfor);
router.get("/all_infor", auth, authAdmin, userCtrl.getUserAllInfor);

module.exports = router;
