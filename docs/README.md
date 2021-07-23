---
title: Welcome
description: "Learn how to use Web3.Storage to decentralize your data storage without all the complicated details."
---

# Better storage. Better transfers. Better internet.

> When you need file storage for your project, website, or application, Web3.Storage is here for you. All it takes to [get started](#quickstart) storing on the decentralized web is a free API token — no need to wrestle with complicated details.

**In the past, storing data on the decentralized web wasn't always easy — but that's where Web3.Storage comes in.** Most data on the internet today is hosted by massive storage providers like Amazon, Google, and Microsoft. This makes it simpler for developers to store application data, but big corporate platforms like these create silos by locking developers and users alike into walled gardens of services. What's more, as the market continues to consolidate, a small oligopoly of providers are essentially becoming the storage backbone of the internet.

One solution to this problem is using _decentralized storage_ instead of big, corporate platforms to store data for apps and services. However, decentralized storage can be difficult to manage and add extra time and effort to an already crowded developer workflow — for example, most decentralized storage services need you to compile your data into a specific format, find a storage provider to host your data, buy some cryptocurrency to pay the storage provider, and then send your data across the internet. **This is where Web3.Storage comes in.**

With Web3.Storage, you get all the benefits of decentralized storage technologies with the frictionless experience you expect in a modern dev workflow. **All you need to use Web3.Storage is an API token and your data.** Under the hood, Web3.Storage is backed by the provable storage of [Filecoin](https://filecoin.io) and makes data accessible to your users over the public [IPFS](https://ipfs.io) network — but when it comes down to building your next application, service, or website, all you need to know is that Web3.Storage makes building on decentralized technologies simple.

## Quickstart

**Ready to get started using Web3.Storage right now?** Get up and running in minutes by following this quickstart guide. In this guide, we'll walk through the following steps:
1. [Creating a Web3.Storage account.](#create-an-account)
1. [Getting a free API token.](#get-an-api-token)
1. [Creating and running a simple script](#create-the-upload-script) to upload a file.
4. [Getting your uploaded file](#get-your-file) using your browser or curl.

#### Prerequisites
It's likely that you already have what you need to complete this guide, but start by double-checking that you have the following installed:

- Node version 14 or higher.
- NPM version 7 or higher.

```shell
node --version && npm --version
> v16.4.2
> 7.18.1
```

## Create an account

You need a Web3.Storage account to get your API token and manage your stored data. You can sign up **for free** using your email address or GitHub.

::::tabs
:::tab Email

### Sign up using email

1. Go to [web3.storage/login](https://web3.storage/login) to get started.
1. Enter your email address.
1. Check your inbox for a verification email from Web3.Storage, and click the **Log in** button in the email.
1. You're all set!

:::

:::tab GitHub

### Sign up using GitHub

1. Go to [web3.storage/login](https://web3.storage/login) to get started.
1. Click **GitHub** on the Login screen.
1. **Authorize** Web3.Storage when asked by GitHub.
1. You're all set!

:::
::::

Now that you're signed up and logged in, it's time to [get your API token. ↓](#get-an-api-token)

## Get an API token

It only takes a few moments to get an API token from Web3.Storage. This token enables you to interact with the Web3.Storage service without using the main website, enabling you to incorporate files stored using Web3.Storage directly into your applications and services.

1. Go to your [Web3.Storage profile page](https://web3.storage/profile) and select **API Tokens** → **New Token**.
1. Enter a descriptive name for your API token so it's easier to remember later.
1. Click **Create**.
1. Make a note of the **Key** somewhere secure where you know you won't lose it.
1. Click **Copy** to copy your new API token to your clipboard.

:::warning IMPORTANT
**Keep your API token private!** Do not share your API token with anyone else. This key is specific to your account.
:::

Now that you have your new API token, it's time to use a simple script to [upload a file to Web3.Storage. ↓](#create-the-upload-script)

## Create the upload script

You can use the Web3.Storage site to upload files, but it's also quick and easy to create and run a simple upload script — making it especially convenient to add large numbers of files. This script contains logic to upload a file to Web3.Storage and get a [_content identifier_ (CID)](/concepts/content-addressing.md) back in return.

::: danger CAUTION
All data uploaded to Web3.Storage is available to anyone who requests it using the correct CID. Do not store any private or sensitive information in an unencrypted form using Web3.Storage.
:::

1. Create a folder for this quickstart project, and move into that folder:

    ```shell
    mkdir web3-storage-quickstart
    cd web3-storage-quickstart
    ```

1. Create a file called `put-files.js` and paste in the following code:

    <<< @/code-snippets/quickstart/put-files-staging.js

1. Create another file called `package.json` and paste in the following code:

    <<< @/code-snippets/quickstart/package-example.json

1. Save both files, and then run `npm install` from your project folder:

    ```shell
    npm install
    ```

Your script is good to go! Next, we'll [run the script to upload a file. ↓](#run-the-script)

## Run the script

Now that you've got your script ready to go, you just need to run it in your terminal window using `node`.

1. Run the script by calling `node put-files.js`, using `--token` to supply your API token and specifying the path and name of the file you want to upload. Here's how that looks in template form:

    ```shell
    node put-files.js --token<YOUR_TOKEN> ~/filename
    ```

    Once you've filled in your details, your command should look something like this:

    ```shell
    node put-files.js --token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZFYTRhODlFNUVhRjY5YWI4QUZlZUU3MUE5OTgwQjFGQ2REZGQzNzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MjY5Njk3OTY1NTQsIm5hbWUiOiJib25maXJlIn0.0S9Ua2FWEAZSwaemy92N7bW8ancRUtu4XtLS3Gy1ouA ~/hello.txt
    ```

1. The command will output a CID:

    ```shell
    Content added with CID: bafybeig7sgl52pc6ihypxhk2yy7gcllu4flxgfwygp7klb5xdjdrm7onse
    ```

**Make a note of the CID, which looks like `bafyb...`.** You'll need it in order to get your file.

Next up, we'll go over two methods for you to [retrieve your data from Web3.Storage ↓](#get-your-file)

## Get your file

You've already done the most difficult work in this guide — getting your files from Web3.Storage is simple. You have two easy options for retrieving your data: Use your browser and an [IPFS gateway](/how-tos/retrieve.md#using-an-ipfs-http-gateway) to view your file like any other web content, or download it directly using the command line and `curl`.

::::tabs

:::tab Browser

1. Go to `https://dweb.link/ipfs/YOUR_CID`, replacing `YOUR_CID` with the CID you noted in the last step.
1. View your file in your browser!

:::

:::tab Curl

1. Open a terminal window.
1. Use `curl` to download your file from `ipfs.dweb.link`. Here's how that looks in template form:

    ```shell
    curl https://<YOUR_CID>.ipfs.dweb.link/
    ```

    Replace `<YOUR CID>` with the CID you got from the `put-files.js` script. Your command should look something like this:

    ```shell
    curl https://bafkreievfjy5oqcpwj7464wt6gvkjfbd6jr2w7a6wnhzde2yslrmhfoc4e.ipfs.dweb.link/ -o ~/output-file
    ```

1. You now have a file called `output-file` in your home `~` folder!

:::

::::

## Next steps

Congratulations! You've just covered the basics of Web3.Storage. To learn more, take a look at these useful resources:
- For a deep dive into storing files, visit the [Store how-to guide.](/how-tos/store.md)
- To learn more about the details of getting files, have a look at the [Retrieve how-to guide.](/how-tos/retrieve.md)
- Visit the [reference API section](/reference/client-library.md) for more details on what else you can do with the Web3.Storage service and how to integrate it into your own projects.

