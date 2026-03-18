import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import DecorativeCircles from '../components/DecorativeCircles.jsx';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert('E-mail en wachtwoord zijn verplicht!');
            return;
        }

        try {
            const response = await fetch('http://145.24.237.215:8000/v1/api/user/login',
                // `${process.env.BASE_URI}user/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-api-key': 'sk_c7a4ae50811334db8bf1f577a0f5c90e4a5c6cc440f70c5c14e752a5d88409d3'
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                throw new Error('Inloggen mislukt. Controleer je gegevens.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user.id);

            window.dispatchEvent(new Event('authChanged'));

            alert('Succesvol ingelogd!');
            navigate('/persoonlijke-pagina');
        } catch (error) {
            console.error('Login error:', error);
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-12">
            <DecorativeCircles/>
            <div className="bg-white border-2 border-[#004A99] rounded-lg p-8 w-140 shadow-sm z-10">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="bg-blue-50 border border-gray-300 rounded px-3 py-2">
                            <label className="text-lg font-semibold text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                className="w-full bg-transparent outline-none text-lg text-gray-600 mt-1"
                                placeholder="klaas123@hotmail.com"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="bg-blue-50 border border-gray-300 rounded px-3 py-2">
                            <label className="text-lg font-semibold text-gray-700">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="w-full bg-transparent outline-none text-lg text-gray-600 mt-1"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
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
                            className="bg-[#004A99] hover:bg-blue-400 text-white text-lg font-semibold px-10 py-2 rounded transition-colors"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
