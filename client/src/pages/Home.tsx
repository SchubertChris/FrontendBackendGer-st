import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/pages/Home.scss";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [username, setUsername] = useState<string>("");

    // Username aus AuthContext verwenden
    useEffect(() => {
        if (user && user.userName) {
            setUsername(user.userName);
        }
    }, [user]);

    const handleLogout = async () => {
        // AuthContext logout-Methode verwenden
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Fehler beim Ausloggen:", error);
        }
    };

    return (
        <div className="home-container">
            <div className="home-navbar">
                <div className="home-logo">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        width="40"
                        height="40"
                    >
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4387F9" />
                                <stop offset="100%" stopColor="#F9B543" />
                            </linearGradient>
                        </defs>
                        <rect x="10" y="10" width="80" height="80" rx="10" fill="url(#logoGradient)" />
                        <path
                            d="M30 70 L30 50 L40 40 L40 70 Z M50 70 L50 30 L60 50 L60 70 Z M70 70 L70 45 L80 30 L80 70 Z"
                            fill="#fff"
                            stroke="#fff"
                            strokeWidth="2"
                        />
                    </svg>
                    <h1>CandleScope</h1>
                </div>
                <div className="home-nav-actions">
                    {username && <span className="home-welcome-user">Willkommen, {username}</span>}
                    <button className="home-logout-button" onClick={handleLogout}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        Ausloggen
                    </button>
                </div>
            </div>

            <div className="home-main-content">
                <section className="home-hero-section">
                    <div className="home-hero-content">
                        <h2>Trading leicht gemacht</h2>
                        <p>
                            Willkommen bei CandleScope – Ihrer professionellen Plattform für Marktanalyse und Trading.
                            Verfolgen Sie Kerzendiagramme, analysieren Sie Trends und treffen Sie fundierte Handelsentscheidungen.
                        </p>
                        <div className="home-cta-buttons">
                            <button className="home-primary-button" onClick={() => navigate('/dashboard')}>
                                Dashboard öffnen
                            </button>
                            <button className="home-secondary-button">
                                Mehr erfahren
                            </button>
                        </div>
                    </div>
                    <div className="home-hero-image">
                        {/* Trading-Chart-Illustration */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 400 250"
                            width="100%"
                            height="100%"
                        >
                            <rect x="0" y="0" width="400" height="250" rx="10" fill="#1a1f2b" />

                            {/* Grid lines */}
                            <line x1="0" y1="50" x2="400" y2="50" stroke="#2a3040" strokeWidth="1" />
                            <line x1="0" y1="100" x2="400" y2="100" stroke="#2a3040" strokeWidth="1" />
                            <line x1="0" y1="150" x2="400" y2="150" stroke="#2a3040" strokeWidth="1" />
                            <line x1="0" y1="200" x2="400" y2="200" stroke="#2a3040" strokeWidth="1" />

                            {/* Candlesticks */}
                            {/* Grüne (steigende) Kerzen */}
                            <rect x="20" y="120" width="12" height="60" fill="#26de81" />
                            <line x1="26" y1="110" x2="26" y2="120" stroke="#26de81" strokeWidth="2" />
                            <line x1="26" y1="180" x2="26" y2="190" stroke="#26de81" strokeWidth="2" />

                            <rect x="50" y="100" width="12" height="30" fill="#26de81" />
                            <line x1="56" y1="90" x2="56" y2="100" stroke="#26de81" strokeWidth="2" />
                            <line x1="56" y1="130" x2="56" y2="150" stroke="#26de81" strokeWidth="2" />

                            <rect x="140" y="70" width="12" height="50" fill="#26de81" />
                            <line x1="146" y1="50" x2="146" y2="70" stroke="#26de81" strokeWidth="2" />
                            <line x1="146" y1="120" x2="146" y2="140" stroke="#26de81" strokeWidth="2" />

                            <rect x="170" y="90" width="12" height="40" fill="#26de81" />
                            <line x1="176" y1="80" x2="176" y2="90" stroke="#26de81" strokeWidth="2" />
                            <line x1="176" y1="130" x2="176" y2="140" stroke="#26de81" strokeWidth="2" />

                            <rect x="230" y="110" width="12" height="30" fill="#26de81" />
                            <line x1="236" y1="100" x2="236" y2="110" stroke="#26de81" strokeWidth="2" />
                            <line x1="236" y1="140" x2="236" y2="150" stroke="#26de81" strokeWidth="2" />

                            <rect x="290" y="80" width="12" height="40" fill="#26de81" />
                            <line x1="296" y1="70" x2="296" y2="80" stroke="#26de81" strokeWidth="2" />
                            <line x1="296" y1="120" x2="296" y2="140" stroke="#26de81" strokeWidth="2" />

                            <rect x="350" y="60" width="12" height="30" fill="#26de81" />
                            <line x1="356" y1="50" x2="356" y2="60" stroke="#26de81" strokeWidth="2" />
                            <line x1="356" y1="90" x2="356" y2="110" stroke="#26de81" strokeWidth="2" />

                            {/* Rote (fallende) Kerzen */}
                            <rect x="80" y="140" width="12" height="40" fill="#ff5e57" />
                            <line x1="86" y1="130" x2="86" y2="140" stroke="#ff5e57" strokeWidth="2" />
                            <line x1="86" y1="180" x2="86" y2="190" stroke="#ff5e57" strokeWidth="2" />

                            <rect x="110" y="90" width="12" height="60" fill="#ff5e57" />
                            <line x1="116" y1="80" x2="116" y2="90" stroke="#ff5e57" strokeWidth="2" />
                            <line x1="116" y1="150" x2="116" y2="160" stroke="#ff5e57" strokeWidth="2" />

                            <rect x="200" y="130" width="12" height="30" fill="#ff5e57" />
                            <line x1="206" y1="120" x2="206" y2="130" stroke="#ff5e57" strokeWidth="2" />
                            <line x1="206" y1="160" x2="206" y2="170" stroke="#ff5e57" strokeWidth="2" />

                            <rect x="260" y="150" width="12" height="30" fill="#ff5e57" />
                            <line x1="266" y1="140" x2="266" y2="150" stroke="#ff5e57" strokeWidth="2" />
                            <line x1="266" y1="180" x2="266" y2="190" stroke="#ff5e57" strokeWidth="2" />

                            <rect x="320" y="100" width="12" height="60" fill="#ff5e57" />
                            <line x1="326" y1="90" x2="326" y2="100" stroke="#ff5e57" strokeWidth="2" />
                            <line x1="326" y1="160" x2="326" y2="170" stroke="#ff5e57" strokeWidth="2" />

                            {/* Linie/Trend */}
                            <path d="M20 160 L50 120 L80 170 L110 120 L140 100 L170 110 L200 150 L230 130 L260 165 L290 100 L320 130 L350 80"
                                stroke="#4387F9" strokeWidth="3" fill="none" />
                        </svg>
                    </div>
                </section>

                <section className="home-features-section">
                    <h2>Unsere Features</h2>
                    <div className="home-feature-cards">
                        <div className="home-feature-card">
                            <div className="home-feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                            </div>
                            <h3>Echtzeit-Charts</h3>
                            <p>Verfolgen Sie Marktbewegungen in Echtzeit mit unseren detaillierten Kerzendiagrammen.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                </svg>
                            </div>
                            <h3>Trading-Bibliothek</h3>
                            <p>Zugriff auf umfassende Ressourcen und Bildungsmaterialien für Trader aller Erfahrungsstufen.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                            </div>
                            <h3>Marktanalyse</h3>
                            <p>Fortschrittliche Analysetools, um Trends zu identifizieren und fundierte Handelsentscheidungen zu treffen.</p>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="home-footer">
                <p>&copy; {new Date().getFullYear()} CandleScope. Alle Rechte vorbehalten.</p>
            </footer>
        </div>
    );
};

export default Home;