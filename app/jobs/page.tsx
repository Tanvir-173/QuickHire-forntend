"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getJobs, Job } from "@/lib/api";
import JobCard from "@/components/JobCard";

function AllJobsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState("");
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

  const categoryOptions = Array.from(new Set(jobs.map((job) => job.category))).sort();
  const locationOptions = Array.from(new Set(jobs.map((job) => job.location))).sort();

  const visibleJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory ? job.category === selectedCategory : true) &&
      (selectedLocation ? job.location === selectedLocation : true)
  );

  return (
    <main className="min-h-screen bg-[#f2f3f9] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">All Jobs</h1>
            {selectedCategory ? (
              <p className="mt-1 text-sm text-slate-500">Filtered by category: {selectedCategory}</p>
            ) : null}
          </div>
          <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            ← Back to Home
          </Link>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by job title"
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All categories</option>
              {categoryOptions.map((categoryOption) => (
                <option key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All locations</option>
              {locationOptions.map((locationOption) => (
                <option key={locationOption} value={locationOption}>
                  {locationOption}
                </option>
              ))}
            </select>
          </div>
        </section>

        {isLoading ? <p className="mt-5 text-sm text-slate-600">Loading jobs...</p> : null}
        {errorMessage ? <p className="mt-5 text-sm text-red-600">{errorMessage}</p> : null}

        {!isLoading && !errorMessage && visibleJobs.length === 0 ? (
          <p className="mt-5 text-sm text-slate-600">No jobs found for the selected filters.</p>
        ) : null}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function AllJobsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f2f3f9] px-4 py-8 sm:px-6">Loading...</main>}>
      <AllJobsContent />
    </Suspense>
  );
}
