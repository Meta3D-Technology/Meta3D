export default {
  "title": "Meta3D（第一个内测版本）",
  "tagline": "Web3D低代码开发平台",
  "url": "https://meta3d-4g18u7z10c8427f9-1302358347.tcloudbaseapp.com/website",
  "baseUrl": "/website/",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "organizationName": "Meta3D",
  "projectName": "Meta3D-Website",
  "presets": [
    [
      "classic",
      {
        "docs": {
          "sidebarPath": "/Users/yang/Github/Meta3D/platform/website/sidebars.js",
          "editUrl": "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/"
        },
        "blog": {
          "showReadingTime": true,
          "editUrl": "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/"
        },
        "theme": {
          "customCss": "/Users/yang/Github/Meta3D/platform/website/src/css/custom.css"
        }
      }
    ]
  ],
  "themeConfig": {
    "navbar": {
      "title": "Meta3D",
      "items": [
        {
          "href": "https://meta3d-4g18u7z10c8427f9-1302358347.tcloudbaseapp.com/Login",
          "label": "进入平台",
          "position": "left"
        },
        {
          "type": "doc",
          "docId": "intro",
          "position": "left",
          "label": "文档"
        },
        {
          "href": "https://github.com/Meta3D-Technology/Meta3D/discussions",
          "label": "论坛",
          "position": "left"
        },
        {
          "href": "https://www.zhihu.com/column/c_1521448592849649664",
          "label": "博客",
          "position": "left"
        },
        {
          "href": "https://github.com/Meta3D-Technology/Meta3D",
          "label": "GitHub",
          "position": "left"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "社区",
          "items": [
            {
              "label": "论坛",
              "href": "https://github.com/Meta3D-Technology/Meta3D/discussions"
            },
            {
              "label": "加QQ群",
              "href": "https://jq.qq.com/?_wv=1027&k=F4zQKWBb"
            }
          ]
        },
        {
          "title": "更多",
          "items": [
            {
              "label": "开发者的知乎",
              "href": "https://www.zhihu.com/people/dreamforest-yyc"
            },
            {
              "label": "开发者的博客",
              "href": "https://www.cnblogs.com/chaogex/"
            }
          ]
        }
      ]
    },
    "prism": {
      "theme": {
        "plain": {
          "color": "#393A34",
          "backgroundColor": "#f6f8fa"
        },
        "styles": [
          {
            "types": [
              "comment",
              "prolog",
              "doctype",
              "cdata"
            ],
            "style": {
              "color": "#999988",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "namespace"
            ],
            "style": {
              "opacity": 0.7
            }
          },
          {
            "types": [
              "string",
              "attr-value"
            ],
            "style": {
              "color": "#e3116c"
            }
          },
          {
            "types": [
              "punctuation",
              "operator"
            ],
            "style": {
              "color": "#393A34"
            }
          },
          {
            "types": [
              "entity",
              "url",
              "symbol",
              "number",
              "boolean",
              "variable",
              "constant",
              "property",
              "regex",
              "inserted"
            ],
            "style": {
              "color": "#36acaa"
            }
          },
          {
            "types": [
              "atrule",
              "keyword",
              "attr-name",
              "selector"
            ],
            "style": {
              "color": "#00a4db"
            }
          },
          {
            "types": [
              "function",
              "deleted",
              "tag"
            ],
            "style": {
              "color": "#d73a49"
            }
          },
          {
            "types": [
              "function-variable"
            ],
            "style": {
              "color": "#6f42c1"
            }
          },
          {
            "types": [
              "tag",
              "selector",
              "keyword"
            ],
            "style": {
              "color": "#00009f"
            }
          }
        ]
      },
      "darkTheme": {
        "plain": {
          "color": "#F8F8F2",
          "backgroundColor": "#282A36"
        },
        "styles": [
          {
            "types": [
              "prolog",
              "constant",
              "builtin"
            ],
            "style": {
              "color": "rgb(189, 147, 249)"
            }
          },
          {
            "types": [
              "inserted",
              "function"
            ],
            "style": {
              "color": "rgb(80, 250, 123)"
            }
          },
          {
            "types": [
              "deleted"
            ],
            "style": {
              "color": "rgb(255, 85, 85)"
            }
          },
          {
            "types": [
              "changed"
            ],
            "style": {
              "color": "rgb(255, 184, 108)"
            }
          },
          {
            "types": [
              "punctuation",
              "symbol"
            ],
            "style": {
              "color": "rgb(248, 248, 242)"
            }
          },
          {
            "types": [
              "string",
              "char",
              "tag",
              "selector"
            ],
            "style": {
              "color": "rgb(255, 121, 198)"
            }
          },
          {
            "types": [
              "keyword",
              "variable"
            ],
            "style": {
              "color": "rgb(189, 147, 249)",
              "fontStyle": "italic"
            }
          },
          {
            "types": [
              "comment"
            ],
            "style": {
              "color": "rgb(98, 114, 164)"
            }
          },
          {
            "types": [
              "attr-name"
            ],
            "style": {
              "color": "rgb(241, 250, 140)"
            }
          }
        ]
      },
      "additionalLanguages": []
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadata": [],
    "hideableSidebar": false,
    "tableOfContents": {
      "minHeadingLevel": 2,
      "maxHeadingLevel": 3
    }
  },
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "staticDirectories": [
    "static"
  ],
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};