// client/src/components/auth/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import { AxiosError } from 'axios';
import styles from './auth.module.scss';

interface RegisterFormProps {
    // Optional: Wenn als eigenständige Seite genutzt, wird dieser Prop nicht benötigt
    onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | 'veryStrong' | null>(null);
    const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

    const navigate = useNavigate();

    // E-Mail-Validierung
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(email));
    };

    // Passwort-Stärke berechnen
    useEffect(() => {
        if (!password) {
            setPasswordStrength(null);
            return;
        }

        // Passwort-Stärke überprüfen (angepasst an Backend-Validierung)
        let strength = 0;
        // Mindestlänge 6 Zeichen (entsprechend Backend-Validierung)
        if (password.length >= 6) strength += 1;
        // Mindestens eine Zahl (entsprechend Backend-Validierung)
        if (/[0-9]/.test(password)) strength += 1;
        // Mindestens ein Großbuchstabe (entsprechend Backend-Validierung)
        if (/[A-Z]/.test(password)) strength += 1;
        // Bonus für Sonderzeichen (für "Sehr stark"-Bewertung)
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;

        if (strength === 1) setPasswordStrength('weak');
        else if (strength === 2) setPasswordStrength('medium');
        else if (strength === 3) setPasswordStrength('strong');
        else if (strength === 4) setPasswordStrength('veryStrong');
    }, [password]);

    // Passwort-Übereinstimmung prüfen
    useEffect(() => {
        if (!passwordConfirm) {
            setPasswordMatch(null);
            return;
        }

        setPasswordMatch(password === passwordConfirm);
    }, [password, passwordConfirm]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validierungen
        if (password !== passwordConfirm) {
            setError('Die Passwörter stimmen nicht überein.');
            return;
        }

        // Eigene Frontend-Validierung, die mit Backend übereinstimmt
        const passwordErrors = [];
        if (password.length < 6) {
            passwordErrors.push('Das Passwort muss mindestens 6 Zeichen lang sein.');
        }
        if (!/[0-9]/.test(password)) {
            passwordErrors.push('Das Passwort muss mindestens eine Zahl enthalten.');
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrors.push('Das Passwort muss mindestens einen Großbuchstaben enthalten.');
        }

        if (passwordErrors.length > 0) {
            setError(passwordErrors.join(' '));
            return;
        }

        setError(null);
        setSuccess(null);
        setIsLoading(true);

        try {
            await registerUser(userName, email, password);
            // Erfolgreiche Registrierung

            setSuccess('Registrierung erfolgreich! Du wirst zur Anmeldeseite weitergeleitet...');

            // Kurze Verzögerung vor der Weiterleitung
            setTimeout(() => {
                if (onSwitchToLogin) {
                    onSwitchToLogin();
                } else {
                    navigate('/login');
                }
            }, 2000);
        } catch (err) {
            console.error('Registrierungsfehler:', err);

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
                    setError(err.response?.data?.message || 'Registrierung fehlgeschlagen. Bitte versuche es erneut.');
                }
            } else {
                setError('Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 'weak': return 'Schwach';
            case 'medium': return 'Mittel';
            case 'strong': return 'Stark';
            case 'veryStrong': return 'Sehr stark';
            default: return '';
        }
    };

    // Wir verwenden den bereitgestellten onSwitchToLogin-Handler, wenn er vorhanden ist,
    // ansonsten navigieren wir zur Login-Seite
    const handleLoginClick = () => {
        if (onSwitchToLogin) {
            onSwitchToLogin();
        } else {
            navigate('/login');
        }
    };

    return (
        <div className={styles.authWrapper}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <h1 className={styles.formTitle}>Registrieren</h1>
                <p className={styles.formSubtitle}>Erstelle dein Konto und starte durch</p>

                {error && <div className={styles.error}>{error}</div>}
                {success && <div className={styles.success}>{success}</div>}

                <div className={styles.formGroup}>
                    <label htmlFor="userName">Benutzername</label>
                    <input
                        type="text"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Dein Benutzername"
                        required
                        minLength={3}
                    />
                </div>

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
                        minLength={6}
                    />

                    {passwordStrength && (
                        <div className={styles.passwordStrength}>
                            <div className={styles.strengthBar}>
                                <div className={`${styles.strengthFill} ${styles[passwordStrength]}`}></div>
                            </div>
                            <div className={`${styles.strengthText} ${styles[passwordStrength]}`}>
                                {getPasswordStrengthText()}
                            </div>
                        </div>
                    )}

                    {/* Passwort-Anforderungen anzeigen */}
                    <div className={styles.passwordRequirements}>
                        <small>Das Passwort muss:</small>
                        <ul>
                            <li className={password.length >= 6 ? styles.fulfilled : ''}>
                                Mindestens 6 Zeichen lang sein
                            </li>
                            <li className={/[0-9]/.test(password) ? styles.fulfilled : ''}>
                                Mindestens eine Zahl enthalten
                            </li>
                            <li className={/[A-Z]/.test(password) ? styles.fulfilled : ''}>
                                Mindestens einen Großbuchstaben enthalten
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={`${styles.formGroup} ${passwordMatch === true ? styles.validated : ''} ${passwordMatch === false ? styles.error : ''}`}>
                    <label htmlFor="passwordConfirm">Passwort bestätigen</label>
                    <input
                        type="password"
                        id="passwordConfirm"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    {passwordMatch === false && (
                        <div className={`${styles.inputFeedback} ${styles.error}`}>
                            Die Passwörter stimmen nicht überein
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
                    disabled={isLoading || passwordMatch === false || emailValid === false}
                >
                    {isLoading ? 'Wird registriert...' : 'Registrieren'}
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
                    <span>Bereits ein Konto?</span>
                    <button type="button" className={styles.switchButton} onClick={handleLoginClick}>
                        Anmelden
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;