---
title: Getting started
description: Learn Web3.Storage by example with sample applications and starter projects.
---

# Getting started examples

The [Web3.Storage GitHub repository][github-main-repo] includes several simple example projects that can help you quickly get started with the client library.

The examples are stored in the [`packages/client/examples` directory][github-examples-dir] and include code for Node.js and several browser toolchains. 

Each example directory has a `README.md` explaining how to install dependencies and run the code.

Here's a quick look at how to run the Node.js example:

```shell
git clone https://github.com/web3-storage/web3.storage
cd web3.storage/packages/examples/node.js
npm install
# output from npm...

node put-files.js --token="your-token" ~/file.txt
```

[github-main-repo]: https://github.com/web3-storage/web3.storage
[github-examples-dir]: https://github.com/web3-storage/web3.storage/tree/main/packages/client/examples
[github-browser-examples-dir]: https://github.com/web3-storage/web3.storage/tree/main/packages/client/examples/browser