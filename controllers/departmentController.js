const Department = require('../models/departmentModel')
const asyncHandler = require('express-async-handler')

// get all Department
const getDepartments = asyncHandler(async (req, res) => {
  try {
    const departments = await Department.find({})
    res.status(200).json(departments)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

// get a single Department
const getDepartment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id)
    res.status(200).json(department)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

// create a Department
const createDepartment = asyncHandler(async (req, res) => {
  try {
    const department = await Department.create(req.body)
    res.status(200).json(department)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

// update a Department 
const updateDepartment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndUpdate(id, req.body);
    // we cannot find any Department in database
    if (!department) {
      res.status(404)
      throw new Error(`cannot find any Department with ID ${id}`)
    }
    const updatedDepartment = await Department.findById(id)
    res.status(200).json(updatedDepartment)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

// delete a Department
const deleteDepartment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      res.status(404)
      throw new Error(`cannot find any Department with ID ${id}`)
    }
    res.status(202).json(department)
  } catch (error) {
    res.status(500)
    throw new Error(error.message)
  }
})

const getDepartmentWithEmployees = asyncHandler(async (req, res) => {
  try {
    // Use the populate method to include employees in the department data
    const departments = await Department.find().populate('employees');

    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = {
  getDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentWithEmployees
}