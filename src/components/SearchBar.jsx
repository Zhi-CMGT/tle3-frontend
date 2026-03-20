import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router";

const SearchBar = ({allItems}) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);

        if (val.trim().length < 2) {
            setSuggestions([]);
            setOpen(false);
            return;
        }

        const q = val.toLowerCase();
        const results = allItems.filter(
            (item) =>
                item.name.toLowerCase().includes(q) ||
                item.category.toLowerCase().includes(q)
        );

        setSuggestions(results);
        setOpen(true);
    };

    const handleSelect = (item) => {
        setQuery(item.name);
        setOpen(false);

        if (item.customLink) {
            navigate(item.customLink);
            return;
        }

        if (item.isCategory) {
            navigate(`/${item.slug}`);
        } else {
            const slugRouteMap = {
                "wmo": "/WMO-help",
                "wmo-aanvragen": "/WMO-help",
            };

            const nameRouteMap = {
                "wmo aanvragen": "/WMO-help",
                "wmo": "/WMO-help",
            };

            const route =
                slugRouteMap[item.slug] ||
                nameRouteMap[item.name?.toLowerCase()] ||
                `/${item.categorySlug}/${item.slug}`;

            navigate(route);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestions.length > 0) handleSelect(suggestions[0]);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mt-6 sm:mt-8">

            <form onSubmit={handleSubmit} role="search">
                <label htmlFor="search-input" className="sr-only">
                    Zoek naar onderwerpen binnen de website
                </label>

                <div
                    className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">

                    {/* Icon */}
                    <span className="hidden sm:block pl-5 text-gray-400 text-xl">
                        🔍
                    </span>

                    {/* Input */}
                    <input
                        id="search-input"
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Zoek op onderwerp, bijv. WMO aanvragen..."
                        className="flex-1 px-4 py-3 sm:py-4 text-gray-800 text-sm sm:text-base outline-none bg-transparent placeholder-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                        aria-expanded={open}
                        aria-controls="search-suggestions"
                        role="combobox"
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="m-2 sm:ml-2 px-4 sm:px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                    >
                        Zoeken
                    </button>
                </div>
            </form>

            {/* Suggestions */}
            {open && suggestions.length > 0 && (
                <div
                    id="search-suggestions"
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[200] overflow-hidden text-left max-h-80 overflow-y-auto"
                >
                    {suggestions.map((item) => (
                        <button
                            key={`${item.categorySlug}-${item.slug}`}
                            onClick={() => handleSelect(item)}
                            className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 hover:bg-blue-50 transition-colors text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                        >
                            <span
                                className="text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5">
                                {item.category}
                            </span>
                            <span className="text-gray-800 font-medium text-sm sm:text-base">
                                {item.name}
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* No results */}
            {open && suggestions.length === 0 && query.length >= 2 && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[200] px-4 sm:px-5 py-4 text-gray-500 text-sm"
                >
                    Geen resultaten gevonden voor &ldquo;{query}&rdquo;
                </div>
            )}
        </div>
    );
};

export default SearchBar;