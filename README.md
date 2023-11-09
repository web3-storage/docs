# web3.storage/docs

Documenting how to use web3.storage.

<img width="1414" alt="docs site screenshot" src="https://github.com/web3-storage/docs/assets/58871/19b1fc0a-40e4-4cbd-888b-3852e666da53">


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
