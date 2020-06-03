import Table from './enums/MySQLTableEnum';

class Handler {
    private host: string;
    private user: string;
    private password: string;
    private database: string;

    private connection: any;

    constructor(host: string, user: string, password: string, database: string) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }

    public connect() {
        this.connection = require('mysql').createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });

        this.connection.connect();
    }

    public disconnect() {
        this.connection.end()
    }

    public set(table: Table, key: string[], value: string[], _callback: Function) {
        this.connection.query('INSERT INTO ' + table + ' (' + key.join() + ') VALUES (\'' + value.join("\',\'") + '\');', (err: any, rows: any) => {
            if (err) throw err;
            _callback(rows);
        })
    }

    public get(table: Table, key: string[], condition: string | undefined = "1", _callback: Function): any {
        this.connection.query('SELECT ' + key.join() + ' FROM ' + table + ' WHERE ' + condition + ';', (err: any, rows: any) => {
            if (err) throw err;
            _callback(rows);
        });
    }

    public query(query: string, _callback: Function): any {
        this.connection.query(query, (err: any, rows: any) => {
            if (err) throw err;
            _callback(rows)
        });
    }
}

export default Handler;