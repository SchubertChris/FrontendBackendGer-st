
# 🧠 Lern-README.md – Backend Grundlagen Schritt für Schritt

Diese README soll dir als Lernhilfe und Nachschlagewerk für dein Backend-Projekt mit Node.js, Express und MongoDB dienen. Sie ist visuell gegliedert, enthält Merktipps, Tabellen und kleine Skizzen für deinen visuellen Lerntyp.

---

### 📁 `server.js`

```js
// Klassische Verbindung zum Express-Server
```

- Erste Datei im Backend.
- Verantwortlich für Serverstart, Middleware, CORS, Cookie-Verarbeitung und Routenanbindung.
- Wichtige Abhängigkeiten:
  - `express` (Framework)
  - `cors` (Cross-Origin Resource Sharing)
  - `dotenv` (Umgebungsvariablen)
  - `cookie-parser` (Cookies einlesen)

📌 **Best Practice:** Aktiviere `cors({ origin: 'http://localhost:5173', credentials: true })` für sichere Cookie-Nutzung im Frontend.

🧠 **Merktipp:**
> *Der Server ist das Herz – ohne ihn kein Puls im Backend!*

---

### 🔌 `db.js`

```js
// Datenbankverbindung (MongoDB, SQL, etc.)
```

- Stellt die Verbindung zur Datenbank her.
- Nutzt z. B. `mongoose.connect()` bei MongoDB.
- Trennung von Logik und Verbindung sinnvoll.

🧠 **Merktipp:**
> *Wie der Stromstecker für die Daten: Ohne Verbindung, keine Kommunikation.*

---

### 👤 `models/userModel.js` – Das Schema & Model

```js
// User-Schema & Model für Mongoose
```

- **Schema**: Struktur & Regeln für Daten (`userName`, `email`, `password`, z. B. required, unique).
- **Model**: Interface zu MongoDB – für `create`, `read`, `update`, `delete`.

📌 **Best Practice:**
- Setze `required`, `trim`, `unique`.
- Passwort wird **niemals im Klartext gespeichert!** → Hashing via bcrypt im Controller.

🧠 **Merktipp:**
> *Das Schema ist der Bauplan, das Model das fertige Haus.*

---

### 🎮 `controllers/userController.js` – Logik für Registrierung & Login

```js
// Logik für User Handling: Registrierung, Login, Token
```

- Prüft, ob User existiert
- Hashing von Passwörtern mit `bcrypt`
- JWT erstellen und als **httpOnly Cookie** setzen

📌 **Best Practice:**
- Gib bei Login-Fehlern **niemals preis**, ob E-Mail oder Passwort falsch war → Sicherheit!
- Hashing beim Registrieren mit: 
  ```js
  const hashedPassword = await bcrypt.hash(password, 10);
  ```

🧠 **Merktipp:**
> *Der Controller ist der Vermittler zwischen Client und Datenbank – er kennt beide Sprachen.*

---

### 🔐 `middleware/authMiddleware.js` – Zugriffsschutz

```js
// Middleware zum Überprüfen des JWT Tokens
```

- Prüft, ob ein gültiger Token im Cookie vorhanden ist
- Entschlüsselt Token mit `jwt.verify()`
- Schützt sensible Routen wie z. B. Profil-Seiten

🧠 **Merktipp:**
> *Der Türsteher prüft den Ausweis – kein gültiger Token, kein Zugang!*

---

### 🧽 `validators/authValidator.js` – Eingabekontrolle

```js
// Benutzerdefinierte Validierung von Eingaben
```

- Verhindert fehlerhafte oder unsichere Eingaben
- Optional mit `express-validator` oder manueller Prüfung:

```js
if (!email.includes('@') || password.length < 6) {
  return res.status(400).json({ message: 'Ungültige Eingaben' });
}
```

📌 **Best Practice:** Immer validieren – **vor** dem Speichern oder Verarbeiten!

🧠 **Merktipp:**
> *Wie ein TÜV für deine Daten: Nur saubere Eingaben dürfen weiter!*

---

### 🧩 Authentifizierungs- & Datenfluss – Visualisierung

#### 🔐 Login/Registrierung mit Token & Cookie-Flow

```text
[Client] ── POST /login ──► [Controller]
                             └── validate credentials
                             └── create JWT
                             └── send JWT in cookie
                             ◄── res.cookie('token', …)

Beim nächsten Aufruf:
[Client] ──► Cookie wird automatisch mitgesendet
          └── [Middleware prüft JWT]
              └── Weiterleitung zur geschützten Route
```

#### 👣 Datenfluss bei Registrierung

