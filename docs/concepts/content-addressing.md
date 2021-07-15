---
title: Content addressing
description: Lorem ipsum
---

# Content addressing

_Content addressing_ is a technique for organizing and locating data in an information system in which the key used to locate content is derived from the content itself rather than a location.

## The basic problem

Consider what happens when you resolve a link like `docs.web3.storage/concepts/content-addressing`. First, your operating system will query a global shared key-value store, split into many domains: the Domain Name System (DNS). The DNS will return an IP address that your network card can use to send HTTP requests over the network, where this site's naming conventions turn the key `/concepts/content-addressing` into a response payload.

The problem is, components of an address like `docs.web3.storage/concepts/content-addressing` are _mutable_, meaning they can change over time. If we forget to pay our bills, the domain can expire and be bought by the highest bidder. Or, if we decide to play fast and loose with our site structure and forget to add redirects, the path `/concepts/content-addressing` might return a 404 error instead of this concept guide.

In the context of the web, where _everything_ is mutable and dynamic, this is just the way it's always been. The web has never promised any kind of permanence, either in content or in the "meta-structure" of links between content. As a result, [link rot](https://en.wikipedia-on-ipfs.org/wiki/Link_rot) is just something we've all learned to live with.

But for a digital artifact that's meant to actually be permanent, link rot is an existential concern.

## A stronger link

A content-addressed system such as Web3.storage works just like our key-value-based DNS system, with one significant difference: You no longer get to choose the keys. Instead, the keys are derived directly from the values that are stored using a deterministic function that will always generate the same key for the same content.

Instead of accepting a key and a value, [the `put` method](../how-tos/store.md) just takes a value and returns the key to the caller. In exchange for not being able to choose your own keys, you get some valuable properties.

First, we no longer need to coordinate among multiple writers to our store by splitting the key space into domains. There's now one universal domain — the domain of all possible values. If multiple people add the same value, there's no collision in the key space. They just each get the same key back from the `put` method.

This change also gives our values _location independence_. In our original key-value store with multiple domains, we had to include the domain inside the key to prevent name collisions. To retrieve a value, you needed to know which domain it belonged to, as well as the specific location within that domain's piece of the key space. If we store a _location-based_ key on the blockchain, our ability to retrieve the data depends on the one domain that's baked in to our key. Even if the same content is stored in a thousand other domains, our lookup will fail if the one we depend on disappears or changes its naming conventions.

## How to use content addressing

So far, we've been talking about content addressing in the abstract, but how can we actually leverage content addressing to make durable links?

The simplest way is to use [IPFS](https://ipfs.io), the InterPlanetary File System. When your data is stored on IPFS, users can fetch it from any IPFS node that has a copy, which can make data transfers more efficient and reduce the load on any single server. As each user fetches a piece of data, they keep a local copy around to help other users who might request it later.

To use IPFS with your NFTs, try [nft.storage](https://nft.storage/). It makes it easy to get your data onto IPFS, as well as providing long-term persistence backed by the decentralized [Filecoin](https://filecoin.io/) storage network. To help foster the growth of the NFT ecosystem and preserve the new digital commons of cultural artifacts that NFTs represent, nft.storage provides free storage and bandwidth for public NFT data. [Sign up for a free account](https://nft.storage/login/) and try it out!

## More resources

For more information, see [the ProtoSchool lesson on content addressing](https://proto.school/content-addressing/).
