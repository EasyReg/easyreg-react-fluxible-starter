import requireDir from 'require-dir';

const routes = requireDir();

export default server => {
    Object.keys(routes).forEach(routeKey => {
        server.use(routes[routeKey].default);
    });
};
