import React from 'react';
import { Router } from '@reach/router';

import Login from '../Login';

const DefaultLayout = () => (
  <>
    <main className="app__container">
      <Router>
        <Login path="/login" />
      </Router>
    </main>
  </>
);

export default DefaultLayout;
