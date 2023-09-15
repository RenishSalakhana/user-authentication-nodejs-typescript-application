import { Sequelize } from "sequelize";
import { CONFIG } from "../../config/config";

const sequelize = new Sequelize(
  CONFIG.DATABASE.DB_NAME,
  CONFIG.DATABASE.DB_ROOT,
  CONFIG.DATABASE.DB_PWD,
  {
    host: CONFIG.DATABASE.DB_HOST,
    dialect: "mysql",
  }
);

sequelize.sync()
  // .authenticate()
  // .then(() => {
  //   console.log("connection db has been done!!");
  // })
  // .catch((err) => {
  //   console.error("Unable to connect to the database:", err);
  // });

export default sequelize;
