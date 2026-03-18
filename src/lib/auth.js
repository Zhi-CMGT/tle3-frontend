// Minimal auth helper that centralizes token storage and headers
export const API_KEY = 'sk_c7a4ae50811334db8bf1f577a0f5c90e4a5c6cc440f70c5c14e752a5d88409d3';

export function getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

export function getUserId() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('userId');
}

export function setToken(token, userId) {
    if (typeof window === 'undefined') return;
    if (token) localStorage.setItem('token', token);
    if (userId) localStorage.setItem('userId', userId);
}

export function clearToken() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}

export function getAuthHeaders(extra = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY,
        ...extra,
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
}

