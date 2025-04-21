// client/src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import './App.scss';

function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Wenn die Auth-Prüfung noch läuft, zeigen wir einen Ladeindikator
  if (loading) {
    return <div className="loading">Laden...</div>;
  }

  return (
    <div className="App">
      <Routes>
        {/* Öffentliche Routen */}
        <Route path="/login" element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterForm /> : <Navigate to="/" />} />

        {/* Geschützte Routen */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Fallback-Route */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;