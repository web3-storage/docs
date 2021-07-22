---
title: Query
description: Learn how to get details about files uploaded to Web3.Storage
---

# Query

When you [store a file][howto-store] with Web3.Storage you receive a content identifier (CID) that you can use to [retrieve the file][howto-retrieve]. The CID can also be used to query the service for details about _how_ the data is stored on the [decentralized storage networks][concepts-decentralized-storage] that Web3.Storage uses under the hood.

This guide will show how to use the [JavaScript client library][reference-js-client] to get information about content on Web3.Storage.

## Installing the client

In your JavaScript project, add the `web3.storage` package to your dependencies:

```shell
npm install web3.storage
```

## Creating a client instance

To create a `Web3Storage` client object, we need to pass an access token into the [constructor][reference-js-constructor]:

```javascript
import { Web3Storage } from 'web3.storage'
const token = process.env.WEB3_STORAGE_TOKEN
const client = new Web3Storage({ token })
```

:::tip Get an API token
If you don't yet have an access token, head to the [Quickstart guide to get one →][quickstart]
:::

## Querying for status information

The client object's `status` method accepts a CID string and returns a JSON object with information about the upload.

```javascript
// replace with your own CID to see info about your uploads!
const cid = 'bafybeifljln6rmvrdqu7xopiwk2bykwa25onxnvjsmlp3xdiii3opgg2gq'
const status = await client.status(cid)
if (status != null) {
  console.log(status)
}
```

::: warning Remember to check for null
If you ask for the status of a CID that Web3.Storage doesn't know about, the `status` method will return `undefined` instead of a status object. Make sure to check that the return value exists before using it!
:::

If the given CID is valid and has been uploaded to Web3.Storage, the `status` method will return an object that looks similar to this:

<!-- TODO: replace with an example that has a populated deals field (once that's live) -->

```json
{
  "cid": "bafybeifljln6rmvrdqu7xopiwk2bykwa25onxnvjsmlp3xdiii3opgg2gq",
  "created": "2021-07-20T09:43:47.756391Z",
  "dagSize": 15291,
  "pins": [
    {
      "status": "Pinned",
      "updated": "2021-07-20T14:11:28.418725Z",
      "peerId": "12D3KooWMbibcXHwkSjgV7VZ8TMfDKi6pZvmi97P83ZwHm9LEsvV",
      "peerName": "12D3KooWMbibcXHwkSjgV7VZ8TMfDKi6pZvmi97P83ZwHm9LEsvV",
      "region": null
    },
    {
      "status": "Pinned",
      "updated": "2021-07-20T14:11:29.308487Z",
      "peerId": "12D3KooWF6uxxqZf4sXpQEbNE4BfbVJWAKWrFSKamxmWm4E9vyzd",
      "peerName": "12D3KooWF6uxxqZf4sXpQEbNE4BfbVJWAKWrFSKamxmWm4E9vyzd",
      "region": null
    },
    {
      "status": "Pinned",
      "updated": "2021-07-20T14:11:30.135495Z",
      "peerId": "12D3KooWFe387JFDpgNEVCP5ARut7gRkX7YuJCXMStpkq714ziK6",
      "peerName": "12D3KooWFe387JFDpgNEVCP5ARut7gRkX7YuJCXMStpkq714ziK6",
      "region": null
    }
  ],
  "deals": []
}
```

The `cid` field contains the same CID that was passed into the `status` method, so that you don't have to keep track of which response goes with which request.

The `created` field contains an [ISO-8601 datetime string][iso-8601] indicating when the content was first uploaded to Web3.Storage.

The `dagSize` field contains the size in bytes of the [Directed Acyclic Graph (DAG)][ipfs-docs-merkle-dag] that contains all of the uploaded content. This is the size of the data that is transferred over the network to Web3.Storage during upload, and is slightly larger than the total size of the files on disk.

The `pins` field contains an array of objects describing the IPFS nodes that have [pinned][ipfs-docs-pinning] the data, making it available for fast retrieval using the IPFS network.

Finally, the `deals` field contains an array of objects describing the Filecoin storage providers that have made [storage deals][fil-docs-deals]. These storage providers have now committed to storing the data for a period of time.

For more details about the response, including the format of the `pins` and `deals` objects, see the [client library reference][reference-js-status].

[quickstart]: ../../quickstart/README.md
[concepts-decentralized-storage]: ../../concepts/decentralized-storage.md
[howto-store]: ./store.md
[howto-retrieve]: ./retrieve.md
[reference-js-client]: ../../reference/client-library.md#javascript
[reference-js-constructor]: ../../reference/client-library.md#constructor
[reference-js-status]: ../../reference/client-library.md#check-status


[ipfs-docs-merkle-dag]: https://docs.ipfs.io/concepts/merkle-dag/
[ipfs-docs-pinning]: https://docs.ipfs.io/concepts/persistence/
[fil-docs-deals]: https://docs.filecoin.io/about-filecoin/how-filecoin-works/#deals

[iso-8601]: https://en.wikipedia.org/wiki/ISO_8601
