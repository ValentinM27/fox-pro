const express = require('express');
const router = express.Router();

// Import du controller
const commentCtrl = require('../controllers/comment');

// Import des middlewares
const auth = require('../middlewares/auth');

// GET 
router.get('/test', commentCtrl.test);
router.get('/retrieve/:identerprise/:idproject', auth, commentCtrl.getComment);

// POST 
router.post('/create/:idproject', auth, commentCtrl.createComment);

// DELETE 
router.delete('/delete/:idcomment', auth, commentCtrl.deleteComment);

module.exports = router;