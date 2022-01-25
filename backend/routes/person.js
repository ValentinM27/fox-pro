const express = require('express');
const router = express.Router();

// Import du controller
const personCtrl = require('../controllers/person');

// Import des middlewares
const uuidGenerator = require('../middlewares/uuidGenerator');
const idPersonGenerator = require('../middlewares/idPersonGenerator');
const testPassword = require('../middlewares/testPassword');
const auth = require('../middlewares/auth');

// GET
router.get('/', personCtrl.test);
router.get('/data', auth, personCtrl.retrieveDate);
router.get('/search/name/:name', personCtrl.searchUser);

// POST
router.post('/register', testPassword, idPersonGenerator, uuidGenerator, personCtrl.register);
router.post('/login', personCtrl.login);

// UPDATE OVER POST
router.post('/password/update', testPassword, auth, personCtrl.changePassword);
router.post('/email/update', auth, personCtrl.changeEmail);
router.post('/update', auth, personCtrl.updateUser);

// DELETE
router.delete('/delete', auth, personCtrl.delete);

module.exports = router;