const { json } = require('express');
const express = require('express');
const router = express.Router();
//const ObjectId = require('mongodb').ObjectId;
//const Employee = require('../models/employee.model');

const EmployeesController = require('../controllers/employees.controller')

router.get('/employees',        EmployeesController.getAll);
router.get('/employees/random', EmployeesController.random);
router.get('/employees/:id',    EmployeesController.getId);
router.post('/employees',       EmployeesController.post);
router.put('/employees/:id',    EmployeesController.putId);
router.delete('/employees/:id', EmployeesController.delete);


module.exports = router;
