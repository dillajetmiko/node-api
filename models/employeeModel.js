const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please enter a employee name"]
    },
    surname: {
      type: String,
      // required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      // required: true,
    },
  },
  {
    timestamps: true
  }
)

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee;