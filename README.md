# Roblox Shop

A web shop that connects to roblox

I've been working on this on my own for a while but I decided that I should probably open source it

# Tech stack

Svelte & SvelteKit

PostgreSQL & Prisma

Redis

# TODO

CSS

Maybe additional security

Deployment, setup docker etc.

# Developing

`npm run dev` to run it locally on port 5173

`npm run build` to build

**NOTE**: You will need to create a .env file with the following:

```
SECRET_STRIPE_KEY=
PUBLIC_STRIPE_KEY=
JWT_SECRET=
WEBHOOK_SECRET=
DATABASE_URL=
```

If you want to test the Roblox authentication you must have an instance of Redis running on your machine
