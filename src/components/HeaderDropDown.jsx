import {useState} from "react";
import {Link} from "react-router";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const aanvragenItems = [
        {label: "WMO aanvragen", to: "/WMO-help"},
        {label: "Paspoort aanvragen", to: "/paspoort-aanvragen"},
        {label: "Huurtoeslag aanvragen", to: "/huurtoeslag"},
        {label: "Bijzondere bijstand aanvragen", to: "/bijzondere-bijstand"},
    ];

    const regelenItems = [
        {label: "Melding openbare ruimte doen", to: "/melding-openbare-ruimte"},
        {label: "Overlijden melden", to: "/overlijden-melden"},
        {label: "Adres wijzigen", to: "/adres-wijzigen"},
        {label: "Afval aanmelden", to: "/afval-aanmelden"},
    ];

    return (
        <>
            <header className="relative z-50">
                <div className="flex items-center justify-between p-4">
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="flex items-center gap-2 bg-blue-800 text-white px-5 py-2 rounded-full hover:cursor-pointer hover:bg-blue-900 transition z-50 relative"
                    >
                        Aanvragen of regelen
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="4" y1="6" x2="20" y2="6"/>
                            <line x1="4" y1="12" x2="20" y2="12"/>
                            <line x1="4" y1="18" x2="20" y2="18"/>
                        </svg>
                    </button>
                </div>
            </header>

            <div
                onClick={() => setMenuOpen(false)}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* Dropdown / mobile menu */}
            <div
                className={`fixed inset-x-0 top-0 z-50 w-full bg-white shadow-lg transition-all duration-300 ease-out ${
                    menuOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-4 opacity-0 pointer-events-none"
                }`}
            >
                <div className="mx-auto max-w-7xl px-4 py-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[#004A99] font-semibold">Vind hier snel uw aanvraag of situatie die u wilt regelen!</span>

                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-[#004A99] text-2xl leading-none hover:cursor-pointer"
                            aria-label="Sluiten"
                        >
                            ×
                        </button>
                    </div>

                    <nav className="mt-6 flex flex-col gap-6">
                        <div>
                            <div className="text-sm font-semibold text-[#004A99] mb-3">Aanvragen</div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {aanvragenItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        onClick={() => setMenuOpen(false)}
                                        className="block w-full bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-[#004A99] font-medium hover:bg-blue-100 transition text-center"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-sm font-semibold text-[#004A99] mb-3">Regelen</div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {regelenItems.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        onClick={() => setMenuOpen(false)}
                                        className="block w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#004A99] font-medium hover:bg-gray-50 transition text-center"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
