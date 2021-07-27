// #region import-client
import { Web3Storage } from 'web3.storage'
// #endregion import-client

//#region getAccessToken
function getAccessToken() {
  // If you're just testing, you can uncomment the following line and paste in a token:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an environement variable or other
  // configuration that's kept outside of your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3STORAGE_TOKEN
}
// #endregion getAccessToken

// #region makeStorageClient
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
