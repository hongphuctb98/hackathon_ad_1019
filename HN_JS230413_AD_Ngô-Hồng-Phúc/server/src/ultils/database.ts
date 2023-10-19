import mysql2, { PoolOptions, Pool } from "mysql2";

const databaseConfig: PoolOptions = {
  database: "hackathon_ad_1019",
  port: 3306,
  user: "root",
  password: "hongphuc27298",
  host: "localhost",
};

const database: Pool = mysql2.createPool(databaseConfig);

export default database.promise();
