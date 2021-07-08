---
title: Store
description: Learn how to store your data on the decentralized web with Web3.Storage
---

# Store

Web3.Storage provides a simple interface for storing data, inspired by familiar web APIs like [`fetch`][mdn-fetch] and [`File`][mdn-file]. This guide will show how to use the Web3.Storage client to make your data available on the decentralized IPFS network, with persistent long-term storage provided by Filecoin.

This guide focuses on the [JavaScript client library][reference-js] , which is the simplest way to use Web3.Storage. If you're using another language, see the [HTTP API reference][reference-http] for details on working with the underlying HTTP API.

Uploading data requires an API token for a Web3.Storage account. If you've already signed up for a Web3.Storage account, head to the [API Tokens page][site-tokens] to create a new token, and copy it somewhere safe. If you haven't yet created an account, it's simple and free! Our [Quick Start guide][quickstart-guide] will walk you through getting signed up.

## Installing the client

In your JavaScript project, add the `web3.storage` package to your dependencies:

```bash
npm install web3.storage
```

If you're running in a browser environment, you'll also need the `web3-file` package, which extends the [Web File API][mdn-file] to include file paths and other metadata required by the Web3.Storage API.

```bash
# only needed for browser runtimes, ignore if you're building for node.js
npm install web3-file
```

## Creating a client instance

To create a `Web3Storage` client object, we need to pass an access token into the [constructor][reference-js-constructor]:

```js
const { Web3Storage } = require('web3.storage')
const token = process.env.WEB3_STORAGE_TOKEN
const client = new Web3Storage({ token })
```

In the example above, we read the token from an environment variable called `WEB3_STORAGE_TOKEN`, since baking credentials into source code is generally a bad idea. To help make environment variables easier to manage, consider using a package like [dotenv](https://www.npmjs.com/package/dotenv), which will read variables from a file called `.env` in your project's root directory. Just make sure not to check the `.env` file into source control!

## Preparing files for upload

The client's [`put` method][reference-js-put] accepts an array of `FileLike` objects, which is an interface based on the [Web File API](https://developer.mozilla.org/en-US/docs/Web/API/File) that also includes a file path property.

On Node, the `FileLike` implementation is provided by the `@web-std/file` package, which is pulled in automatically when you add `web3.storage` to your project's dependencies. When running in the browser, you should add the `web3-file` package to your dependencies as described above.

Import the `File` object that matches your runtime platform:

```js
// for node.js:
const { File } = require('@web-std/file')

// for browsers:
const { File } = require('web3-file')
```

If you're planning to support both runtimes, consider using a bundler like [webpack](https://webpack.js.org) or [rollup](https://rollupjs.org/guide/en/) that can selectively override imports based on the target platform. Then you can confine your platform-specific imports to one file, and the rest of your code can just do something like this:

```js
const { File } = require('./platform')
```

Once you've got a `File` object in scope, you can prepare your files for upload:

```js
const files = [
  new File(['contents-of-file-1'], 'plain-utf8.txt'),
  new File(aBlobOrArrayBuffer, 'pic.jpeg')
]
```

You can create a nested directory structure by adding files with path components separated by `/` characters:

```js
const files = [
  new File(kittyImageBytes, '/images/cats/kitty.jpeg'),
  new File(pugImageBytes, '/images/dogs/pug.jpeg'),
]
```

::: tip Unique file names
Try to give each file a unique file name! All the files in a `put` request will be bundled into one content archive, and linking to the files inside is much simpler if each file has a unique human-readable name.
:::

## Uploading to Web3.Storage

Once you have a client object and an array of `File`s, uploading is simple:

```js
const cid = await client.put(files)
```

### Upload options

There are a few optional parameters to the `put` method that may come in handy depending on your use case.

#### `name`

The `name` parameter lets you attach an arbitrary name to the uploaded content archive, which you can use to identify and organize your uploads. The name is not stored alongside the data on IPFS, but it is viewable within the [file listing][site-files] on the Web3.Storage site.

```js
const cid = await client.put(files, { name: 'cat pics' })
```

#### `maxRetries`

You can specify how many times `put` should attempt to retry in case of failure by passing in a `maxRetries` option:

```js
const cid = await client.put(files, { maxRetries: 3 })
```

#### `onRootCidReady`

Because the data is formatted for IPFS and Filecoin on the client, the root CID for the data is generated before the data is uploaded to Web3.Storage. If you want to display the CID to the user before the upload is complete, pass in an `onRootCidReady` function that accepts a CID string:

```js
const onRootCidReady = rootCid => console.log('root cid:', rootCid)
const cid = await client.put(files, { onRootCidReady })
```

#### `onStoredChunk`

You can also display progress updates by passing in an `onStoredChunk` callback. This will be called after each chunk of data is uploaded, with the size of the chunk in bytes passed in as a parameter:

```js
const onStoredChunk = chunkSize => console.log(`stored chunk of ${chunkSize} bytes`)
const cid = await client.put(files, { onStoredChunk })
```

## Next steps

The `put` method returns an [IPFS Content Identifier][ipfs-docs-cid] that can be used to fetch the files from IPFS. See the [retrieval page][howto-retrieve] to learn how to fetch your data using the Web3.Storage client, or directly from IPFS using a gateway or the IPFS command line.

You can also get more information about the status of your data. See the [query page][howto-query] to learn how to get more details about your data, including the status of any Filecoin storage deals.

<!-- internal links -->

<!-- FIXME: link targets for reference docs don't exist yet -->
[reference-js]: ../../reference/javascript.md
[reference-js-constructor]: ../../reference/javascript.md#constructor
[reference-js-put]: ../../reference/javascript.md#put
[reference-http]: ../../reference/http.md

[quickstart-guide]: ../../quickstart/README.md
[howto-retrieve]: ./retrieve.md
[howto-query]: ./query.md

<!-- links to the web3.storage site -->
[site-tokens]: https://web3.storage/tokens/
[site-files]: https://web3.storage/files/

<!-- external links -->
[ipfs-docs-cid]: https://docs.ipfs.io/concepts/content-addressing/
[ipfs-docs-cli-quickstart]: https://docs.ipfs.io/how-to/command-line-quick-start/
[mdn-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[mdn-file]: https://developer.mozilla.org/en-US/docs/Web/API/File
