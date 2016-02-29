import {RouterContext, match} from 'react-router';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {provideContext} from 'fluxible-addons-react';

import app from '../../client/app';
import Html from '../../client/components/Html.jsx';
import routes from '../../client/components/Routes.jsx';

import history from '../../common/history';

import fetchRouteData from '../util/fetchRouteData';

import {Router as expressRouter} from 'express';

const publicRouter = expressRouter();


publicRouter.use('/', (req, res) => {
    const context = app.createContext({
        env: process.env.NODE_ENV || 'local',
        siteUrl: process.env.SITE_URL || `${ req.protocol }://${ req.hostname }`,
        // Uncomment this code to specify where on S3 remote assets are stored
        // aws: {
        //     useS3: process.env.USE_S3 && process.env.USE_S3 !== 'false' || false,
        //     bucket: process.env.S3_BUCKET || '',
        //     prefix: process.env.S3_PREFIX || '',
        //     folder: process.env.S3_PATH || '',
        //     urlHash: process.env.URL_HASH || '',
        //     cloudfront: process.env.CLOUDFRONT_URL || false,
        //     bypassCdn: req.query.bypass || false
        // },
        req: req,
        xhrContext: { // Used as query params for all XHR calls
            lang: 'en-US', // make sure XHR calls receive the same lang as the initial request
            // _csrf: req.csrfToken(), // Make sure all XHR requests have the CSRF token
        },
    });

    const location = history.createLocation(req.url);

    match({ routes, location, history }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.status(500).send(error.message);
        } else if (renderProps === null) {
            res.status(404).send('Not found');
        } else {
            fetchRouteData(context, renderProps)
                .then( () => {
                    const appState = app.dehydrate(context);
                    appState.env = process.env.NODE_ENV || 'local';
                    res.expose(appState, 'App');

                    renderProps.context = context.getComponentContext();

                    const RouterComponent = provideContext(RouterContext, app.customContexts);
                    const HtmlComponent = provideContext(Html, app.customContexts);
                    const markup = ReactDOMServer.renderToString(React.createElement(RouterComponent, renderProps));
                    const html = ReactDOMServer.renderToStaticMarkup(React.createElement(HtmlComponent, {
                        title: 'EasyReg',
                        context: context.getComponentContext(),
                        state: res.locals.state,
                        markup: markup,
                        location: location,
                    }));

                    res.send(`<!DOCTYPE html>${ html }`);
                })
                .catch( error => {
                    console.error(error.stack);
                    res.status(500).send(error.stack);
                });
        }
    });
});

export default publicRouter;
