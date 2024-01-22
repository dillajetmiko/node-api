const express = require('express')
const Department = require('../models/departmentModel')
const { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment, getDepartmentWithEmployees } = require('../controllers/departmentFrontController')

const router = express.Router()

router.get('/', getDepartments)

router.get('/:id', getDepartment)

router.post('/', createDepartment)

router.put('/:id', updateDepartment)

router.delete('/:id', deleteDepartment)

module.exports = router