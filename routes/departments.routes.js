const { json } = require('express');
const express = require('express');
const router = express.Router();
//const ObjectId = require('mongodb').ObjectId;
//const Department = require('../models/department.model');

const DepartmentController = require('../controllers/departments.controller')

router.get('/departments',       DepartmentController.getAll);
router.get('/departments/random',DepartmentController.random);
router.get('/departments/:id',   DepartmentController.getId);
router.post('/departments',      DepartmentController.post);
router.put('/departments/:id',   DepartmentController.putId);
router.delete('/departments/:id',DepartmentController.delete);

module.exports = router;
