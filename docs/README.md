---
title: Welcome
description: "Web3.Storage lets you decentralizse your data storage without all the complexities of the d-web."
---

# Better storage; better transfers; better internet

Most data on the internet is stored with one of the large data storage companies. While companies like Amazon, Google, and Microsoft make is fairly easy for developer to store their application data, their services come with a whole host of terms and restrictions about what data can be stored, when it can be access, and who actually _owns_ that data! Not to mention, these services can be incredibly expensive, and cause developers to rack up huge bills without even knowing!

So instead of paying for restrictive and expensive data storage sevices, developers can store their data with _decentralized_ storage services. However, for the most part, these decentralizsed storage services are difficult to manage, and make data storage significantly more complicated. Most decentralized storage services need you to compile your data into a specific format, find a storage provider to host your data, buy some cryptocurrency to pay the storage provider, and _then_ send your data across the internet. This is where Web3.Storage comes in!

All you need to use Web3.Storage is an API token and some data. Web3.Storage hides the complicated and obstructive parts of data-storage so that you, the developer, can get on with building what you want! Take a look at the [quickstart guide below to get started ↓](#quickstart)

## Quickstart

Get up and running quickly by following these simple steps! We're going to sign up to Web3.Storage, get an API token, create a script to upload a file, and then view that file in the browser.

:::tip Prerequisites
All you need to complete this quickstart is:

- Node version 14 or higher
- NPM version 7 or higher
- A file you want to upload to Web3.Storage
:::

### Create an account

You need an account to get an API token and manage your stored data. You can sign up **for free** using your email address or GitHub.

::::tabs
:::tab Email

#### Use your email

1. Go to [web3.storage/login](https://web3.storage/login)
1. Enter your email address.
1. Verify your email address by clicking the **Log in** button in your email inbox.
1. You're all set!

:::

:::tab GitHub

#### Use GitHub

1. Click **GitHub** on the Login screen
1. Authorize web3-storage when asked by GitHub.

![GitHub asking to authorize the Web3.Storage projet to a user account](./images/github-authorization-process.png)

1. You're all set!

:::
::::

Next up, [getting an API token ↓](#get-an-api-token)

### Get an API token

Next, let's create an API token. You'll need an API token to interact with Web3.Storage using the JavaScript client library:

1. Go to your [Profile page](https://web3.storage/profile) and click **API Tokens** → **New Token**.
1. Enter a descriptive name for this token:
1. Click **Create**.
1. Make a note of the **Key**. Click **Copy** to copy the API token to your clipboard.

:::warning Keep your API token private
Do not share your API token with anyone else. This key is specific to your account.
:::

Next up, [uploading a file to Web3.Storage ↓](#create-the-upload-script)

### Create the upload script

1. Create a folder for your Quickstart project and move into it:

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

1. Run the script by calling `node put-files.js` and supplying your token using the `--token` option and the path and name of the file you want to upload:

    ```shell
    node put-files.js --token<YOUR_TOKEN> ~/filename
    ```

    Your command should look something like this:

    ```shell
    node put-files.js --token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZFYTRhODlFNUVhRjY5YWI4QUZlZUU3MUE5OTgwQjFGQ2REZGQzNzIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MjY5Njk3OTY1NTQsIm5hbWUiOiJib25maXJlIn0.0S9Ua2FWEAZSwaemy92N7bW8ancRUtu4XtLS3Gy1ouA ~/hello.txt
    ```

1. The command will output a CID:

    ```shell
    Content added with CID: bafybeig7sgl52pc6ihypxhk2yy7gcllu4flxgfwygp7klb5xdjdrm7onse
    ```

Make a note of the CID `bafyb...`. You'll need it in the next section.

Next up, we'll look at how to [get and view your data from Web3.Storage ↓](#get-your-file)

### Get your file

Getting your files from Web3.Storage is super easy! You can use the browser if you'd like to see your file immediately, or you can download your file using Curl.

::: danger
All data uploaded to Web3.Storage is made publicly available to anyone who requests it using the correct CID. Do not store any private or sensitive information in an unencrypted form using Web3.Storage!
:::

::::tabs

:::tab Browser

Viewing your files is simple and can be done using a browser gateway:

1. Go to `https://dweb.link/ipfs/YOUR_CID`, replacing `YOUR_CID` with the CID you get from uploading your file.
1. You should be able to see your file in the browser!

:::

:::tab Curl

You can also get your files back by using Curl:

1. Open a terminal window.
1. Use `curl` to download your file from `ipfs.dweb.link`:

    ```shell
    curl https://<YOUR_CID>.ipfs.dweb.link/
    ```

    Replace `<YOUR CID>` with the CID you got from the `put-files.js` script. Your command should look something like this:

    ```shell
    curl https://bafkreievfjy5oqcpwj7464wt6gvkjfbd6jr2w7a6wnhzde2yslrmhfoc4e.ipfs.dweb.link/ -o ~/output-file
    ```

1. You should now have a file called `output-file` in your home `~` folder!

:::

::::

## Next steps

Congratulations, you've just covered the basics of Web3.Storage! Take a look at the [reference API section](/reference) for more details on what else you can do with this service.

