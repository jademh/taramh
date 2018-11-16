import React from 'react';
import { css } from 'glamor';
import Layout from '../components/Layout';

const NotFoundPage = () => {
  const wrapper = css({
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
  });

  const innerWrapper = css({
    margin: '0 auto',
  });

  /* eslint-disable */
  return(
    <Layout>
      <div {...wrapper}>
        <div {...innerWrapper}>
          <h1>404 - Page not Found</h1>
          <p>That page doesn't exist... try <a href="/">here</a>.</p>
        </div>
      </div>
    </Layout>
  )
  /* eslint-enable */
};

export default NotFoundPage;
