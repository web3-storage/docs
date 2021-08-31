---
title: Troubleshooting
description: A collection of common issues for new developers, and solutions to those problems.
---

# Troubleshooting

This page contains a collection of common issues for new developers, and solutions to those problems.

## I need to use Webpack 4

We recommend using Webpack 5 with your projects. However, some popular tools like create-react-app require Webpack 4 in order to run properly. To get around this issue, add the following import to the top of your `.js` scripts to import the pre-webpack-bundled version of Web3.Storage:

```javascript
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'
```

## Generate the same CID using Go-IPFS

The CID returned from Web3.Storage might be diffenent from the default CID returned when using `ipfs add` with Go-IPFS. If you want Go-IPFS to generate the _same_ CID as Web3.Storage, run:

```shell
ipfs add -r --cid-version 1 --raw-leaves -s size-1048576 -w ~/FILE_TO_USE.txt
```


