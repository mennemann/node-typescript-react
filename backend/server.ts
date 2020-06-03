import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as serveStatic from 'serve-static';
import * as controllers from './controllers';
import * as fs from 'fs';
import MySQLH from './util/MySQLHandler';
import Table from './util/enums/MySQLTableEnum';
import UUID from './util/GenerateUUID';

class WebServer extends Server {

    private readonly SERVER_STARTED = 'Web server started on port: ';
    private server: any;

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(serveStatic(path.join(__dirname, '../frontend/public')));
        this.app.use(serveStatic(path.join(__dirname, '../node_modules')));
        this.setupControllers();
    }

    public start(port: string | undefined, protocol: string | undefined): void {
        this.app.get('/', (req: any, res: { sendFile: (arg0: string) => void; }) => {
            res.sendFile(path.join(__dirname, '../frontend/pages/main/index.html'));
        });

        if (protocol === 'https') {
            let key = './certs/key.pem';
            let certificate = './certs/certificate.pem';

            const options = {
                key: fs.readFileSync(key),
                cert: fs.readFileSync(certificate)
            };

            this.server = require('https').createServer(options, this.app);
        } else if (protocol === 'http') {
            this.server = require('http').createServer(this.app)
        }

        this.server.listen({ port }, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        })
    }

    public initSocket(): void {
        const io = require('socket.io')(this.server);

        io.on('connection', (socket: any) => {
            socket.on('msg', (msg: string) => {
                
            })
        });
    }

    private setupControllers(): void {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }
}

export default WebServer;
