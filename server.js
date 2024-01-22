require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/productRoute')
const Employee = require('./models/employeeModel')
const methodOverride = require('method-override');
const employeeRoute = require('./routes/employeeRoute')
const employeeFrontRoute = require('./routes/employeeFrontRoute')
const departmentFrontRoute = require('./routes/departmentFrontRoute')
const departmentRoute = require('./routes/departmentRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));

//routes

app.use('/api/products', productRoute)
app.use('/api/employees', employeeRoute)
app.use('/api/departments', departmentRoute)

app.use('/employees', employeeFrontRoute)
app.use('/departments', departmentFrontRoute)


// Set ejs template engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("home", {});
  // res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
  res.send('Hello NODE API blog')
})

app.post('/', async (req, res) => {
  try {
    const employee = await Employee.create(req.body)
    // console.log("ini", req.body);
    // console.log(employee);
    res.redirect('/')
    // res.status(200).json(employee)
  } catch (error) {
    console.log(error);
  }
});

app.use(errorMiddleware)


mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('connected to mongodb');
    app.listen(PORT, () => {
      console.log(`Node API is running on port ${PORT}`);
    })
  }).catch((error) => {
    console.log(error);
  })