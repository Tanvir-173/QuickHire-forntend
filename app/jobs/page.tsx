"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getJobs, Job } from "@/lib/api";
import JobCard from "@/components/JobCard";

export default function AllJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to load jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen bg-[#f2f3f9] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-slate-800">All Jobs</h1>
          <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            ← Back to Home
          </Link>
        </div>

        {isLoading ? <p className="text-sm text-slate-600">Loading jobs...</p> : null}
        {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

        {!isLoading && !errorMessage && jobs.length === 0 ? (
          <p className="text-sm text-slate-600">No jobs available right now.</p>
        ) : null}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}
