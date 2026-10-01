const express = require('express')
const app = express()
const  userRoutes    = require('./routes/userRoutes.cjs')
const  adminRoutes = require('./routes/adminRoutes.cjs')
const cors = require('cors')
const path = require('path')
const  orderRoutes  = require('./routes/orderRoutes.cjs')
const supportRouter  = require('./routes/SupportRoutes.cjs')


app.use(cors({origin:'*'}))
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/users' , userRoutes)
app.use('/api/v1/admin' , adminRoutes)
app.use('/api/v1/orders' , orderRoutes)
app.use('/api/v1/support', supportRouter);


module.exports = app