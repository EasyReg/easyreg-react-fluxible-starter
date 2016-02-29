import Fluxible from 'fluxible';
import {PropTypes} from 'react';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import Routes from './components/Routes.jsx';
import ApplicationStore from './stores/ApplicationStore';

const app = new Fluxible({
    component: Routes
});

app.plug(fetchrPlugin({
    xhrPath: '/api', // Path for XHR to be served from
}));

app.customContexts = {
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired
};

app.registerStore(ApplicationStore);

export default app;
