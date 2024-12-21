import { useState } from "react";
import toast from "react-hot-toast";

const useGetJobs = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getJobs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/jobs/get-jobs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                console.log("An unknown error occurred", error);
            }
        } finally {
            setLoading(false);
        }
    }

    return { loading, getJobs };
}

export default useGetJobs;