// server/models/User.js
import mongoose from "mongoose"; // Für Schema-Definition und Modell-Erstellung

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true, // Benutzername soll eindeutig sein
    },
    email: {
        type: String,
        required: true,
        unique: true, // Auch E-Mail soll eindeutig sein
    },
    firstName: {
        type: String,
        required: false, // Optional für die erste Registrierung
        trim: true // Leerzeichen am Anfang und Ende entfernen
    },
    lastName: {
        type: String,
        required: false, // Optional für die erste Registrierung
        trim: true // Leerzeichen am Anfang und Ende entfernen
    },
    // 📅 Geburtsdatum als Date-Objekt
    birthDate: {
        type: Date,
        required: false, // Optional für die erste Registrierung
    },
    // 📞 Telefonnummer als String, optional
    phoneNumber: {
        type: String,
        required: false,
    },
    // 🔒 Passwort als String, wird gehasht gespeichert
    password: {
        type: String,
        required: true, // Wird gehasht gespeichert (z. B. mit bcrypt)
    },
    // 🏡 Adresse als verschachtelter Block
    address: {
        country: {
            type: String,
            required: false, // Optional für die erste Registrierung
            trim: true
        },
        city: {
            type: String,
            required: false, // Optional für die erste Registrierung
            trim: true
        },
        street: {
            type: String,
            required: false, // Optional für die erste Registrierung
            trim: true
        },
        streetNumber: {
            type: String,
            required: false, // Optional für die erste Registrierung
            trim: true
        },
        zipCode: {
            type: String,
            required: false, // Optional für die erste Registrierung
            trim: true
        },
        addressLine2: {
            type: String,
            required: false,
            trim: true
        }
    },
}, {
    timestamps: true, // Erstellt automatisch createdAt & updatedAt Felder
});

// 🛡️ Passwort bei Rückgabe automatisch entfernen
userSchema.methods.toJSON = function () {
    const user = this.toObject();      // Normales Objekt aus dem Mongoose-Dokument machen
    delete user.password;              // 🔐 Passwort entfernen
    return user;                       // ✨ Zurückgeben ohne Passwort
};

// Modell aus dem Schema erstellen
const User = mongoose.model("User", userSchema);

// Exportieren, damit es im Controller oder anderen Modulen genutzt werden kann
export default User;