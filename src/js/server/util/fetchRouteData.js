import _ from 'lodash';

import executeMultiple from 'fluxible-action-utils/async/executeMultiple';

export default function fetchRouteData(context, routerState) {
    const actions = routerState.components
                        .filter(component => component && _.isFunction(component.load))
                        .map(component => component.load(context, routerState.params))
                        .reduce((_actions, componentActions) => _.assign(_actions, componentActions), {});

    return new Promise((resolve, reject) => {
        executeMultiple(context, actions, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
}
