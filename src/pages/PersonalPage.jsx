import React, {useState, useEffect} from 'react';
import DecorativeCircles from '../components/DecorativeCircles.jsx';

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
        >
            <span>{title}</span>
            <ChevronIcon isOpen={isOpen}/>
        </button>
        <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
            <div className="px-8 pb-6 border-t border-gray-100">{children}</div>
        </div>
    </div>
);

const DataField = ({label, value}) => (
    <div className="mb-4">
        <p className="text-sm text-gray-400 mb-0.5">{label}</p>
        <p className="text-base text-gray-800 font-medium">{value || '—'}</p>
    </div>
);

function PersonalPage() {
    const [personalData, setPersonalData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDropdown, setOpenDropdown] = useState(null);

    useEffect(() => {
        const fetchPersonalData = async () => {
            try {
                const response = await fetch(
                    `http://145.24.237.215:8000/api/user/69b157e7c5851af11eca54de`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                );
                if (!response.ok) throw new Error('Netwerk response was niet ok!');
                const data = await response.json();
                console.log(data);
                setPersonalData(data.user);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPersonalData();
    }, []);

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
            <div
                className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-sm px-10 py-10 flex flex-col gap-3">
                {/* Dropdown: Mijn gegevens */}
                <DropdownSection
                    title="Mijn gegevens"
                    isOpen={openDropdown === 'gegevens'}
                    onClick={() => toggleDropdown('gegevens')}
                >
                    {personalData ? (
                        <div className="grid grid-cols-2 gap-x-8 pt-5">
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                                    Identiteitsgegevens
                                </p>
                                <DataField label="Voornamen" value={personalData.first_name}/>
                                <DataField
                                    label="Geslachtsnaam"
                                    value={personalData.last_name}
                                />
                                <DataField label="Geslacht" value={personalData.gender}/>
                                <DataField
                                    label="Burgerservicenummer"
                                    value={personalData.bsn}
                                />
                                <DataField
                                    label="Geboortedatum"
                                    value={formatDate(personalData.birth_date)}
                                />
                                <DataField label="Email" value={personalData.email}/>
                                <DataField
                                    label="Telefoonnummer"
                                    value={personalData.phone_number}
                                />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                                    Adresgegevens
                                </p>
                                <DataField
                                    label="Straat"
                                    value={personalData.address?.street}
                                />
                                <DataField
                                    label="Huisnummer"
                                    value={personalData.address?.number}
                                />
                                <DataField
                                    label="Postcode"
                                    value={personalData.address?.zipcode}
                                />
                                <DataField
                                    label="Woonplaatsnaam"
                                    value={personalData.address?.city}
                                />
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-400 pt-4">
                            Geen gegevens gevonden.
                        </p>
                    )}
                </DropdownSection>

                {/* Dropdown: Mijn documenten */}
                <DropdownSection
                    title="Mijn documenten"
                    isOpen={openDropdown === 'documenten'}
                    onClick={() => toggleDropdown('documenten')}
                >
                    <div className="pt-5">
                        <p className="text-lg text-gray-500">Paspoort, rijbewijs, etc.</p>
                    </div>
                </DropdownSection>

                {/* Dropdown: Mijn aanvraag status */}
                <DropdownSection
                    title="Mijn aanvraag status"
                    isOpen={openDropdown === 'status'}
                    onClick={() => toggleDropdown('status')}
                >
                    <div className="pt-5">
                        <p className="text-lg text-gray-500">Status van je aanvragen.</p>
                    </div>
                </DropdownSection>
            </div>
        </div>
    );
}

export default PersonalPage;
