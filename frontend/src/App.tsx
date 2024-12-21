import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Jobs from "./pages/Jobs";
import { Toaster } from "react-hot-toast";
import JobPage from "./pages/JobPage";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-200 to-slate-400 p-2">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search-jobs" element={<Jobs />} />
          <Route path="/search-jobs/:id" element={<JobPage />} />
        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App
