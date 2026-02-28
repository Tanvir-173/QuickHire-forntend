"use client";

import { FormEvent, useState } from "react";
import { submitApplication } from "@/lib/api";

type ApplicationFormProps = {
  jobId: string;
};

export default function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");
    setIsSubmitting(true);

    try {
      await submitApplication({
        jobId,
        name,
        email,
        resumeLink,
        coverNote,
      });

      setName("");
      setEmail("");
      setResumeLink("");
      setCoverNote("");
      setStatusMessage("Application submitted successfully.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Apply Now</h2>

      <div>
        <label htmlFor="applicant-name" className="mb-2 block text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          id="applicant-name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full name"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="applicant-email" className="mb-2 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="applicant-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="resume-link" className="mb-2 block text-sm font-medium text-slate-700">
          Resume link (URL)
        </label>
        <input
          id="resume-link"
          type="url"
          required
          value={resumeLink}
          onChange={(event) => setResumeLink(event.target.value)}
          placeholder="Resume link"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      <div>
        <label htmlFor="cover-note" className="mb-2 block text-sm font-medium text-slate-700">
          Cover note
        </label>
        <textarea
          id="cover-note"
          rows={4}
          value={coverNote}
          onChange={(event) => setCoverNote(event.target.value)}
          placeholder="Cover note"
          className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {statusMessage ? <p className="text-sm text-slate-600">{statusMessage}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
