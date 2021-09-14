export default {
  "title": "Web3.Storage Documentation",
  "tagline": "Better storage. Better transfers. Better internet.",
  "url": "https://docs.web3.storage",
  "baseUrl": "/",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.ico",
  "organizationName": "web3-storage",
  "projectName": "web3.storage",
  "themeConfig": {
    "colorMode": {
      "respectPrefersColorScheme": true,
      "disableSwitch": true,
      "defaultMode": "light",
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "navbar": {
      "title": "Web3.Storage",
      "logo": {
        "alt": "Web3.Storage Logo",
        "src": "img/logo.svg",
        "srcDark": "img/logo-dark.svg",
        "href": "https://web3.storage"
      },
      "items": [
        {
          "label": "Docs",
          "type": "doc",
          "docId": "intro",
          "position": "right"
        },
        {
          "label": "About",
          "position": "right",
          "href": "https://web3.storage/about"
        },
        {
          "type": "search",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "copyright": "<div class=\"footer--made-with\">Made with 💛 by <a href=\"https://protocol.ai\" target=\"_blank\" rel=\"noopener noreferrer\" data-v-13c85306=\"\" data-v-2294af70=\"\">Protocol Labs</a></div>",
      "links": [
        {
          "items": [
            {
              "label": "Status",
              "href": "https://status.web3.storage/"
            },
            {
              "label": "Terms of Service",
              "href": "https://web3.storage/about/#terms-of-service"
            },
            {
              "label": "Open an issue",
              "href": "https://docs.web3.storage/community/help-and-support/#bug-reports-or-feature-requests"
            },
            {
              "label": "Contact us",
              "href": "/community/help-and-support"
            }
          ]
        }
      ],
      "style": "light"
    },
    "prism": {
      "theme": {
        "plain": {
          "color": "#bfc7d5",
          "backgroundColor": "#292d3e"
        },
        "styles": [
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(105, 112, 152)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "string",
              "inserted"
            ],
            "style": {
              "color": "rgb(195, 232, 141)"
            }
          },
          {
            "types": [
              "number"
            ],
            "style": {
              "color": "rgb(247, 140, 108)"
            }
          },
          {
            "types": [
              "builtin",
              "char",
              "constant",
              "function"
            ],
            "style": {
              "color": "rgb(130, 170, 255)"
            }
          },
          {
            "types": [
              "punctuation",
              "selector"
            ],
            "style": {
              "color": "rgb(199, 146, 234)"
            }
          },
          {
            "types": [
              "variable"
            ],
            "style": {
              "color": "rgb(191, 199, 213)"
            }
          },
          {
            "types": [
              "class-name",
              "attr-name"
            ],
            "style": {
              "color": "rgb(255, 203, 107)"
            }
          },
          {
            "types": [
              "tag",
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 114)"
            }
          },
          {
            "types": [
              "operator"
            ],
            "style": {
              "color": "rgb(137, 221, 255)"
            }
          },
          {
            "types": [
              "boolean"
            ],
            "style": {
              "color": "rgb(255, 88, 116)"
            }
          },
          {
            "types": [
              "keyword"
            ],
            "style": {
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "doctype"
            ],
            "style": {
              "color": "rgb(199, 146, 234)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "color": "rgb(178, 204, 214)"
            }
          },
          {
            "types": [
              "url"
            ],
            "style": {
              "color": "rgb(221, 221, 221)"
            }
          }
        ]
      },
      "darkTheme": {
        "plain": {
          "color": "#9CDCFE",
          "backgroundColor": "#1E1E1E"
        },
        "styles": [
          {
            "types": [
              "prolog"
            ],
            "style": {
              "color": "rgb(0, 0, 128)"
            }
          },
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(106, 153, 85)"
            }
          },
          {
            "types": [
              "builtin",
              "changed",
              "keyword",
              "interpolation-punctuation"
            ],
            "style": {
              "color": "rgb(86, 156, 214)"
            }
          },
          {
            "types": [
              "number",
              "inserted"
            ],
            "style": {
              "color": "rgb(181, 206, 168)"
            }
          },
          {
            "types": [
              "constant"
            ],
            "style": {
              "color": "rgb(100, 102, 149)"
            }
          },
          {
            "types": [
              "attr-name",
              "variable"
            ],
            "style": {
              "color": "rgb(156, 220, 254)"
            }
          },
          {
            "types": [
              "deleted",
              "string",
              "attr-value",
              "template-punctuation"
            ],
            "style": {
              "color": "rgb(206, 145, 120)"
            }
          },
          {
            "types": [
              "selector"
            ],
            "style": {
              "color": "rgb(215, 186, 125)"
            }
          },
          {
            "types": [
              "tag"
            ],
            "style": {
              "color": "rgb(78, 201, 176)"
            }
          },
          {
            "types": [
              "tag"
            ],
            "languages": [
              "markup"
            ],
            "style": {
              "color": "rgb(86, 156, 214)"
            }
          },
          {
            "types": [
              "punctuation",
              "operator"
            ],
            "style": {
              "color": "rgb(212, 212, 212)"
            }
          },
          {
            "types": [
              "punctuation"
            ],
            "languages": [
              "markup"
            ],
            "style": {
              "color": "#808080"
            }
          },
          {
            "types": [
              "function"
            ],
            "style": {
              "color": "rgb(220, 220, 170)"
            }
          },
          {
            "types": [
              "class-name"
            ],
            "style": {
              "color": "rgb(78, 201, 176)"
            }
          },
          {
            "types": [
              "char"
            ],
            "style": {
              "color": "rgb(209, 105, 105)"
            }
          }
        ]
      },
      "additionalLanguages": []
    },
    "algolia": {
      "apiKey": "358b95b4567a562349f2c806c152fada",
      "indexName": "web3storage-docs",
      "appId": "9ARXAK1OFV",
      "contextualSearch": false,
      "searchParameters": {}
    },
    "countly": {
      "appKey": "TEST_KEY",
      "countlyUrl": "https://countly.protocol.ai"
    },
    "redoc": {
      "typography": {
        "fontFamily": "Open Sans, sans-serif",
        "fontSize": "16px",
        "headings": {
          "fontFamily": "Space Grotesk, sans-serif",
          "fontWeight": "600"
        }
      },
      "lightThemeColors": {
        "background": "#fff2ec",
        "headers": "#171691",
        "primary": "#fc6553",
        "secondary": "#37b667",
        "text": "#171691",
        "contrastText": "#fff",
        "tableRowBackground": "#ffffff",
        "tableRowAltBackground": "#fafafa",
        "responsePanelBackground": "#3f3f75",
        "codeBlockBackground": "#292d3e"
      },
      "darkThemeColors": {
        "background": "#2d2d65",
        "headers": "#fde956",
        "text": "#fff",
        "tableRowBackground": "#2d2d65",
        "tableRowAltBackground": "#3f3f75",
        "codeBlockBackground": "#1e1e1e"
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "hideableSidebar": false
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/yusef/work/projects/web3storage/web3-storage-docs/sidebars.js",
          "sidebarCollapsible": false,
          "editUrl": "https://github.com/web3-storage/docs/edit/main/",
          "showLastUpdateTime": true,
          "routeBasePath": "/",
          "remarkPlugins": [
            null
          ],
          "rehypePlugins": [
            null
          ]
        },
        "blog": false,
        "theme": {
          "customCss": "/Users/yusef/work/projects/web3storage/web3-storage-docs/src/css/custom.css"
        }
      }
    ],
    "redocusaurus"
  ],
  "plugins": [
    [
      "@docusaurus/plugin-client-redirects",
      {
        "redirects": [
          {
            "from": "/http-api.html",
            "to": "/http-api/"
          }
        ]
      }
    ],
    null
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};