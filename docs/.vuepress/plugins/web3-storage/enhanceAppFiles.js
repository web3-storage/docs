'use strict'

module.exports = () => {
  if (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  ) {
    ;(function () {
      document.domain = 'web3-storage.localhost';
      window.parentIframe = document.createElement('iframe');
      window.parentIframe.style.height = '0px';
      window.parentIframe.style.width = '0px';
      window.parentIframe.style.margin = '0px';
      window.parentIframe.style.padding = '0px';
      window.parentIframe.style.border = '0px';
      window.parentIframe.style.visibility = 'hidden';
      window.parentIframe.style.pointerEvents = 'none';
      window.parentIframe.style.zIndex= '-10';
      window.parentIframe.src = 'https://web3-storage.localhost';
      document.body.appendChild(window.parentIframe);
    })()
  }
}
