const express = require("express")
const router = express.Router();
const {create_user,get_all_users,user_login} = require("../controllers/user.js");



router.post("/",create_user);
router.get("/",get_all_users);
router.post("/login",user_login)


module.exports = router;