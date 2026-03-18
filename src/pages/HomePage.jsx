import React, {useState, useEffect, useMemo} from "react";
import MostSearchedStrip from "../components/MostSearchedStrip";
import HomeHeader from "../components/HomeHeader";
import CategorySection from "../components/CategorySection";

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    const [categories, setCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(true);
    const [categoriesError, setCategoriesError] = useState(null);

    const [contentItems, setContentItems] = useState([]);
    const [setContentLoading] = useState(true);
    const [setContentItemsError] = useState(null);

    const [recommendations, setRecommendations] = useState([]);

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
                console.log("Categories loaded:", data);
            } catch (err) {
                console.error("Categorieën ophalen mislukt:", err);
                setCategoriesError(err.message);
            } finally {
                setCategoriesLoading(false);
            }
        };

        const fetchContentItems = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URI}content-items?limit=1000`,
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

                const items = Array.isArray(data) ? data : (data.items || data.data || []);
                setContentItems(items);
            } catch (err) {
                console.error("Contents ophalen mislukt:", err);
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
                console.error('Failed to fetch user in HomePage:', err);
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
            } catch (err) {
                console.error('Recommendations ophalen mislukt:', err);
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
                if (Array.isArray(item.category_ids)) {
                    return item.category_ids.includes(cat.id);
                }
                if (item.category && typeof item.category === 'object' && item.category.id) {
                    return item.category.id === cat.id;
                }
                if (item.category && typeof item.category === 'string') {
                    return item.category.toLowerCase() === cat.name.toLowerCase();
                }
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

            return {
                ...cat,
                items: [...normalizedItems, ...subCats]
            };
        });
    }, [categories, contentItems]);

    const allItems = useMemo(
        () => {
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
        },
        [categoriesWithItems]
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <HomeHeader user={user} userLoading={userLoading} allItems={allItems} recommendations={recommendations} />

            <MostSearchedStrip/>

            <CategorySection
                categoriesError={categoriesError}
                categoriesLoading={categoriesLoading}
                categoriesWithItems={categoriesWithItems}
            />
        </div>
    );
};

export default HomePage;