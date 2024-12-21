import { FaHome, FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface TopbarProps {
  search: string;
  setSearch: (value: string) => void;
}

const Topbar = ({ search, setSearch }: TopbarProps) => {
  return (
    <div className="w-full lg:w-[90%] bg-white m-3 rounded-xl shadow-lg p-2">
      <div className="w-full flex flex-col justify-center gap-2 px-4 py-5 bg-gray-100 rounded-lg">
        <div className="w-full rounded-full p-2 bg-white flex items-center gap-4 border-2 border-gray-400 active:border-blue-500">
          <input
            className="bg-transparent px-2 w-full text-base placeholder:text-sm text-gray-700 outline-none border-none"
            type="text"
            placeholder="Search by Job Title or Company Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="rounded-full p-2 w-fit bg-blue-600 hover:bg-blue-700 mr-1"
          >
            <FaSearch className="text-white" />
          </button>
        </div>

        <div className="flex gap-6 items-start ml-6 mt-2">
          <button className="flex items-center gap-1 bg-white text-base py-1 px-2 rounded-full border-2 border-gray-400 text-gray-700 hover:border-blue-500 hover:text-blue-500">
            <FaHome />
            <span>Remote</span>
          </button>
          <button className="flex items-center gap-1 bg-white text-base py-1 px-2 rounded-full border-2 border-gray-400 text-gray-700 hover:border-blue-500 hover:text-blue-500">
            <FaLocationDot />
            <span>On-Site</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Topbar