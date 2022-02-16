const express = require('express');
const router = express.Router();

// Import du controller
const projectCtrl = require('../controllers/project');

// Import des middlewares
const auth = require('../middlewares/auth');

// GET
router.get ('/test', projectCtrl.test);

// POST
router.post('/create/:identerprise', auth, projectCtrl.createProject);

module.exports = router;