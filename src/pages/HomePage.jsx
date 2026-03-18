import React, {useState, useEffect, useMemo, useRef} from "react";
import {useNavigate} from "react-router";
import headerBg from "../assets/react.svg";

const mostSearched = [
    {name: "Paspoort aanvragen", slug: "paspoort-aanvragen", category: "Leven"},
    {name: "Parkeervergunning", slug: "parkeervergunning", category: "Omgeving"},
    {name: "WMO aanvragen", slug: "wmo", category: "Zorg"},
    {name: "Verhuizing doorgeven", slug: "verhuizen", category: "Wonen"},
];

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
        navigate(`/${item.categorySlug}/${item.slug}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestions.length > 0) handleSelect(suggestions[0]);
    };

    return (
        <div ref={wrapperRef} className="relative w-full max-w-2xl mt-8">
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
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden text-left">
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

const RelevantSection = ({user, allItems}) => {
    const navigate = useNavigate();
    const relevantItems = allItems.filter((item) =>
        user?.relevantSlugs?.includes(item.slug)
    );
    const items = relevantItems.length > 0 ? relevantItems : allItems.slice(0, 3);

    return (
        <div className="mt-5 w-full max-w-2xl">
            <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-2">
                Relevant voor jou
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
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
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
            <div className="px-5 pt-5 pb-2">
                <h3 className="text-base font-bold text-gray-900 text-center">
                    {category.name}
                </h3>
            </div>

            <div className="px-5 pb-4 flex flex-col gap-0.5 flex-grow">
                {(category.subcategories ?? []).map((sub) => (
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

            <div className="h-36 overflow-hidden bg-blue-50 mt-auto">
                {category.image ? (
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl select-none text-blue-200">
                        📁
                    </div>
                )}
            </div>
        </div>
    );
};

const CategoryCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
        <div className="px-5 pt-5 pb-2">
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"/>
        </div>
        <div className="px-5 pb-4 flex flex-col gap-2">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-3 bg-gray-100 rounded w-3/4"/>
            ))}
        </div>
        <div className="h-36 bg-gray-100"/>
    </div>
);

// --- MAIN PAGE ---

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URI}categories`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "x-api-key": import.meta.env.VITE_API_KEY,
                        }
                    });

                if (!response.ok) throw new Error(`Fout: ${response.status}`);
                const data = await response.json();
                setCategories(data);
                console.log(data);
            } catch (err) {
                console.error("Categorieën ophalen mislukt:", err);
                setCategoriesError(err.message);
            } finally {
                setCategoriesLoading(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token) {
            setUserLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const url = userId
                    ? `${import.meta.env.VITE_BASE_URI}user/${userId}`
                    : `${import.meta.env.VITE_BASE_URI}user`;

                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "x-api-key": import.meta.env.VITE_API_KEY,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                });

                if (!res.ok) {
                    if (res.status === 401) {
                        localStorage.removeItem("token");
                        setUser(null);
                    }
                    throw new Error("Unauthorized");
                }

                const data = await res.json();
                setUser(data.user || data);
            } catch (err) {
                console.error('Failed to fetch user in HomePage:', err);
                setUser(null);
            } finally {
                setUserLoading(false);
            }
        };

        fetchUser();
    }, []);

    const allItems = useMemo(
        () =>
            categories.flatMap((cat) =>
                (cat.subcategories ?? []).map((sub) => ({
                    ...sub,
                    category: cat.name,
                    categorySlug: cat.slug ?? cat.name.toLowerCase().replace(/\s+/g, "-"),
                }))
            ),
        [categories]
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: `url(${headerBg})`}}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-indigo-900/80"/>

                <div
                    className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-20 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
                        Hoe kunnen wij <span className="text-yellow-300">helpen?</span>
                    </h1>
                    <p className="text-white/70 text-lg mb-8 max-w-lg">
                        Vind snel wat u nodig heeft via gemeente diensten en informatie.
                    </p>

                    <SearchBar allItems={allItems}/>

                    {!userLoading && user && (
                        <RelevantSection user={user} allItems={allItems}/>
                    )}
                </div>
            </header>

            <MostSearchedStrip/>

            <main className="max-w-6xl mx-auto px-6 py-14">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                        Alle onderwerpen
                    </h2>
                    <p className="text-gray-500 mt-2 text-base">
                        Kies een categorie en ga direct naar uw gewenste dienst.
                    </p>
                </div>

                {categoriesError && (
                    <p className="text-center py-10 text-red-500">
                        Categorieën konden niet worden geladen. Probeer het later opnieuw.
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categoriesLoading
                        ? [1, 2, 3, 4].map((i) => <CategoryCardSkeleton key={i}/>)
                        : categories.map((cat) => (
                            <CategoryCard key={cat.id} category={cat}/>
                        ))
                    }
                </div>
            </main>
        </div>
    );
};

export default HomePage;