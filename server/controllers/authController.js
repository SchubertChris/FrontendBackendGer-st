// server/controllers/authController.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require('bcrypt');

// Login Funktion
const loginUser = async (req, res) => {
    try {
        console.log('Login-Anfrage erhalten:', req.body.email);
        const { email, password } = req.body;

        // Überprüfen, ob der Benutzer existiert
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Login fehlgeschlagen: Benutzer existiert nicht:', email);
            return res.status(400).json({ message: '❌ Benutzer existiert nicht!' });
        }

        // Überprüfen, ob das Passwort korrekt ist
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log('Login fehlgeschlagen: Falsches Passwort für', email);
            // Keine spezifische Rückmeldung, dass das Passwort falsch ist, um die Sicherheit zu erhöhen.
            return res.status(400).json({ message: '❌ Ungültige Anmeldeinformationen!' });
        }

        // JWT Token erstellen und den userName und userId mit einfügen
        const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: '1min' } // Ablaufzeit des Tokens
        );

        // Setze das Cookie mit httpOnly, Secure, SameSite Optionen
        res.cookie('token', token, {
            httpOnly: true,     // Verhindert, dass das Cookie im Browser zugänglich ist
            secure: process.env.NODE_ENV === 'production', // Nur über HTTPS in Produktion
            // Verhindert, dass Cookies bei Cross-Site Requests gesendet werden
            maxAge: 60000     // Gültigkeit des Cookies: 1 Minute (in Millisekunden)
        });

        console.log('Login erfolgreich:', email);
        // Antwort senden, ohne das Passwort zurückzugeben
        return res.status(200).json({
            message: '✅ Erfolgreich eingeloggt!',
            user: { userName: user.userName, email: user.email }
        });
    } catch (error) {
        console.error('Fehler beim Login:', error.message);
        return res.status(500).json({ message: `❌ Fehler beim Login: ${error.message}` });
    }
};

// Registrierungsfunktion
const registrateNewUser = async (req, res) => {
    try {
        console.log('Registrierungsanfrage erhalten:', req.body);

        const { userName, email, password } = req.body;

        // Überprüfen, ob der Benutzer bereits existiert
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Registrierung fehlgeschlagen: Benutzer existiert bereits:', email);
            return res.status(400).json({ message: '❌ Benutzer existiert bereits!' });
        }

        // Passwort hashen
        console.log('Hashing Passwort...');
        const hashedPassword = await bcrypt.hash(password, 10); // 10 Runden Salting

        // Neuen Benutzer erstellen
        console.log('Erstelle neuen Benutzer...');
        const newUser = new User({
            userName,
            email,
            password: hashedPassword, // Gespeichertes Passwort ist gehasht
            // Die anderen Felder sind jetzt optional und müssen hier nicht angegeben werden
        });

        // Benutzer speichern
        console.log('Speichere Benutzer in Datenbank...');
        await newUser.save();

        console.log('Benutzer erfolgreich registriert:', email);
        return res.status(201).json({ message: '✅ Benutzer erfolgreich registriert!' });
    } catch (error) {
        console.error('Fehler bei der Registrierung:', error.message);
        console.error('Vollständiger Fehler:', error);
        return res.status(500).json({ message: `❌ Fehler bei der Registrierung: ${error.message}` });
    }
};

// Logout-Funktion
const logoutUser = (req, res) => {
    try {
        console.log('Logout-Anfrage erhalten');
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        });
        console.log('Logout erfolgreich');
        return res.status(200).json({ message: '👋 Erfolgreich ausgeloggt!' });
    } catch (error) {
        console.error('Fehler beim Logout:', error.message);
        return res.status(500).json({ message: `❌ Fehler beim Logout: ${error.message}` });
    }
};

// Aktuellen Benutzer abrufen
const getCurrentUser = async (req, res) => {
    try {
        console.log('Anfrage für aktuellen Benutzer erhalten');
        // req.user wurde bereits durch die verifyToken-Middleware gesetzt
        const user = await User.findById(req.user.userId).select('-password');

        if (!user) {
            console.log('Benutzer nicht gefunden:', req.user.userId);
            return res.status(404).json({ message: '❌ Benutzer nicht gefunden!' });
        }

        console.log('Aktueller Benutzer gefunden:', user.email);
        return res.status(200).json({
            user: {
                userName: user.userName,
                email: user.email,
                // Weitere Felder können hier zurückgegeben werden
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    } catch (error) {
        console.error('Fehler beim Abrufen des Benutzers:', error.message);
        return res.status(500).json({ message: '❌ Fehler beim Abrufen des Benutzers!' });
    }
};

export { loginUser, registrateNewUser, logoutUser, getCurrentUser };