import React from "react";
import {useNavigate} from "react-router";

const mostSearched = [
    {name: "Paspoort aanvragen", slug: "paspoort-aanvragen", category: "Leven"},
    {name: "Parkeervergunning", slug: "parkeervergunning", category: "Omgeving"},
    {name: "WMO aanvragen", slug: "WMO-help", category: "Zorg"},
    {name: "Verhuizing doorgeven", slug: "verhuizen", category: "Wonen"},
];

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

export default MostSearchedStrip;