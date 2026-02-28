const normalizeApiUrl = (value?: string) => {
  const fallback = "http://localhost:5000/api";
  const raw = (value || fallback).trim().replace(/\/+$/, "");

  if (raw.endsWith("/api")) {
    return raw;
  }

  return `${raw}/api`;
};

const API_URL = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);

export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateJobInput = Omit<Job, "_id" | "createdAt" | "updatedAt">;

export type ApplicationInput = {
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
};

export type SignupInput = {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
};

export type AuthResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
  };
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const validationMessage = Array.isArray(data.errors)
      ? data.errors.map((error: { msg: string }) => error.msg).join(", ")
      : "";
    const message = validationMessage || data.message || "Request failed";
    throw new Error(message);
  }

  return data as T;
};

export const getJobs = async (): Promise<Job[]> => {
  const response = await fetch(`${API_URL}/jobs`, { cache: "no-store" });
  return handleResponse<Job[]>(response);
};

export const getJobById = async (id: string): Promise<Job> => {
  const response = await fetch(`${API_URL}/jobs/${id}`, { cache: "no-store" });
  return handleResponse<Job>(response);
};

export const createJob = async (data: CreateJobInput): Promise<Job> => {
  const response = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<Job>(response);
};

export const deleteJob = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
  });

  await handleResponse<{ message: string }>(response);
};

export const submitApplication = async (data: ApplicationInput) => {
  const response = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const signup = async (data: SignupInput): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<AuthResponse>(response);
};

export const login = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return handleResponse<AuthResponse>(response);
};