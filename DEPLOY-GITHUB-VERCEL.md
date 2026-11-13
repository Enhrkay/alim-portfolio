# GitHub + Vercel deployment

This project is ready to be managed with Git and deployed from GitHub to Vercel.

## 1. Keep secrets local

`.env.local` is ignored by Git. Do not commit it.

## 2. Create the local repository

From the project folder:

```powershell
git init
git add .
git commit -m "feat: launch cinematic portfolio"
git branch -M main
```

## 3. Create an empty GitHub repository

Create a repository named `alim-portfolio` (or another name you prefer). Do not initialize it with a README, .gitignore, or license.

Then connect it locally:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/alim-portfolio.git
git push -u origin main
```

## 4. Import into Vercel

In Vercel, choose Add New Project and import the GitHub repository. Vercel should detect Next.js automatically.

Use the project root as the Root Directory when `package.json` is at the repository root.

## 5. Add environment variables in Vercel

Copy the same keys from `.env.local` into Vercel Project Settings > Environment Variables. Apply them to Production and Preview as appropriate.

Typical variables for this portfolio are:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

Set `NEXT_PUBLIC_SITE_URL` to the production Vercel URL after the first deployment, then redeploy.

## 6. Future updates

```powershell
git add .
git commit -m "describe the update"
git push
```

A push to the connected Git repository creates a new Vercel deployment automatically.
