export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-xl mt-4">Whoopsie Daisy! Pagina niet gevonden.</p>
            <a href="/" className="mt-6 text-blue-600 hover:underline">Ga terug naar de homepage</a>
        </div>
    )
}