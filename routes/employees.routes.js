const { json } = require('express');
const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

router.get('/employees', (req, res) => {
  req.db.collection('employees').find().toArray((data,err)=>{
    if(err) res.status(500).json({message: err})
    else req.json(data)
  }) 
});

router.get('/employees/random', (req, res) => {
  req.db.collection('employees').aggregate([{$sample:{size:1}}]).toArray((err,data)=>{
    if(err) res.status(500).json({message: err})
    else res.json(data)
  })
});

router.get('/employees/:id', (req, res) => {
  req.db.collection('employees').findOne({_id: ObjectId(req.params.id)}, (data, err) =>{
    if(err) res.status(500).json({message: err})
    else res.json(data)
  });
});

router.post('/employees', (req, res) => {
  const {firstName, lastName, department} = req.body
  req.db.collection('employees').insertOne({firstName: firstName, lastName: lastName, department: department}, err=>{
    if( err ) res.status(500).json({message: err});
    else res.json({message: 'ok'})
  })
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName, department } = req.body;
  req.db.collection(emplyees).updateOne({_id: ObjectId(req.params.id)},{firstName: firstName, lastName:lastName, department:department }, err=>{
    if(err) res.status(500).json({message: err})
    else res.json({message: 'ok'})
  });
});

router.delete('/employees/:id', (req, res) => {
req.db.collection('employees').deleteOne({_id: ObjectId(req.params.id)}, err=>{
  if(err) res.status(500).json({message: err})
  else res.json({message: 'ok'})
})
});

module.exports = router;
