import React, {useState} from 'react';
import {useNavigate} from 'react-router';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        voornaam: '',
        achternaam: '',
        email: '',
        telefoonnummer: '',
        bsn: '',
        geslacht: '',
        wachtwoord: '',
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

        if (
            !formData.voornaam ||
            !formData.achternaam ||
            !formData.email ||
            !formData.telefoonnummer ||
            !formData.bsn ||
            !formData.geslacht ||
            !formData.wachtwoord
        ) {
            alert('Alle velden zijn verplicht!');
            return;
        }

        const dataToSend = {
            firstName: formData.voornaam,
            lastName: formData.achternaam,
            email: formData.email,
            phoneNumber: parseInt(formData.telefoonnummer),
            bsn: parseInt(formData.bsn),
            gender: formData.geslacht,
            password: formData.wachtwoord,
        };

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registratie mislukt!');
            }

            alert('Registratie succesvol!');
            navigate('/');
        } catch (error) {
            console.error('Registratie error:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>Registreren</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Voornaam</label>
                    <input
                        type="text"
                        name="voornaam"
                        value={formData.voornaam}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Achternaam</label>
                    <input
                        type="text"
                        name="achternaam"
                        value={formData.achternaam}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Telefoonnummer</label>
                    <input
                        type="tel"
                        name="telefoonnummer"
                        value={formData.telefoonnummer}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>BSN</label>
                    <input
                        type="text"
                        name="bsn"
                        value={formData.bsn}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Geslacht</label>
                    <select
                        name="geslacht"
                        value={formData.geslacht}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecteer...</option>
                        <option value="man">Man</option>
                        <option value="vrouw">Vrouw</option>
                        <option value="anders">Anders</option>
                    </select>
                </div>
                <div>
                    <label>Wachtwoord</label>
                    <input
                        type="password"
                        name="wachtwoord"
                        value={formData.wachtwoord}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Registreer</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
