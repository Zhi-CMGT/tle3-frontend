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
        <nav
            className="bg-white border-b shadow-sm relative z-20"
            aria-label="Hoofdnavigatie"
        >
            <div className="container mx-auto flex flex-wrap items-center justify-between px-4 md:px-6 py-4 gap-y-4">

                {/* Left side */}
                <div className="flex flex-wrap items-center gap-6 w-full md:w-auto">

                    {/* Logo */}
                    <div className="flex w-32 md:w-40 h-16 md:h-20 items-center">
                        <img
                            src="/images/ZuidplasLogo.png"
                            alt="Logo van gemeente Zuidplas"
                            className="object-contain w-full h-full"
                        />
                    </div>

                    {/* Navigation links */}
                    <ul className="flex flex-wrap gap-4 md:gap-6 text-gray-800 items-center">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-blue-700 focus-visible:outline focus-visible:outline-blue-600 rounded"
                                aria-current={location.pathname === "/" ? "page" : undefined}
                            >
                                Home
                            </Link>
                        </li>

                        <li>
                            {isAuthenticated ? (
                                <Link
                                    to="/Persoonlijke-pagina"
                                    className="hover:text-blue-700 focus-visible:outline focus-visible:outline-blue-600 rounded"
                                >
                                    Mijn gemeente
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <span
                                        className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 focus-visible:outline focus-visible:outline-blue-600"
                                    >
                                        Inloggen bij mijn Gemeente
                                    </span>
                                </Link>
                            )}
                        </li>

                        <li>
                            <Link
                                to="/"
                                className="hover:text-blue-700 focus-visible:outline focus-visible:outline-blue-600 rounded"
                            >
                                Contact opnemen
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right side */}
                <div
                    className="flex flex-wrap items-center gap-3 md:gap-4 w-full md:w-auto justify-between md:justify-end">

                    {/* Dropdown */}
                    <HeaderDropdown/>

                    {/* Search */}
                    <form
                        role="search"
                        className="flex items-center bg-gray-100 rounded-full px-3 py-2"
                    >
                        <label htmlFor="nav-search" className="sr-only">
                            Zoeken
                        </label>

                        <input
                            id="nav-search"
                            type="text"
                            className="bg-transparent outline-none w-24 md:w-32 text-sm"
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

                    {/* Profile */}
                    <Link
                        to="/Persoonlijke-pagina"
                        className="hover:text-blue-700 focus-visible:outline focus-visible:outline-blue-600 rounded"
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

                    {/* Logout */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded focus-visible:outline focus-visible:outline-blue-600"
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