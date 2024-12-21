import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 items-center justify-between">
        <div className="w-1/2 h-full flex items-center justify-center">
          <img
            src="/journey.png"
            alt="Landing Page"
            className="max-w-full max-h-full object-cover"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center px-8">
          <h1 className="text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600 drop-shadow-lg">
            Welcome to JobFinder
          </h1>
          <p className="text-xl text-gray-600 italic mb-6 text-center">
            "Your future starts here. Discover opportunities that match your passion."
          </p>
          <Link
            to="/search-jobs"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Searching Jobs
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Landing