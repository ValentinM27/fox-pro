const express = require('express');
const router = express.Router();

// Import du controller
const testCtrl = require('../controllers/test')
const auth = require('../middlewares/auth')

// GET
router.get('/', testCtrl.test);
router.get('/authorization', auth, testCtrl.testAuth);

module.exports = router;