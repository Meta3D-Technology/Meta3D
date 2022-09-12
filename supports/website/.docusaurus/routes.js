
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/website/blog',
    component: ComponentCreator('/website/blog','4e3'),
    exact: true
  },
  {
    path: '/website/blog/archive',
    component: ComponentCreator('/website/blog/archive','d98'),
    exact: true
  },
  {
    path: '/website/blog/first-blog-post',
    component: ComponentCreator('/website/blog/first-blog-post','51e'),
    exact: true
  },
  {
    path: '/website/blog/long-blog-post',
    component: ComponentCreator('/website/blog/long-blog-post','555'),
    exact: true
  },
  {
    path: '/website/blog/mdx-blog-post',
    component: ComponentCreator('/website/blog/mdx-blog-post','8c5'),
    exact: true
  },
  {
    path: '/website/blog/tags',
    component: ComponentCreator('/website/blog/tags','5ff'),
    exact: true
  },
  {
    path: '/website/blog/tags/docusaurus',
    component: ComponentCreator('/website/blog/tags/docusaurus','a15'),
    exact: true
  },
  {
    path: '/website/blog/tags/facebook',
    component: ComponentCreator('/website/blog/tags/facebook','d0f'),
    exact: true
  },
  {
    path: '/website/blog/tags/hello',
    component: ComponentCreator('/website/blog/tags/hello','9b9'),
    exact: true
  },
  {
    path: '/website/blog/tags/hola',
    component: ComponentCreator('/website/blog/tags/hola','548'),
    exact: true
  },
  {
    path: '/website/blog/welcome',
    component: ComponentCreator('/website/blog/welcome','572'),
    exact: true
  },
  {
    path: '/website/markdown-page',
    component: ComponentCreator('/website/markdown-page','c98'),
    exact: true
  },
  {
    path: '/website/docs',
    component: ComponentCreator('/website/docs','1fd'),
    routes: [
      {
        path: '/website/docs/介绍',
        component: ComponentCreator('/website/docs/介绍','889'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/website/docs/intro',
        component: ComponentCreator('/website/docs/intro','345'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '/website/',
    component: ComponentCreator('/website/','042'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
