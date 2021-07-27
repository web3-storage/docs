
// #region getFiles
function getFiles() {
  const fileInput = document.querySelector('input[type="file"]')
  return fileInput.files
}
// #endregion getFiles

//#region makeFileObjects
function makeFileObjects() {
  const obj = { hello: 'world' }
  const blob = new Blob([JSON.stringify(obj)], {type : 'application/json'})

  const files = [
    new File(['contents-of-file-1'], 'plain-utf8.txt'),
    new File([blob], 'hello.json')
  ]
}
//#endregion makeFileObjects
