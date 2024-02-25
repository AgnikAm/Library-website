const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');

router.post('/rejestracja', AuthController.signup)
router.post('/logowanie', AuthController.login)
router.post('/wylogowanie', AuthController.logout)

module.exports = router;