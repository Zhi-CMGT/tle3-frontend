import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import DecorativeCircles from '../components/DecorativeCircles.jsx';

const FormInput = ({label, type, name, value, onChange, placeholder, required = true}) => (
    <div className="mb-4">
        <div className="bg-blue-50 border border-gray-300 rounded px-3 py-2">
            <label className="text-lg font-semibold text-gray-700 block">
                {label}
            </label>
            <input
                type={type}
                name={name}
                className="w-full bg-transparent outline-none text-lg text-gray-600 mt-1"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    </div>
);

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        voornaam: '',
        achternaam: '',
        geslacht: '',
        bsn: '',
        email: '',
        telefoonnummer: '',
        wachtwoord: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.voornaam ||
            !formData.achternaam ||
            !formData.email ||
            !formData.wachtwoord
        ) {
            alert('Alle velden zijn verplicht!');
            return;
        }

        const dataToSend = {
            first_name: formData.voornaam,
            last_name: formData.achternaam,
            gender: formData.geslacht,
            bsn: formData.bsn,
            email: formData.email,
            phone_number: formData.telefoonnummer,
            password: formData.wachtwoord,
            personalization_enabled: true,
        };

        try {
            const response = await fetch(
                'http://145.24.237.215:8000/v2/api/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-api-key': 'sk_c7a4ae50811334db8bf1f577a0f5c90e4a5c6cc440f70c5c14e752a5d88409d3'
                    },
                    body: JSON.stringify(dataToSend),
                });
            console.log(response);

            if (!response.ok) {
                let errorMessage = 'Registratie mislukt!';
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                }
                throw new Error(errorMessage);
            }

            alert('Registratie succesvol!');
            navigate('/login');
        } catch (error) {
            console.error('Registratie error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen py-12 relative">
            <DecorativeCircles/>
            <div className="bg-white border-2 border-[#004A99] rounded-lg p-8 w-140 shadow-sm z-10 max-w-2xl">
                <h2 className="text-3xl font-bold text-[#004A99] mb-8 text-center">Registreren</h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <FormInput
                            label="Voornaam"
                            type="text"
                            name="voornaam"
                            value={formData.voornaam}
                            onChange={handleInputChange}
                            placeholder="Henk"
                        />
                        <FormInput
                            label="Achternaam"
                            type="text"
                            name="achternaam"
                            value={formData.achternaam}
                            onChange={handleInputChange}
                            placeholder="de Vries"
                        />
                    </div>

                    <FormInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="henk@voorbeeld.nl"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <FormInput
                            label="Telefoonnummer"
                            type="tel"
                            name="telefoonnummer"
                            value={formData.telefoonnummer}
                            onChange={handleInputChange}
                            placeholder="0612345678"
                        />
                        <FormInput
                            label="BSN"
                            type="text"
                            name="bsn"
                            value={formData.bsn}
                            onChange={handleInputChange}
                            placeholder="123456789"
                        />
                    </div>

                    <div className="mb-4">
                        <div className="bg-blue-50 border border-gray-300 rounded px-3 py-2">
                            <label className="text-lg font-semibold text-gray-700 block">
                                Geslacht
                            </label>
                            <select
                                name="geslacht"
                                className="w-full bg-transparent outline-none text-lg text-gray-600 mt-1"
                                value={formData.geslacht}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Selecteer...</option>
                                <option value="Man">Man</option>
                                <option value="Vrouw">Vrouw</option>
                                <option value="Anders">Anders</option>
                            </select>
                        </div>
                    </div>

                    <FormInput
                        label="Wachtwoord"
                        type="password"
                        name="wachtwoord"
                        value={formData.wachtwoord}
                        onChange={handleInputChange}
                        placeholder="********"
                    />

                    <div className="flex justify-center mt-8">
                        <button
                            className="bg-[#004A99] hover:bg-blue-400 text-white text-lg font-semibold px-10 py-2 rounded transition-colors"
                            type="submit"
                        >
                            Registreer
                        </button>
                    </div>

                    <div className="flex justify-center mt-4">
                        <a href="/login" className="text-sm text-gray-500 hover:underline">
                            Heb je al een account? Log in
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
