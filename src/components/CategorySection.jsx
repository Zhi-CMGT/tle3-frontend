import React from "react";
import CategoryCard, {CategoryCardSkeleton} from "./CategoryCard";

const CategorySection = ({categoriesError, categoriesLoading, categoriesWithItems}) => {
    return (
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
                    : categoriesWithItems.map((cat) => (
                        <CategoryCard key={cat.id} category={cat} items={cat.items}/>
                    ))
                }
            </div>
        </main>
    );
};

export default CategorySection;