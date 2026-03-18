import React from 'react';

const DataField = ({label, value}) => (
    <div className="mb-4">
        <p className="text-sm text-gray-400 mb-0.5">{label}</p>
        <p className="text-base text-gray-800 font-medium">{value || '—'}</p>
    </div>
);

const PersonalDataGrid = ({personalData, formatDate}) => {
    if (!personalData) {
        return (
            <p className="text-sm text-gray-400 pt-4">
                Geen gegevens gevonden.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-x-8 pt-5">
            <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                    Identiteitsgegevens
                </p>
                <DataField label="Voornamen" value={personalData.first_name}/>
                <DataField label="Geslachtsnaam" value={personalData.last_name}/>
                <DataField label="Geslacht" value={personalData.gender}/>
                <DataField label="Burgerservicenummer" value={personalData.bsn}/>
                <DataField label="Geboortedatum" value={formatDate(personalData.birth_date)}/>
                <DataField label="Email" value={personalData.email}/>
                <DataField label="Telefoonnummer" value={personalData.phone_number}/>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
                    Adresgegevens
                </p>
                <DataField label="Straat" value={personalData.address?.street}/>
                <DataField label="Huisnummer" value={personalData.address?.number}/>
                <DataField label="Postcode" value={personalData.address?.zipcode}/>
                <DataField label="Woonplaatsnaam" value={personalData.address?.city}/>
            </div>
        </div>
    );
};

export default PersonalDataGrid;