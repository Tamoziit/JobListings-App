const LogoHolder = () => {
    return (
        <div className="w-full flex items-center px-6 py-2 bg-black/20 backdrop-blur-md rounded-lg shadow-md">
            <div className="flex items-center gap-4">
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-12 h-12 rounded-full object-contain border-2 border-white"
                />
                <h1 className="text-2xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    CareerFleet Inc.
                </h1>
            </div>
        </div>
    )
}

export default LogoHolder