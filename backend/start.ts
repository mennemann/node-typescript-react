import WebServer from './server';

import './lib/env';

const http_server = new WebServer();
const https_server = new WebServer();

http_server.start(process.env.HTTP_PORT, 'http');
http_server.initSocket();

https_server.start(process.env.HTTPS_PORT, 'https');
https_server.initSocket();