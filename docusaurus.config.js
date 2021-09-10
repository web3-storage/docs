const lightCodeTheme = require('prism-react-renderer/themes/palenight');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const sitePlugin = require('./src/plugin')
const rehypeLoader = require('./src/util/rehypePlugins')

const COUNTLY_KEY = process.env.COUNTLY_KEY || 'TEST_KEY'
const COUNTLY_URL = process.env.COUNTLY_URL || 'https://countly.protocol.ai'

const ALGOLIA_KEY = process.env.ALGOLIA_KEY || 'TEST_KEY'
const ALGOLIA_INDEX = process.env.ALGOLIA_INDEX || 'TEST_INDEX'

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Web3.Storage Documentation',
  tagline: 'Better storage. Better transfers. Better internet.',
  url: 'https://docs.web3.storage',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico', // TODO: replace with web3.storage favicon
  organizationName: 'web3-storage',
  projectName: 'web3.storage',
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: true,
    },
    navbar: {
      title: 'Web3.Storage',
      logo: {
        alt: 'Web3.Storage Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        href: 'https://web3.storage',
      },
      items: [
        {
          label: 'Docs',
          type: 'doc',
          docId: 'intro',
          position: 'right',
        },
        {
          label: 'About',
          position: 'right',
          href: 'https://web3.storage/about',
        },
        {
          type: 'search',
          position: 'right',
        }
      ],
    },

    footer: {
      copyright: `<div class="footer--made-with">Made with 💛 by <a href="https://protocol.ai" target="_blank" rel="noopener noreferrer" data-v-13c85306="" data-v-2294af70="">Protocol Labs</a></div>`,
      links: [
        {
          items: [
            {
              label: 'Status',
              href: 'https://web3-storage.statuspage.io/',
            },
            {
              label: 'Terms of Service',
              href: 'https://web3.storage/about/#terms-of-service',
            },
            {
              label: 'Open an issue',
              href: 'https://docs.web3.storage/community/help-and-support/#bug-reports-or-feature-requests',
            },
            {
              label: 'Contact us',
              href: '/community/help-and-support'
            }
          ]
        }
      ]
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },

    algolia: {
      apiKey: ALGOLIA_KEY,
      indexName: ALGOLIA_INDEX,
    },

    countly: {
      appKey: COUNTLY_KEY,
      countlyUrl: COUNTLY_URL,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          sidebarCollapsible: false,
          editUrl: 'https://github.com/web3-storage/docs/edit/main/',
          showLastUpdateTime: true,
          routeBasePath: '/',
          remarkPlugins: [
            require('remark-docusaurus-tabs'),
          ],
          rehypePlugins: [
            rehypeLoader
          ]
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
    
    ['redocusaurus', {
      specs: [{
        spec: 'static/schema.yml',
        routePath: '/http-api/',
      }],

      theme: {
        primaryColor: '#171691',
      }
    }],
  ],
  plugins: [
    ['@docusaurus/plugin-client-redirects', {
      redirects: [
        {
          from: '/http-api.html',
          to: '/http-api/',
        }
      ]
    }],
    
    sitePlugin,
  ]
};
