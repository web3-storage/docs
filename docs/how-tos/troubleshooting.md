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
