# web3.storage/docs

Documenting how to use web3.storage.

**Under the hood, web3.storage is backed by the provable storage of [IPFS](https://ipfs.io) and [Filecoin](https://filecoin.io).**

When it comes down to building your next application, service, or website, web3.storage keeps it simple. You get all the benefits of decentralized storage technologies with the frictionless experience you expect in a modern dev workflow. **All you need to use web3.storage is an account and your data.** 

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Add pages as markdown with .md extension to the `src/pages/`

By default, the page map contains all .md and .mdx filenames and the directory structure, sorted alphabetically. Then, Nextra will use the title package to get formatted page names from filenames.

You can have an `_meta.json` file in each directory, and it will be used to override the default configuration of each page. It tells Nextra the order of each page, and the correct title.

```json
{
  "index": "🏠",
  "w3cli": "Command line",
  "w3up-client": "JS Client",
  "concepts": "Concepts"
}
```

Built on next and nextra. See https://nextra.site/docs/guide/organize-files for more.
