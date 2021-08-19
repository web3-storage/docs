---
title: Work with Content Archives
description: Learn how to work with Content Archives of IPLD data.
---

# Working with Content Archives

When you upload files to Web3.Storage using the [client library][reference-client-library], your data is converted into a graph of data structures, which are then packed into a format called a Content Archive (CAR) before being sent to the Web3.Storage service. 

For most use cases, you never need to know about this process, as the conversion happens behind the scenes when using the client library.  However, if you're using the [HTTP API][reference-http-api], or if you want more control over the structure of the IPFS data graph, you may want to work with Content Archives directly.

This how-to guide will explain [the basics of Content Archives](#what-is-a-content-archive) and [how they're used by the Web3.Storage API](#car-files-and-web3-storage).

We'll also see several methods of creating and manipulating Content Archives using [command line tools](#command-line-tools) and an overview of the [libraries](#libraries-for-application-developers) you can use in your application's code.

## What is a Content Archive?

The [Content Archive format][car-spec] is a way of packaging up [content addressed data][concepts-content-addressing] into archive files that can be easily stored and transferred. You can think of them like [TAR files][wikipedia-tar] that are designed for storing collections of content addressed data.

The type of data stored in CARs is defined by [IPLD](https://ipld.io), or InterPlanetary Linked Data. IPLD is a specification and set of implementations for structured data types that can link to each other using a hash-based Content Identifier (CID). Data linked in this way forms a Directed Acyclic Graph, or DAG, and you'll likely see a few references to DAGs in the documentation for IPLD and IPFS.

IPFS files are one example of IPLD data, but IPLD can also be used to access data from Ethereum, Git, and other hash-addressed systems. You can also use IPLD as a general purpose format for your structured data, sort of like a Web3-flavored JSON. See [Advanced IPLD formats](#advanced-ipld-formats) below for more information.

## CARs and Web3.Storage

When the Web3.Storage client packs up regular files into a CAR to store on IPFS, the CAR contains data encoded in the same format used by IPFS when importing files using the command line or other IPFS APIs.

This format uses an IPLD "codec" called [`dag-pb`](https://ipld.io/docs/codecs/known/dag-pb/), which uses [Protocol Buffers](https://developers.google.com/protocol-buffers) to encode an object graph. Inside the graph are [UnixFS objects](https://docs.ipfs.io/concepts/file-systems/#unix-file-system-unixfs) that describe the files and their contents.

Although the [HTTP API][reference-http-api] also allows you to upload regular files, the client prefers to send CARs for a few reasons.

First, formatting everything on the client allows us to calculate the root Content Identifier for the data you're uploading before we send any data to the remote service. This means that you can compare the CID returned by the Web3.Storage service to the one you calculated locally, and you don't have to trust the service to do the right thing.

Another reason to use CARs is to support large files, which would otherwise hit size limits on the Web3.Storage backend platform. The data in a CAR is already chunked into small blocks, which makes CARs easy to split into small pieces that can be uploaded in batches.

## Command line tools

There are a few ways to create and interact with CAR files from the command line.

### ipfs-car

The [ipfs-car][github-ipfs-car] JavaScript package includes a command-line tool for easily creating, unpacking, and verifying CAR files.

To install it, you'll need [Node.js](https://nodejs.com) - we recommend the latest stable version.

You can install the command globally:

```shell
npm install -g ipfs-car
```

Or run the command with `npx` without installing it to your PATH:

```shell
npx ipfs-car --help
```

The `--pack` flag will create a new CAR file from a collection of input files:

```shell
ipfs-car --pack path/to/files --output path/to/write/a.car
```

Or extract files from a CAR with `--unpack`:

```shell
ipfs-car --unpack path/to/my.car --output /path/to/unpack/files/to
```

You can also list the contents of a CAR with `--list`:

```shell
ipfs-car --list path/to/my.car
```

For more usage information, run `ipfs-car --help`.

### go-ipfs

[`go-ipfs`](https://docs.ipfs.io/install/command-line/) is the reference implementation of the IPFS protocol. Among many other features, `go-ipfs` supports exporting any IPFS object graph into a CAR file and importing data from CAR files into your local IPFS repository.

The [`ipfs dag export`][ipfs-docs-dag-export] command will fetch an IPFS object graph by its Content ID (CID), writing a stream of CAR data to standard output.

To create a CAR file using go-ipfs, you can redirect the output of `ipfs dag export` to a file:

```shell
cid="bafybeigdmvh2wgmryq5ovlfu4bd3yiljokhzdep7abpe4c4lrf6rukkx4m"
ipfs dag export $cid > path/to/output.car
```

Note that you should replace the value of `cid` inside the quotes with the CID you want to export.

If you don't have the CID in your local IPFS repository, the `dag export` command will try to fetch it over the IPFS network.

To add the contents of a CAR file to your local IPFS repository, you can use `ipfs dag import`:

```shell
ipfs dag import path/to/input.car
```

## Libraries for application developers

### JavaScript

There are two JavaScript packages available for manipulating CARs inside your application.

#### ipfs-car

The `ipfs-car` package includes library functions for packing and unpacking files into CARs, using the IPFS UnixFs data model. The library includes the same functionality as the `ipfs-car` command line utility [described above](#ipfs-car).

See the [ipfs-car README](https://github.com/web3-storage/ipfs-car#api) for API documentation and usage examples.

#### @ipld/car

The [`@ipld/car` package](https://github.com/ipld/js-car) contains the main JavaScript implementation of the CAR specification and is used by `ipfs-car` under the hood. If you want to store non-file data using [advanced IPLD formats](#advanced-ipld-formats), you should use `@ipld/car` directly.

`@ipld/car` also provides the `CarReader` interface used by the Web3.Storage client's [`putCar` method][reference-client-putCar].

Here's a simple example of loading a CAR file from a Node.js stream and storing it with Web3.Storage:

```javascript
import { createReadStream } from 'fs'
import { CarReader } from '@ipld/car'

async function storeCarFile(filename) {
  const inStream = createReadStream(filename)
  const car = await CarReader.fromIterable(inStream)
  
  const client = makeStorageClient()
  const cid = await client.putCar(car)
  console.log('Stored CAR file! CID:', cid)
}
```

`CarReader.fromIterable` accepts any iterable of `Uint8Array` data, including Node.js streams. If you have all your CAR data in a single `Uint8Array` already, you can use [`CarReader.fromBytes`](https://github.com/ipld/js-car#CarReader__fromBytes) instead.

The `CarReader` type shown above will read the entire contents of the CAR into memory, which may cause issues with large files. On Node.js, you can use [`CarIndexedReader`](https://github.com/ipld/js-car#carindexedreader), which reads CAR data from disk directly and uses less memory than `CarReader`.

### Go

The [`go-car` module](https://github.com/ipld/go-car) provides the main Golang implementation of the CAR specification. We recommend using the `v2` module version, which supports the latest version of the CAR spec.

See the [API reference documentation](https://pkg.go.dev/github.com/ipld/go-car/v2) for more information.

<!-- TODO: find / write simple go-car example -->

## Advanced IPLD formats

IPLD can also be used as a general purpose data format like JSON. In fact, you can use JSON directly as IPLD just by using a special convention for linking to other IPLD objects. This convention is defined in the [`dag-json` "codec"](https://ipld.io/docs/codecs/known/dag-json/).

Here's an example of a `dag-json` object:

```json
{
  "name": "Have you seen this dog?",
  "description": "I have now...",
  "image": { "/": "bafybeihkqv2ukwgpgzkwsuz7whmvneztvxglkljbs3zosewgku2cfluvba" }
}
```

The `image` field uses the special "link type" to reference another IPLD object. The link is just a regular JSON object with a single key named `/`, whose value is a Content Identifier.

Although `dag-json` is familiar and easy to use, we recommend using the similar [`dag-cbor` codec](https://ipld.io/docs/codecs/known/dag-cbor/) instead. `dag-cbor` uses the [Concise Binary Object Representation](https://cbor.io) to more efficiently encode data, especially binary data which must be Base64-encoded when using `dag-json`.

Here's a small example of encoding some `dag-cbor` data into a CAR that can be uploaded to Web3.Storage:

```javascript
import { Web3Storage } from 'web3.storage'
import { CarReader, CarWriter } from '@ipld/car'
import { encode } from 'multiformats/block'
import * as cbor from '@ipld/dag-cbor'
import { sha256 } from 'multiformats/hashes/sha2'

const testObject = {
  name: 'Have you seen this dog?',
  description: 'I have now...',
  image: CID.parse('bafybeihkqv2ukwgpgzkwsuz7whmvneztvxglkljbs3zosewgku2cfluvba')
}

async function storeDagCBOR(value = testObject) {
  // encode the value into an IPLD block, using the cbor codec and sha256 hash function
  const block = await encode({ value, codec: cbor, hasher: sha256 })

  // create a new CarWriter, with the encoded block as the root
  const { writer, out } = CarWriter.create([block.cid])

  // add the block to the CAR and close it
  writer.put(block)
  writer.close()

  // create a new CarReader we can hand to Web3.Storage.putCar
  const reader = await CarReader.fromIterable(out)

  // upload to Web3.Storage using putCar
  const client = new Web3Storage({ token })
  const cid = await client.putCar(reader
}
```



### Enabling IPLD codecs in the client library

By default, the client's [`putCar` method][reference-client-putCar] will accept data encoded using the `dag-pb`, `dag-cbor`, or `raw` codecs. If you want to use another codec like `dag-json`, you must include the codec in the `decoders` option to `putCar`.

See the [`putCar` parameter reference][reference-client-putCar-params] for more details and an example that uses `dag-json`.

::: warning Gateway support
Although Web3.Storage supports storing CAR files with `dag-cbor` content by default and can accept other codecs with the `decoders` option, the IPFS HTTP gateway does not currently "speak" these formats and is not able to provide such data over HTTP. Please follow [this issue](https://github.com/ipfs/go-ipfs/issues/8234) to track the development of this feature.
:::

[concepts-content-addressing]: ../concepts/content-addressing.md
[reference-client-library]: ../reference/client-library.md
[reference-client-putCar]: ../reference/client-library.md#store-car-files
[reference-client-putCar-params]: ../reference/client-library.md#parameters-5
[reference-http-api]: https://docs.web3.storage/reference/http-api

[github-ipfs-car]: https://github.com/web3-storage/ipfs-car
[ipfs-docs-dag-export]: https://docs.ipfs.io/reference/cli/#ipfs-dag-export
[ipfs-docs-dag-import]: https://docs.ipfs.io/reference/cli/#ipfs-dag-import
[car-spec]: https://ipld.io/specs/transport/car/
[wikipedia-tar]: https://en.wikipedia.org/wiki/Tar_(computing)