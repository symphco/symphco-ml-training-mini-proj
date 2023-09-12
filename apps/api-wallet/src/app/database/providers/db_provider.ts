import { ConfigType } from '@nestjs/config';
import { DatabaseService } from '../services/db_service';
import WalletDBConfig from 'apps/api-wallet/src/db_config/db.config';

const walletDbConnectionProvider = {
  provide: 'walletmini',
  useFactory: async (dbConfig: ConfigType<typeof WalletDBConfig>) =>
    new DatabaseService(
      dbConfig.connectionLimit,
      dbConfig.host,
      dbConfig.user,
      dbConfig.password,
      dbConfig.name,
      dbConfig.socketPath
    ),
  inject: [WalletDBConfig.KEY],
};
export default walletDbConnectionProvider;
