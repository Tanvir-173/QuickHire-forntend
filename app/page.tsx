"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getJobs, Job } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
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

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) &&
    (location ? job.location === location : true)
  );

  const categoryCards = [
    { name: "Design", count: "235 jobs available", icon: "✕", highlighted: false },
    { name: "Sales", count: "756 jobs available", icon: "◔", highlighted: false },
    { name: "Marketing", count: "140 jobs available", icon: "📣", highlighted: true },
    { name: "Finance", count: "325 jobs available", icon: "▣", highlighted: false },
    { name: "Technology", count: "436 jobs available", icon: "▭", highlighted: false },
    { name: "Engineering", count: "542 jobs available", icon: "</>", highlighted: false },
    { name: "Business", count: "211 jobs available", icon: "◫", highlighted: false },
    { name: "Human Resource", count: "346 jobs available", icon: "◍", highlighted: false },
  ];

  const featuredJobs = filteredJobs.slice(0, 8);
  const latestOpenJobs = filteredJobs.slice(0, 8);

  return (
    <div className="bg-[#f2f3f9]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                Q
              </span>
              QuickHire
            </Link>

            <nav className="hidden items-center gap-5 text-xs font-medium text-slate-500 md:flex">
              <Link href="/" className="hover:text-slate-700">
                Find Jobs
              </Link>
              <Link href="/" className="hover:text-slate-700">
                Browse Companies
              </Link>
              <Link href="/admin" className="hover:text-slate-700">
                Admin
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Link href="/login" className="text-xs font-semibold text-indigo-700">Login</Link>
            <Link href="/signup" className="rounded-sm bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700">
              Sign Up
            </Link>
          </div>
        </header>

        <section className="relative mt-6 grid items-end gap-8 lg:grid-cols-[1.05fr_1fr]">
          <div className="pb-6">
            <h1 className="text-6xl font-extrabold leading-[1.08] text-slate-800">
              Discover
              <br />
              more than
              <br />
              <span className="text-sky-500">5000+ Jobs</span>
            </h1>
            <div className="mt-2 h-1.5 w-56 rounded-full bg-sky-500" />
            <div className="-mt-1 ml-2 h-1 w-52 rounded-full bg-sky-500" />
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-500">
              Great platform for the job seeker that searching for new career heights and passionate
              about startups.
            </p>

            <div className="mt-6 max-w-[560px] bg-white shadow-sm">
              <div className="grid grid-cols-1 overflow-hidden border border-slate-200 md:grid-cols-[1fr_1px_1fr_auto] md:items-center">
                <SearchBar search={search} setSearch={setSearch} />
                <div className="hidden h-8 bg-slate-200 md:block" />
                <FilterBar location={location} setLocation={setLocation} />
                <button className="bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
                  Search my job
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">Popular : UI Designer, UX Researcher, Android, Admin</p>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-sm bg-transparent">
            <div className="absolute inset-0">
              <div className="absolute left-10 top-10 h-44 w-64 border-2 border-indigo-100" />
              <div className="absolute left-28 top-24 h-44 w-64 border-2 border-indigo-100" />
              <div className="absolute left-4 top-44 h-44 w-64 border-2 border-indigo-100" />
            </div>
            <span className="absolute left-8 top-8 rounded bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white">
              Wasif Ahad
            </span>
            <div className="absolute bottom-0 right-0 flex h-[390px] w-[330px] items-center justify-center rounded-tl-[140px] bg-gradient-to-b from-slate-200 to-slate-300 text-sm text-slate-600">
              Hero image
            </div>
            <div className="absolute -bottom-8 right-0 h-28 w-full -skew-y-[18deg] bg-white" />
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-[#f7f7fb] px-6 py-5">
          <p className="text-sm text-slate-400">Companies we helped grow</p>
          <div className="mt-4 flex flex-wrap items-center justify-around gap-x-10 gap-y-3 text-3xl font-bold text-slate-300">
            <span className="text-[32px] leading-none">◉</span>
            <span className="text-xl font-semibold lowercase tracking-tight">vodafone</span>
            <span className="text-4xl font-extrabold lowercase">intel</span>
            <span className="text-[34px] font-semibold uppercase tracking-[0.35em]">TESLA</span>
            <span className="text-3xl font-semibold">AMD</span>
            <span className="text-4xl font-black lowercase">talkit</span>
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-[#f7f7fb] px-6 py-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-4xl font-extrabold leading-tight text-slate-800">
              Explore by <span className="text-sky-500">category</span>
            </h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Show all jobs →
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryCards.map((item) => (
              <article
                key={item.name}
                className={`rounded-md border p-5 transition ${
                  item.highlighted
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-white text-slate-800"
                }`}
              >
                <p className={`text-xl ${item.highlighted ? "text-white" : "text-indigo-600"}`}>{item.icon}</p>
                <h3 className="mt-6 text-xl font-bold">{item.name}</h3>
                <p className={`mt-2 text-sm ${item.highlighted ? "text-indigo-100" : "text-slate-500"}`}>
                  {item.count} <span className="ml-1">→</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-sm bg-indigo-600">
          <div className="grid items-stretch lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-center px-8 py-10 text-white sm:px-10 lg:px-12">
              <h3 className="text-5xl font-extrabold leading-tight">
                Start posting
                <br />
                jobs today
              </h3>
              <p className="mt-4 text-sm text-indigo-100">Start posting jobs for only $10.</p>
              <button className="mt-6 w-fit bg-white px-5 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50">
                Sign Up For Free
              </button>
            </div>

            <div className="relative min-h-[240px] bg-indigo-600 px-6 py-8 lg:px-8">
              <div className="mx-auto h-[210px] max-w-[470px] rounded-sm border border-slate-200 bg-white p-3 shadow-lg">
                <div className="h-full rounded border border-slate-100 bg-slate-50 p-3">
                  <div className="mb-3 flex items-center justify-between text-[10px] text-slate-400">
                    <span>QuickHire dashboard preview</span>
                    <span>Analytics</span>
                  </div>
                  <div className="grid h-[150px] grid-cols-3 gap-2">
                    <div className="rounded bg-indigo-500 p-2 text-[10px] text-white">76 new candidates</div>
                    <div className="rounded bg-emerald-500 p-2 text-[10px] text-white">3 schedule today</div>
                    <div className="rounded bg-sky-500 p-2 text-[10px] text-white">24 messages</div>
                    <div className="col-span-2 rounded bg-white p-2 text-[10px] text-slate-400">
                      Job statistics chart area
                    </div>
                    <div className="rounded bg-white p-2 text-[10px] text-slate-400">Applicants summary</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-[#f7f7fb] px-6 py-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-4xl font-extrabold leading-tight text-slate-800">
              Featured <span className="text-sky-500">jobs</span>
            </h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Show all jobs →
            </button>
          </div>

          {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading jobs...</p> : null}
          {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}

          {!isLoading && !errorMessage && featuredJobs.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">No jobs found for the selected filters.</p>
          ) : null}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredJobs.map((job) => (
              <article key={job._id} className="rounded-md border border-slate-200 bg-white p-4">
                <div className="mb-4 flex items-start justify-between">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                    {job.company.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="rounded-sm border border-indigo-500 px-2 py-0.5 text-xs font-medium text-indigo-600">
                    Full Time
                  </span>
                </div>

                <Link href={`/jobs/${job._id}`} className="text-lg font-semibold text-slate-800 hover:text-indigo-600">
                  {job.title}
                </Link>
                <p className="mt-1 text-xs text-slate-500">{job.company} • {job.location}</p>
                <p className="mt-3 line-clamp-2 text-sm text-slate-400">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-500">
                    Marketing
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-500">
                    Design
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-slate-200 bg-[#f7f7fb] px-6 py-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-4xl font-extrabold leading-tight text-slate-800">
              Latest <span className="text-sky-500">jobs open</span>
            </h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
              Show all jobs →
            </button>
          </div>

          {isLoading ? <p className="mt-3 text-sm text-slate-600">Loading jobs...</p> : null}
          {errorMessage ? <p className="mt-3 text-sm text-red-600">{errorMessage}</p> : null}

          {!isLoading && !errorMessage && latestOpenJobs.length === 0 ? (
            <p className="mt-3 text-sm text-slate-600">No jobs found for the selected filters.</p>
          ) : null}

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {latestOpenJobs.map((job) => (
              <article key={`latest-${job._id}`} className="flex items-start gap-4 rounded-md border border-slate-200 bg-white p-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                  {job.company.slice(0, 1).toUpperCase()}
                </span>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/jobs/${job._id}`}
                    className="truncate text-lg font-semibold text-slate-800 hover:text-indigo-600"
                  >
                    {job.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500">{job.company} • {job.location}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-500">
                      Full-Time
                    </span>
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-500">
                      {job.category || "Marketing"}
                    </span>
                    <span className="rounded-full border border-indigo-400 px-2 py-0.5 text-xs font-medium text-indigo-500">
                      Design
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-12 bg-slate-900 text-slate-300">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 text-lg font-bold text-white">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs text-white">
                  Q
                </span>
                QuickHire
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
                Great platform for the job seeker that passionate about startups. Find your dream
                job easier.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">About</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>Companies</li>
                <li>Pricing</li>
                <li>Terms</li>
                <li>Advice</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Resources</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>Help Docs</li>
                <li>Guide</li>
                <li>Updates</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Get job notifications</h3>
              <p className="mt-3 text-sm text-slate-400">
                The latest job news, articles, sent to your inbox weekly.
              </p>
              <div className="mt-4 flex overflow-hidden rounded-sm border border-slate-700">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-slate-100 px-3 py-2 text-sm text-slate-700 outline-none"
                />
                <button className="bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800 pt-6">
            <div className="flex flex-col items-start justify-between gap-4 text-xs text-slate-500 sm:flex-row sm:items-center">
              <p>2021 © QuickHire. All rights reserved.</p>
              <div className="flex items-center gap-2">
                {[
                  "f",
                  "ig",
                  "x",
                  "in",
                  "t",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[10px] text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}