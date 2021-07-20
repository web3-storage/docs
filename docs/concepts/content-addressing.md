---
title: Content addressing
description: A conceptual overview of content-based addressing for storing and locating files on a decentralized network with Web3.storage.
---

# Content addressing

_Content addressing_ is a technique for organizing and locating data in an information system in which the key used to locate content is derived from the content itself rather than a location.

## The basic problem

Consider what happens when you resolve a link like `docs.web3.storage/concepts/content-addressing`. First, your operating system will query a global shared key-value store, split into many domains: the Domain Name System (DNS). The DNS will return an IP address that your network card can use to send HTTP requests over the network, where this site's naming conventions turn the key `/concepts/content-addressing` into a response payload.

The problem is, components of an address like `docs.web3.storage/concepts/content-addressing` are _mutable_, meaning they can change over time. In the context of the web, where _everything_ is mutable and dynamic, this is just the way it's always been. As a result, [link rot](https://en.wikipedia-on-ipfs.org/wiki/Link_rot) is just something we've all learned to live with.

## CIDs: Location-independent, globally unique keys

A content-addressed system such as Web3.Storage is like our key-value-based DNS system, with one significant difference: You no longer get to choose the keys. Instead, the keys are derived directly from the file contents using an algorithm that will always generate the same key for the same content.

As a result, we no longer need to coordinate among multiple writers to our store by splitting the key space into domains and locations on file systems. There's now one universal domain — the domain of all possible values. If multiple people add the same value, there's no collision in the key space. They just each get the same key back from the `put` method, and the availability/performance of retrievals on the network is increased. This gives our keys _location independence_. It also means that your key is a signature for the data itself, ensuring _verifiability_ that the key matches the content and the content hasn't been altered.

This type of key is called a Content Identifier (CID). Once you have the CID for a file on the Web3.Storage network, you have all you need for the network to locate and return the file back to you. Here is a JavaScript example of a complete storage and retrieval round-trip using Web3.Storage:

```javascript
// get uploaded files from a form
const fileInput = document.querySelector('input[type="file"]')

// store files and obtain a CID
const rootCid = await client.put(fileInput.files)

// retrieve files using the CID
const res = await client.get(rootCid)
const files = await res.files()
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`)
}
```

## Under the hood

Content addressing is the basis of the InterPlanetary File System, or [IPFS](https://ipfs.io), and IPFS is the system used under the hood by Web3.Storage to locate files. When your data is stored on IPFS, users can fetch it from any IPFS node that has a copy, which can make data transfers more efficient and reduce the load on any single server. As each user fetches a piece of data, they keep a local copy around to help other users who might request it later.

Web3.Storage makes it easy to get your data onto IPFS, as well as providing long-term persistence backed by the decentralized [Filecoin](https://filecoin.io/) storage network, which incentivizes participants to provide storage space for files on the network. (For more details on that, see the [Decentralized Storage](decentralized-storage.md) topic.) By combining these two technologies, Web3.Storage makes it simple to use a decentralized solution for storing, locating, and retrieving your files.

## Summary

Locating files using content addressing solves for the mutability of location-dependent storage systems by using a hashing algorithm to generate a unique Content Identifier (CID) for each file, and using that as the lookup key for a file rather than a URL. This ensures that users intending to retrieve a specific version of a file will be guaranteed to retrieve that version for as long as it exists anywhere on the network.

## More resources

For more information on content addressing, see [the ProtoSchool lesson on content addressing](https://proto.school/content-addressing/).
