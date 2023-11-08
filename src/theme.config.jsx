import { Web3StorageLogo } from './components/brand'

const config = {
  logo: <Web3StorageLogo>web3.storage/<span className='font-bold'>docs</span></Web3StorageLogo>,
  project: {
    link: 'https://github.com/web3.storage/w3up'
  },
  docsRepositoryBase: 'https://github.com/web3.storage/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s ⁂ web3.storage'
    }
  },
  footer: {
    component: (
      <footer className='py-6 text-center text-lg'>
        
      </footer>
    )
  },
  primaryHue: {
    dark: 270,
    light: 190
  },
  primarySaturation: 50,
}

export default config
