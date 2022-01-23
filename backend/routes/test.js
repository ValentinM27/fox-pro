const express = require('express');
const router = express.Router();

// Import du controller
const testCtrl = require('../controllers/test')

// GET
router.get('/', testCtrl.test);

module.exports = router;