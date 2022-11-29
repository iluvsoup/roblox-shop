# Roblox Shop

A web shop that connects to roblox

I've been working on this on my own for a while but I decided that I should probably open source it

# Tech stack

Svelte & SvelteKit

PostgreSQL & Prisma

Redis

# Developing

`(p)npm run dev` to run it locally on port 5173

**NOTE**: You will need to create a .env file with the following:

```
SECRET_STRIPE_KEY=
PUBLIC_STRIPE_KEY=
JWT_SECRET=
WEBHOOK_SECRET=
DATABASE_URL=
REDIS_URL=
API_SECRET=
```

`API_SECRET` is for authenticating roblox to server communication

`REDIS_URL` is unnecessary if you are only going to be running this in dev

If you want to test the Roblox authentication you must have an instance of Redis running on your machine

If you want to test the stripe webhooks you must run the following command with the stripe CLI

```
stripe listen --forward-to=http://localhost:5173
```

A roblox project to interface with this would look something like [this](https://github.com/iluvsoup/roblox-shop/blob/main/roblox/shop.rbxl)
