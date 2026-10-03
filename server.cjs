require('dotenv').config();
const app = require('./app.cjs')
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/db_config.cjs');


// const path = require('path');
// const filepath = path.join(__dirname , 'Home.html')
// app.get('/', (req , res)=>{
      
//     res.sendFile(filepath)
//     res.send('<h1>Response From Backend</h1>')
//      res.statuscode(200).json({
//         message: 'message from Backend'
//      })
// })
// console.log("ROUTER CHECK:", userRoutes);

(async()=>{
 try {
  await sequelize.sync({ alter: false , force: false})
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
})();



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
