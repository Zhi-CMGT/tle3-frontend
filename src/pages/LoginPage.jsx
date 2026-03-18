import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import DecorativeCircles from '../components/DecorativeCircles.jsx';
import {useAuth} from '../contexts/AuthContext.jsx';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('E-mail en wachtwoord zijn verplicht!');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URI}user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-api-key': import.meta.env.VITE_API_KEY,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Inloggen mislukt. Controleer je gegevens.');
            }

            const data = await response.json();

            login({token: data.token, userId: data.user.id});

            navigate('/persoonlijke-pagina');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-12">
            <DecorativeCircles/>
            <div className="bg-white border-2 border-[#004A99] rounded-lg p-8 w-140 shadow-sm z-10">
                <form onSubmit={handleSubmit} noValidate>

                    {error && (
                        <div className="mb-4 px-3 py-2 bg-red-50 border border-red-300 rounded text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <div className="bg-blue-50 border border-gray-300 rounded px-3 py-2">
                            <label
                                htmlFor="email"
                                className="text-lg font-semibold text-gray-700"
                            >
                                Email:
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full bg-transparent outline-none text-lg text-gray-600 mt-1"
                                placeholder="klaas123@hotmail.com"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="bg-blue-50 border border-gray-300 rounded px-3 py-2">
                            <label
                                htmlFor="password"
                                className="text-lg font-semibold text-gray-700"
                            >
                                Password:
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="w-full bg-transparent outline-none text-lg text-gray-600 mt-1"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mb-5">
                        <a href="#" className="text-sm text-gray-500 hover:underline">
                            Inloggegevens vergeten
                        </a>
                        <a href="#" className="text-sm text-gray-500 hover:underline">
                            Wachtwoord vergeten
                        </a>
                    </div>

                    <div className="flex justify-center">
                        <button
                            className="bg-[#004A99] hover:bg-blue-400 text-white text-lg font-semibold px-10 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Bezig...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;