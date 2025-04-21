import { check, validationResult } from 'express-validator'; // express-validator verwenden

// Validierungen für Registrierung und Login
export const validateRegistration = [
    check('userName')
        .notEmpty().withMessage('Benutzername ist erforderlich')
        .isLength({ min: 3 }).withMessage('Benutzername muss mindestens 3 Zeichen lang sein'),

    check('email')
        .isEmail().withMessage('Ungültige E-Mail-Adresse')
        .normalizeEmail(), // E-Mail normalisieren (z. B. Kleinbuchstaben)

    check('password')
        .isLength({ min: 6 }).withMessage('Passwort muss mindestens 6 Zeichen lang sein')
        .matches(/\d/).withMessage('Passwort muss mindestens eine Zahl enthalten') // Zahlen im Passwort
        .matches(/[A-Z]/).withMessage('Passwort muss mindestens einen Großbuchstaben enthalten'), // Ein Großbuchstabe
];

// Validierungen für Login
export const validateLogin = [
    check('email')
        .isEmail().withMessage('Ungültige E-Mail-Adresse'),

    check('password')
        .notEmpty().withMessage('Passwort ist erforderlich'),
];

// Überprüfen der Validierungsergebnisse
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Fehler zurückgeben
    }
    next(); // Falls keine Fehler, weitermachen
};


