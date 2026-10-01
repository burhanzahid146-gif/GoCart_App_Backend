const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('db_18', 'root', '', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});


module.exports = sequelize