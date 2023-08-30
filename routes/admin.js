const express = require('express');
const router = express.Router();
const {manageUser, userblogs} = require("../controllers/admin");

router.get("/manageuser", manageUser);
router.get("/userblogs", userblogs);




module.exports = router;