# QuickHire Frontend

Next.js frontend for the QuickHire job board.

## Live URL

- https://job-board-hazel-tau.vercel.app

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- react-hot-toast

## Features

- Landing page with hero, categories, featured jobs, latest jobs
- Jobs listing page with search + category/location filters
- Job details page with application form
- Login and signup pages
- Admin page for posting and deleting jobs
- Toast notifications for important actions

## Project Structure

```text
frontend/
├─ app/
│  ├─ admin/
│  ├─ jobs/
│  ├─ login/
│  ├─ signup/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
├─ lib/
└─ public/
```

## Environment Variables

Create `.env.local` in this folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, set:

```env
NEXT_PUBLIC_API_URL=https://backend-coral-pi-51.vercel.app
```

Note: The frontend normalizes this automatically and ensures `/api` is used.

## Install and Run Locally

```bash
npm install
npm run dev
```

Frontend runs at:

- http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run linting

## API Dependency

The frontend consumes these backend routes:

- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs`
- `DELETE /api/jobs/:id`
- `POST /api/applications`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/health`

## Deployment (Vercel)

Example command used:

```bash
npx vercel --prod --yes --build-env NEXT_PUBLIC_API_URL="https://backend-coral-pi-51.vercel.app" --env NEXT_PUBLIC_API_URL="https://backend-coral-pi-51.vercel.app"
```

