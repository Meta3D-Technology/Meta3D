// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Meta3D（内测版本）",
  tagline: "Web3D低代码开发平台",
  url: 'https://meta3d-4g18u7z10c8427f9-1302358347.tcloudbaseapp.com/website',
  baseUrl: '/website/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // favicon: 'img/favicon.ico',
  organizationName: 'Meta3D', // Usually your GitHub org/user name.
  projectName: 'Meta3D-Website', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Meta3D',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            href: 'https://meta3d-4g18u7z10c8427f9-1302358347.tcloudbaseapp.com/Login',
            label: '进入平台',
          },
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '文档',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/Meta3D-Technology/Meta3D/discussions',
            label: '论坛',
          },
          {
            href: 'https://www.zhihu.com/column/c_1521448592849649664',
            label: '博客',
          },
          
          {
            href: 'https://github.com/Meta3D-Technology/Meta3D',
            label: 'GitHub',
            // position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: '文档',
          //   items: [
          //     {
          //       label: '首页',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          {
            title: '社区',
            items: [
              {
                label: '论坛',
                href: 'https://github.com/Meta3D-Technology/Meta3D/discussions',
              },
              {
                label: '加QQ群',
                href: 'https://jq.qq.com/?_wv=1027&k=F4zQKWBb',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '开发者的知乎',
                href: 'https://www.zhihu.com/people/dreamforest-yyc',
              },
              {
                label: '开发者的博客',
                href: 'https://www.cnblogs.com/chaogex/',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
