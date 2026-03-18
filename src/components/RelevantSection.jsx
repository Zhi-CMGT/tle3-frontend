import React from "react";
import {useNavigate} from "react-router";

const RelevantSection = ({user, allItems, recommendedItems = [], asCard = false}) => {
    const navigate = useNavigate();

    let items;
    if (recommendedItems.length > 0 && allItems.length > 0) {
        items = recommendedItems
            .map(rec => {
                const match = allItems.find(i =>
                    i.id === rec._id || i.id === rec.id || i.slug === rec.slug
                );
                return match || {
                    ...rec,
                    name: rec.title || rec.name || "Onbekend",
                    slug: rec.slug || rec._id || rec.id || Math.random().toString(36).slice(2),
                    category: "",
                    categorySlug: "",
                };
            })
            .filter(item => item.name && item.name !== "Onbekend");
    } else {
        const relevantItems = allItems.filter((item) =>
            user?.relevantSlugs?.includes(item.slug)
        );
        items = relevantItems.length > 0 ? relevantItems : allItems.slice(0, 3);
    }

    if (asCard) {
        return (
            <div className="flex flex-col divide-y divide-gray-100">
                {items.map((item) => (
                    <button
                        key={item.slug || item.id}
                        onClick={() => navigate(`/${item.categorySlug}/${item.slug}`)}
                        className="flex items-center gap-3 w-full text-left py-3 text-gray-800 hover:text-blue-700 transition-colors duration-150 group"
                    >
                        <span
                            className="text-gray-400 group-hover:text-blue-600 font-bold text-sm transition-colors">›</span>
                        <div className="flex flex-col">
                            <span className="font-medium text-sm leading-tight">{item.name}</span>
                            {item.category && <span className="text-gray-400 text-xs mt-0.5">{item.category}</span>}
                        </div>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="mt-5 w-full max-w-2xl">
            <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-2">
                Relevant voor jou
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
                {items.map((item) => (
                    <button
                        key={item.slug || item.id}
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

export default RelevantSection;