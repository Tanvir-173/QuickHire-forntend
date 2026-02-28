"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getJobs, deleteJob, Job } from "@/lib/api";
import JobForm from "@/components/JobForm";

export default function Admin() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
      setErrorMessage("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load jobs";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobCreated = (job: Job) => {
    setJobs((previousJobs) => [job, ...previousJobs]);
    setErrorMessage("");
    toast.success("Job posted successfully");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id);
      setJobs((previousJobs) => previousJobs.filter((job) => job._id !== id));
      toast.success("Job deleted successfully");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete job";
      setErrorMessage(message);
      toast.error(message);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
        <Link
          href="/"
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Home
        </Link>
      </div>

      <JobForm onSuccess={handleJobCreated} />

      {isLoading ? <p className="mt-6 text-sm text-slate-600">Loading jobs...</p> : null}
      {errorMessage ? <p className="mt-6 text-sm text-red-600">{errorMessage}</p> : null}

      <div className="mt-8 space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-medium text-slate-800">{job.title}</p>
              <p className="text-sm text-slate-500">{job.company}</p>
            </div>
            <button
              onClick={() => handleDelete(job._id)}
              className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}