import { useState } from "react";
import toast from "react-hot-toast";
import { JobProps } from "../types/types";

const useGetJobs = () => {
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const getJobs = async (): Promise<JobProps[]> => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/jobs/get-jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received");
      }

      return data as JobProps[];
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error("An unknown error occurred", error);
      }

      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, getJobs };
};

export default useGetJobs;
