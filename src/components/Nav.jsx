import {Link} from "react-router";
import HeaderDropdown from "./HeaderDropDown.jsx";

function Nav() {
    return (
        <nav className="bg-white border-b shadow-sm relative z-20">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">

                {/* Left side */}
                <div className="flex items-center gap-8">

                    {/* Logo placeholder */}

                    <div className="flex w-40 h-20 items-center gap-3">
                        <img src="/images/ZuidplasLogo.png" alt={"Logo Zuidplas"}/>
                    </div>

                    {/* Navigation links */}
                    <div className="flex gap-6 text-gray-700 items-center">

                        <Link to="/" className="hover:text-blue-700">
                            Home
                        </Link>

                        <Link to="/login" className="hover:text-blue-700">
                            Inloggen bij mijn Gemeente
                        </Link>

                        <Link to="/" className="hover:text-blue-700">
                            Contact opnemen
                        </Link>

                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">

                    {/* Main action button */}
                    <HeaderDropdown/>

                    {/* Search bar */}
                    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">

                        <input
                            type="text"
                            className="bg-transparent outline-none w-32"
                        />

                        <svg
                            className="w-4 h-4 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>

                    </div>

                    {/* Profile icon */}
                    <Link to="/Persoonlijke-pagina" className="hover:text-blue-700">
                        <div className="bg-blue-800 p-2 rounded-lg text-white">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="8" r="4"/>
                                <path d="M4 20c2-4 6-6 8-6s6 2 8 6"/>
                            </svg>
                        </div>
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Nav;