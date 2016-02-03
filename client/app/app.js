import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/layout';
import './app.scss';

ReactDOM.render(
  <Layout />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
