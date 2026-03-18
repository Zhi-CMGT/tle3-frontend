import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router';
import DecorativeCircles from '../components/DecorativeCircles.jsx';
import {useAuth} from '../contexts/AuthContext.jsx';
import {getAuthHeaders} from '../lib/auth.js';
import ProfileCard from '../components/ProfileCard.jsx';

function PersonalPage() {
    const [personalData, setPersonalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const fetchPersonalData = async () => {
            try {
                const tokenLocal = localStorage.getItem('token');
                const userIdLocal = localStorage.getItem('userId');

                if (!tokenLocal || !userIdLocal) {
                    setError('Niet ingelogd.');
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `http://145.24.237.215:8000/v2/api/user/${userIdLocal}`, {
                        method: 'GET',
                        headers: getAuthHeaders(),
                    }
                );

                if (response.status === 401) {
                    try {
                        auth.logout();
                    } catch (e) {
                        try {
                            window.dispatchEvent(new Event('authChanged'));
                        } catch {
                        }
                    }
                    navigate('/login');
                    throw new Error('Niet geautoriseerd (401). Log opnieuw in.');
                }

                if (!response.ok) {
                    const text = await response.text();
                    let parsed;
                    try {
                        parsed = JSON.parse(text);
                    } catch {
                        parsed = {message: text};
                    }
                    throw new Error(parsed.message || `Netwerk response was niet ok (${response.status})`);
                }

                const data = await response.json();
                setPersonalData(data.user);
            } catch (error) {
                console.error('PersonalPage fetch error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPersonalData();
    }, [navigate, auth]);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('nl-NL');
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <p className="text-gray-400 text-sm">Gegevens laden...</p>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <p className="text-red-400 text-sm">Fout: {error}</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-slate-100 relative flex flex-col items-center justify-start py-16 px-4">
            <DecorativeCircles/>
            <ProfileCard
                personalData={personalData}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                formatDate={formatDate}
            />
        </div>
    );
}

export default PersonalPage;