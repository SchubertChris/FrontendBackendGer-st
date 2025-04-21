// client/src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Typen definieren
interface User {
    userName: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    checkAuth: () => Promise<boolean>;
    logout: () => Promise<void>;
}

// Kontext erstellen
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    loading: true,
    checkAuth: async () => false,
    logout: async () => { },
});

// Provider-Komponente
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Beim ersten Laden prüfen, ob der Benutzer angemeldet ist
    useEffect(() => {
        checkAuth();
    }, []);

    // Auth-Status prüfen
    const checkAuth = async (): Promise<boolean> => {
        try {
            setLoading(true);
            // Anfrage an den Backend-Endpunkt, der den aktuellen Benutzer zurückgibt
            const response = await axios.get('http://localhost:5000/api/auth/me', {
                withCredentials: true,
            });

            if (response.data && response.data.user) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                setLoading(false);
                return true;
            } else {
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
                return false;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
            return false;
        }
    };

    // Logout-Funktion
    const logout = async (): Promise<void> => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, {
                withCredentials: true,
            });
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Fehler beim Logout:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                checkAuth,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};