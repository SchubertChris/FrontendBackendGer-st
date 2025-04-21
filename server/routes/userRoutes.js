// server/routes/userRoutes.js
import express from 'express';
import { registrateNewUser } from '../controllers/authController.js';
import { loginUser } from '../controllers/authController.js';
import { validateRegistration, validateLogin, handleValidationErrors } from '../validators/authValidator.js'; // Validator importieren
import { logoutUser } from '../controllers/authController.js';

const router = express.Router();

// ✅ Nur lokale Route, der rest wird im Controller gemacht
router.post('/register', validateRegistration, handleValidationErrors, registrateNewUser); // Validierung und Fehlerbehandlung für Registrierung
router.post('/login', validateLogin, handleValidationErrors, loginUser); // Validierung und Fehlerbehandlung für Login
router.post('/logout', logoutUser); // Logout-Route

export default router; // ✅ Exportieren
