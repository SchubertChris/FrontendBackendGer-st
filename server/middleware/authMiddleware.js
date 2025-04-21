// server/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Token aus dem Cookie holen
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: '❌ Nicht autorisiert: Kein Token vorhanden' });
    }

    try {
        // Token verifizieren
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Decoded-Daten dem Request-Objekt hinzufügen, damit nachfolgende Middleware darauf zugreifen kann
        req.user = decoded;

        // Weiter zur nächsten Middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: '❌ Nicht autorisiert: Ungültiges Token' });
    }
};