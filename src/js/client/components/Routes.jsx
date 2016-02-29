import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Application from './Application';
import Home from './pages/Home';
import NotFound from './pages/NotFound.jsx';

export default (
    <Router path="/" component={Application}>
        <IndexRoute component={Home} />
        <Route component={NotFound} path="*" />
    </Router>
);
