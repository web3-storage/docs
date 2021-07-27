// #region makeStorageClient
import { Web3Storage } from 'web3.storage'

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an 
  // environement variable or other configuration that's kept outside of 
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}
// #endregion makeStorageClient

//#region storeFiles
async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}
//#endregion storeFiles


//#region retrieve-basics
async function retrieve(cid) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }

  // request succeeded! do something with the response object here...
}
//#endregion retrieve-basics

//#region retrieve-unpack-files
async function retrieveFiles(cid) {
  const client = makeStorageClient()
  const res = await client.get(cid)
  if (!res.ok) {
    throw new Error(`failed to get ${cid}`)
  }

  // unpack File objects from the response
  const files = await res.files()
  for (const file of files) {
    console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
  }
}
//#endregion retrieve-unpack-files

//#region query-status
async function checkStatus(cid) {
  const client = makeStorageClient()
  const status = await client.status(cid)
  console.log(status)
  if (status) {
    // your code to do something fun with the status info here
  }
}

// replace with your own CID to see info about your uploads!
checkStatus('bafybeifljln6rmvrdqu7xopiwk2bykwa25onxnvjsmlp3xdiii3opgg2gq')
//#endregion query-status