```text
Formular
   ↓
Controller
   ↓ prüft & validiert
Validator ──► bcrypt hasht Passwort
                          ↓
                    Model.save() speichert User
```

---

## 🛠️ CRUD Übersicht – Schnellreferenz

### 🔄 CRUD = Create – Read – Update – Delete

| 🔧 Aktion             | 🧪 Methode                                 | 📋 Beschreibung                          |
| -------------------- | ----------------------------------------- | --------------------------------------- |
| **Create**           | `new Model(data).save()`                  | Neues Dokument erstellen und speichern  |
|                      | `Model.create(data)`                      | Kurzform: erstellen & speichern         |
| **Read (alle)**      | `Model.find()`                            | Gibt alle passenden Dokumente zurück    |
| **Read (einzeln)**   | `Model.findOne({ feld })`                 | Gibt das erste passende Dokument zurück |
|                      | `Model.findById(id)`                      | Sucht direkt per ID                     |
| **Update (einzeln)** | `Model.findByIdAndUpdate(id, updateObj)`  | Aktualisiert per ID                     |
|                      | `Model.updateOne({ filter }, { update })` | Erstes passendes Dokument aktualisieren |
| **Delete (einzeln)** | `Model.findByIdAndDelete(id)`             | Löscht per ID                           |
|                      | `Model.deleteOne({ feld })`               | Löscht erstes passendes Dokument        |
| **Delete (mehrere)** | `Model.deleteMany({ filter })`            | Löscht alle passenden Dokumente         |

🧠 **Grafik: CRUD Visual**

```
+---------+         +--------+        +----------+        +--------+
| Create  | ----->  |  Read  | -----> |  Update  | -----> | Delete |
+---------+         +--------+        +----------+        +--------+
```

---

### 📁 Welche Dateien solltest du haben?

```
📁 server
├── db.js
├── server.js
├── models
│   └── userModel.js
├── controllers
│   └── userController.js
├── middleware
│   └── authMiddleware.js
├── validators
│   └── authValidator.js
├── routes
│   └── userRoutes.js
└── .env
```

---

### 🌐 Wichtig für Cookies im Frontend (Login)

- Frontend muss `credentials: 'include'` verwenden!
- Server-Cookies brauchen diese Einstellungen:

```js
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'Strict',
  maxAge: 3600000
});
```

🧠 **Merktipp:**
> *Cookies sind wie Eintrittskarten – sie müssen korrekt ausgestellt und mitgenommen werden!*

---

### 🔒 Logout-Route

**Logout Route**: Die Logout-Route sorgt dafür, dass der User ausgeloggt wird, indem das JWT-Cookie im Browser gelöscht wird.

#### Beispiel Logout-Route:

```js
// controllers/userController.js
const logoutUser = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
    res.status(200).json({ message: 'Erfolgreich ausgeloggt!' });
};
```

#### Route in `userRoutes.js`:

```js
router.get('/logout', logoutUser);
```

🧠 **Merktipp:**
> *Der Logout löscht die Eintrittskarte – keine Berechtigung mehr, ohne neues Ticket!*

---

### 🔒 Profile-Route (optional)

**Schutz der Profilseite mit JWT**

- Diese Route ist nur zugänglich, wenn der User authentifiziert ist (Token wird geprüft).

#### Beispiel-Profilroute:

```js
// controllers/userController.js
const getProfile = (req, res) => {
    const user = req.user; // Der User ist durch authMiddleware verfügbar
    res.status(200).json({ user });
};
```

#### Route in `userRoutes.js`:

```js
router.get('/profile', authMiddleware, getProfile);
```

🧠 **Merktipp:**
> *Die Profilseite ist wie ein privates Büro – ohne den richtigen Ausweis, keine Einladung.*

---

### 🚨 Fehlerbehandlung

- Bei jeder API-Route sollten Fehler ordnungsgemäß abgefangen und eine hilfreiche Antwort zurückgegeben werden.
- Beispielsweise: 

```js
// Beispiel für Fehlerbehandlung in einem Controller
try {
    // Code für User-Registrierung
} catch (error) {
    res.status(500).json({ message: 'Fehler beim Erstellen des Benutzers', error: error.message });
}
```

🧠 **Merktipp:**
> *Fehlerbehandlung ist wie eine Versicherung – besser sicher sein, als nach einem Unfall dumm dazustehen!*

---

### 🌱 Tipps für weiteres Lernen:

- **Testen**: Nutze Postman oder Insomnia für API-Tests. Teste jede Route, um sicherzustellen, dass alles wie erwartet funktioniert.
- **Jest**: Wenn du soweit bist, verwende Jest, um deine Controller und Middleware zu testen.

