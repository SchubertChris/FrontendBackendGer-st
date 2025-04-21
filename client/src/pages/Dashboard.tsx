import React, { useState } from 'react';
import '../styles/pages/Dashboard.scss'; // Importiere die CSS-Datei für das Dashboard

// Icons für unser Dashboard (hier würden normalerweise Importe stehen)
const IconHome = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const IconChartBar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
        <line x1="3" y1="20" x2="21" y2="20"></line>
    </svg>
);

const IconUsers = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const IconSettings = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

const IconHelp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

const IconSearch = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const IconMenu = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const IconDots = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="19" cy="12" r="1"></circle>
        <circle cx="5" cy="12" r="1"></circle>
    </svg>
);

const IconTrendUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

const IconTrendDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
        <polyline points="17 18 23 18 23 12"></polyline>
    </svg>
);

const IconDollar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

const IconUser = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const IconBriefcase = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

const IconBox = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);

const IconFile = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

const IconBell = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
);

const Dashboard: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`dashboard-sidebar ${isMobileMenuOpen ? 'mobile-visible' : ''}`}>
                <div className="dashboard-logo">
                    <IconBox />
                    <span>CandleScope</span>
                </div>

                <nav className="sidebar-menu">
                    <a href="#" className="menu-item active">
                        <IconHome />
                        <span className="menu-text">Dashboard</span>
                    </a>
                    <a href="#" className="menu-item">
                        <IconChartBar />
                        <span className="menu-text">Analytics</span>
                    </a>
                    <a href="#" className="menu-item">
                        <IconUsers />
                        <span className="menu-text">Kunden</span>
                    </a>
                    <a href="#" className="menu-item">
                        <IconBriefcase />
                        <span className="menu-text">Projekte</span>
                    </a>
                    <a href="#" className="menu-item">
                        <IconFile />
                        <span className="menu-text">Berichte</span>
                    </a>
                </nav>

                <div className="sidebar-divider"></div>

                <nav className="sidebar-menu">
                    <a href="#" className="menu-item">
                        <IconSettings />
                        <span className="menu-text">Einstellungen</span>
                    </a>
                    <a href="#" className="menu-item">
                        <IconHelp />
                        <span className="menu-text">Hilfe</span>
                    </a>
                </nav>
            </div>

            {/* Hauptbereich */}
            <div className="dashboard-main">
                <div className="dashboard-topbar">
                    <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <IconMenu />
                    </button>

                    <div className="dashboard-search">
                        <IconSearch />
                        <input type="text" placeholder="Suchen..." />
                    </div>

                    <div className="dashboard-user">
                        <div className="user-avatar">MS</div>
                        <div className="user-info">
                            <span className="user-name">Max Schmidt</span>
                            <span className="user-role">Administrator</span>
                        </div>
                    </div>
                </div>

                <h1 className="dashboard-title">Dashboard</h1>
                <p className="dashboard-subtitle">Willkommen zurück, hier sind deine neuesten Statistiken</p>

                {/* Statistik-Karten */}
                <div className="stats-grid">
                    <div className="stats-card">
                        <div className="stats-icon primary">
                            <IconDollar />
                        </div>
                        <div className="stats-value">€24,512</div>
                        <div className="stats-label">Gesamtumsatz</div>
                        <div className="stats-trend up">
                            <IconTrendUp /> 12% seit letztem Monat
                        </div>
                    </div>

                    <div className="stats-card">
                        <div className="stats-icon success">
                            <IconUsers />
                        </div>
                        <div className="stats-value">847</div>
                        <div className="stats-label">Aktive Kunden</div>
                        <div className="stats-trend up">
                            <IconTrendUp /> 8% seit letztem Monat
                        </div>
                    </div>

                    <div className="stats-card">
                        <div className="stats-icon warning">
                            <IconBriefcase />
                        </div>
                        <div className="stats-value">32</div>
                        <div className="stats-label">Laufende Projekte</div>
                        <div className="stats-trend down">
                            <IconTrendDown /> 3% seit letztem Monat
                        </div>
                    </div>

                    <div className="stats-card">
                        <div className="stats-icon danger">
                            <IconBell />
                        </div>
                        <div className="stats-value">14</div>
                        <div className="stats-label">Offene Tickets</div>
                        <div className="stats-trend up">
                            <IconTrendUp /> 24% seit letztem Monat
                        </div>
                    </div>
                </div>

                {/* Charts und Activities */}
                <div className="dashboard-row">
                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Umsatzübersicht</h2>
                            <div className="card-actions">
                                <button><IconDots /></button>
                            </div>
                        </div>
                        <div className="chart-container">
                            {/* Hier würde normalerweise ein echtes Chart stehen */}
                            <div style={{
                                height: '100%',
                                background: 'linear-gradient(180deg, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0.05) 100%)',
                                borderRadius: '8px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '70%',
                                    background: 'linear-gradient(90deg, #4361ee 0%, #3f37c9 100%)',
                                    clipPath: 'polygon(0 100%, 5% 85%, 10% 75%, 15% 80%, 20% 70%, 25% 75%, 30% 65%, 35% 70%, 40% 60%, 45% 55%, 50% 50%, 55% 58%, 60% 65%, 65% 60%, 70% 55%, 75% 60%, 80% 65%, 85% 70%, 90% 60%, 95% 65%, 100% 55%, 100% 100%)',
                                    opacity: 0.8
                                }}></div>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: '#4361ee',
                                    fontWeight: 'bold'
                                }}>Diagramm: Umsatzentwicklung</div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-header">
                            <h2 className="card-title">Letzte Aktivitäten</h2>
                            <div className="card-actions">
                                <button><IconDots /></button>
                            </div>
                        </div>
                        <div className="activity-list">
                            <div className="activity-item">
                                <div className="activity-icon primary">
                                    <IconUser />
                                </div>
                                <div className="activity-content">
                                    <div className="activity-title">Neuer Kunde registriert</div>
                                    <div className="activity-time">Vor 2 Stunden</div>
                                </div>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon success">
                                    <IconDollar />
                                </div>
                                <div className="activity-content">
                                    <div className="activity-title">Zahlung von €2,380 erhalten</div>
                                    <div className="activity-time">Vor 5 Stunden</div>
                                </div>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon warning">
                                    <IconBriefcase />
                                </div>
                                <div className="activity-content">
                                    <div className="activity-title">Neues Projekt erstellt</div>
                                    <div className="activity-time">Gestern, 17:45</div>
                                </div>
                            </div>

                            <div className="activity-item">
                                <div className="activity-icon info">
                                    <IconBell />
                                </div>
                                <div className="activity-content">
                                    <div className="activity-title">Neues Support-Ticket</div>
                                    <div className="activity-time">Gestern, 14:30</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Aufgabenliste */}
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2 className="card-title">Aktuelle Aufgaben</h2>
                        <div className="card-actions">
                            <button><IconDots /></button>
                        </div>
                    </div>
                    <div className="task-list">
                        <div className="task-item">
                            <input type="checkbox" className="task-checkbox" />
                            <div className="task-content">
                                <div className="task-title">Dashboard-Design fertigstellen</div>
                                <div className="task-info">
                                    <span>Fällig: Heute</span>
                                    <span>Zugewiesen: Max Schmidt</span>
                                </div>
                            </div>
                            <div className="task-priority high">Hoch</div>
                        </div>

                        <div className="task-item">
                            <input type="checkbox" className="task-checkbox" />
                            <div className="task-content">
                                <div className="task-title">Benutzerverwaltung implementieren</div>
                                <div className="task-info">
                                    <span>Fällig: Morgen</span>
                                    <span>Zugewiesen: Anna Müller</span>
                                </div>
                            </div>
                            <div className="task-priority medium">Mittel</div>
                        </div>

                        <div className="task-item">
                            <input type="checkbox" className="task-checkbox" />
                            <div className="task-content">
                                <div className="task-title">API-Dokumentation aktualisieren</div>
                                <div className="task-info">
                                    <span>Fällig: 25.04.2025</span>
                                    <span>Zugewiesen: Thomas Weber</span>
                                </div>
                            </div>
                            <div className="task-priority low">Niedrig</div>
                        </div>

                        <div className="task-item">
                            <input type="checkbox" className="task-checkbox" checked readOnly />
                            <div className="task-content">
                                <div className="task-title">Wöchentliches Team-Meeting</div>
                                <div className="task-info">
                                    <span>Abgeschlossen: Heute</span>
                                    <span>Zugewiesen: Alle</span>
                                </div>
                            </div>
                            <div className="task-priority medium">Mittel</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;