// client/src/components/auth/AuthSwitcher.tsx
import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './auth.module.scss';

const AuthSwitcher: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className={styles.authSwitcherContainer}>
            {isLogin ? (
                <LoginForm onSwitchToRegister={handleSwitch} />
            ) : (
                <RegisterForm onSwitchToLogin={handleSwitch} />
            )}
        </div>
    );
};

export default AuthSwitcher;