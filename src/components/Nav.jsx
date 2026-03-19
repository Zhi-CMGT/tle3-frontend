import React from "react";
import {Link, useNavigate, useLocation} from "react-router";
import HeaderDropdown from "./HeaderDropDown.jsx";
import {useAuth} from '../contexts/AuthContext.jsx';

function Nav() {
    const {isAuthenticated, logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white border-b shadow-sm relative z-20" aria-label="Hoofdnavigatie">

            {/* 🔹 MOBILE LAYOUT */}
            <div className="md:hidden container mx-auto px-4 py-4 flex flex-col gap-4">

                {/* Logo */}
                <div className="flex justify-center">
                    <img
                        src="/images/ZuidplasLogo.png"
                        alt="Logo van gemeente Zuidplas"
                        className="h-16 object-contain"
                    />
                </div>

                {/* Navigation links */}
                <ul className="flex justify-center items-center gap-4 flex-wrap text-gray-800">

                    <li>
                        <Link
                            to="/"
                            className="hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 rounded"
                            aria-current={location.pathname === "/" ? "page" : undefined}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        {isAuthenticated ? (
                            <Link
                                to="/Persoonlijke-pagina"
                                className="hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 rounded"
                            >
                                Mijn gemeente
                            </Link>
                        ) : (
                            <Link to="/login">
                                <span
                                    className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
                                    Inloggen bij mijn gemeente
                                </span>
                            </Link>
                        )}
                    </li>

                    {/* 🔹 ENIGE logout knop */}
                    {isAuthenticated && (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                            >
                                Uitloggen
                            </button>
                        </li>
                    )}
                </ul>

                {/* Search + Profile */}
                <div className="flex items-center gap-3">

                    <HeaderDropdown/>

                    <form role="search" className="flex items-center bg-gray-100 rounded-full px-3 py-2 flex-1">
                        <label htmlFor="nav-search" className="sr-only">Zoeken</label>
                        <input
                            id="nav-search"
                            type="text"
                            className="bg-transparent outline-none w-full text-sm"
                            placeholder="Zoeken..."
                        />
                        <svg
                            className="w-4 h-4 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </form>

                    <Link
                        to="/Persoonlijke-pagina"
                        className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 rounded"
                        aria-label="Ga naar persoonlijke pagina"
                    >
                        <div className="bg-blue-800 p-2 rounded-lg text-white">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <circle cx="12" cy="8" r="4"/>
                                <path d="M4 20c2-4 6-6 8-6s6 2 8 6"/>
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="hidden md:flex container mx-auto items-center justify-between px-6 py-4">

                {/* Left */}
                <div className="flex items-center gap-8">
                    <img
                        src="/images/ZuidplasLogo.png"
                        alt="Logo van gemeente Zuidplas"
                        className="h-16"
                    />

                    <div className="flex gap-6 text-gray-800 items-center">
                        <Link to="/" className="hover:text-blue-700">
                            Home
                        </Link>

                        {isAuthenticated ? (
                            <Link to="/Persoonlijke-pagina">
                                Mijn gemeente
                            </Link>
                        ) : (
                            <Link to="/login">
                                <span className="bg-blue-800 text-white px-4 py-2 rounded-full">
                                    Inloggen
                                </span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-4">

                    <HeaderDropdown/>

                    <form role="search" className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <input className="bg-transparent outline-none w-32"/>
                    </form>

                    <Link to="/Persoonlijke-pagina">
                        <div className="bg-blue-800 p-2 rounded-lg text-white">👤</div>
                    </Link>

                    {/* 🔹 DEZELFDE ENIGE logout knop */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded"
                        >
                            Uitloggen
                        </button>
                    )}

                </div>
            </div>

        </nav>
    );
}

export default Nav;