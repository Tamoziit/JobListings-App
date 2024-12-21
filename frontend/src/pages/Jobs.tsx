import { useEffect, useState } from "react";
import useGetJobs from "../hooks/useGetJobs"
import Topbar from "../components/Topbar";
import JobCard from "../components/JobCard";
import { JobProps } from "../types/types";
import Spinner from "../components/Spinner";

const Jobs = () => {
  const { loading, getJobs } = useGetJobs();
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [search, setSearch] = useState("");

  const handleGetJobs = async () => {
    const data = await getJobs();
    setJobs(data);
  }

  useEffect(() => {
    handleGetJobs();
  }, []);

  console.log(jobs);
  console.log(search);

  return (
    <div className="flex flex-col w-full items-center">
      <Topbar search={search} setSearch={setSearch} />

      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full flex flex-col gap-3 items-center justify-center md:px-3 pt-7 mb-[70px]">
          {jobs.reverse().map((job, _idx) => (
            <JobCard key={_idx} job={job} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Jobs