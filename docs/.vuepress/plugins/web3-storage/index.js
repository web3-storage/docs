const path = require('path')

module.exports = (params = {}) => ({
  name: 'web3-storage',
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFiles.js')
})
