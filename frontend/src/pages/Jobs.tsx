import { useEffect, useState } from "react";
import useGetJobs from "../hooks/useGetJobs"
import Topbar from "../components/Topbar";

const Jobs = () => {
  const {loading, getJobs} = useGetJobs();
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  const handleGetJobs = async() => {
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
    </div>
  )
}

export default Jobs