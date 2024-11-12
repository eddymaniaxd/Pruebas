const express = require('express');
const { registerUser, loginUser,getallUsers } = require('../controllers/userController');
const router = express.Router();
const authMiddleware=require ('../middlewares/authMiddleware');

router.get('/',authMiddleware, getallUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;
