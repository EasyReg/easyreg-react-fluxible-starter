import _ from 'lodash';
import BaseStore from 'fluxible/addons/BaseStore';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.currentRoute = null;
        this.isTransitionComplete = false;
    }

    onChangeRoute(route) {
        if (this.currentRoute && route.pathname === this.currentRoute.pathname) {
            return;
        }
        this.currentRoute = route;
        this.emitChange();
    }

    getState() {
        return {
            route: this.currentRoute,
            isTransitionComplete: this.isTransitionComplete
        };
    }

    dehydrate() {
        return this.getState();
    }

    rehydrate(state) {
        this.currentRoute = state.route;
        this.isTransitionComplete = state.isTransitionComplete;
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'CHANGE_ROUTE': 'onChangeRoute',
};

export default ApplicationStore;
