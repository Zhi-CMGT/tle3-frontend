import {useState} from "react";
import {Link} from "react-router";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

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
                        <span className="text-[#004A99] font-semibold">Menu</span>

                        <button
                            onClick={() => setMenuOpen(false)}
                            className="text-[#004A99] text-2xl leading-none hover:cursor-pointer"
                            aria-label="Sluiten"
                        >
                            ×
                        </button>
                    </div>

                    <nav className="mt-6 flex flex-col gap-4">
                        <Link
                            to="/"
                            className="text-[#004A99] hover:text-blue-700"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="text-[#004A99] hover:text-blue-700"
                            onClick={() => setMenuOpen(false)}
                        >
                            Over ons
                        </Link>
                        <Link
                            to="/contact"
                            className="text-[#004A99] hover:text-blue-700"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}