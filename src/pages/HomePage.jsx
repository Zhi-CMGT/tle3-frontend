import React, {useState, useEffect, useRef, useMemo} from "react";
import MostSearchedStrip from "../components/MostSearchedStrip";
import HomeHeader from "../components/HomeHeader";
import CategorySection from "../components/CategorySection";

const HomePage = () => {
    const mainHeadingRef = useRef(null);

    // Skip link visibility state
    const [showSkipLink, setShowSkipLink] = useState(false);
    const firstTabPressed = useRef(false); // track eerste Tab

    const skipToMain = (e) => {
        e.preventDefault();
        mainHeadingRef.current?.focus({preventScroll: false});
    };

    useEffect(() => {
        const handleTabPress = (e) => {
            if (e.key === "Tab" && !firstTabPressed.current) {
                // Eerste Tab → toon skip link
                setShowSkipLink(true);
                firstTabPressed.current = true;

                // Optioneel: fade out na 3 seconden (kan verwijderd worden als je direct wilt dat hij weggaat bij volgende Tab)
                setTimeout(() => setShowSkipLink(false), 3000);
            }
        };

        window.addEventListener("keydown", handleTabPress);
        return () => window.removeEventListener("keydown", handleTabPress);
    }, []);

    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);
    const [contentItems, setContentItems] = useState([]);
    const [contentLoading, setContentLoading] = useState(true);
    const [contentItemsError, setContentItemsError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URI}categories`, {
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
            } catch (err) {
                setCategoriesError(err.message);
            } finally {
                setCategoriesLoading(false);
            }
        };

        const fetchContentItems = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URI}content-items?limit=1000`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "x-api-key": import.meta.env.VITE_API_KEY,
                    }
                });
                if (!response.ok) throw new Error(`Fout: ${response.status}`);
                const data = await response.json();
                const items = Array.isArray(data) ? data : (data.items || data.data || []);
                setContentItems(items);
            } catch (err) {
                setContentItemsError(err.message);
            } finally {
                setContentLoading(false);
            }
        };

        fetchCategories();
        fetchContentItems();
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
                setUser(null);
            } finally {
                setUserLoading(false);
            }
        };

        const fetchRecommendations = async (uid, tok) => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BASE_URI}recommendations/user/${uid}?limit=4&persist=true`,
                    {
                        headers: {
                            Accept: 'application/json',
                            'x-api-key': import.meta.env.VITE_API_KEY,
                            Authorization: `Bearer ${tok}`,
                        },
                    }
                );
                if (!res.ok) return;
                const data = await res.json();
                const items = Array.isArray(data) ? data : (data.items || data.recommendations || []);
                setRecommendations(items.map(r => r.content || r.content_item || r));
            } catch {
            }
        };

        fetchUser();
        if (token && userId) fetchRecommendations(userId, token);

        const onAuthChanged = () => {
            const t = localStorage.getItem('token');
            const uid = localStorage.getItem('userId');
            if (!t) {
                setUser(null);
                setUserLoading(false);
                setRecommendations([]);
            } else {
                fetchUser();
                if (uid) fetchRecommendations(uid, t);
            }
        };
        window.addEventListener('authChanged', onAuthChanged);
        return () => window.removeEventListener('authChanged', onAuthChanged);
    }, []);

    const categoriesWithItems = useMemo(() => {
        if (!categories.length) return [];
        return categories.map(cat => {
            const matchingItems = contentItems.filter(item => {
                if (Array.isArray(item.category_ids)) return item.category_ids.includes(cat.id);
                if (item.category && typeof item.category === 'object' && item.category.id) return item.category.id === cat.id;
                if (item.category && typeof item.category === 'string') return item.category.toLowerCase() === cat.name.toLowerCase();
                return false;
            });

            const normalizedItems = matchingItems.map(item => ({
                id: item._id || item.id,
                name: item.title || item.name || "Naamloos",
                slug: item.slug || item._id || item.id || (item.title || item.name || "").toLowerCase().replace(/\s+/g, "-"),
            }));

            const subCats = (cat.subcategories || []).map(sub => ({
                id: sub.id || `sub-${sub.slug}`,
                name: sub.name,
                slug: sub.slug,
            }));

            return {...cat, items: [...normalizedItems, ...subCats]};
        });
    }, [categories, contentItems]);

    const allItems = useMemo(() => {
        const all = [];
        categoriesWithItems.forEach(cat => {
            all.push({
                id: cat.id,
                name: cat.name,
                slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-"),
                category: "Categorie",
                categorySlug: "categorie",
                isCategory: true
            });
            cat.items.forEach(item => {
                all.push({
                    ...item,
                    category: cat.name,
                    categorySlug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-"),
                    isCategory: false
                });
            });
        });
        return all;
    }, [categoriesWithItems]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* Skip link */}
            <a
                href="#"
                onClick={skipToMain}
                className={`fixed top-4 left-4 z-50 bg-yellow-300 text-black px-4 py-2 rounded shadow font-bold focus:outline focus:outline-2 focus:outline-blue-600 transition-all duration-300 ease-in-out hover:bg-yellow-400
                    ${showSkipLink ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
                Ga naar hoofdinhoud
            </a>

            {/* Header */}
            <HomeHeader
                user={user}
                userLoading={userLoading}
                allItems={allItems}
                recommendations={recommendations}
                mainHeadingRef={mainHeadingRef}
            />

            {/* Main content */}
            <main
                id="main-content"
                tabIndex="-1"
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
            >
                <section aria-labelledby="most-searched-heading" className="mb-8">
                    <h2 id="most-searched-heading" className="sr-only">Meest gezocht</h2>
                    <MostSearchedStrip/>
                </section>

                <section aria-labelledby="categories-heading" className="space-y-6">
                    <h2 id="categories-heading" className="text-xl sm:text-2xl font-semibold text-gray-800">
                        Categorieën
                    </h2>

                    {categoriesLoading &&
                        <p className="text-gray-600" role="status" aria-live="polite">Categorieën laden...</p>}
                    {categoriesError &&
                        <p className="text-red-600" role="alert">Er ging iets mis bij het laden van de categorieën.</p>}
                    {!categoriesLoading && !categoriesError && (
                        <CategorySection
                            categoriesError={categoriesError}
                            categoriesLoading={categoriesLoading}
                            categoriesWithItems={categoriesWithItems}
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default HomePage;