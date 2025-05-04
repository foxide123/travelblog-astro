# Astro Multilingual Template

A simple template with multiple language support. 
This template recognizes user's browser language and redirects to the appropriate locale.

## 🌤️ Cloudflare Support 🌤️

This template uses 'Cloudflare' adapter.
That means each page will be rendered on demand unless you add '**export const prerender = true;**' to the page.
If you don't want to use an adapter, you should remove following code from the '**astro.config.mjs**'
```
  output: 'server',
  adapter: cloudflare({
    platformProxy: {enabled: true}
  }),
```
If you don't use any adapters, then all of the pages will be pre-rendered by default so there is no need to add '**export const prerender = true;**' to the page.

## 🫱 Cloudflare Redirect 

The user's browser language recognition and redirect does not work when deployed on Cloudflare by default.
We have to create a Transform Rule that will check user's browser language and redirect to appropriate url.
Here's the image representing that step:
 ![Cloudflare Redirect](https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/62b0f7ee-264f-4559-5135-ad1e23e68d00/public)

In this rule, we are checking if the path is "https://dashcruisedev.com/" which is the home page.
We also check the Accept-Language Request Header. It is an array of user's preffered locale.
In this case we check if the first element of this array is "pl".
If so, we want to redirect the user to "https://dashcruisedev.com/pl/".
Since the redirect happens on the edge runtime, it doesn't negatively impact performance.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
