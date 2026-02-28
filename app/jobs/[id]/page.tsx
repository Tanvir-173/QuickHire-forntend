"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getJobById, Job } from "@/lib/api";
import ApplicationForm from "@/components/ApplicationForm";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id as string);
        setJob(data);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to load job details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (isLoading) {
    return <p className="mx-auto max-w-4xl px-4 py-8 text-sm text-slate-600">Loading...</p>;
  }

  if (errorMessage || !job) {
    return <p className="mx-auto max-w-4xl px-4 py-8 text-sm text-red-600">{errorMessage || "Job not found"}</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
        <p className="mt-1 text-slate-700">{job.company}</p>
        <p className="text-sm text-slate-500">
        {job.location} • {job.category}
        </p>

        <h2 className="mt-6 text-xl font-semibold text-slate-900">Job Description</h2>
        <p className="mt-6 whitespace-pre-line text-slate-700">{job.description}</p>
      </div>

      <div className="mt-8">
        <ApplicationForm jobId={job._id} />
      </div>
    </div>
  );
}