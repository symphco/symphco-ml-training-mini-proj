import { ConfigType } from "@nestjs/config";
import DB_Config from 'apps/api-wallet/src/db_config/DB_Config';
import { DatabaseService } from "../services/db_service";

const sampleConnectionProvider = {
    provide: 'wallet_mini_project',
    useFactory: async (dbConfig: ConfigType<typeof DB_Config>) => new DatabaseService(
        dbConfig.connectionLimit,
        dbConfig.host,
        dbConfig.user,
        dbConfig.password,
        dbConfig.name,
        dbConfig.socketPath
    ),
    inject: [DB_Config.KEY],
};
export default sampleConnectionProvider;