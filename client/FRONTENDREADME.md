
# Projekt-Übersicht

Willkommen zu unserem **Frontend-Projekt**!  
Dieses Projekt basiert auf **React** mit **Vite** und **TypeScript** und enthält alle notwendigen Komponenten für die Authentifizierung, Benutzerverwaltung und UI.

---

## Ordnerstruktur

Die Ordnerstruktur ist klar unterteilt, um die verschiedenen Aspekte der Anwendung zu organisieren. Hier ist ein Überblick über die wichtigsten Bereiche:

```
.
├── .env                           # Umgebungsvariablen für die Anwendung
├── .gitignore                     # Dateien und Ordner, die Git ignoriert
├── eslint.config.js                # ESLint-Konfiguration
├── index.html                     # Haupt-HTML-Datei
├── README.md                      # Diese Datei
├── package.json                   # Projekt-Abhängigkeiten und Skripte
├── public                         # Öffentliche Ressourcen (z.B. Vite-Logo)
├── src                            # Quellcode
│   ├── assets                     # Statische Dateien wie Icons und Logos
│   ├── components                 # Wiederverwendbare UI-Komponenten
│   │   ├── common                 # Gemeinsame UI-Komponenten (z.B. Header, Footer)
│   │   └── layout                 # Layouts für Seiten (z.B. Sidebar)
│   ├── features                   # Funktionsspezifische Logik (z.B. Authentifizierung, Benutzer)
│   │   ├── auth                   # Authentifizierungslogik
│   │   └── user                   # Benutzerverwaltungslogik
│   ├── hooks                      # Eigene React-Hooks
│   ├── pages                      # Seitenkomponenten (z.B. Dashboard, Login)
│   ├── services                   # API-Services
│   ├── store                      # Zustandsspeicherung (z.B. Redux-Slices)
│   ├── styles                     # Globale Styles (CSS/SCSS)
│   └── types                      # TypeScript-Typen
├── vite.config.ts                 # Vite-Konfiguration
└── tsconfig.json                  # TypeScript-Konfiguration
```

---

## Details zu den Ordnern und Dateien

### `src/features/` – Feature-basierte Struktur
In diesem Ordner befinden sich die Hauptlogiken der Anwendung, die jeweils ein bestimmtes Feature verwalten:

#### `auth/` – Authentifizierung
- **`authService.ts`**: Funktionen zum Anmelden, Registrieren und Verwalten des Authentifizierungsstatus.
- **`authSlice.ts`**: Verwaltung des Authentifizierungsstatus im Redux-Store.
- **`useAuth.ts`**: Benutzerdefinierter Hook, um den Authentifizierungsstatus im Frontend zu nutzen.

#### `user/` – Benutzerverwaltung
- **`userService.ts`**: Funktionen zur Verwaltung von Benutzerdaten (z.B. Abrufen und Bearbeiten des Benutzerprofils).
- **`userSlice.ts`**: Verwaltung der Benutzerdaten im Redux-Store.
- **`useUser.ts`**: Benutzerdefinierter Hook für den Zugriff auf die Benutzerdaten.

---

### `src/components/` – UI-Komponenten
Dieser Ordner enthält wiederverwendbare UI-Komponenten:

#### `common/` – Gemeinsame UI-Komponenten
- **`Header.tsx`**: Der Header-Bereich der Anwendung.
- **`Footer.tsx`**: Der Footer-Bereich der Anwendung.

#### `layout/` – Layout-Komponenten
- **`Sidebar.tsx`**: Die seitliche Navigation der Anwendung.

---

### `src/pages/` – Seitenkomponenten
Hier befinden sich die verschiedenen Seiten der Anwendung:

- **`Dashboard.tsx`**: Die Dashboard-Seite nach der Anmeldung.
- **`Home.tsx`**: Die Startseite der Anwendung.
- **`Login.tsx`**: Die Login-Seite.
- **`Register.tsx`**: Die Registrierungs-Seite.

---

### `src/services/` – API-Services
API-Aufrufe und die Kommunikation mit dem Backend werden in diesem Ordner abgewickelt:

- **`authService.ts`**: Funktionen für Authentifizierungsanforderungen (z.B. Login, Registrierung).
- **`userService.ts`**: Funktionen zur Kommunikation mit dem Backend über Benutzeroperationen.

---

### `src/store/` – Zustandsspeicherung mit Redux
Die globale Zustandsspeicherung verwaltet Daten wie Authentifizierung und Benutzerinformationen:

- **`authSlice.ts`**: Logik zur Verwaltung des Authentifizierungsstatus.
- **`userSlice.ts`**: Logik zur Verwaltung der Benutzerdaten.

---

### `src/styles/` – Styles und Design
Globale Styles, Variablen und Mixins befinden sich in diesem Ordner:

#### `base/`
- **`_reset.scss`**: Ein Reset-Stylesheet für die Behebung von Inkonsistenzen in Browsern.

#### `components/`
- Styles für wiederverwendbare UI-Komponenten.

#### `layout/`
- Styles für Layouts (z.B. für Sidebar).

#### `global.scss`
- Globale Styles, die für die gesamte Anwendung gelten.

#### `mixins.scss`
- Wiederverwendbare SCSS-Mixins.

#### `variables.scss`
- Globale SCSS-Variablen (z.B. Farben, Abstände).

---

### `src/types/` – TypeScript-Typen
Hier definieren wir Typen für verschiedene Datenstrukturen:

