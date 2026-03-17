import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#004A99] text-white rounded-t-2xl relative z-20">
            <div className="max-w-6xl mx-auto px-10 py-10 grid md:grid-cols-3 gap-10">

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>

                    <p className="text-sm leading-relaxed">
                        Raadhuisplein 1, 2914 KM <br/>
                        Postbus 100, 2910 AC <br/>
                        Nieuwerkerk aan den IJssel
                    </p>

                    <p className="text-sm mt-4 leading-relaxed">
                        Telefoon: (0180) 330 300 <br/>
                        WhatsApp: 06 51 96 46 99 <br/>
                        Gemeente@zuidplas.nl
                    </p>
                </div>

                {/* Social */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4">Volg ons op</h3>

                    <div className="flex justify-center gap-4">

                        {/* Facebook */}
                        {/* Facebook */}
                        <a href="https://www.facebook.com/Zuidplas" target="_blank" rel="noopener noreferrer"
                           className="bg-white text-[#004A99] p-2 rounded-full w-10 h-10 flex items-center justify-center hover:text-blue-700">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                                <path
                                    d="M22 12a10 10 0 10-11.6 9.9v-7h-2.7V12h2.7V9.8c0-2.7 1.6-4.2 4-4.2 1.2 0 2.4.2 2.4.2v2.6h-1.4c-1.4 0-1.8.8-1.8 1.7V12h3.1l-.5 2.9h-2.6v7A10 10 0 0022 12z"/>
                            </svg>
                        </a>

                        {/* X / Twitter */}
                        <a href="https://x.com/zuidplas" target="_blank" rel="noopener noreferrer"
                           className="bg-white text-[#004A99] p-2 rounded-full w-10 h-10 flex items-center justify-center hover:text-blue-700">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                                <path d="M18.2 2H21l-6.5 7.5L22 22h-6.8l-5.3-7L3.7 22H1l7-8L2 2h6.9l4.8 6.4L18.2 2z"/>
                            </svg>
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/gemeentezuidplas" target="_blank" rel="noopener noreferrer"
                           className="bg-white text-[#004A99] p-2 rounded-full w-10 h-10 flex items-center justify-center hover:text-blue-700">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                                <path
                                    d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.2A4.8 4.8 0 1016.8 12 4.8 4.8 0 0012 7.2zm6.2-.9a1.2 1.2 0 11-1.2-1.2 1.2 1.2 0 011.2 1.2z"/>
                            </svg>
                        </a>

                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com/company/gemeente-zuidplas/" target="_blank"
                           rel="noopener noreferrer"
                           className="bg-white text-[#004A99] p-2 rounded-full w-10 h-10 flex items-center justify-center hover:text-blue-700">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                                <path
                                    d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM0 8h5v16H0zM7 8h4.8v2.2h.1c.7-1.2 2.4-2.5 5-2.5 5.4 0 6.4 3.6 6.4 8.3V24h-5v-7.1c0-1.7 0-3.9-2.4-3.9s-2.8 1.9-2.8 3.8V24H7z"/>
                            </svg>
                        </a>

                    </div>
                </div>

                {/* Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Meer informatie</h3>

                    <ul className="text-sm space-y-1">
                        <li>Toegankelijkheid</li>
                        <li>Privacyverklaring</li>
                        <li>Huis- en gedragsregels</li>
                        <li>Kwetsbaarheid</li>
                        <li>Informatiebeveiliging melden</li>
                        <li>Openingstijden en contact</li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}