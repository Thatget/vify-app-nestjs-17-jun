export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'vify_database',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};