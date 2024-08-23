import React from 'react';
import { MyProvider } from './Context';
import Layout from './pages/Layout.JS';

const App = () => (
  <MyProvider>
    <Layout />
  </MyProvider>
);

export default App;
