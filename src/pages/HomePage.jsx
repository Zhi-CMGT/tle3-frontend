import React, {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router";
import headerBg from "../assets/react.svg";
import omgevingImg from "../assets/react.svg";
import wonenImg from "../assets/react.svg";
import levenImg from "../assets/react.svg";
import zorgImg from "../assets/react.svg";

// --- DATA ---
const categories = [
    {
        id: 1,
        name: "Omgeving",
        slug: "omgeving",
        image: omgevingImg,
        subcategories: [
            {name: "Parkeren", slug: "parkeren"},
            {name: "Afval", slug: "afval"},
            {name: "Natuur", slug: "natuur"},
        ],
    },
    {
        id: 2,
        name: "Wonen",
        slug: "wonen",
        image: wonenImg,
        subcategories: [
            {name: "Verhuizen", slug: "verhuizen"},
            {name: "Belasting", slug: "belasting"},
            {name: "Verbouwen", slug: "verbouwen"},
        ],
    },
    {
        id: 3,
        name: "Leven",
        slug: "leven",
        image: levenImg,
        subcategories: [
            {name: "Trouwen", slug: "trouwen"},
            {name: "Scheiden", slug: "scheiden"},
            {name: "Geboorte", slug: "geboorte"},
        ],
    },
    {
        id: 4,
        name: "Zorg",
        slug: "zorg",
        image: zorgImg,
        subcategories: [
            {name: "WMO", slug: "wmo"},
            {name: "Vluchtelingen", slug: "vluchtelingen"},
            {name: "Tijdelijke ondersteuning", slug: "tijdelijke-ondersteuning"},
        ],
    },
];

const mostSearched = [
    {name: "Paspoort aanvragen", slug: "paspoort-aanvragen", category: "Leven"},
    {name: "Parkeervergunning", slug: "parkeervergunning", category: "Omgeving"},
    {name: "WMO aanvragen", slug: "wmo", category: "Zorg"},
    {name: "Verhuizing doorgeven", slug: "verhuizen", category: "Wonen"},
];

// Flatten all subcategories for search
const allItems = categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
        ...sub,
        category: cat.name,
        categorySlug: cat.slug,
    }))
);

// --- API CONFIG ---
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
const API_KEY = import.meta.env.VITE_API_KEY || "";

// --- COMPONENTS ---

const SearchBar = ({onResults}) => {
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
        navigate(`/${item.categorySlug}/${item.slug}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestions.length > 0) handleSelect(suggestions[0]);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl">
            <form onSubmit={handleSubmit}>
                <div
                    className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                    <span className="pl-5 text-gray-400 text-xl">🔍</span>
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Zoek op onderwerp, bijv. WMO aanvragen..."
                        className="flex-1 px-4 py-4 text-gray-800 text-base outline-none bg-transparent placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="m-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
                    >
                        Zoeken
                    </button>
                </div>
            </form>

            {open && suggestions.length > 0 && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                    {suggestions.map((item) => (
                        <button
                            key={`${item.categorySlug}-${item.slug}`}
                            onClick={() => handleSelect(item)}
                            className="w-full flex items-center gap-3 px-5 py-3 hover:bg-blue-50 transition-colors text-left"
                        >
                            <span
                                className="text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-2.5 py-0.5">
                                {item.category}
                            </span>
                            <span className="text-gray-800 font-medium">{item.name}</span>
                        </button>
                    ))}
                </div>
            )}

            {open && suggestions.length === 0 && query.length >= 2 && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 px-5 py-4 text-gray-500 text-sm">
                    Geen resultaten gevonden voor &ldquo;{query}&rdquo;
                </div>
            )}
        </div>
    );
};

const RelevantSection = ({user}) => {
    const navigate = useNavigate();
    // In a real app, these would come from user profile / API
    const relevantItems = allItems.filter((item) =>
        user?.relevantSlugs?.includes(item.slug)
    ) || allItems.slice(0, 3);

    const items = relevantItems.length > 0 ? relevantItems : allItems.slice(0, 3);

    return (
        <div className="mt-5 w-full max-w-2xl">
            <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-2">
                Relevant voor jou
            </p>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <button
                        key={item.slug}
                        onClick={() => navigate(`/${item.categorySlug}/${item.slug}`)}
                        className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full border border-white/30 transition-all duration-200 hover:scale-105"
                    >
                        <span className="text-xs opacity-70">{item.category}</span>
                        <span className="w-px h-3 bg-white/40"/>
                        <span className="font-medium">{item.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const MostSearchedStrip = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3 flex-wrap">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest shrink-0">
                    Meest gezocht:
                </span>
                {mostSearched.map((item) => (
                    <button
                        key={item.slug}
                        onClick={() => navigate(`/${item.slug}`)}
                        className="flex items-center gap-1.5 bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 text-sm px-4 py-1.5 rounded-full transition-all duration-200 shadow-sm"
                    >
                        {item.name}
                    </button>
                ))}
                <button
                    onClick={() => navigate("/onderwerpen")}
                    className="ml-auto flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors duration-200 shadow-sm shrink-0"
                >
                    Alle onderwerpen →
                </button>
            </div>
        </section>
    );
};

const CategoryCard = ({category}) => {
    const navigate = useNavigate();
    return (
        <div
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-gray-100">

            {/* Titel */}
            <div className="px-5 pt-5 pb-2">
                <h3 className="text-base font-bold text-gray-900 text-center">
                    {category.name}
                </h3>
            </div>

            {/* Subcategorieën */}
            <div className="px-5 pb-4 flex flex-col gap-0.5">
                {category.subcategories.map((sub) => (
                    <button
                        key={sub.slug}
                        onClick={() => navigate(`/${category.slug}/${sub.slug}`)}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-150 py-1 text-left w-full"
                    >
                        <span className="text-gray-500 font-semibold text-xs">›</span>
                        <span>{sub.name}</span>
                    </button>
                ))}
            </div>

            {/* Foto onderaan */}
            <div className="h-36 overflow-hidden">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

const HomePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const fetchUser = async () => {
            try {
                const res = await fetch(`${API_BASE}/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "x-api-key": API_KEY,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) throw new Error("Unauthorized");
                const data = await res.json();
                setUser(data);
            } catch {
                localStorage.removeItem("token");
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* ── HEADER ── */}
            <header className="relative overflow-hidden">
                {/* Background image with overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${headerBg})`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-indigo-900/80"/>

                {/* Hero content */}
                <div
                    className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
                        Hoe kunnen wij <span className="text-yellow-300">helpen?</span>
                    </h1>
                    <p className="text-white/70 text-lg mb-8 max-w-lg">
                        Vind snel wat u nodig heeft via gemeente diensten en informatie.
                    </p>

                    <SearchBar/>

                    {/* Relevant voor jou — alleen zichtbaar als ingelogd */}
                    {user && <RelevantSection user={user}/>}
                </div>
            </header>

            {/* ── MEEST GEZOCHT STRIP ── */}
            <MostSearchedStrip/>

            {/* ── CATEGORIE BLOKKEN ── */}
            <main className="max-w-6xl mx-auto px-6 py-14">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                        Alle onderwerpen
                    </h2>
                    <p className="text-gray-500 mt-2 text-base">
                        Kies een categorie en ga direct naar uw gewenste dienst.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <CategoryCard key={cat.id} category={cat}/>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomePage;