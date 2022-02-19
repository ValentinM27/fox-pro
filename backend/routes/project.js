const express = require('express');
const router = express.Router();

// Import du controller
const projectCtrl = require('../controllers/project');

// Import des middlewares
const auth = require('../middlewares/auth');

// GET
router.get ('/test', projectCtrl.test);
router.get('/enterprise/:identerprise', auth, projectCtrl.getProjectsByIDenterprise);
router.get('/:identerprise/:idproject', auth, projectCtrl.getProjectByID)

// POST
router.post('/create/:identerprise', auth, projectCtrl.createProject);
router.post('/update/:identerprise/:idproject', auth, projectCtrl.updateProject)

// DELETE 
router.delete('/delete/:identerprise/:idproject', auth, projectCtrl.deleteProject);

module.exports = router;