const express = require("express")
const router = express.Router();
const {create_cert,get_all_cert,get_cert,delete_cert,update_cert} = require("../controllers/cert.js");



router.post("/",create_cert);
router.get("/",get_all_cert);
router.get("/:certId",get_cert);
router.delete("/:rollNo",delete_cert);
router.patch("/:rollNo",update_cert)

module.exports = router;