# The closedbecause.xyz Website

This is the source for the website hosted at https://closedbecause.xyz/.

It uses Typescript and Next.js, and deploys automatically to Vercel.

As is common with Next.js applications, most of the code will be run both on
the client and on the server.
Code in the `src/ssr` directory will be linted as running in Node only;
please don't try to rely on it on the client.

Articles placed in `src/pages/` with a `.mdx` extension will be
picked up automatically.
Please make sure to export a field called `metadata` with a type of
`PageMetadata` so that the rendering and listing code knows what to render
 and list.
