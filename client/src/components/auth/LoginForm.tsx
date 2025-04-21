import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { AxiosError } from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './auth.module.scss';

interface LoginFormProps {
    // Optional: Wenn als eigenständige Seite genutzt, wird dieser Prop nicht benötigt
    onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const navigate = useNavigate();
    const { checkAuth } = useContext(AuthContext);

    // E-Mail-Validierung
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            await loginUser(email, password);

            // Nach dem Login den Auth-Status aktualisieren
            const authSuccess = await checkAuth();

            // Nur navigieren, wenn die Authentifizierung erfolgreich war
            if (authSuccess) {
                navigate('/');
            } else {
                setError("Anmeldung fehlgeschlagen. Bitte versuche es erneut.");
            }
        } catch (err) {
            console.error('Login-Fehler:', err);

            if (err instanceof AxiosError) {
                // Überprüfen, ob es sich um Validierungsfehler handelt
                if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
                    // Express-validator sendet ein Array von Fehlern
                    // Definierter Typ statt any
                    type ValidationError = {
                        msg: string;
                        param: string;
                        location: string;
                    };

                    const errorMessages = err.response.data.errors
                        .map((error: ValidationError) => error.msg)
                        .join(', ');
                    setError(errorMessages);
                } else {
                    // Normale Fehlermeldung vom Server
                    setError(err.response?.data?.message || 'Anmeldung fehlgeschlagen. Bitte überprüfe deine Angaben.');
                }
            } else {
                setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Wir verwenden den bereitgestellten onSwitchToRegister-Handler, wenn er vorhanden ist,
    // ansonsten navigieren wir zur Register-Seite
    const handleRegisterClick = () => {
        if (onSwitchToRegister) {
            onSwitchToRegister();
        } else {
            navigate('/register');
        }
    };

    return (
        <div className={styles.authWrapper}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h1 className={styles.formTitle}>Anmelden</h1>
                <p className={styles.formSubtitle}>Willkommen zurück! Bitte melde dich mit deinem Konto an.</p>

                {error && <div className={styles.error}>{error}</div>}

                <div className={`${styles.formGroup} ${emailValid === true ? styles.validated : ''} ${emailValid === false ? styles.error : ''}`}>
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (e.target.value) validateEmail(e.target.value);
                        }}
                        onBlur={() => validateEmail(email)}
                        placeholder="deine@email.de"
                        required
                    />
                    {emailValid === false && <div className={`${styles.inputFeedback} ${styles.error}`}>Bitte gib eine gültige E-Mail-Adresse ein</div>}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Passwort</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
                </button>

                <div className={styles.divider}>oder</div>

                <div className={styles.socialLogin}>
                    <button type="button" className={styles.socialButton}>
                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
                            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
                        </svg>
                        Mit Google anmelden
                    </button>
                </div>

                <div className={styles.formFooter}>
                    <span>Noch kein Konto?</span>
                    <button type="button" className={styles.switchButton} onClick={handleRegisterClick}>
                        Registrieren
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;