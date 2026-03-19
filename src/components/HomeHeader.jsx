import React from "react";
import headerBg from "../assets/header-bg.jpg";
import SearchBar from "./SearchBar";
import RelevantSection from "./RelevantSection";

const HomeHeader = ({user, userLoading, allItems, recommendations}) => {
    return (
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

                {!userLoading && user ? (
                    <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full max-w-4xl">
                        <div className="flex-1 flex items-center">
                            <SearchBar allItems={allItems}/>
                        </div>
                        <div
                            className="lg:w-72 bg-white rounded-2xl shadow-xl px-6 py-5 flex flex-col gap-1 text-left">
                            <p className="text-gray-900 font-bold text-sm mb-2">Relevant voor jou</p>
                            <RelevantSection
                                user={user}
                                allItems={allItems}
                                recommendedItems={recommendations}
                                asCard={true}
                            />
                        </div>
                    </div>
                ) : (
                    <SearchBar allItems={allItems}/>
                )}
            </div>
        </header>
    );
};

export default HomeHeader;