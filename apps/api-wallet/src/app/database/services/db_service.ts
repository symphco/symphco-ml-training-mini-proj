import { Injectable } from '@nestjs/common/decorators';
import {
  Pool,
  PoolConnection,
  PoolOptions,
  createPool,
  escape,
} from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private pool: Pool;
  constructor(
    connectionLimit: number,
    host: string,
    user: string,
    password: string,
    database: string,
    socketPath: string
  ) {
    this.pool = createPool(
      this.createConfig(
        connectionLimit,
        host,
        user,
        password,
        database,
        socketPath
      )
    );
  }

  protected createConfig(
    connectionLimit: number,
    host: string,
    user: string,
    password: string,
    database: string,
    socketPath: string
  ): PoolOptions {
    const dbConfig: PoolOptions = {
      connectionLimit,
      host,
      user,
      password,
      database,
      dateStrings: true,
    };
    if (socketPath) {
      dbConfig.socketPath = socketPath;
    }
    return dbConfig;
  }
  public async startTransaction(): Promise<PoolConnection> {
    const connection = await this.pool.getConnection();
    await connection.beginTransaction();
    return connection;
  }

  public async getTransactionalQueryResult(
    connection: PoolConnection,
    storedProc: string,
    params: any[]
  ) {
    const query = this.generateQuery(storedProc, params);
    return (await connection.query(query))[0][0];
  }

  public async getQueryResult(storedProc: string, params: any[]) {
    const query = this.generateQuery(storedProc, params);
    const [result] = await this.pool.query(query);
    return result[0];
  }

  public generateQuery(storedProc: string, params: any[]) {
    let paramString = '';
    for (let index = 0; index < params.length; index++) {
      const value = escape(params[index]);
      if (index + 1 === params.length) {
        paramString = paramString.concat(`${value}`);
      } else {
        paramString = paramString.concat(`${value},\n`);
      }
    }
    const sql = `CALL ${storedProc}(${paramString})`;
    return sql;
  }

  public async getResults(storedProc: string, params: any[]) {
    const query = this.generateQuery(storedProc, params);
    const [result] = await this.pool.query(query);
    return result[0];
  }
}
