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

function WMOHelp() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (i) => {
        setOpenIndex(prev => (prev === i ? null : i));
    };

    const accordionItems = [
        {
            title: 'Wanneer hulp via WMO?',
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">
                        U kunt hulp via de WMO (Wet Maatschappelijke Ondersteuning) krijgen wanneer u door een
                        beperking, ziekte of ouderdom moeite heeft om zelfstandig te functioneren in het dagelijks
                        leven. Het doel van de WMO is om ervoor te zorgen dat u zo lang mogelijk zelfstandig thuis
                        blijven wonen en actief kunt deelnemen aan de samenleving.
                    </p>
                    <p className="font-semibold text-sm">U komt mogelijk in aanmerking voor ondersteuning wanneer:</p>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        <li>U het huishouden niet meer zelfstandig kunt doen</li>
                        <li>U moeite heeft met dagelijkse activiteiten, zoals boodschappen doen of administratie</li>
                        <li>U begeleiding nodig heeft bij het aanbrengen van structuur in uw dag</li>
                        <li>Uw woning aangepast moet worden (bijvoorbeeld met een traplift of aangepaste badkamer)</li>
                        <li>U aangepast vervoer nodig heeft</li>
                        <li>U zonder ondersteuning niet zelfstandig thuis kunt blijven wonen</li>
                    </ul>
                </div>
            ),
        },
        {
            title: 'Waarvoor kan je terecht bij de gemeente?',
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">
                        Als inwoner kun je met zorg- en ondersteuningsvragen bij Stichting ZO! terecht. De gemeente is
                        vooral verantwoordelijk voor de administratie en de financiële afwikkeling als er een
                        maatwerk­voorziening is aangevraagd. Voor alle andere inhoudelijke vragen die over hulp
                        en ondersteuning gaan kun je bij Stichting ZO! terecht.
                    </p>
                </div>
            ),
        },
        {
            title: 'WMO aanvragen bij Stichting ZO!',
            content: (
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">
                        Hieronder staat stap voor stap wat er gebeurt bij het aanvragen van WMO-hulp via Stichting ZO!.
                        Gebruik de drie uitklapbare secties om meer details te zien.
                    </p>

                    <div className="space-y-3">
                        <DropdownSection title="1. Voorbereiden: wat heeft u nodig?">
                            <div className="text-sm space-y-2">
                                <p>Voor de aanvraag heeft u meestal de volgende gegevens nodig:</p>
                                <ul className="list-disc list-inside">
                                    <li>Een geldig legitimatiebewijs</li>
                                    <li>Uw burgerservicenummer (BSN)</li>
                                    <li>Een beschrijving van de hulpvraag</li>
                                    <li>Eventuele medische documenten of verklaringen</li>
                                </ul>
                                <p className="text-sm">
                                    Tip: verzamel ook contactgegevens van eventueel betrokken mantelzorgers of
                                    hulpverleners.
                                </p>
                            </div>
                        </DropdownSection>

                        <DropdownSection title="2. Procedure: hoe wordt uw aanvraag behandeld?" color="blue">
                            <div className="text-sm space-y-2">
                                <p>
                                    Na indienen van uw WMO-formulier sturen wij die op naar Stichting ZO! De stappen
                                    voor uw aanvraag zijn als volgt:
                                </p>
                                <ol className="list-decimal list-inside">
                                    <p className="text-2xl">Voor u:</p>
                                    <li>Login bij uw gemeente, dit kan via de navigatie bar.</li>
                                    <li>Het invullen van Dit WMO-formulier
                                        <div className="mt-3">
                                            <Link
                                                to="/WMO-formulieren"
                                                className="inline-block bg-[#004A99] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                            >
                                                Naar WMO-formulier
                                            </Link>
                                        </div>
                                    </li>

                                    <p className="text-2xl">Voor ons:</p>
                                    <li>Intake en inventarisatie van uw situatie</li>
                                    <li>Beoordeling of er een maatwerkvoorziening nodig is</li>
                                    <li>Opstellen van een advies en eventuele beschikking door de gemeente</li>
                                </ol>
                            </div>
                        </DropdownSection>

                        <DropdownSection title="3. Nazorg en contact">
                            <div className="text-sm space-y-2">
                                <p>
                                    Nadat de voorziening is toegekend, kunt u contact houden voor vragen of wijzigingen.
                                    Veelgestelde acties:
                                </p>
                                <ul className="list-disc list-inside">
                                    <li>Wijzigen van contactgegevens</li>
                                    <li>Aanpassen van de zorg (bijvoorbeeld uren of type hulp)</li>
                                    <li>Bezwaar maken tegen een besluit (link hieronder)</li>
                                </ul>
                                <div className="pt-2">
                                    <Link to="/bezwaar-maken" className="text-blue-700 hover:underline">
                                        Naar pagina Bezwaar maken
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
                <h1 className="text-2xl font-bold mb-6">WMO - Veelgestelde vragen en informatie</h1>

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

export default WMOHelp;