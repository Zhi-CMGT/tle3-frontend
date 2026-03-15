import {Link} from "react-router";

function Nav() {
    return (
        <nav className="bg-gray-800 text-white p-4 mb-4">
            <div className="container mx-auto flex gap-4">
                <Link to="/" className="hover:text-gray-300 font-bold">Home</Link>
            </div>
        </nav>
    )
}

export default Nav