const express = require('express');
const router = express.Router();

// Import du controller
const enterpriseCtrl = require('../controllers/enterprise');

// Import des middlewares
const auth = require('../middlewares/auth');

// GET
router.get('/test', enterpriseCtrl.test);
router.get('/id/:identerprise', enterpriseCtrl.getByID);
router.get('/retrieve', auth, enterpriseCtrl.getByCurrentUser);
router.get('/user/:user', enterpriseCtrl.getByID_PERSON_);
router.get('/ispart', auth, enterpriseCtrl.getEnterprisesIn);
router.get('/employees/:identerprise', auth, enterpriseCtrl.getEmployees);

// POST
router.post('/create', auth, enterpriseCtrl.create);
router.post('/join/:identerprise', auth, enterpriseCtrl.addToEnterprise);

// UPDATE OVER POST
router.post('/update/:identerprise', auth, enterpriseCtrl.update);

// DELETE 
router.delete('/delete/:identerprise', auth, enterpriseCtrl.delete);
router.delete('/employees/delete/:identerprise/:idemp', auth, enterpriseCtrl.deleteFromEnt);

module.exports = router;