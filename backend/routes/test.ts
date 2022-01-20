// @ts-ignore
const express = require('express');
const router = express.Router();
const testCtrl = require("../controllers/test");

//GET
router.get('/', testCtrl.test);

module.exports = router;