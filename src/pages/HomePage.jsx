import React, {useState} from "react";
import {useNavigate, useSearchParams} from "react-router";

function HomePage() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchCategories, setSearchCategories] = useSearchParams()
    const navigate = useNavigate()

    return (
        <div>
            <div className="">

            </div>
            <div className="">

            </div>
            <div className="">
                <div className="">

                </div>
                <div className="">

                </div>
                <div className="">

                </div>
                <div className="">

                </div>
            </div>

        </div>

    )
}


export default HomePage;

