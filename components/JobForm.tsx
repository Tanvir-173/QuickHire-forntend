"use client";

import { FormEvent, useState } from "react";
import { createJob, CreateJobInput, Job } from "@/lib/api";

type JobFormProps = {
  onSuccess: (job: Job) => void;
};

const initialState: CreateJobInput = {
  title: "",
  company: "",
  location: "",
  category: "",
  description: "",
};

const CATEGORY_OPTIONS = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
];

export default function JobForm({ onSuccess }: JobFormProps) {
  const [formData, setFormData] = useState<CreateJobInput>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const createdJob = await createJob(formData);
      setFormData(initialState);
      onSuccess(createdJob);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to create job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Post New Job</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          required
          value={formData.title}
          onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Job title"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <input
          required
          value={formData.company}
          onChange={(event) => setFormData((prev) => ({ ...prev, company: event.target.value }))}
          placeholder="Company"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <input
          required
          value={formData.location}
          onChange={(event) => setFormData((prev) => ({ ...prev, location: event.target.value }))}
          placeholder="Location"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
        <select
          required
          value={formData.category}
          onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
      </div>

      <textarea
        required
        rows={5}
        value={formData.description}
        onChange={(event) => setFormData((prev) => ({ ...prev, description: event.target.value }))}
        placeholder="Job description"
        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}
