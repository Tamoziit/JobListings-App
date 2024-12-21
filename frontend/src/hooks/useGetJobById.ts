import { useState } from "react";
import toast from "react-hot-toast";
import { JobProps } from "../types/types";

const useGetJobById = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;

    const getJob = async (id: string): Promise<JobProps | null> => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/jobs/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
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
                console.error("An unknown error occurred", error);
            }
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, getJob };
};

export default useGetJobById;