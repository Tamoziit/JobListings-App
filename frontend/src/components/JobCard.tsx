import { timeAgo } from "../utils/timeAgo";
import { RiHome2Line } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { JobProps } from "../types/types";
import formatSalary from "../utils/formatSalary";
import { useNavigate } from "react-router-dom";

interface JobCardProps {
  job: JobProps;
}

const JobCard = ({ job }: JobCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full lg:w-[90%] bg-white rounded-xl shadow-lg p-2 hover:scale-105  cursor-pointer"
      onClick={() => navigate(`/search-jobs/${job.id}`)}
    >
      <div className="w-full flex flex-col md:flex-row justify-between gap-2 px-4 py-5 bg-gray-100 rounded-lg">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <img
            src={job.company_logo_url}
            alt="company_logo"
            className="size-20 rounded-full object-contain object-center"
          />
          <div className="flex flex-col lg:max-w-[600px] md:max-w-[400px]">
            <h1 className="text-lg font-semibold break-words">
              {job.title}
            </h1>
            <span className="text-lg truncate">{job.company_name}</span>
            <span className="text-sm text-gray-500">
              {timeAgo(job.posted_date)}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:items-end gap-3">
          <p className="flex items-center">
            {job.salary ? (
              <h1 className="text-2xl font-semibold">{formatSalary(job.salary)}</h1>
            ) : (
              <h1 className="text-2xl font-semibold">TBD on Joining</h1>
            )}
            <h3 className="text-base text-gray-500">/hour</h3>
          </p>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 items-center justify-start md:justify-end">
            {job.is_remote && (
              <div
                className="flex gap-1 items-center text-sm text-gray-500 truncate max-w-[120px] md:max-w-[150px]"
                title="Remote"
              >
                <RiHome2Line />
                <span>Remote</span>
              </div>
            )}

            {job.workplace_types.includes("On-Site") && (
              <div
                className="flex gap-1 items-center text-sm text-gray-500 truncate max-w-[120px] md:max-w-[150px]"
                title="On-Site"
              >
                <RiHome2Line />
                <span>On-Site</span>
              </div>
            )}

            {job.location ? (
              <div
                className="flex gap-1 items-center text-sm text-gray-500 truncate max-w-[160px] md:max-w-[160px]"
                title="Almont, Colorado, USA"
              >
                <IoLocationOutline />
                <span>{job.location}</span>
              </div>
            ) : (
              <div
                className="flex gap-1 items-center text-sm text-gray-500 truncate max-w-[160px] md:max-w-[160px]"
                title="Almont, Colorado, USA"
              >
                <IoLocationOutline />
                <span>TBD</span>
              </div>
            )}

            <div
              className="flex gap-1 items-center text-sm text-gray-500 truncate max-w-[120px] md:max-w-[150px]"
              title="Full Time"
            >
              <IoMdTime />
              <span>Full Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard