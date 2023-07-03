export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'vify_user',
  password: 'vify_password',
  database: 'vify_database',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};