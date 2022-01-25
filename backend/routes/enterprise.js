const express = require('express');
const router = express.Router();

// Import du controller
const enterpriseCtrl = require('../controllers/enterprise');

// Import des middlewares
const auth = require('../middlewares/auth');

// GET
router.get('/test', enterpriseCtrl.test);
router.get('/id/:id', enterpriseCtrl.getByID);
router.get('/retrieve', auth, enterpriseCtrl.getByCurrentUser);
router.get('/user/:user', auth, enterpriseCtrl.getByID_PERSON_);

// POST
router.post('/create', auth, enterpriseCtrl.create);

// UPDATE OVER POST

// DELETE 

module.exports = router;