import Link from "next/link";
import { Job } from "@/lib/api";

export default function JobCard({ job }: { job: Job }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-slate-900">{job.title}</h2>
      <p className="mt-1 text-sm font-medium text-slate-700">{job.company}</p>
      <p className="mt-1 text-sm text-slate-500">
        {job.location} • {job.category}
      </p>

      <Link
        href={`/jobs/${job._id}`}
        className="mt-4 inline-block font-medium text-indigo-600 hover:text-indigo-700"
      >
        View Details →
      </Link>
    </article>
  );
}