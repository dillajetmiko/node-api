const Employee = require('../models/employeeModel')
const asyncHandler = require('express-async-handler')

// get all Employee
const getEmployees = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find({})
    res.status(200).json(employees)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

// get a single Employee
const getEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id)
    res.status(200).json(employee)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

// create a Employee
const createEmployee = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.create(req.body)
    res.status(200).json(employee)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

// update a Employee 
const updateEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body);
    // we cannot find any Employee in database
    if (!employee) {
      res.status(404)
      throw new Error(`cannot find any Employee with ID ${id}`)
    }
    const updatedEmployee = await Employee.findById(id)
    res.status(200).json(updatedEmployee)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

// delete a Employee
const deleteEmployee = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      res.status(404)
      throw new Error(`cannot find any Employee with ID ${id}`)
    }
    res.status(202).json(employee)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const getEmployeesWithDepartment = asyncHandler(async (req, res) => {
  try {
    // Use the populate method to include all fields from the referenced department
    const employees = await Employee.find().populate('department');
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesWithDepartment
}