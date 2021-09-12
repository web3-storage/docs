import React from 'react';
import Layout from '@theme/Layout';

function ApiDocLayout({ children, ...layoutProps }) {
  const {
    title = 'API Docs',
    description = 'Open API Reference Docs for the API',
  } = layoutProps || {};

  return (
    <Layout {...layoutProps} title={title} description={description}>
      { children }
    </Layout>
  );
}

export default ApiDocLayout;