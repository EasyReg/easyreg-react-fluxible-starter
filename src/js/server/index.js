import d from 'debug';
import express from 'express';
import expressState from 'express-state';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import routes from './routes';

const debug = d('Server');
const server = express();
expressState.extend(server);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(session({
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
}));
server.use('/', express.static(__dirname + '/../../../build'));
routes(server);

const port = process.env.PORT || 3000;

server.listen(port);
debug(`Listening on port ${port}`);
