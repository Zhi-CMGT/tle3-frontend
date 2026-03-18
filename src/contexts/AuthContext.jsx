import React, {createContext, useContext, useEffect, useState} from 'react';
import {getToken, getUserId, setToken, clearToken} from '../lib/auth.js';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [token, setTokenState] = useState(() => getToken());
    const [userId, setUserIdState] = useState(() => getUserId());
    const isAuthenticated = !!token;

    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === 'token') setTokenState(e.newValue);
            if (e.key === 'userId') setUserIdState(e.newValue);
        };
        const onAuthChanged = () => {
            setTokenState(getToken());
            setUserIdState(getUserId());
        };
        window.addEventListener('storage', onStorage);
        window.addEventListener('authChanged', onAuthChanged);
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('authChanged', onAuthChanged);
        };
    }, []);

    const login = ({token: newToken, userId: newUserId}) => {
        setToken(newToken, newUserId);
        setTokenState(newToken);
        setUserIdState(newUserId);
        window.dispatchEvent(new Event('authChanged'));
    };

    const logout = () => {
        clearToken();
        setTokenState(null);
        setUserIdState(null);
        window.dispatchEvent(new Event('authChanged'));
    };

    return (
        <AuthContext.Provider value={{token, userId, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

