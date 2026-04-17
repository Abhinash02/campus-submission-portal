<<<<<<< HEAD
# campus-submission-portal
Full-stack MERN application for managing student assignments, teacher reviews, and submission tracking. Includes role-based login, file uploads, searchable submissions, pagination, marks update, feedback, and PDF download support. Built with React, Node.js, Express, MongoDB, and Next.js for smooth workflow management.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# Student Assignment Portal

## Setup

1. Copy `.env.example` to `.env`
2. Install dependencies:
   npm install
3. Generate Prisma client:
   npm run prisma:generate
4. Run migration:
   npm run prisma:migrate
5. Seed demo data:
   npm run seed
6. Start dev server:
   npm run dev

## Demo login
- Admin: `admin` / `123456`
- Teacher: `teacher1` / `123456`
- Student: `101` / `123456`

## Features
- Admin can add teachers and students
- Student can submit assignment to a selected teacher
- Teacher sees submissions and notifications
- Teacher can evaluate assignments with marks and feedback
- Student can see submission status and marks
=======

