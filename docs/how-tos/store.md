---
title: Store
description: Learn how to store your data on the decentralized web with Web3.Storage
---

# Store

Web3.Storage provides a simple interface for storing data, inspired by familiar web APIs like [`fetch`][mdn-fetch] and [`File`][mdn-file]. This guide will show how to use the Web3.Storage client to make your data available on the decentralized IPFS network, with persistent long-term storage provided by Filecoin.

This guide focuses on the [JavaScript client library][reference-js], which is the simplest way to use Web3.Storage.
<!-- TODO: bring this back once the HTTP reference exists
If you're using another language, see the [HTTP API reference][reference-http] for details on working with the underlying HTTP API.
-->
Uploading data requires an API token for a Web3.Storage account. If you've already signed up for a Web3.Storage account, head to the [Profile page][site-profile] to create a new token, and copy it somewhere safe. If you haven't yet created an account, it's simple and free! Our [Quick Start guide][quickstart-guide] will walk you through getting signed up.


::: danger
All data uploaded to Web3.Storage is made publicly available to anyone who requests it using the correct CID. Do not store any private or sensitive information in an unencrypted form using Web3.Storage!
:::

## Installing the client

In your JavaScript project, add the `web3.storage` package to your dependencies:

```bash
npm install web3.storage
```

## Creating a client instance

To create a `Web3Storage` client object, we need to pass an access token into the [constructor][reference-js-constructor]:

```js
import { Web3Storage } from 'web3.storage'
const token = process.env.WEB3_STORAGE_TOKEN
const client = new Web3Storage({ token })
```

In the example above, we read the token from an environment variable called `WEB3_STORAGE_TOKEN`, since baking credentials into source code is generally a bad idea. To help make environment variables easier to manage, consider using a package like [dotenv](https://www.npmjs.com/package/dotenv), which will read variables from a file called `.env` in your project's root directory. Just make sure not to check the `.env` file into source control!

## Preparing files for upload

The client's [`put` method][reference-js-put] accepts an array of [`File` objects](https://developer.mozilla.org/en-US/docs/Web/API/File).

When running in the browser, you can use the native `File` object provided by the browser runtime.

On node.js, import `File` from the `web3.storage` package along with the `Web3Storage` object:

```js
import { File, Web3Storage } from 'web3.storage'
```

Once you have a `File` constructor in scope, you can prepare your files for upload:

```js
const files = [
  new File(['contents-of-file-1'], 'plain-utf8.txt'),
  new File([aBlobOrArrayBuffer], 'pic.jpeg')
]
```

You can create a nested directory structure by adding files with path components separated by `/` characters:

```js
const files = [
  new File(kittyImageBytes, '/images/cats/kitty.jpeg'),
  new File(pugImageBytes, '/images/dogs/pug.jpeg'),
]
```

In the browser, you can also use a [file input element][mdn-file-input] to allow the user to select files for upload, instead of creating `File` objects manually:

```js
const fileInput = document.querySelector('input[type="file"]')
const files = fileInput.files
```

::: tip Unique file names
Try to give each file a unique file name! All the files in a `put` request will be bundled into one content archive, and linking to the files inside is much simpler if each file has a unique human-readable name.
:::

## Uploading to Web3.Storage

Once you have a client object and an array of `File`s, uploading is simple:

```js
const cid = await client.put(files)
```

If you'd like to associate a name with your upload or display progress information to the user, see the [client library reference][reference-js-put] for a description of the optional parameters.

::: warning
Deleting files from the Web3.Storage [Files page][site-files] will remove them from the file listing for your account, but some members of the [decentralized storage network][concepts-decentralized-storage] may retain copies of the data indefinitely. Do not use Web3.Storage for data that may need to be permanently deleted in the future.
:::

## Next steps

The `put` method returns an [IPFS Content Identifier][ipfs-docs-cid] that can be used to fetch the files from IPFS. See the [retrieval page][howto-retrieve] to learn how to fetch your data using the Web3.Storage client, or directly from IPFS using a gateway or the IPFS command line.

You can also get more information about the status of your data. See the [query page][howto-query] to learn how to get more details about your data, including the status of any Filecoin storage deals.

<!-- internal links -->

[reference-js]: ../../reference/client-library#javascript.md
[reference-js-constructor]: ../../reference/client-library.md#constructor
[reference-js-put]: ../../reference/client-library.md#store-files

[quickstart-guide]: ../../quickstart/README.md
[howto-retrieve]: ./retrieve.md
[howto-query]: ./query.md
[concepts-decentralized-storage]: ../../concepts/decentralized-storage.md

<!-- links to the web3.storage site -->
[site-profile]: https://web3.storage/profile/
[site-files]: https://web3.storage/files/

<!-- external links -->
[ipfs-docs-cid]: https://docs.ipfs.io/concepts/content-addressing/
[ipfs-docs-cli-quickstart]: https://docs.ipfs.io/how-to/command-line-quick-start/
[mdn-fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[mdn-file]: https://developer.mozilla.org/en-US/docs/Web/API/File
[mdn-file-input]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
