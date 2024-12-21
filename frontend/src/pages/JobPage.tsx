import { JobProps } from "../types/types";
import { timeAgo } from "../utils/timeAgo";
import { RiHome2Line } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { GoStack } from "react-icons/go";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import useGetJobById from "../hooks/useGetJobById";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import formatSalary from "../utils/formatSalary";

const JobPage = () => {
  const [jobData, setJobData] = useState<JobProps | null>(null);
  const { loading, getJob } = useGetJobById();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleGetJob = async () => {
    if (!id) {
      toast.error("Error fetching job data");
      navigate("/search-jobs");
      return;
    }

    try {
      const data = await getJob(id);

      if (data) {
        setJobData(data);
      } else {
        toast.error("Error fetching job data");
        navigate("/search-jobs");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the job");
      navigate("/search-jobs");
    }
  };

  useEffect(() => {
    handleGetJob();
  }, [id]);

  return (
    <div className="mx-auto p-4 w-full lg:w-[90%] h-full">
      {loading ? (
        <Spinner />
      ) : (
        jobData && (
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={jobData.company_logo_url}
                alt="Company Logo"
                className="w-[150px] rounded-full object-contain"
              />
              <div>
                <h1 className="text-3xl font-semibold">{jobData.title}</h1>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg text-gray-500 font-medium">{jobData.company_name}</h2>
                  <a
                    href={jobData.company_page_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-blue-600 hover:underline"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <IoMdTime />
                  <span className="-mt-1">{timeAgo(jobData.posted_date)}</span>
                </div>
              </div>
            </div>
            <hr className="border-gray-300" />

            <div className="text-gray-600 space-y-4">
              <h2 className="text-2xl font-semibold text-black">Details</h2>
              <p className="flex items-center space-x-2 gap-1 text-gray-600">
                <strong>
                  <IoLocationOutline />
                </strong>
                <span><strong>Location:</strong></span> {jobData.location || 'TBD'}
              </p>
              <p className="flex items-center space-x-2 gap-1 text-gray-600">
                <strong>
                  <FaRegCalendarAlt />
                </strong>
                <span><strong>Posted On:</strong></span> {new Date(jobData.posted_date).toLocaleDateString()}
              </p>
              <p className="flex items-center space-x-2 gap-1 text-gray-600">
                <strong>
                  <RiHome2Line />
                </strong>
                <span><strong>Remote:</strong></span> {jobData.is_remote ? 'Yes' : 'No'}
              </p>
              <p className="flex items-center space-x-2 gap-1 text-gray-600">
                <strong>
                  <GoStack />
                </strong>
                <span><strong>Workplace Types:</strong></span> {jobData.workplace_types.join(', ')}
              </p>
            </div>
            <hr className="border-gray-300" />

            <div className="text-gray-800">
              <h2 className="text-2xl font-semibold">Summary</h2>
              <p>{jobData.summary}</p>
            </div>
            <hr className="border-gray-300" />

            <div className="flex items-center gap-2 text-xl">
						<FaRegMoneyBillAlt className="mt-1 text-gray-700" />
						<h2 className="text-gray-700 font-semibold">Salary:</h2>
						<h2 className="text-gray-700 font-bold">{formatSalary(jobData.salary) || 'TBD on Joining'}</h2>
						<h2 className="text-base -ml-1 text-gray-600">/hour</h2>
            </div>

            <div className="w-full flex items-center justify-center bg-blue-600 p-2 rounded-full text-xl font-semibold text-white hover:bg-blue-700 cursor-pointer">
              <button className="flex items-center gap-2 w-full justify-center">
                Apply Now <RiShoppingBagLine />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default JobPage;
