const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please enter a department name"]
    },
  },
  {
    timestamps: true
  }
)

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department;