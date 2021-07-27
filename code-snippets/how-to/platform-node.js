// #region getFiles
import { getFilesFromPath } from 'web3.storage'

async function getFiles(path) {
  const files = await getFilesFromPath(path)
  console.log(`read ${files.length} file(s) from ${path}`)
  return files
}
// #endregion getFiles

//#region makeFileObjects
import { File } from 'web3.storage'

function makeFileObjects() {
  const obj = { hello: 'world' }
  const buffer = Buffer.from(JSON.stringify(obj));

  const files = [
    new File(['contents-of-file-1'], 'plain-utf8.txt'),
    new File([buffer], 'hello.json')
  ]
}
//#endregion makeFileObjects
