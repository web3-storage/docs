---
title: Quick start
description: Get started with Web3.Storage by following through this simple workflow.
---

# Quick start

The decentralized web is complicated, but it doesn't have to be! In this quick start guide, we're going to sign up for a Web3.Storage account, create an API, upload a file, and then view that file.

## Create an account

You need an account to get an API key and manage your stored data. Sign up is free:

1. Go to [web3.storage/sign-up](https://web3.storage/sign-up)
1. Enter your information.
1. Verify your email address by clicking the **Verify email** link in your email inbox.
1. You're all set!

Next up, [getting an API key ↓](#get-an-api-key)

## Get an API key

Now that you've got your account set up, you can create an API key. You'll need an API key to interact with Web3.Storage using the JavaScript client library:

1. Head to [web3.storage/sign-in](https://web3.storage/sign-in) and sign in.
1. Click **Create API key**.
1. Note down your API key.

    :::warning
    Do not share you API with anyone else. This key is specific to your account.
    :::

Next up, [uploading a file to Web3.Storage ↓](#upload-a-file)

## Upload a file

Uploading a file to Web3.Stoage using the JavaScript client library is pretty simple:

1. Authorize your session by using your API key:

    ```javascript
    console.log("API key.");
    ```

1. Bundle your file into an object:

    ```javascript
    console.log("API key.");
    ```

1. Send your data to Web3.Storage:

    ```javascript
    console.log("API key.");
    ```

Next up, we'll take a look at how to [get and view your data from Web3.Storage ↓](#view-file)

## View your file

There are two ways to view your file. You can either view it in the browser using a _gateway_, or by downloading it to your computer using the JavaScript client library.

### Gateway

1. Go to `gateway.web3.storage/YOUR_FILES_CID`, replacing `YOUR_FILES_CID` with the CID you get from uploading your file.
1. You should be able to see your file in the browser!

Next, take a look at how to [download your file using the JavaScript client library ↓](#javascript-client-library)

### JavaScript client library

1. Authorize your session by using your API key:

    ```javascript
    console.log("API key.");
    ```

1. Create a request object, including the CID of the file you want to download:

    ```javascript
    console.log("API key.");
    ```

1. Send your request to Web3.Storage:

    ```javascript
    console.log("API key.");
    ```

1. Web3.Storage will send your a `return` object with your data:

    ```javascript
    console.log("API key.");
    ```

1. That's it!

## Next steps

Congratulations, you've just covered the basics of Web3.Storage! Take a look at the [reference API section](/reference) for more details on what else you can do with this service.
