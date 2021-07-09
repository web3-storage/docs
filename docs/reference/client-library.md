---
title: Client Library
description: Integrate web3.storage into your code using a client library for your programming language.
---

# JavaScript

<!-- https://www.notion.so/protocollabs/web3-storage-MVP-2b5dcc65de404c6c9744139631622dd2 -->
<!-- https://github.com/web3-storage/web3.storage/tree/main/packages/client -->

## Get started

To use the JavaScript client library for web3.storage, you must first [obtain an API key].



## Constructor

To instantiate your client object, you

```javascript
import { Web3Storage } from 'web3.storage'

// Construct with token and endpoint
const client = new Web3Storage({ token: apiKey })
```

## Store Files

Store files using the `put()` method.

Pack files into CAR and upload. You can pass in a FileList in the browser (as you'd get from a <input type="file"> , or an array of Filelike objects with a name and a stream of the file contents in node.js

```javascript
const fileInput = document.querySelector('input[type="file"]')

// Pack files into a CAR and send to web3.storage
const rootCid = await client.put(fileInput.files) // Promise<CIDString>
```

## Retrieve Files

Retrieve files using the `get()` method.

```javascript
// Fetch and verify files from web3.storage
const res = await client.get(rootCid) // Promise<Web3Response>
const files = await res.files() // Promise<Web3File[]>
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`)
}
```

Get by CID. Response provides files which will unpack the CAR file. The notable thing here is the Response object is as returned by the fetch api, with 2 extra methods... files() and unixFsIterator()

files() gives you a File object (https://developer.mozilla.org/en-US/docs/Web/API/File) with and extra cid property added in. Where the caller doesn't need to deal with CARs / files larger than their ram, they can use that. The `file.name` will be a `path/with/slashes/in.png` if the CAR contained a directory tree. If not, it'll just be the filename.

When using the client from node.js, and they want to deal with very large things, then the unixFsIterator() provides the same output as `ipfs.get`, an AsyncIterator of UnixFS things... this api may not be the right thing to expose here, but it is helpful if you have existing ipfs tooling that knows how to consume such a thing.

## Check status

```javascript
// Get info on the Filecoin deals that the CID is stored in
const info = await client.status(rootCid) // Promise<Metadata>
```
