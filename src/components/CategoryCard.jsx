import React from "react";
import {useNavigate} from "react-router";

import aanvragenImage from "../assets/aanvragen-image.jpg";
import gezondheidImage from "../assets/gezondheid-en-vrijetijd-image.jpg";
import levenImage from "../assets/leven-image.jpg";
import omgevingImage from "../assets/omgeving-image.jpg";
import werkImage from "../assets/werk-en-inkomen-image.jpg";
import wonenImage from "../assets/wonen-image.jpg";

const categoryImages = {
    "aanvragen": aanvragenImage,
    "gezondheid en vrijetijd": gezondheidImage,
    "leven": levenImage,
    "omgeving": omgevingImage,
    "werk en inkomen": werkImage,
    "wonen": wonenImage,
}
const getItemRoute = (item, categorySlug) => {
    const slugMap = {
        "wmo": "/WMO-help",
        "wmo-aanvragen": "/WMO-help",
    };
    const nameMap = {
        "wmo aanvragen": "/WMO-help",
        "wmo": "/WMO-help",
    };
    return slugMap[item.slug]
        || nameMap[item.name?.toLowerCase()]
        || `/${categorySlug}/${item.slug}`;
};

const CategoryCard = ({category, items}) => {
    const navigate = useNavigate();
    const displayItems = items.slice(0, 3);

    const imageSource = category.image
        || categoryImages[category.slug]
        || categoryImages[category.name?.toLowerCase()];

    return (
        <div
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-gray-100 flex flex-col h-full">
            <div className="px-5 pt-5 pb-2">
                <h3 className="text-base font-bold text-gray-900 text-center">
                    {category.name}
                </h3>
            </div>

            <div className="px-5 pb-4 flex flex-col gap-0.5 flex-grow">
                {displayItems.map((item) => (
                    <button
                        key={item.id || item.slug}
                        onClick={() => navigate(getItemRoute(item, category.slug))}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors duration-150 py-1 text-left w-full"
                    >
                        <span className="text-gray-500 font-semibold text-xs">›</span>
                        <span>{item.name}</span>
                    </button>
                ))}
                {items.length > 3 && (
                    <button
                        onClick={() => navigate(`/${category.slug}`)}
                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150 py-1 text-left w-full mt-1"
                    >
                        <span className="text-blue-400 font-semibold text-xs">+</span>
                        <span>Bekijk alle {items.length} items</span>
                    </button>
                )}
                {items.length === 0 && (
                    <p className="text-gray-400 text-sm italic text-center py-2">Geen items</p>
                )}
            </div>

            <div className="h-36 overflow-hidden bg-blue-50 mt-auto">
                {imageSource ? (
                    <img
                        src={imageSource}
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

export const CategoryCardSkeleton = () => (
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

export default CategoryCard;