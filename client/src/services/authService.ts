// client/src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // API-URL für Authentifizierung

// Benutzer registrieren
export const registerUser = async (userName: string, email: string, password: string) => {
    const response = await axios.post(
        `${API_URL}/register`,
        { userName, email, password },
        { withCredentials: true } // Wichtig für Cookies
    );
    return response.data; // Daten zurückgeben
};

// Benutzer einloggen
export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true } // Wichtig für Cookies
    );
    return response.data; // Daten zurückgeben
};

// Benutzer ausloggen
export const logoutUser = async () => {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return response.data;
};

// Aktuellen Benutzer abrufen
export const getCurrentUser = async () => {
    const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return response.data;
};