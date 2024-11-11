const express = require('express');
const { registerUser, loginUser,getallUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/', getallUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);


module.exports = router;
