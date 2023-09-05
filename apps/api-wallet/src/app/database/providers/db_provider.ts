import { ConfigType } from "@nestjs/config";
import { DatabaseService } from "../services/db_service";
import DBConfig from "apps/api-wallet/src/db_config/db.config";

const sampleConnectionProvider = {
    provide: 'walletmini',
    useFactory: async (dbConfig: ConfigType<typeof DBConfig>) => new DatabaseService(
        dbConfig.connectionLimit,
        dbConfig.host,
        dbConfig.user,
        dbConfig.password,
        dbConfig.name,
        dbConfig.socketPath
    ),
    inject: [DBConfig.KEY],
};
export default sampleConnectionProvider;