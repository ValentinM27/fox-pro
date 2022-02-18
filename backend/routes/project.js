const express = require('express');
const router = express.Router();

// Import du controller
const projectCtrl = require('../controllers/project');

// Import des middlewares
const auth = require('../middlewares/auth');

// GET
router.get ('/test', projectCtrl.test);
router.get('/enterprise/:identerprise', auth, projectCtrl.getProjectsByIDenterprise);

// POST
router.post('/create/:identerprise', auth, projectCtrl.createProject);

// DELETE 
router.delete('/delete/:identerprise/:idproject', auth, projectCtrl.deleteProject);

module.exports = router;