const express = require('express')
const Employee = require('../models/employeeModel')
const { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeesWithDepartment } = require('../controllers/employeeFrontController')

const router = express.Router()

// router.get('/', getEmployees)

router.get('/:id', getEmployee)

router.post('/', createEmployee)

router.put('/:id', updateEmployee)

router.delete('/:id', deleteEmployee)

router.get('/', getEmployeesWithDepartment)

module.exports = router