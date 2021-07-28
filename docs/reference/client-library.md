---
title: JavaScript client library
description: Integrate Web3.Storage into your code using the JavaScript client library.
---

# JavaScript client library reference

To use the JavaScript client library for Web3.Storage, you must first [obtain an API token](../how-tos/generate-api-token.md).

The client library automatically packs your uploads into a content addressible archive (CAR) for uploading to the Web3.Storage service, which [stores](#store-files) data as blocks prefixed with the [_content identifier_ (CID)](../concepts/content-addressing.md#cids-location-independent-globally-unique-keys) derived from a cryptographic hash of the data. You can then use a file's CID to [retrieve](#retrieve-files) it.

## Constructor

The constructor for Web3.Storage is simple; all you need is your `apiKey` token value.

```javascript
import { Web3Storage } from 'web3.storage'

// Construct with token and endpoint
const client = new Web3Storage({ token: apiKey })
```

## Store files

Store files using the `put()` method.

### Usage

```javascript
<clientObject>.put(file[], { options })
```

### Examples

::::tabs
:::tab Browser

In the browser, using a file chooser to prompt the user for files to store:

```javascript
const fileInput = document.querySelector('input[type="file"]')

// Pack files into a CAR and send to web3.storage
const rootCid = await client.put(fileInput.files, {
  name: 'cat pics',
  maxRetries: 3
})
```

:::

:::tab Node.js

In Node.js, using the `getFilesFromPath` helper to load `File` objects from a local path:

```javascript
import { getFilesFromPath } from 'web3.storage'

const files = await getFilesFromPath('./files')
const rootCid = await client.put(files)
```

:::
::::

### Return value

The method returns a string containing the CID of the uploaded CAR.

### Parameters

Method parameters are supplied in positional order.

| Number | Type | Description |
| ------ | ---- | ----------- |
| 1 | `file[]` | An iterable collection of [Files](https://developer.mozilla.org/en-US/docs/Web/API/File) to be packed into a CAR and uploaded. |
| 2 | `{options}` | _Optional._ An object whose properties define certain Web3.Storage options and metadata about the files being uploaded. See below for more details. |

An `{options}` object has the following properties that can be used as parameters for your `put()` operation:

::: details name
_String._ The `name` parameter lets you attach an arbitrary name to the uploaded content archive, which you can use to identify and organize your uploads. The name is not stored alongside the data on IPFS, but it is viewable within the file listing on the Web3.Storage site.

```js
const cid = await client.put(files, { name: 'cat pics' })
```
:::

::: details maxRetries

_Number._ You can specify how many times `put` should attempt to retry in case of failure by passing in a `maxRetries` option:

```js
const cid = await client.put(files, { maxRetries: 3 })
```
:::

::: details onRootCidReady

_Function._ Because the data is formatted for IPFS and Filecoin on the client, the root CID for the data is generated before the data is uploaded to Web3.Storage. If you want to display the CID to the user before the upload is complete, pass in an `onRootCidReady` function that accepts a CID string:

```js
const onRootCidReady = rootCid => console.log('root cid:', rootCid)
const cid = await client.put(files, { onRootCidReady })
```
:::

::: details onStoredChunk

_Function._ You can also display progress updates by passing in an `onStoredChunk` callback. This is called after each chunk of data is uploaded, with the size of the chunk in bytes passed in as a parameter:

```js
const onStoredChunk = chunkSize => console.log(`stored chunk of ${chunkSize} bytes`)
const cid = await client.put(files, { onStoredChunk })
```
:::

## Retrieve files

Retrieve files using the `get()` method. You will need the CID you obtained at upload time that references the CAR for your uploaded files.

### Usage

```javascript
<clientObject>.get(<CID>)
```

### Example

```javascript
const res = await client.get(rootCid) // Web3Response
const files = await res.files() // Web3File[]
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`)
}
```

### Return value

Returns `undefined` if there are no matches for the given CID.

If found, the method returns a `Web3Response` object, which extends the [Fetch API response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) to add two iterator methods unique to the Web3.Storage client library: `files()` and `unixFsIterator()`.

::::tabs
:::tab File

#### Using `File` objects

Calling the `files()` method returns your requested files as an `Array<Web3File>` object, which is an iterable collection of `Web3File` objects. Each object represents a file that was uploaded in the CAR with the supplied CID.

The `Web3File` type extends [the generic JavaScript `File` type](https://developer.mozilla.org/en-US/docs/Web/API/File), adding a `string` property for the CID of the given file named `cid`, as shown in the example below. This is different from the CID of the CAR that contains the file, which you specified when calling `get()`.

:::

:::tab UnixFS

#### Using `UnixFS` objects

In addition to the `files()` method, you can also use the `unixFsIterator()` method. This returns your requested files as a  `AsyncIterable<UnixFS>` object, which is an iterable collection of [`UnixFS`](https://github.com/ipfs/js-ipfs-unixfs/blob/master/packages/ipfs-unixfs/README.md) objects. Each object represents a file that was uploaded in the CAR with the supplied CID.

Using `unixFS` is helpful in cases where you expect large responses or responses containing many files, since it does not buffer all files in memory before returning. Instead, the returned async iterator `yield`s an object for each entry.

```js
const res = await client.get(cid)
for await (const entry of res.unixFsIterator()) {
  console.log(`got unixfs of type ${entry.type}. cid: ${entry.cid} path: ${entry.path}`)
  // entry.content() returns another async iterator for the chunked file contents
  for await (const chunk of entry.content()) {
    console.log(`got a chunk of ${chunk.size} bytes of data`)
  }
}
```

Note that not all `UnixFS` entries returned by the iterator represent files. If `entry.type == 'directory'`, the entry represents a directory and contains no data itself; it just links to other entries.

For more details on `UnixFS` objects, see [the README file in the `UnixFS` GitHub repository](https://github.com/ipfs/js-ipfs-unixfs/blob/master/packages/ipfs-unixfs/README.md).

:::
::::

### Parameters

Parameters are supplied in positional order.

| Number | Type | Description |
| ------ | ---- | ----------- |
| 1 | `string` | A string containing the CID of the CAR to be retrieved. |

## Check status

Retrieve metadata about your file by using the `status()` method and supplying the CID of the file you are interested in. This metadata includes the creation date and file size, as well as details about how the network is storing your data. Using this information, you can identify peers on the [IPFS (InterPlanetary File System)](https://ipfs.io) network that are pinning the data, and [Filecoin](https://filecoin.io) storage providers that have accepted deals to store the data.

### Usage

```javascript
<clientObject>.status(<CID>)
```

### Examples

::::tabs
:::tab Call

Here's an example of a call to the `status()` method:

```javascript
const info = await client.status(rootCid)
console.log(`${info.cid} ${info.dagSize} ${info.created}`)
```

:::

:::tab Response

Here's an example response from the `status()` method:

```json
{
  "cid": "bafkreifzjut3te2nhyekklss27nh3k72ysco7y32koao5eei66wof36n5e",
  "created": "2021-07-14T19:27:14.934572Z",
  "dagSize": 101,
  "pins": [{
    "peerId": "12D3KooWR1Js",
    "peerName": "peerName",
    "region": "peerRegion",
    "status": "Pinned"
  }],
  "deals": [{
    "dealId": 12345,
    "miner": "f99",
    "status": "Active",
    "pieceCid": "bafkreifzjut3te2nhyekklss27nh3k72ysco7y32koao5eei66wof36n5e",
    "dataCid": "bafkreifzjut3te2nhyekklss27nh3k72ysco7y32koao5eei66wof36n5e",
    "dataModelSelector": "Links/0/Links",
    "activation": "2021-07-14T19:27:14.934572Z",
    "created": "2021-07-14T19:27:14.934572Z",
    "updated": "2021-07-14T19:27:14.934572Z"
  }]
}
```

:::
::::

### Parameters

Parameters are supplied in positional order.

| Number | Type | Description |
| ------ | ---- | ----------- |
| 1 | `string` | A string containing the CID of the CAR. |

### Return value

Returns `undefined` if there are no matches for the given CID.

If found, the `status()` method returns a `{Status}` object that contains the metadata for your object's storage deal on the Web3.Storage network, with the following properties:

::: details cid

_String._ The `cid` property is the content identifier of the data for which you are retrieving status information.
:::

::: details dagSize

_Number._ The `dagSize` property is the total size, in bytes, of the [Merkle Directed Acyclic Graph (DAG)](https://docs.ipfs.io/concepts/merkle-dag/) containing the queried CID.
:::

::: details created

_String._ The `created` property gives the creation date in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
:::

::: details pins

_Array._ The `pins` property is an array of `Pin` objects. Each `Pin` object represents a specific [peer in the IPFS network,](https://docs.libp2p.io/concepts/peer-id/) with the following structure:

```json
Pin {
  peerId: string, // Libp2p peer ID of the node pinning the data.
  peerName: string, // Human readable name for the peer pinning the data.
  region: string, // Approximate geographical region of the node pinning the data.
  status: string, // Can be one of: 'Pinned' | 'Pinning' | 'PinQueued'
  updated: string // Updated date in ISO 8601 format.
}
```
:::

::: details deals

_Array._ The `deals` property is an array of `Deal` objects. Each `Deal` object represents a specific [storage deal on the Filecoin network,](https://docs.filecoin.io/about-filecoin/how-filecoin-works/#deals) for a specific [Piece](https://spec.filecoin.io/systems/filecoin_files/piece/) of data, with the following structure:

```json
Deal {
  dealId: number, // On-chain ID of the deal.
  miner: string, // Address of the miner storing this data.
  status: string, // Can be one of: 'Queued' | 'Published' | 'Active'
  pieceCid: string, // Piece CID of the data in the deal.
  dataCid: string, // CID of the data aggregated in this deal.
  dataModelSelector: string, // Selector for extracting data from the aggregated root.
  activation: string, // Date when the deal will become active, in ISO 8601 format.
  created: string, // Creation date, in ISO 8601 format.
  updated: string // Updated date, in ISO 8601 format.
}
```
:::


