// server/server.js
import express from 'express';
import "dotenv/config";
import cors from 'cors';
import connectDB from './db.js'; // 💾 Verbindung importieren
import userRoutes from './routes/userRoutes.js'; // ✅ Benutzer-Routen importieren
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(cors({ // ✅ CORS aktivieren
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://candlescope-dashboard.de'], // Frontend-URLs
    credentials: true, // Wichtig für Cookies, damit sie gesendet werden
}));

app.use(express.json()); // ✅ JSON-Daten verarbeiten
app.use(cookieParser()); // 🔐 Cookies auslesen
app.use(express.urlencoded({ extended: true }));

// Routen
app.use('/api/auth', authRoutes); // ⬅️ Prefix für Authentifizierung
app.use('/api/users', userRoutes); // ✅ API-Route für Benutzer-Routen

// Test-Route
app.get('/', (req, res) => {
    res.send('Hallo von der Server-Seite!');
});

// Error-Handling Middleware
app.use((err, req, res, next) => {
    console.error('Server-Fehler:', err.stack);
    res.status(500).json({
        message: '❌ Serverfehler aufgetreten!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Server starten
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅ Server läuft auf Port ${PORT}`);
});

// 📡 Datenbankverbindung herstellen
connectDB();

// Diese Datei ist der Einstiegspunkt für den Server. Hier wird der Server konfiguriert, Middleware hinzugefügt und die Routen definiert.