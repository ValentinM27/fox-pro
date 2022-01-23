const express = require('express');
const router = express.Router();

// Import du controller
const personCtrl = require('../controllers/person');

// Import des middlewares
const uuidGenerator = require('../middlewares/uuidGenerator');
const testPassword = require('../middlewares/testPassword');
// GET
router.get('/', personCtrl.test);

// POST
router.post('/register', testPassword, uuidGenerator,personCtrl.register);
router.post('/login', personCtrl.login);

module.exports = router;