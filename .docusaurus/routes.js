
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/http-api/',
    component: ComponentCreator('/http-api/','0cd'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search','82a'),
    exact: true
  },
  {
    path: '/tags',
    component: ComponentCreator('/tags','d7a'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/','fa3'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/','bab'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/community/help-and-support',
        component: ComponentCreator('/community/help-and-support','881'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/concepts/content-addressing',
        component: ComponentCreator('/concepts/content-addressing','3d5'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/concepts/decentralized-storage',
        component: ComponentCreator('/concepts/decentralized-storage','22f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/examples/getting-started',
        component: ComponentCreator('/examples/getting-started','ac4'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/examples/image-gallery',
        component: ComponentCreator('/examples/image-gallery','dd9'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/how-tos/generate-api-token',
        component: ComponentCreator('/how-tos/generate-api-token','f41'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/how-tos/list',
        component: ComponentCreator('/how-tos/list','d79'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/how-tos/list-directory-contents',
        component: ComponentCreator('/how-tos/list-directory-contents','121'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/how-tos/query',
        component: ComponentCreator('/how-tos/query','78e'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/how-tos/retrieve',
        component: ComponentCreator('/how-tos/retrieve','887'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/how-tos/store',
        component: ComponentCreator('/how-tos/store','bf5'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/how-tos/troubleshooting',
        component: ComponentCreator('/how-tos/troubleshooting','455'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/how-tos/work-with-car-files',
        component: ComponentCreator('/how-tos/work-with-car-files','8ed'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/reference/client-library',
        component: ComponentCreator('/reference/client-library','2d1'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/reference/js-utilities',
        component: ComponentCreator('/reference/js-utilities','26f'),
        exact: true,
        'sidebar': "docs"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
