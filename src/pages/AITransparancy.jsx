import React, {useState} from 'react';
import {Link} from 'react-router';

function DropdownSection({title, children, color = "gray"}) {
    const [open, setOpen] = useState(false);

    const colorStyles = {
        gray: "text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
        blue: "text-blue-800 hover:bg-blue-50 focus:ring-blue-300 bg-blue-50"
    };

    return (
        <div className="rounded-lg border bg-white">
            <button
                type="button"
                className={`w-full flex items-center justify-between px-4 py-3 text-left font-medium rounded-t-lg focus:outline-none focus:ring-2 ${colorStyles[color]}`}
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
            >
                <span>{title}</span>
                <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
            </button>

            <div
                className={`px-4 pb-4 transition-all ${open ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {children}
            </div>
        </div>
    );
}

function AccordionItem({title, content, isOpen, onToggle}) {
    return (
        <div className="mb-4 rounded-2xl border bg-white overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-6 py-5 text-gray-700 font-medium text-base hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
                type="button"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <span className="text-gray-400">{isOpen ? '▴' : '▾'}</span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 border-t border-gray-100">
                    {content}
                </div>
            </div>
        </div>
    );
}

function AITransparency() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (i) => {
        setOpenIndex(prev => (prev === i ? null : i));
    };

    const accordionItems = [
        {
            title: 'Wat betekent AI-transparantie?',
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">
                        AI-transparantie betekent dat wij duidelijk uitleggen hoe ons systeem werkt en hoe jouw gegevens
                        worden gebruikt.
                        Ons doel is dat jij begrijpt welke informatie wordt verzameld, waarom dit gebeurt en hoe dit
                        jouw ervaring verbetert.
                    </p>
                    <p className="font-semibold text-sm">Wij vinden het belangrijk dat:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>Je weet welke data wordt verzameld</li>
                        <li>Je controle hebt over jouw gegevens</li>
                        <li>Onze AI eerlijk en veilig wordt gebruikt</li>
                        <li>Beslissingen van AI begrijpelijk zijn</li>
                    </ul>
                </div>
            ),
        },
        {
            title: 'Hoe gebruiken wij jouw gegevens?',
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">
                        Wij gebruiken jouw gegevens om onze AI-systemen beter en persoonlijker te maken.
                        Dit kan bijvoorbeeld gaan om het verbeteren van aanbevelingen, het versnellen van processen
                        of het aanpassen van content op jouw voorkeuren.
                    </p>
                    <p className="text-sm">
                        Jouw gegevens worden nooit zonder reden gebruikt en altijd volgens de geldende privacyregels.
                    </p>
                </div>
            ),
        },
        {
            title: 'Hoe werkt ons AI-systeem?',
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">
                        Hieronder leggen we stap voor stap uit hoe ons AI-systeem jouw gegevens verwerkt en gebruikt.
                    </p>

                    <div className="space-y-3">
                        <DropdownSection title="1. Gegevens verzamelen">
                            <div className="text-sm space-y-2">
                                <p>Wij verzamelen alleen gegevens die nodig zijn, zoals:</p>
                                <ul className="list-disc list-inside">
                                    <li>Gebruikersinteracties (zoals klikken en voorkeuren)</li>
                                    <li>Basisinformatie die je zelf invoert</li>
                                    <li>Technische gegevens (zoals apparaat en browser)</li>
                                </ul>
                            </div>
                        </DropdownSection>

                        <DropdownSection title="2. Verwerking en analyse">
                            <div className="text-sm space-y-2">
                                <p>
                                    Onze AI analyseert de gegevens om patronen te herkennen en de service te verbeteren.
                                </p>
                                <ol className="list-decimal list-inside">
                                    <p className="text-2xl">Wat gebeurt er:</p>
                                    <li>Gegevens worden veilig opgeslagen</li>
                                    <li>AI-modellen analyseren gedrag en voorkeuren</li>
                                    <li>Resultaten worden gebruikt om jouw ervaring te verbeteren</li>

                                    <p className="text-2xl">Jouw controle:</p>
                                    <li>Je kunt altijd jouw gegevens bekijken of aanpassen</li>
                                    <li>Je kunt instellingen wijzigen via je profiel</li>
                                </ol>
                            </div>
                        </DropdownSection>

                        <DropdownSection title="3. Transparantie en controle">
                            <div className="text-sm space-y-2">
                                <p>
                                    Wij vinden het belangrijk dat jij controle houdt over jouw data.
                                </p>
                                <ul className="list-disc list-inside">
                                    <li>Je kunt gegevens laten verwijderen</li>
                                    <li>Je kunt toestemming intrekken</li>
                                    <li>Je kunt inzicht krijgen in hoe AI beslissingen maakt</li>
                                </ul>
                                <div className="pt-2">
                                    <Link to="/privacy-instellingen" className="text-blue-700 hover:underline">
                                        Naar privacy instellingen
                                    </Link>
                                </div>
                            </div>
                        </DropdownSection>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <main className="px-4 sm:px-6 py-6 sm:py-10">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">AI Transparantie & Datagebruik</h1>

                <div className="space-y-4">
                    {accordionItems.map((it, idx) => (
                        <AccordionItem
                            key={idx}
                            title={it.title}
                            content={it.content}
                            isOpen={openIndex === idx}
                            onToggle={() => handleToggle(idx)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default AITransparency;