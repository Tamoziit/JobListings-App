import { useEffect, useState } from "react";
import useGetJobs from "../hooks/useGetJobs"
import Topbar from "../components/Topbar";
import JobCard from "../components/JobCard";
import { JobProps } from "../types/types";
import Spinner from "../components/Spinner";
import { IoMdTime } from "react-icons/io";
import Footer from "../components/Footer";
import LogoHolder from "../components/LogoHolder";

const Jobs = () => {
  const { loading, getJobs } = useGetJobs();
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [search, setSearch] = useState("");
  const [searchedJobs, setSearchedJobs] = useState<JobProps[]>([]);
  const [remoteJobs, setRemoteJobs] = useState<JobProps[]>([]);
  const [onSiteJobs, setOnSiteJobs] = useState<JobProps[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobProps[]>([]);

  const handleGetJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  }

  const handleSearch = () => {
    setSearchedJobs([]);
    const data = jobs.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase().trim()) ||
      job.company_name.toLowerCase().includes(search.toLowerCase().trim())
    );
    setSearchedJobs(data);
  }

  const getRemoteJobs = () => {
    const data = jobs.filter((job) => job.is_remote);
    setRemoteJobs(data);
  }

  const getOnSiteJobs = () => {
    const data = jobs.filter((job) => job.workplace_types.includes("On-Site"));
    setOnSiteJobs(data);
  };

  const getRecentJobs = () => {
    const data = jobs.sort((a, b) => new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime());
    setRecentJobs(data);
  }

  const resetFilters = () => {
    setSearchedJobs([]);
    setRemoteJobs([]);
    setOnSiteJobs([]);
    setRecentJobs([]);
  }

  useEffect(() => {
    handleGetJobs();
  }, []);

  const renderJobs = () => {
    if (searchedJobs.length > 0) {
      return searchedJobs.reverse();
    } else if (remoteJobs.length > 0) {
      return remoteJobs.reverse();
    } else if (onSiteJobs.length > 0) {
      return onSiteJobs.reverse();
    } else if (recentJobs.length > 0) {
      return recentJobs;
    } else {
      return jobs.reverse();
    }
  };

  return (
    <div className="flex flex-col w-full items-center min-h-screen">
      <div className="w-full mb-4">
      <LogoHolder />
      </div>

      <Topbar
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        getRemoteJobs={getRemoteJobs}
        getOnSiteJobs={getOnSiteJobs}
        resetFilters={resetFilters}
      />

      <div className="flex lg:w-[90%] w-full items-end px-4">
        <button className="flex ml-auto items-center gap-1 bg-white text-base py-1 px-2 rounded-full border-2 border-blue-400 text-blue-700 hover:border-purple-700 hover:text-purple-800" onClick={getRecentJobs}>
          <IoMdTime />
          <span>Most Recent</span>
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full flex flex-col gap-3 items-center justify-center md:px-3 pt-7 mb-[55px]">
          {renderJobs().map((job, _idx) => (
            <JobCard key={_idx} job={job} />
          ))}
        </div>
      )}

      <Footer />
    </div >
  )
}

export default Jobs