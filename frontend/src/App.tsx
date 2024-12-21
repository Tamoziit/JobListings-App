import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Jobs from "./pages/Jobs";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-200 to-slate-400 p-2">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search-jobs" element={<Jobs />} />
        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App
