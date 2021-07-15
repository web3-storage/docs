const mainDomain = process.env.MAIN_DOMAIN || 'https://staging.web3.storage';

module.exports = [
    { text: 'Home', link: mainDomain, target: '_self', rel: false },
    { text: 'About', link: `${mainDomain}/about`, target: '_self', rel: false },
    { text: 'Docs', link: '/' },
    { text: 'Files', link: `${mainDomain}/files`, target: '_self', rel: false },
    { text: 'Profile', link: `${mainDomain}/profile`, target: '_self', rel: false }
]
