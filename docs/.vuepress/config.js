// .vuepress/config.js

const MAIN_DOMAIN = process.env.MAIN_DOMAIN || 'https://staging.web3.storage'
const DEPLOY_DOMAIN = 'https://docs.web3.storage'
const SPEEDCURVE_ID = process.env.SPEEDCURVE_ID || ''
const COUNTLY_KEY = process.env.COUNTLY_KEY || ''
const COUNTLY_URL = process.env.COUNTLY_URL || ''
const pageSuffix = '/'

module.exports = {
  base: '/',
  head: require('./head'),
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Web3.Storage Documentation',
      description: 'Web3.Storage Documentation'
    }
  },
  markdown: {
    pageSuffix,
    extendMarkdown: md => {
      md.set({
        breaks: true
      })
      md.use(require('markdown-it-video'))
      md.use(require('markdown-it-footnote'))
      md.use(require('markdown-it-task-lists'))
      md.use(require('markdown-it-deflist')),
      md.use(require('markdown-it-imsize')),
      md.use(require('markdown-it-image-lazy-loading'))
    }
  },
  themeConfig: {
    defaultImage: '/images/social-card.png',
    author: {
      name: 'Web3.Storage',
      twitter: '@protocollabs'
    },
    keywords:
      'Filecoin, IPFS, web3, dweb, protocol, decentralized web, distributed web, NFT, InterPlanetary File System, dapp, documentation, docs, tutorial, how-to, Protocol Labs',
    // edit links
    domain: DEPLOY_DOMAIN,
    mainDomain: MAIN_DOMAIN,
    docsRepo: 'web3-storage/docs',
    docsDir: 'docs',
    docsBranch: 'main',
    feedbackWidget: {
      docsRepoIssue: 'web3-storage/docs'
    },
    editLinks: false,
    // page nav
    nextLinks: false,
    prevLinks: false,
    // ui/ux
    logo: '/images/w3storage-logo.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page',
        lastUpdated: 'Last Updated',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        },
        nav: require('./nav/en')({ mainDomain: MAIN_DOMAIN }),
        sidebar: [
          {
            title: 'Quickstart',
            collapsable: false,
            children: [
                '/quickstart/'
            ]
          },
          {
            title: 'Concepts',
            collapsable: false,
            children: [
                '/concepts/content-addressing',
                '/concepts/decentralized-storage',
            ]
          },
          {
            title: 'How tos',
            collapsable: false,
            children: [
              '/how-tos/store',
              '/how-tos/retrieve',
              '/how-tos/query',
              '/how-tos/regenerate-api-token',
            ]
          },
          {
            title: 'Reference',
            collapsable: false,
            children: [
              '/reference/client-library'
            ]
          }
        ]
      }
    },
    countly: {
      key: COUNTLY_KEY,
      url: COUNTLY_URL
    },
    // algolia: {
    //   apiKey: '',
    //   indexName: ''
    // },
  },
  plugins: [
    [require('./plugins/vuepress-plugin-speedcurve'), { id: SPEEDCURVE_ID }],
    [
      'vuepress-plugin-clean-urls',
      {
        normalSuffix: pageSuffix,
        indexSuffix: pageSuffix,
        notFoundPath: '/ipfs-404.html'
      }
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: ($page, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: ($page, $site) =>
          $page.frontmatter.author || $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
        twitterCard: _ => 'summary_large_image',
        type: $page =>
          ['articles', 'posts', 'blog'].some(folder =>
            $page.regularPath.startsWith('/' + folder)
          )
            ? 'article'
            : 'website',
        url: ($page, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) =>
          $page.frontmatter.image
            ? ($site.themeConfig.domain || '') + $page.frontmatter.image
            : ($site.themeConfig.domain || '') + $site.themeConfig.defaultImage,
        publishedAt: $page =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        customMeta: (add, context) => {
          const { $site, image } = context
          add(
            'twitter:site',
            ($site.themeConfig.author && $site.themeConfig.author.twitter) || ''
          )
          add('image', image)
          add('keywords', $site.themeConfig.keywords)
        }
      }
    ],
    [
      'vuepress-plugin-canonical',
      {
        // add <link rel="canonical" header (https://tools.ietf.org/html/rfc6596)
        // to deduplicate SEO across all copies loaded from various public gateways
        baseURL: DEPLOY_DOMAIN
      }
    ],
    [
      'vuepress-plugin-sitemap',
      {
        hostname: DEPLOY_DOMAIN,
        exclude: ['/ipfs-404.html']
      }
    ],
    [
      'vuepress-plugin-robots',
      {
        host: DEPLOY_DOMAIN
      }
    ],
    [
      '@vuepress/html-redirect',
      {
        duration: 0
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'callout',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'right',
        defaultTitle: ''
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'left',
        defaultTitle: ''
      }
    ],
    'vuepress-plugin-chunkload-redirect',
    'vuepress-plugin-ipfs',
    'vuepress-plugin-tabs',
    ['vuepress-plugin-code-copy', { align: 'bottom', color: '#fff' }]
  ],
  extraWatchFiles: ['.vuepress/nav/en.js']
}