- **`userTypes.ts`**: Typen, die Benutzerdaten beschreiben (z.B. Benutzername, E-Mail).

---

### `src/hooks/` – Eigene React-Hooks
Benutzerdefinierte React-Hooks, die die Logik von Features wie Authentifizierung und Benutzerverwaltung kapseln, um die Wiederverwendbarkeit und Lesbarkeit des Codes zu erhöhen.

---

### `src/assets/` – Statische Dateien
Statische Dateien wie Bilder, Icons und Logos, die in der Anwendung verwendet werden.

---

## Verwendung

### 1. Abhängigkeiten installieren

Installiere die benötigten Abhängigkeiten:

```bash
npm install
```

---

### 2. Umgebungsvariablen setzen

Erstelle eine `.env`-Datei im Hauptverzeichnis des Projekts und füge dort alle erforderlichen Umgebungsvariablen hinzu.

---

### 3. Entwicklungsserver starten

Starte den Entwicklungsserver:

```bash
npm run dev
```

Der Entwicklungsserver wird gestartet und öffnet die Anwendung im Browser.

---

### 4. Testen

Starte das Projekt lokal und stelle sicher, dass alle Seiten und Funktionen wie erwartet arbeiten.

---

## Wichtige Hinweise

- **Zustandsspeicherung**: Wir verwenden **Redux** zur zentralen Verwaltung des Anwendungszustands (z.B. Authentifizierung, Benutzerdaten).
- **API-Kommunikation**: Die Kommunikation mit dem Backend erfolgt über **`authService.ts`** und **`userService.ts`**. Achte darauf, API-Endpunkte korrekt zu konfigurieren.

---

## Weiterführende Informationen

- [React Dokumentation](https://reactjs.org/)
- [Redux Dokumentation](https://redux.js.org/)
- [TypeScript Dokumentation](https://www.typescriptlang.org/docs/)
- [Vite Dokumentation](https://vitejs.dev/)
- [ESLint Dokumentation](https://eslint.org/)
- [Prettier Dokumentation](https://prettier.io/)

---

## Installation der Abhängigkeiten

### 1. Projekt initialisieren

Falls noch nicht geschehen, initialisiere das Projekt:

```bash
npm init -y
```

---

### 2. Wichtige Abhängigkeiten installieren

Installiere die notwendigen **Frontend-Abhängigkeiten**:

```bash
npm install react react-dom react-router-dom axios @reduxjs/toolkit react-redux bcrypt jsonwebtoken
```

- **`react`** und **`react-dom`**: Die grundlegenden React-Pakete.
- **`react-router-dom`**: Für die Navigation zwischen den Seiten.
- **`axios`**: Für API-Anfragen.
- **`@reduxjs/toolkit`** und **`react-redux`**: Für das State Management mit Redux.
- **`bcrypt`**: Für das Hashen von Passwörtern (für den Server).
- **`jsonwebtoken`**: Für die Erstellung und Überprüfung von JWTs (JSON Web Tokens).

---

### 3. Entwicklungs-Abhängigkeiten installieren

Installiere die Entwicklungs-Abhängigkeiten für **TypeScript**, **Vite**, **ESLint**, **Prettier** und **SCSS**:

```bash
npm install --save-dev typescript vite eslint eslint-plugin-react prettier sass @types/react @types/react-dom
```

- **`typescript`**: Um TypeScript in deinem Projekt zu verwenden.
- **`vite`**: Der Build-Prozess und Entwicklungsserver.
- **`eslint`** und **`eslint-plugin-react`**: Für die Code-Qualität und das Linting von React-Code.
- **`prettier`**: Für das automatische Formatieren des Codes.
- **`sass`**: Für die Verwendung von SCSS in deinem Projekt.
- **`@types/react` und `@types/react-dom`**: TypeScript-Typen für React.

---

### 4. Optional: Prettier und ESLint Integration

Wenn du Prettier für die Codeformatierung verwenden möchtest, installiere die notwendigen Prettier- und ESLint-Prettier-Integrationen:

```bash
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

- **`eslint-config-prettier`**: Schaltet alle ESLint-Regeln aus, die mit Prettier in Konflikt stehen.
- **`eslint-plugin-prettier`**: Integriert Prettier direkt in ESLint.

---

### 5. TypeScript Konfiguration

Stelle sicher, dass die TypeScript-Konfiguration korrekt ist. Du solltest die Datei **`tsconfig.json`** bereits erstellt haben. Falls nicht, kannst du sie manuell oder mit dem Befehl erstellen:

```bash
npx tsc --init
```

Das generiert eine Standard **`tsconfig.json`**-Datei, die du nach Bedarf anpassen kannst.

---

### 6. ESLint und Prettier Konfiguration

Falls du ESLint und Prettier noch nicht konfiguriert hast, führe den folgenden Befehl aus, um ESLint zu initialisieren:

```bash
npx eslint --init
```

---

## Zusammenfassung

- Wir haben das Projekt mit **React**, **Vite**, **TypeScript** und **Redux** strukturiert.
- Alle Hauptfunktionen sind in separate Module unterteilt, die jeweils ein bestimmtes Feature der Anwendung verwalten.
- Die Anwendung nutzt **Axios** für API-Anfragen und **Redux** für das Zustandshandling.
- **SASS** wurde integriert, um die Styles modular zu organisieren.

Für die Entwicklung und Produktion kannst du den Vite-Server verwenden und sicherstellen, dass alle Tests durchgeführt werden, bevor du die Anwendung in Produktion gibst.

---

