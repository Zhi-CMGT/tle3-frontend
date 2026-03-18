import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import DecorativeCircles from "../components/DecorativeCircles.jsx";

const ChevronIcon = ({isOpen}) => (
    <svg
        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
        />
    </svg>
);

const DropdownSection = ({title, isOpen, onClick, children}) => (
    <div
        className={`rounded-2xl border bg-white overflow-hidden transition-shadow duration-300 ${isOpen ? 'border-gray-200 shadow-md' : 'border-gray-200 shadow-sm'}`}
    >
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between px-8 py-5 text-gray-700 font-medium text-base hover:bg-gray-50 transition-colors duration-150"
            type="button"
        >
            <span>{title}</span>
            <ChevronIcon isOpen={isOpen}/>
        </button>
        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
            <div className="px-8 pb-6 border-t border-gray-100">{children}</div>
        </div>
    </div>
);

const InputField = ({label, name, value, onChange, type = "text", placeholder = ""}) => (
    <div className="mb-4">
        <label className="text-sm text-gray-400 mb-0.5 block">{label}</label>
        <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full border-b border-gray-300 py-1 text-base text-gray-800 font-medium focus:outline-none focus:border-blue-500 transition-colors"
        />
    </div>
);

function EditPersonalPage() {
    const [personalData, setPersonalData] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        bsn: "",
        birth_date: "",
        email: "",
        phone_number: "",
        address: {
            street: "",
            number: "",
            zipcode: "",
            city: ""
        }
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState('gegevens');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPersonalData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                if (!userId || !token) {
                    throw new Error("Niet ingelogd");
                }

                const response = await fetch(`http://145.24.237.215:8000/v2/api/user/${userId}`, {
                    headers: {
                        "Accept": "application/json",
                        'Authorization': `Bearer ${token}`,
                        'x-api-key': 'sk_c7a4ae50811334db8bf1f577a0f5c90e4a5c6cc440f70c5c14e752a5d88409d3'
                    }
                });

                if (!response.ok) {
                    throw new Error("Kon gegevens niet ophalen");
                }

                const data = await response.json();

                const userData = data.user || {};
                if (!userData.address) {
                    userData.address = {street: "", number: "", zipcode: "", city: ""};
                }

                setPersonalData(userData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPersonalData();
    }, []);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        if (name.startsWith("address.")) {
            const addressField = name.split(".")[1];
            setPersonalData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setPersonalData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!personalData.first_name || !personalData.last_name || !personalData.email) {
            alert("Vul in ieder geval naam en email in.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const dataToSend = {
                first_name: personalData.first_name,
                last_name: personalData.last_name,
                gender: personalData.gender,
                bsn: personalData.bsn,
                birth_date: personalData.birth_date,
                email: personalData.email,
                phone_number: personalData.phone_number,
                personalization_enabled: true,
                address: {
                    street: personalData.address?.street,
                    number: personalData.address?.number,
                    zipcode: personalData.address?.zipcode,
                    city: personalData.address?.city,
                }
            };

            console.log('Versturen:', dataToSend);

            const response = await fetch(`http://145.24.237.215:8000/v2/api/user/edit/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    'Authorization': `Bearer ${token}`,
                    'x-api-key': 'sk_c7a4ae50811334db8bf1f577a0f5c90e4a5c6cc440f70c5c14e752a5d88409d3'
                },
                body: JSON.stringify(dataToSend)
            });

            const text = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(text);
            } catch {
                errorData = {message: text};
            }

            if (!response.ok) {
                throw new Error(errorData.message || "Kon gegevens niet bijwerken!");
            }
            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || "Kon gegevens niet bijwerken!");
            // }

            alert("Gegevens succesvol bijgewerkt!");
            navigate("/persoonlijke-pagina");
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    };

    const formatDateForInput = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return !isNaN(date) ? date.toISOString().split('T')[0] : "";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-100">
                <div className="text-gray-400">Gegevens laden...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-100">
                <div className="text-red-400">Fout: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 relative flex flex-col items-center justify-start py-16 px-4">
            <DecorativeCircles/>
            <div
                className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-sm px-10 py-10 flex flex-col gap-3">

                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Gegevens bewerken</h1>

                {/* Dropdown: Mijn gegevens */}
                <DropdownSection
                    title="Mijn gegevens"
                    isOpen={openDropdown === 'gegevens'}
                    onClick={() => toggleDropdown('gegevens')}
                >
                    <form onSubmit={handleSubmit} className="pt-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                                    Identiteitsgegevens
                                </p>
                                <InputField
                                    label="Voornamen"
                                    name="first_name"
                                    value={personalData.first_name}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Achternaam"
                                    name="last_name"
                                    value={personalData.last_name}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Geslacht"
                                    name="gender"
                                    value={personalData.gender}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Burgerservicenummer"
                                    name="bsn"
                                    value={personalData.bsn}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Geboortedatum"
                                    name="birth_date"
                                    type="date"
                                    value={formatDateForInput(personalData.birth_date)}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={personalData.email}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Telefoonnummer"
                                    name="phone_number"
                                    value={personalData.phone_number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                                    Adresgegevens
                                </p>
                                <InputField
                                    label="Straat"
                                    name="address.street"
                                    value={personalData.address?.street}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Huisnummer"
                                    name="address.number"
                                    value={personalData.address?.number}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Postcode"
                                    name="address.zipcode"
                                    value={personalData.address?.zipcode}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    label="Woonplaats"
                                    name="address.city"
                                    value={personalData.address?.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                className="bg-[#004A99] hover:bg-blue-400 text-white text-lg font-semibold px-10 py-2 rounded transition-colors"
                                type="submit"
                            >
                                Opslaan
                            </button>
                        </div>
                    </form>
                </DropdownSection>
            </div>
        </div>
    );
}

export default EditPersonalPage;
