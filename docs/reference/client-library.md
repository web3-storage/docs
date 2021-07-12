---
title: JavaScript Client Library
description: Integrate web3.storage into your code using a client library for your programming language.
---

# JavaScript

## Get started

To use the JavaScript client library for web3.storage, you must first [obtain an API key](../how-tos/regenerate-api-key.md).

The client library will automatically pack your uploads into a content addressible archive (CAR) file for uploading to the web3.storage service, which stores data as blocks prefixed with the content ID (CID) derived from the hash of the data, in a file with a `.car` extension. You can then use the CID to retrieve the file.

## Constructor

```javascript
import { Web3Storage } from 'web3.storage'

// Construct with token and endpoint
const client = new Web3Storage({ token: apiKey })
```

## Store Files

Store files using the `put()` method.

### Usage

```javascript
<clientObject>.put(file[])
```

### Parameters

Parameters are supplied in positional order.

| Number | Type | Description |
| ------ | ---- | ----------- |
| 1 | `file[]` | An iterable collection of [Files](https://developer.mozilla.org/en-US/docs/Web/API/File) to be packed into a CAR and uploaded. |

### Return value

The method returns a string containing the CID of the uploaded CAR file.

### Example

```javascript
const fileInput = document.querySelector('input[type="file"]')

// Pack files into a CAR and send to web3.storage
const rootCid = await client.put(fileInput.files)
```

## Retrieve Files

Retrieve files using the `get()` method. You will need the CID that references the CAR file for your uploaded files that you obtained at upload time.

### Usage

```javascript
<clientObject>.get(<CID>)
```

### Parameters

Parameters are supplied in positional order.

| Number | Type | Description |
| ------ | ---- | ----------- |
| 1 | `string` | A string containing the CID of the CAR file to be retrieved. |

### Return value

The method returns a `Web3Response` object, which extends the [Fetch API response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) to add two iterator methods unique to the web3.storage client library: `files()` and `unixFsIterator()`.

Calling the `files()` method will return your requested files as an `Array<Web3File>` object, which is an iterable collection of `Web3File` objects. Each object represents a file that was uploaded in the CAR file with the supplied CID.

The `Web3File` type extends [the generic JavaScript `File` type](https://developer.mozilla.org/en-US/docs/Web/API/File), adding a `string` property for the CID of the given file named `cid`, as shown in the example below. This will be different from the CID of the CAR that contains the file, which you specified when calling `get()`.

> **Note**: In addition to the `files()` method, you can also use the `unixFsIterator()` method, which will return your requested files as a  `AsyncIterable<UnixFSEntry>` object, which is an iterable collection of [`UnixFSEntry`](https://github.com/ipfs/js-ipfs-unixfs/blob/master/packages/ipfs-unixfs-exporter/README.md#unixfsentry) objects. Each object represents a file that was uploaded in the CAR file with the supplied CID. However, in the vast majority of cases, you will want to use the `files()` method. The exception is when you are retrieving files in a Node.js context, and you have existing IPFS tooling that knows how to consume `UnixFSEntry` objects.

### Example

```javascript
const res = await client.get(rootCid) // Web3Response
const files = await res.files() // Web3File[]
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`)
}
```

## Retrieve metadata

Retrieve metadata about your file by using the `status()` method, supplying the CID of the file you are interested in.

### Usage

```javascript
<clientObject>.status(<CID>)
```

### Parameters

Parameters are supplied in positional order.

| Number | Type | Description |
| ------ | ---- | ----------- |
| 1 | `string` | A string containing the CID of the CAR file. |

### Return value

The `status()` method returns a `Metadata` object that contains the metadata for your object's storage deal on the web3.storage network.

TODO: As of this writing, the structure of the `Metadata` data type has not been finalized.

### Example

```javascript
const info = await client.status(rootCid) // Metadata
```
