// server/routes/authRoutes.js
import express from 'express';
import {
    registrateNewUser,
    loginUser,
    logoutUser,
    getCurrentUser    // Neue Funktion hinzufügen
} from '../controllers/authController.js';
import {
    validateRegistration,
    validateLogin,
    handleValidationErrors
} from '../validators/authValidator.js';
import { verifyToken } from '../middleware/authMiddleware.js';  // Auth-Middleware

const router = express.Router();

// 📌 Registrierung
router.post('/register', validateRegistration, handleValidationErrors, registrateNewUser);

// 📌 Login
router.post('/login', validateLogin, handleValidationErrors, loginUser);

// 📌 Logout
router.post('/logout', logoutUser);

// 📌 Aktuellen Benutzer abrufen
router.get('/me', verifyToken, getCurrentUser);

export default router;