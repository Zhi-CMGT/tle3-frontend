import React from 'react';
import PersonalDataGrid from './PersonalDataGrid.jsx';

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

const ProfileCard = ({personalData, openDropdown, toggleDropdown, formatDate}) => (
    <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-sm px-10 py-10 flex flex-col gap-3">
        <DropdownSection
            title="Mijn gegevens"
            isOpen={openDropdown === 'gegevens'}
            onClick={() => toggleDropdown('gegevens')}
        >
            <PersonalDataGrid personalData={personalData} formatDate={formatDate}/>
        </DropdownSection>

        <DropdownSection
            title="Mijn documenten"
            isOpen={openDropdown === 'documenten'}
            onClick={() => toggleDropdown('documenten')}
        >
            <div className="pt-5">
                <p className="text-lg text-gray-500">Paspoort, rijbewijs, etc.</p>
            </div>
        </DropdownSection>

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
);

export default ProfileCard;