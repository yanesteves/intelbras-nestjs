import { AppDataSource } from './ormconfig';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = AppDataSource;
      return dataSource.initialize();
    },
  }
];