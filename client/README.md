This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🔐 Login Credentials

This project uses **mock/simulated authentication** (no real backend). All session data is stored in `localStorage`.

### Demo Accounts

| Role            | Email                        | Password      | Tier     |
|-----------------|------------------------------|---------------|----------|
| 🛍️ Customer        | `sophia.chen@example.com`    | `password123` | Standard |

> Use the **Demo Login buttons** on the login page to sign in instantly without entering credentials.

### Custom Login (Any Email Works)

You can log in with **any valid email address** and a password of at least **4 characters** to access as a Customer.

### Registration

| Field    | Requirement                  |
|----------|------------------------------|
| Name     | Required, non-empty          |
| Email    | Must contain `@`             |
| Password | Minimum **6 characters**     |

New accounts are automatically assigned **Gold VIP** tier with a 20% welcome discount.

> ⚠️ **Note:** There is no real database. All user data is cleared when `localStorage` is cleared.
