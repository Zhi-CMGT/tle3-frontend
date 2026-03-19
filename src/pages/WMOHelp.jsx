import React from 'react';
import {Link} from 'react-router';

function WMOHelp() {

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
                        <li>U aanpast vervoer nodig heeft</li>
                        <li>U zonder ondersteuning niet zelfstandig thuis kunt blijven wonen</li>
                    </ul>
                    <p className="text-sm text-gray-700 italic mt-4">
                        De gemeente kijkt altijd eerst naar wat u zelf nog kunt en of mensen in uw omgeving kunnen
                        helpen. Daarna bepalen we samen of en hoe de gemeente ondersteuning kan bieden.
                    </p>
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
                        maatwerk­voorziening is aangevraagd. Gemeente Zuidplas blijft als de declaraties en de factu­ren
                        van zorgaanbieders verwerken en afhandelen. Voor alle andere inhoudelijke vragen die over hulp
                        en ondersteuning gaan kun je bij Stichting ZO! terecht. De beschikking wordt door de gemeente
                        opgesteld, daarmee blijft het college van burgemeester en wethouders verantwoordelijk voor het
                        besluit. Mocht je bezwaar hebben tegen het besluit, ga dan naar de pagina 'Bezwaar maken'.
                    </p>
                </div>
            ),
        },
        {
            title: 'WMO aanvragen bij Stichting ZO!',
            content: (
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-gray-900 mb-3">Stichting ZO!</h4>
                        <p className="text-sm leading-relaxed text-gray-700 mb-3">
                            Stichting ZO! is er voor iedere inwoner van gemeente Zuidplas die een vraag heeft over
                            welzijn en zorg. Bij Stichting ZO! kun je terecht voor alle vragen en zorgen over geldzaken,
                            wonen, school, (mantel)zorg, jeugdhulp, gezin/relatie, inburgering en ouder worden.
                            Daarnaast kun je er terecht voor informatie rond vrijwilligerswerk
                            (www.stzo.nl/vrijwilligerswerk), voor inzet in jouw buurt (www.stzo.nl/zuidplasverbindt)
                            voor meerdoen aan veel verschillende activiteiten voor alle leeftijden
                            (www.stzo.nl/activiteiten).
                        </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-300 p-4 rounded">
                        <h5 className="font-bold text-gray-900 mb-2">Wat is Stichting ZO!</h5>
                        <p className="text-sm text-gray-700">
                            Makkelijk en snel toegang tot zorg, welzijn en ondersteuning. Dat is het doel van Stichting
                            ZO! Sinds 2021 is ZO! de plek waar ervaring en kennis in de gemeente Zuidplas op één plek
                            samenkomt. ZO! gaat uit van samenwerking en van eigen kracht. Tijdens onze activiteiten en
                            diensten staan ontmoeten, ontdekken, omarmen en ondersteunen centraal.
                        </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-300 p-4 rounded">
                        <h5 className="font-bold text-gray-900 mb-2">Zovoerelkaar</h5>
                        <p className="text-sm text-gray-700 mb-2">
                            ZO! is ook de initiatiefnemer van de website www.zovoerelkaar.nl. Dit is het digitale
                            dorpsplein van Zuidplas waar iedereen onder meer berichten, activiteiten en
                            vrijwilligerswerk kan plaatsen. Er is een nauwe samenwerking tussen Stichting ZO! en de
                            gemeente Zuidplas.
                        </p>
                        <p className="text-sm text-gray-700">
                            <span
                                className="font-semibold">Bekijk hier ook de flyer in pdf format over Stichting ZO!</span>
                        </p>
                    </div>

                    <Link
                        to="/wmo-form"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                        Wmo-melding doen
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </Link>

                    <div className="bg-blue-50 border border-blue-300 p-4 rounded">
                        <h5 className="font-bold text-gray-900 mb-3">Wat regel je nog meer via Stichting ZO!</h5>
                        <p className="text-sm text-gray-700 mb-3">
                            Je kunt er terecht voor je informatie over vrijwilligerswerk, voor inzet in jouw buurt en
                            voor meerdoen aan veel verschillende activiteiten voor alle leeftijden. Daarnaast kun je er
                            terecht voor Zorg en hulp, onder andere:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                            <li><span className="underline">Jeugdhulp</span></li>
                            <li><span className="underline">Jeugdgezondheidszorg</span></li>
                            <li><span className="underline">Inburgeren (civic integration programme)</span></li>
                        </ul>
                        <p className="text-sm text-gray-700 mb-3">
                            Geldzaken (kijk ook op de pagina 'Geldzaken bij Stichting ZO!'), onder andere:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                            <li><span className="underline">Budgetmaatjes</span></li>
                            <li><span className="underline">De sociaal raadsvrouw</span></li>
                            <li><span className="underline">De Postkamer</span></li>
                            <li><span className="underline">Beginnende schulden</span></li>
                            <li><span className="underline">Kindpakket</span></li>
                        </ul>
                        <p className="text-sm text-gray-700 font-semibold mb-3">
                            Vrijwilligerswerk:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 mb-4">
                            <li><span className="underline">Vrijwilligerswerk</span></li>
                            <li><span className="underline">Vrijwilligersverzekering</span></li>
                            <li><span className="underline">Vrijwilligerswaardering</span></li>
                            <li><span className="underline">Vrijwilligers Informatie Punt (VIP)</span></li>
                            <li><span className="underline">Rechten en plichten van vrijwilligers</span></li>
                        </ul>
                        <p className="text-sm text-gray-700">
                            Daarnaast kun je hier terecht voor alle informatie rond vrijwilligerswerk, voor inzet in
                            jouw buurt en voor meerdoen aan veel verschillende activiteiten voor alle leeftijden.
                        </p>
                    </div>

                    <button
                        onClick={() => window.open('https://www.stzo.nl', '_blank')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                    >
                        www.stzo.nl
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </button>

                    <div className="bg-blue-50 border border-blue-300 p-4 rounded">
                        <h5 className="font-bold text-gray-900 mb-2">Vragen of meer informatie</h5>
                        <p className="text-sm text-gray-700 mb-3">
                            Voor meer informatie of vragen kun je contact opnemen met de medewerkers van Stichting ZO!
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>(0180) 310 050 (bereikbaar op werkdagen tussen 08.30 uur en 16.30 uur)</li>
                            <li><span className="underline">Info@stzo.nl</span></li>
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <main className="min-h-screen">
            <section className="bg-blue-50 border-b border-gray-300">
                <div className="mx-auto max-w-3xl px-6 py-12">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-2">
                            WMO
                        </h1>
                        <h2 className="text-2xl text-gray-900 font-medium mb-6">
                            Wet maatschappelijke ondersteuning
                        </h2>
                        <p className="text-gray-700 text-center max-w-2xl mx-auto">
                            Heeft u door ziekte, een handicap of ouderdom moeite nodig bij uw dagelijks leven? Zoals
                            hulp bij het huishouden of vervoer? Of heeft u een voorziening nodig, zoals een traplift in
                            huis? De gemeente kan u daarbij helpen via de Wmo (Wet maatschappelijke ondersteuning).
                        </p>
                    </div>
                </div>
            </section>

        </main>
    );
}

export default WMOHelp;